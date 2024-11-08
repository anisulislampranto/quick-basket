import React from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogClose,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"

export default function Modal({openButton, children}) {
  return (
    <Dialog>
        <DialogTrigger asChild>
            {openButton}
        </DialogTrigger>
        <DialogContent className="">
            {children }
        </DialogContent>
    </Dialog>
  )
}
