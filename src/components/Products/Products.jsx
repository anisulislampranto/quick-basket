import Image from 'next/image';
import React from 'react';
import DropBorder from '../ui/DropBorder';
import { FaEdit } from "react-icons/fa";
import EditProduct from '../EditProduct/EditProduct';
import DrawerWrapper from '../ui/DrawerWrapper';
import Link from 'next/link';
import { useSelector } from 'react-redux';


function CategoryProducts({ title, products, user }) {
  
  return (
    <div className="space-y-5 mt-10">
        <DropBorder>
            <h1 className=' text-sm'>{title}</h1>
        </DropBorder>
        <div className="flex flex-wrap md:flex-nowrap justify-center md:justify-start md:overflow-scroll gap-10">
          {products.length > 0 ? products?.map((el) => (
            
            <Link href={`/products/${el._id}`} key={el._id} className="border-2 border-gray-400 p-5 hover:border-2 hover:border-black transition duration-150 ease-in-out space-y-2 max-w-64">
                <div className="relative h-40 w-56">
                  <Image className="absolute object-contain" src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${el.images[0]}`} alt="product image" fill />
                </div>
                <div className='flex items-start gap-2 justify-between'>
                  <h2>{el.name}</h2>
                  <p>${el.price}</p>
                </div>

                <p className=' text-sm line-clamp-3'>{el.description}</p>

                {/*  */}
                <div className={`justify-between ${user?.shop?._id === el?.shop?._id ? 'flex' : 'hidden' }`}>
                  <p>Stock</p>
                  <p className={`${el.stock < 5 && 'text-red-600'}`}>{ el.stock}</p>
                </div>
                {/*  */}
            </Link>
          )) : <p>No Product Available</p>}
        </div>
    </div>
  );
}

export default function Products({ products }) {
  const activeProducts = products?.filter((el) => el.isActive); 
  const {user} = useSelector((state) => state.user)

  const categories = [
    { title: 'Home And Living Products', products: activeProducts?.filter((el) => el.category === 'home&Living') },
    { title: 'Beauty And Personal Care Products', products: activeProducts?.filter((el) => el.category === 'beauty&PersonalCare') },
    { title: 'Fashion And Apparel Products', products: activeProducts?.filter((el) => el.category === 'fashion&Apparel') },
    { title: 'Electronics And Gadgets Products', products: activeProducts?.filter((el) => el.category === 'electronics&Gadgets') },
  ];

  return (
    <div>
        {categories.map((category) => (
          <CategoryProducts key={category.title} title={category.title} products={category?.products} user={user} />
        ))}
    </div>
  );
}
