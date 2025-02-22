import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import type { Session } from "next-auth"
import { SignOutButton } from "./sign-out-button"

export async function UserContent({ session }: { session: Session }) {
  const getInitials = (name: string | null | undefined) => {
    if (!name) {
      return ""
    }
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  return (
    <div className="flex gap-4">
      <Avatar>
        <AvatarImage src={session?.user?.image || ""} alt="avatar" />
        <AvatarFallback>{getInitials(session?.user?.name)}</AvatarFallback>
      </Avatar>
      <div className="flex flex-col gap-2">
        <p className="font-bold text-lg uppercase">{session?.user?.name}</p>
        <p>{session?.user?.email}</p>
        <SignOutButton />
      </div>
    </div>
  )
}
