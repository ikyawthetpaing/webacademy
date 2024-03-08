"use client";

import { FormEvent, useState, useTransition } from "react";
import { toast } from "sonner";

import { subscribeNewsletters } from "@/lib/db/action/email-subscribers";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Icons } from "@/components/icons";

export function EmailSubscribeForm() {
  const [email, setEmail] = useState("");
  const [isPending, startTransition] = useTransition();

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    startTransition(async () => {
      try {
        const res = await subscribeNewsletters({ email });

        if (res.success) {
          toast.success(res.message);
        } else {
          toast.error(res.message);
        }
      } catch (error) {
        if (error instanceof Error) {
          toast.error(error.message);
        }
      } finally {
        setEmail("");
      }
    });
  };

  return (
    <form onSubmit={onSubmit} className="flex rounded-xl border p-1">
      <Input
        type="email"
        autoCapitalize="none"
        autoComplete="email"
        autoCorrect="off"
        placeholder="Email Address"
        className="border-none bg-transparent outline-none"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={isPending}
      />
      <Button type="submit" className="rounded-[8px]" disabled={isPending}>
        {isPending ? (
          <>
            <Icons.spinner className="mr-2 size-4 animate-spin" /> Subscribing
          </>
        ) : (
          "Subscribe"
        )}
      </Button>
    </form>
  );
}
