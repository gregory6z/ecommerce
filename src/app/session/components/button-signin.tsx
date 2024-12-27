"use client";
import { signIn } from "next-auth/react";

import { GoogleIcon } from "@/assets/social-icons";
import { Button } from "@/components/ui/button";

export function ButtonSignin() {
  return (
    <Button
      onClick={() => signIn("google")}
      variant={"outline"}
      className="mt-2 flex w-full "
    >
      <div className="flex w-48 items-center gap-4">
        <GoogleIcon className="shrink-0" />

        <span>Entrar com Google</span>
      </div>
    </Button>
  );
}
