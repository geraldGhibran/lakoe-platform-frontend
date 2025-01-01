import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { productSchema } from '../schemas/addProductSchema/index';
import { useState } from 'react';
import { useEffect } from 'react';
import useCategoryStore from '../../../../store/categories';
import { createListCollection } from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';
import API from '@/libs/axios';
import { toaster } from '@/components/ui/toaster-placement';
import { useAuthStore } from '@/store/auth';
import { useNavigate } from 'react-router-dom';

interface ProductFormData {
  name: string;
  url: string;
  categories_id: number;
  description: string;
  price: number;
  minimum_order: number;
  length: number;
  width: number;
  height: number;
  isActive: boolean;
  images: File[];
}

interface SubSubCategory {
  id: number;
  label: string;
  value: string;
}

interface SubCategory {
  label: string;
  value: string;
  subcategories?: SubSubCategory[];
}

interface Category {
  label: string;
  value: string;
  subcategories?: SubCategory[];
}

type Variant = {
  name: string;
  variantItem: string[];
};

type VariantCombination = {
  name: string;
  sku: string;
  weight: number;
  stock: number;
  price: number;
  isActive: boolean;
};
type ImageObject = {
  file: File | null;
  preview: string | null;
};

const useAddProduct = () => {
  const [isActive] = useState<boolean>(true);
  const [variants, setVariants] = useState<Variant[]>([]);
  const [variantCombination, setVariantCombination] = useState<
    VariantCombination[]
  >([]);
  const [isVariantTypeCreate, setIsVariantTypeCreate] = useState(false);
  const [colorTags, setColorTags] = useState<string[]>([]);
  const [sizeTags, setSizeTags] = useState<string[]>([]);
  const [images, setImages] = useState<ImageObject[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  const { user } = useAuthStore();

  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const [selectedSubcategory, setSelectedSubcategory] =
    useState<SubCategory | null>(null);
  const [selectedSubSubcategory, setSelectedSubSubcategory] =
    useState<SubSubCategory | null>(null);
  const { categories, fetchCategories } = useCategoryStore();

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const categoryCollection = createListCollection({
    items:
      categories?.map((category) => ({
        id: category.id,
        label: category.name,
        value: category.name,
        subcategories: category.subcategories.map((subcategory) => ({
          id: subcategory.id,
          label: subcategory.name,
          value: subcategory.name,
          subcategories: subcategory.subcategories.map((subSubcategory) => ({
            id: subSubcategory.id,
            label: subSubcategory.name,
            value: subSubcategory.name,
          })),
        })),
      })) || [],
  });

  const getSelectedPath = (): string => {
    const path = [];
    if (selectedCategory) path.push(selectedCategory.label);
    if (selectedSubcategory) path.push(selectedSubcategory.label);
    if (selectedSubSubcategory) path.push(selectedSubSubcategory.label);
    return path.join(' > ');
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      isActive: true,
    },
  });

  const handleAddColorTag = (tag: string) => {
    setColorTags((prevTags) => [...prevTags, tag]);
  };

  const handleRemoveColorTag = (index: number) => {
    setColorTags((prevTags) => prevTags.filter((_, i) => i !== index));
  };

  const handleAddSizeTag = (tag: string) => {
    setSizeTags((prevTags) => [...prevTags, tag]);
  };

  const handleRemoveSizeTag = (index: number) => {
    setSizeTags((prevTags) => prevTags.filter((_, i) => i !== index));
  };

  const handleVariantTypeCreateToggle = () => {
    setIsVariantTypeCreate(!isVariantTypeCreate);
  };

  const updateVariantsAndCombination = (
    newVariants: Variant[],
    newVariantCombination: VariantCombination[]
  ) => {
    setVariants(newVariants);
    setVariantCombination(newVariantCombination);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (selectedFiles) {
      const newImages: ImageObject[] = Array.from(selectedFiles).map(
        (file) => ({
          file,
          preview: URL.createObjectURL(file),
        })
      );

      setImages((prevImages) => [...prevImages, ...newImages]);
      setFiles((prevFiles) => [...prevFiles, ...Array.from(selectedFiles)]);
    }
  };
  const navigate = useNavigate();

  const handleRemoveImage = (index: number) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };
  const mutation = useMutation({
    mutationFn: async (formData: FormData) => {
      const response = await API.post('/product/create', formData);
      return response.data;
    },
    onSuccess: () => {
      toaster.create({
        title: 'Success',
        type: 'success',
        description: 'Product successfully submitted!',
        duration: 3000,
      });
      navigate('/products');
    },
    onError: (error: Error) => {
      toaster.create({
        title: 'Error',
        type: 'error',
        description: error.message,
        duration: 3000,
      });
    },
  });

  const onSubmit = async (data: ProductFormData) => {
    const formData = new FormData();
    formData.append(
      'product',
      JSON.stringify({
        name: data.name,
        description: data.description,
        price: data.price,
        isActive: isActive.toString(),
        minimum_order: data.minimum_order,
        categories_id: data.categories_id,
        url: data.url,
        length: data.length,
        width: data.width,
        height: data.height,
        store_id: Number(user?.store?.id),
      })
    );

    formData.append('variant', JSON.stringify(variants));
    formData.append('variantCombination', JSON.stringify(variantCombination));

    files.forEach((file) => {
      formData.append('images', file);
    });

    console.log('FormData preview:');
    for (const [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }

    reset();
    setColorTags([]);
    setSizeTags([]);
    mutation.mutate(formData);
  };

  return {
    register,
    ...mutation,
    isLoading: mutation.status === 'pending',
    handleSubmit,
    errors,
    isVariantTypeCreate,
    handleAddColorTag,
    handleRemoveColorTag,
    handleAddSizeTag,
    handleRemoveSizeTag,
    handleVariantTypeCreateToggle,
    colorTags,
    sizeTags,
    onSubmit,
    images,
    handleImageChange,
    handleRemoveImage,
    getSelectedPath,
    selectedCategory,
    selectedSubcategory,
    selectedSubSubcategory,
    setSelectedCategory,
    setSelectedSubcategory,
    setSelectedSubSubcategory,
    categories,
    categoryCollection,
    variants,
    variantCombination,
    updateVariantsAndCombination,
  };
};

export default useAddProduct;
