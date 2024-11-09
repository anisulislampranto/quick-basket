import React from 'react';
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer';
import Button from './Button';


export default function DrawerWrapper({children, heading, subHeading, btnText, openButton}) {
    return (
        <Drawer>
            <DrawerTrigger>
                {
                    openButton ? openButton : <Button text={btnText} type={'button'} className={'mr-5'} />
                }
            </DrawerTrigger>
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle className='text-center'>{heading}</DrawerTitle>
                    <DrawerDescription className=' text-center'>{subHeading}</DrawerDescription>
                </DrawerHeader>
                {children}
            </DrawerContent>
        </Drawer>
    )
}
