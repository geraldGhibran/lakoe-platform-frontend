import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { productSchema } from '../schemas/addProductSchema/index';
import { useState } from 'react';
import { useEffect } from 'react';
import useCategoryStore from '../../../../store/categories';
import { createListCollection } from '@chakra-ui/react';

interface ProductFormData {
  name: string;
  url: string;
  categories: number;
  description: string;
  price: number;
  minimum_order: number;
  stock: number;
  sku: number;
  weight: number;
  length: number;
  width: number;
  height: number;
  image: File[];
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

const useAddProduct = () => {
  const [isVariantTypeCreate, setIsVariantTypeCreate] = useState(false);
  const [colorTags, setColorTags] = useState<string[]>([]);
  const [sizeTags, setSizeTags] = useState<string[]>([]);
  const [images, setImages] = useState<(string | null)[]>([
    null,
    null,
    null,
    null,
  ]);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const [selectedSubcategory, setSelectedSubcategory] =
    useState<SubCategory | null>(null);
  const [selectedSubSubcategory, setSelectedSubSubcategory] =
    useState<SubSubCategory | null>(null);
  const [files, setFiles] = useState<File[]>([]);
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

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      setFiles((prevFiles) => {
        const newFiles = [...prevFiles];
        newFiles[index] = file;
        return newFiles;
      });

      const reader = new FileReader();
      reader.onload = () => {
        const newImages = [...images];
        newImages[index] = reader.result as string;
        setImages(newImages);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = (index: number) => {
    const newImages = [...images];
    newImages[index] = null;
    setImages(newImages);
    setFiles((prevFiles) => {
      const newFiles = [...prevFiles];
      newFiles[index] = undefined as unknown as File;
      return newFiles;
    });
  };

  const onSubmit = async (data: ProductFormData) => {
    const formData = new FormData();

    const appendData = (
      key: string,
      value: string | number | boolean | null | undefined
    ) => {
      if (value !== undefined && value !== null) {
        formData.append(key, value.toString());
      }
    };

    appendData('name', data.name);
    appendData('url', data.url);
    appendData('categories', data.categories);
    appendData('description', data.description);
    appendData('price', data.price);
    appendData('minimum_order', data.minimum_order);
    appendData('stock', data.stock);
    appendData('sku', data.sku);
    appendData('weight', data.weight);
    appendData('length', data.length);
    appendData('width', data.width);
    appendData('height', data.height);

    const imagesArray = files
      .filter((file) => file)
      .map((file) => {
        return file;
      });

    formData.append('images', JSON.stringify(imagesArray));

    for (const [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }

    reset();
    setColorTags([]);
    setSizeTags([]);
    setImages([null, null, null, null]);
    setFiles([]);
  };

  return {
    register,
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
  };
};

export default useAddProduct;
