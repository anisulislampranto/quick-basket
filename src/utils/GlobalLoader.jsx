'use client';

import React from 'react';
import { useSelector } from 'react-redux';
import Loader from './Loader';

export default function GlobalLoader({ children }) {
  const {isLoading, user} = useSelector((state)=> state.user);

  console.log('isLoading', isLoading ? 'hello' : 'nallo');

  return isLoading && !user.email ? <Loader />  : <> {children} </>
}
