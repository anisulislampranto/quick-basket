'use client';

import { fetchMe } from '@/lib/features/user/userSlice';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

export default function HeaderClient() {
    const { user } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    useEffect(() => {
        if (user.length === 0) {
            dispatch(fetchMe());
        }
    }, [dispatch, user]);

    return (
        <div>HeaderClient</div>
    );
}
