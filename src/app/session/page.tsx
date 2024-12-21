import {
  AppleIcon,
  FacebookIcon,
  GoogleIcon,
  MicrosoftIcon,
} from "@/assets/social-icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Session() {
  return (
    <div className="flex max-h-screen flex-col justify-center px-12">
      <div className="mx-auto my-10 flex aspect-square w-36 items-center justify-center bg-zinc-900 text-white">
        <p>LOGO</p>
      </div>
      <h1 className="font-bold text-2xl">OUVRIR UNE SESSION</h1>
      <p className="mt-2 text-pretty text-sm text-zinc-500">
        Pour voir vos commandes et leurs suivis, votre liste de souhaits, et
        dicas de produtos.
      </p>

      <div className="mt-4">
        <Label>Adresse mail</Label>
        <Input placeholder="JohnDoe@email.com" className="mt-1" />
        <Button className="mt-2 w-full">Entrar com email</Button>
      </div>
      <p className="py-4 text-center">ou</p>
      <div>
        <Button variant={"outline"} className="mt-2 flex w-full ">
          <div className="flex w-48 items-center gap-4">
            <GoogleIcon className="shrink-0" />

            <span>Entrar com Google</span>
          </div>
        </Button>
        <Button variant={"outline"} className="mt-2 w-full">
          <div className="flex w-48 items-center gap-4">
            <FacebookIcon className="shrink-0" />
            <span>Entrar com Facebook</span>
          </div>
        </Button>
        <Button variant={"outline"} className="mt-2 w-full">
          <div className="flex w-48 items-center gap-4">
            <AppleIcon className="shrink-0" />
            <span>Entrar com Apple</span>
          </div>
        </Button>

        <Button variant={"outline"} className="mt-2 w-full">
          <div className="flex w-48 items-center gap-4">
            <MicrosoftIcon />
            <span>Entrar com Microsoft</span>
          </div>
        </Button>
      </div>
    </div>
  );
}
