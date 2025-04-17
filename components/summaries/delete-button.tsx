"use client";
import React, { useState, useTransition } from "react";
import { Button } from "../ui/button";
import { Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { deleteSummaryAction } from "@/actions/summary-actions";
import { toast } from "sonner"
interface Props {
  summaryId:string
}

const DeleteButton = ({summaryId}: Props) => {
  const [open, setOpen] = useState(false);
  const [isPending,startTransition] = useTransition()
  
  const handleDelete = async () => {
    startTransition(async ()=>{ // to improve user expirence when deleting

    const result = await deleteSummaryAction({summaryId:summaryId});
    if(!result.success){
      toast("Error",{
        description:"Failed to delete summary",
      })
    }

       
    setOpen(false);
  })
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant={"ghost"}
          size={"icon"}
          className="text-gray-400 bg-gray-50 border-gray-200 hover:bg-rose-50 hover:text-rose-600"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Summary</DialogTitle>
          <DialogDescription>
            Are you you want to deleted this summary? This action cannot be
            undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant={"ghost"}
            onClick={() => {
              setOpen(false);
            }}
            className=" bg-gray-50 border-gray-200 hover:bg-gray-100 hover:text-gray-600"
          >
            {" "}
            Cancel
          </Button>
          <Button
            variant={"destructive"}
            onClick={handleDelete}
            className=" bg-gray-900  hover:bg-gray-600 "
          >
            {" "}
            {isPending ? "Deleting...":"Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteButton;
