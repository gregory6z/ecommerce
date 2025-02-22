"use client"
import { LogOut } from "lucide-react"
import { signOut } from "next-auth/react"

export function SignOutButton() {
  return (
    <div
      className="mt-2 flex cursor-pointer items-center gap-3"
      onClick={() => signOut()}
    >
      <p className="font-semibold underline">Déconnecter</p>
      <LogOut className="h-4 w-4" />
    </div>
  )
}
