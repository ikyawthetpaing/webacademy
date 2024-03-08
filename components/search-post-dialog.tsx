"use client";

import { useState } from "react";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { SearchPostForm } from "@/components/form/search-post-form";
import { Icons } from "@/components/icons";

interface Props {
  actionUrl?: string;
}

export function SearchPostDialog({ actionUrl }: Props) {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button>
          <Icons.search className="size-7" />
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <SearchPostForm
          className="h-10 max-w-full"
          actionUrl={actionUrl}
          autoFocus
          onSubmit={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
