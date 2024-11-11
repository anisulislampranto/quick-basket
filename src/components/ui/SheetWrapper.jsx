import React from 'react'
import { Sheet, SheetContent, SheetTrigger } from './sheet'

export default function SheetWrapper({children, heading, subHeading, openButton}) {
    return (
        <Sheet>
            <SheetTrigger>
                {openButton}
            </SheetTrigger>
            <SheetContent className={'overflow-scroll'} >
                {children}
            </SheetContent>
        </Sheet>
    )
}
