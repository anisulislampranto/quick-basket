'use client';

import Image from 'next/image';
import { usePathname } from 'next/navigation'
import React from 'react';
import Logo from '../../assets/quick-basket.png'
import { useForm } from 'react-hook-form';

export default function AuthenticationClient() {
    const pathname = usePathname();
    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    const onSubmit = data => console.log(data);


    return (
        <div className=' flex items-center justify-center w-screen h-screen'>
            <div className='max-w-4xl mx-auto flex items-center bg-white border border-black p-10'>
                <div>
                    <div className=' relative h-80 w-80'>
                        <Image className=' absolute object-contain' src={Logo} alt='SignUpImage' fill />
                    </div>
                    <div>
                        <h1 className=' font-montserrat'>Sign In</h1>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit, molestias iure. Animi, adipisci. Quisquam facilis atque laboriosam reiciendis. Ea, totam.</p>
                    </div>
                </div>

                <div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className=''>
                            <input defaultValue="test" {...register("example")} />
                            {errors.example && <span>{errors.example.message}</span>}
                        </div>
                        
                        <div>
                            <input {...register("exampleRequired", { required: 'This field is required' })} />
                            {errors.exampleRequired && <span>{errors.exampleRequired.message}</span>}
                        </div>

                        <input type="submit" />
                    </form>
                </div>
            </div>
        </div>
    )
}
