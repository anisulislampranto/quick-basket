'use client';
import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Plus } from 'lucide-react';


const tabs = [
  {
    title: 'What is Quick Basket?',
    description: 'Quick Basket is an online platform where customers can browse and purchase products from a variety of sellers. Sellers can create shops to showcase their products, and we facilitate secure transactions and delivery.',
  },
  {
    title: 'How do I create an account?',
    description:'Click on the "Sign Up" button on the homepage and choose to register as a seller or a customer. Fill in the required details and complete the registration process. You can also sign up using Google.',
  },
  {
    title: 'Can I use the platform without registering?',
    description: "Yes, you can browse products without an account, but you'll need to sign up or log in to make a purchase or manage a shop.",
  },
  {
    title: 'How do I place an order?',
    description: "Browse products, add items to your cart, and proceed to checkout. Provide your delivery address, choose a payment method, and confirm your order.",
  },
  {
    title: 'Can I order products from multiple shops in one go?',
    description: "Yes! However, each shop will process your order separately, and you may receive multiple shipments.",
  },
  {
    title: 'How can I track my order?',
    description: "Go to the My Orders section in your account. You'll find real-time updates about the status of your orders.",
  },
  {
    title: 'What is your return/refund policy?',
    description: "Returns and refunds depend on the seller's policies. Check the product details for specific return policies or contact the seller through our platform for assistance.",
  },
];


function FaqClient() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeItem, setActiveItem] = useState(tabs[0]);

  const handleClick = async (index) => {
    setActiveIndex(activeIndex === index ? null : index);
    const newActiveItem = tabs.find((_, i) => i === index);
    setActiveItem(newActiveItem);
  };

  return (
    <>
      <div className="container mx-auto pb-10 pt-2 px-5">
        <h1 className="uppercase text-center text-4xl font-bold pt-2 pb-4">
          FAQ
        </h1>
        <div className="h-fit border border-black p-2 dark:bg-[#111111]">
          {tabs.map((tab, index) => (
            <motion.div
              key={index}
              className={`overflow-hidden ${
                index !== tabs.length - 1 ? 'border-b border-black' : ''
              }`}
              onClick={() => handleClick(index)}>
              <button
                className={`p-3 px-2 w-full cursor-pointer sm:text-base text-xs items-center transition-all font-semibold dark:text-white text-black   flex gap-2 
               `}>
                <Plus
                  className={`${
                    activeIndex === index ? 'rotate-45' : 'rotate-0 '
                  } transition-transform ease-in-out w-5 h-5  dark:text-gray-200 text-black`}
                />
                {tab.title}
              </button>
              <AnimatePresence mode="sync">
                {activeIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{
                      duration: 0.3,
                      ease: 'easeInOut',
                      delay: 0.14,
                    }}>
                    <p
                      className={`dark:text-white text-black p-3 xl:text-base sm:text-sm text-xs pt-0 w-[90%]`}>
                      {tab.description}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
}
export default FaqClient;
