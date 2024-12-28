import { redirect } from "next/navigation";
import { SignOutButton } from "./sign-out-button";
import { auth } from "@/lib/auth";

export default async function Account() {
  const session = await auth();

  if (!session) {
    redirect("/");
  }

  return (
    <div>
      <h1>{session?.user?.name}</h1>
      <h1>Account Page</h1>
      <SignOutButton />
    </div>
  );
}
