"use client"

import { SearchIcon } from "lucide-react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form"

const formSchema = z.object({
  title: z.string().trim().min(1, {
    message: "Digite algo para buscar",
  }),
})

const Search = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  })
  const router = useRouter()

  const handleSubmit = (data: z.infer<typeof formSchema>) => {
    router.push(`/barbershops?title=${encodeURIComponent(data.title)}`)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="flex gap-2">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Input
                  placeholder="Busque por unidade, servico ou experiencia"
                  {...field}
                  className="h-11 w-full border-white/10 bg-white/[0.04]"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="h-11 gap-2">
          <SearchIcon size={18} />
          <span className="hidden sm:inline">Buscar</span>
        </Button>
      </form>
    </Form>
  )
}

export default Search
