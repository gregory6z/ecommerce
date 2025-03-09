import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"

import Image from "next/image"
import { UserContent } from "./components/user-content"

export default async function Account() {
  const session = await auth()

  if (!session) {
    redirect("/")
  }

  return (
    <div className=" xl:px-[4rem]">
      <h1 className="text-center font-bold uppercase lg:my-[4rem] lg:text-3xl">
        Votre compte Novalvi
      </h1>
      <div className="flex lg:gap-8 ">
        <div className="h-full lg:w-[360px]">
          <UserContent session={session} />
          <div className="rounded-sm bg-zinc-100 p-4 lg:mt-10">
            <h4 className="font-bold text-xl uppercase">Carnet d'adresses</h4>
            <div className="mt-2">
              <p>gregory gregory</p>
              <p>140</p>
              <p>13400 aubagne</p>
              <p>France</p>
            </div>
          </div>
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-2xl uppercase">Vos Commandes</h3>
          <main className=" flex items-center justify-center">
            <div className="flex h-[50dvh] flex-col items-center justify-center text-center">
              <Image
                src={"/no-orders.svg"}
                alt="no-orders"
                width={200}
                height={200}
              />
              <h4 className="font-bold text-lg uppercase">Aucune commande</h4>
              <p>Vous n'avez passé aucune commande</p>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
