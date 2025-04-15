"use client";
import React from "react";
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

interface Props {}

const DeleteButton = (props: Props) => {
  return (
    <Dialog>
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
            size={"icon"}
            className="text-gray-0 bg-gray-50 border-gray-200 hover:bg-rose-50 hover:text-rose-600"
          >
            {" "}
            Cancel
            <Trash2 className="w-4 h-4" />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteButton;
