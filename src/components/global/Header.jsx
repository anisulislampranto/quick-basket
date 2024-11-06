'use client';

import { fetchMe } from '@/lib/features/user/userSlice';
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

export default function HeaderClient() {
    const user =  useSelector((state) => state.user)
    const dispatch = useDispatch();

    console.log('userHeader', user);
    

    useEffect(() => {
        dispatch(fetchMe())
    }, [dispatch]);


    return (
        <div>HeaderClient</div>
    )
}