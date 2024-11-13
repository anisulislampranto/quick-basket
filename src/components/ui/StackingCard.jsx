'use client';

import { ReactLenis } from 'lenis/react';
import { useTransform, motion, useScroll } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import { RandomizedTextEffect } from './RandomizedTextEffect';
import Link from 'next/link';
import gadgetImage from '../../assets/gedgets.webp'
import fashionImage from '../../assets/fashion.webp'
import personalCare from '../../assets/personal-care.webp'
import homeAndLiving from '../../assets/home-living.webp'

const projects = [
  {
    title: 'Electronics & Gadgets',
    description:
      'Explore the latest electronics and gadgets, designed to keep you connected and ahead',
    src: 'rock.jpg',
    link: gadgetImage,
    color: '#5196fd',
  },
  {
    title: 'Fashion & Apparel',
    description:
      'Explore our curated collection of fashion essentials and statement pieces crafted for every style.',
    src: 'tree.jpg',
    link: fashionImage,
    color: '#8f89ff',
  },
  {
    title: 'Beauty & PersonalCare',
    description:
      'Indulge in premium skincare, makeup, and self-care essentials crafted to make you glow inside and out.',
    src: 'water.jpg',
    link: personalCare,
    color: 'tan',
  },
  {
    title: 'Home & Living',
    description:
      'Curate a Space that Speaks to Your Soul, Blending Comfort, Elegance, and Personal Style for a Home You’ll Love Every Day.',
    src: 'house.jpg',
    link: homeAndLiving,
    color: '#ed649e',
  },
];

export default function StackingCard() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end'],
  });


  return (
    <ReactLenis root>
      <main className="" ref={container}>
        <>
          <section className="h-[40vh] w-full grid place-content-center ">
            <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:54px_54px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>

            <h1 className="2xl:text-7xl text-3xl sm:text-5xl md:text-6xl px-8 font-semibold text-center tracking-tight leading-[120%]">
              <RandomizedTextEffect text='Quick Basket' />
            </h1>

            <h2 className="2xl:text-4xl text-lg my-2 px-8 font-semibold text-center tracking-tight leading-[120%]">
              <RandomizedTextEffect text='Your One-Stop Shop for Quality and Value' />
            </h2>
            
            <span className=' text-center text-sm md:text-base'>
              <RandomizedTextEffect text='Browse our wide range of products and discover unbeatable deals today.' />
            </span>
          </section>
        </>

        <section className="w-full">
          {projects.map((project, i) => {
            const targetScale = 1 - (projects.length - i) * 0.05;
            return (
              <Card
                key={`p_${i}`}
                i={i}
                url={project?.link}
                src={project?.src}
                title={project?.title}
                color={project?.color}
                description={project?.description}
                progress={scrollYProgress}
                range={[i * 0.25, 1]}
                targetScale={targetScale}
              />
            );
          })}
        </section>
      </main>
    </ReactLenis>
  );
}
export const Card = ({
  i,
  title,
  description,
  src,
  url,
  color,
  progress,
  range,
  targetScale,
}) => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start end', 'start start'],
  });
  const imageScale = useTransform(scrollYProgress, [0, 1], [2, 1]);
  const scale = useTransform(progress, range, [1, targetScale]);
  return (
    <div
      ref={container}
      className="h-screen flex items-center justify-center sticky top-0"
    >
      <motion.div
        style={{
          backgroundColor: 'white',
          scale,
          top: `calc(-5vh + ${i * 25}px)`,
        }}
        className={`flex flex-col relative -top-[25%] h-[450px] w-[70%] border-2 border-black p-10 origin-top`}
      >
        <h2 className="text-2xl text-center font-semibold">{title}</h2>
        <div className={`flex flex-col md:flex-row h-full mt-5 gap-10`}>
          <div className={` w-full md:w-[40%] relative top-[10%]`}>
            <p className="text-sm">{description}</p>
            <span className="flex items-center gap-2 pt-2">
              <Link
                href={'/products'}
                className="underline cursor-pointer"
              >
                See more
              </Link>
              <svg
                width="22"
                height="12"
                viewBox="0 0 22 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21.5303 6.53033C21.8232 6.23744 21.8232 5.76256 21.5303 5.46967L16.7574 0.696699C16.4645 0.403806 15.9896 0.403806 15.6967 0.696699C15.4038 0.989592 15.4038 1.46447 15.6967 1.75736L19.9393 6L15.6967 10.2426C15.4038 10.5355 15.4038 11.0104 15.6967 11.3033C15.9896 11.5962 16.4645 11.5962 16.7574 11.3033L21.5303 6.53033ZM0 6.75L21 6.75V5.25L0 5.25L0 6.75Z"
                  fill="black"
                />
              </svg>
            </span>
          </div>

          <div
            className={`relative w-full md:w-[60%] h-full shadow-2xl rounded-sm overflow-hidden `}
          >
            <motion.div
              className={`w-full h-full`}
              style={{ scale: imageScale }}
            >
              <Image fill src={url} alt="image" className="object-cover" />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
