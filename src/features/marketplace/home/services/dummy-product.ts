// import { Product } from "@/types/prod"

import { Product } from '@/@types/types';

export async function getDummyProduct() {
  try {
    const res = await fetch('https://fakestoreapi.com/products/1');

    const data: Product = await res.json();

    return data;
  } catch (error) {
    console.log(error);
  }
}
