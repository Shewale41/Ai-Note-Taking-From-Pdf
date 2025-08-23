import React from 'react'
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Input } from '@/components/ui/input'

function UploadPdfDialog({children}) {
  return (
    <Dialog>
  <DialogTrigger asChild >
    {children}
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Upload PDF file</DialogTitle>
      <DialogDescription asChild>
        <div>
            <h2 className="mt-5">Select a file to Upload</h2>
            <div className='gap-2 p-3 rounded-md  border '> 
            {/* //should only accept pdfs only  */}
                <input type='file' accept='application/pdf' />
            </div>
            <div className='mt-2'>
                <label>File Name *</label>
                <Input placeholder="File Name" />
            </div>
        </div>
      </DialogDescription>
    </DialogHeader>
    {/* //our close button here  */}
    <DialogFooter className="sm:justify-end">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
          <Button>Upload</Button>
        </DialogFooter>
  </DialogContent>
</Dialog>
  )
}

export default UploadPdfDialog