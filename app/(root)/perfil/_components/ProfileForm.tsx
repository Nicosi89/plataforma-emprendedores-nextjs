'use client';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

//schema
const CreateFormSchema = z.object({
    nombreCompleto: z.string()
        .min(20, {
            message: "Debes introducir por lo menos 20 letras.",
        }),

    nombreProyecto: z.string({
        required_error: "Introduce el nombre de tu proyecto.",
    }),


})

type CreateFormValues = z.infer<typeof CreateFormSchema>


// This can come from your database or API.
const defaultValues: Partial<CreateFormValues> = {
    nombreCompleto: "",
}


function FormularioBienvenida() {
    const [isSubmitting, setIsSubmitting] = useState(false);

    //hooks
    const insertarInfoBasicaUser = useMutation(api.users.insertarInfoBasicaUser)
    const { toast } = useToast()
    const router = useRouter()

    const form = useForm<CreateFormValues>({
        resolver: zodResolver(CreateFormSchema),
        defaultValues,
        //mode es para determinar en qué momento se hace la validación
        mode: "onSubmit",
    })

    async function onSubmit(data: z.infer<typeof CreateFormSchema>) {
        console.log('onSubmit')
        try {
            setIsSubmitting(true);

            await insertarInfoBasicaUser({
                nombreCompleto: data.nombreCompleto,
                nombreProyecto: data.nombreCompleto,
            })

            toast({ title: 'Perfecto!!' })
            setIsSubmitting(false);
            router.push('/')
        } catch (error) {
            console.log(error);
            toast({
                title: 'Error',
                variant: 'destructive',
            })
            setIsSubmitting(false);
        }
    }


    return (
        <div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-3 min-w-10 max-w-[500px]">
                    <FormField
                        //control es para invocar useForm
                        control={form.control}
                        name="nombreCompleto"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nombre completo</FormLabel>
                                <FormControl>
                                    <Input placeholder="Escribe tu nombre completo" {...field} className="rounded-[15px]  border border-black" />
                                </FormControl>

                                <FormMessage className="text-marca-pink" />
                            </FormItem>
                        )}
                    />

                    <FormField
                        //control es para invocar useForm
                        control={form.control}
                        name="nombreProyecto"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nombre de proyecto</FormLabel>

                                <FormControl>
                                    <Input type="text" placeholder="Escribe el nombre de tu proyecto" {...field} className="rounded-[15px] border border-black" />
                                </FormControl>
                                <FormDescription className="">
                                    Tu proyecto puede ser un emprendimiento social o con ánimo de lucro, una microempresa o una pequeña fundación. En cualquier etapa, bien sea solo una idea o un proyecto establecido.
                                </FormDescription>
                                <FormMessage className="text-marca-pink" />
                            </FormItem>
                        )}
                    />

                    <div className="flex justify-center w-full">
                        <Button type="submit"
                            className="text-16 font-lexend my-5 bg-marca-pink py-4 text-white-1 font-extrabold transition-all duration-500 hover:bg-black-1">
                            {isSubmitting ? (
                                <>
                                    Cargando
                                    <Loader size={20} className="animate-spin ml-2" />
                                </>
                            ) : (
                                'Enviar'
                            )}

                        </Button>
                    </div>

                </form>
            </Form>
        </div >
    )
}

export default FormularioBienvenida
