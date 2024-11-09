import Image from 'next/image';
import React from 'react';
import DropBorder from '../ui/DropBorder';
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import { FaEdit } from "react-icons/fa";
import EditProduct from '../EditProduct/EditProduct';
import DrawerWrapper from '../ui/DrawerWrapper';



function CategoryProducts({ title, products }) {
  return (
    <div className="space-y-5 mt-10">
        <DropBorder>
            <h1 className=' text-sm'>{title}</h1>
        </DropBorder>
        <ul className="flex flex-wrap md:flex-nowrap justify-center md:justify-start md:overflow-scroll gap-10">
          {products.length > 0 ? products.map((el) => (
            <li key={el._id} className="border-2 border-transparent p-5 hover:border-2 hover:border-black transition duration-150 ease-in-out">
              
              <div className="relative h-40 w-40">
                <Image className="absolute object-contain" src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${el.images[0]}`} alt="product image" fill />
                {/* Edit Product Drawer */}
                <DrawerWrapper heading={'Edit Product'} subHeading={'Edit Product of your shop.'} openButton={<button className=' border border-black p-1 bg-white absolute -top-3 -right-3'><FaEdit className=' w-5 h-5' /></button>}>
                  <EditProduct product={el} />
                </DrawerWrapper>
                {/* Edit Product Drawer */}
              </div>
              <div>
                <h2>{el.name}</h2>
              </div>
            </li>
          )) : <p>No Product Available</p>}
        </ul>
    </div>
  );
}

export default function ShopProductsClient({ products }) {
  const activeProducts = products.filter((el) => el.isActive);

  const categories = [
    { title: 'Home And Living Products', products: activeProducts.filter((el) => el.category === 'home&Living') },
    { title: 'Beauty And Personal Care Products', products: activeProducts.filter((el) => el.category === 'beauty&PersonalCare') },
    { title: 'Fashion And Apparel Products', products: activeProducts.filter((el) => el.category === 'fashion&Apparel') },
    { title: 'Electronics And Gadgets Products', products: activeProducts.filter((el) => el.category === 'electronics&Gadgets') },
  ];

  return (
    <div className="container px-5">
        <DropBorder>
            <h1 className="text-2xl">Products</h1>
        </DropBorder>
        {categories.map((category) => (
          <CategoryProducts key={category.title} title={category.title} products={category.products} />
        ))}
    </div>
  );
}
