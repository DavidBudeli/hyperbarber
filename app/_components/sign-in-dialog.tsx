import Image from "next/image"
import { signIn } from "next-auth/react"
import { Button } from "./ui/button"
import { DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog"

const SignInDialog = () => {
  const handleLoginWithGoogleClick = () => signIn("google")

  return (
    <>
      <DialogHeader>
        <DialogTitle>Acesse o HyperBarber</DialogTitle>
        <DialogDescription>
          Entre com sua conta Google para gerenciar agenda, reservas e dados da
          sua operação.
        </DialogDescription>
      </DialogHeader>

      <Button
        variant="outline"
        className="gap-2 font-bold"
        onClick={handleLoginWithGoogleClick}
      >
        <Image
          alt="Fazer login com o Google"
          src="/google.svg"
          width={18}
          height={18}
        />
        Continuar com Google
      </Button>
    </>
  )
}

export default SignInDialog
