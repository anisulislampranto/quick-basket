import React from 'react';
import {
    Dialog,
    DialogContent,
    DialogTrigger,
  } from "@/components/ui/dialog"

export default function Modal({openButton, content}) {
  return (
    <Dialog>
        <DialogTrigger asChild>
            {openButton}
        </DialogTrigger>
        <DialogContent>
            {content}
        </DialogContent>
    </Dialog>
  )
}
