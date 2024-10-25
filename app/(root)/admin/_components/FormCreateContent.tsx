import React, { useEffect, useState } from "react";
import Editor from "./lexical-form";
import { Button } from "@/components/ui/button";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Form, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { Id } from "@/convex/_generated/dataModel";
import { cn } from "@/lib/utils";
import { Loader } from "lucide-react";
import CargarImagenes from "@/components/CargarImagenes";

function FormularioCrearContenido() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [imgsUrl, setImgsUrl] = useState([""]);
    const [value, setValue] = useState("");
    const { toast } = useToast()
    const router = useRouter()


    const  createContenidoLeccion = useMutation(api.contenido.createContenidoLeccion);
    const  dataLecciones  = useQuery(api.lecciones.getLecciones)



    //1. se define el schema
    const formSchema = z.object({
        leccionId: z.string()
    })
    //2.se de4ine el form pasándole el schemm3
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            leccionId: "",


        },
    })
    /* useEffect(() => {
      setValue(data);
    }, [data]); */

    console.log('se renderiza el FormularioCrearContenido')
   
    console.log('valor del editor', value)

    const onSubmit = (data: z.infer<typeof formSchema>) => {
        console.log('valor del editor', value)
        setIsSubmitting(true);

        try {
            const contenido = createContenidoLeccion({
                contenido: value,
                leccionId: data.leccionId as Id<'lecciones'>,
                imgsUrl
            })
            toast({ title: 'Contenido creado' })
            setIsSubmitting(false);
            router.push('/admin')
        } catch (error) {
            console.log(error);
            toast({
                title: 'Error',
                variant: 'destructive',
            })
            setIsSubmitting(false);
        }

    };

if (!dataLecciones) {
        return <p>Cargando data lecciones...</p>
    } 



    return (
        <section className="mt-10 flex flex-col px-6">
            <h1 className="text-20 font-bold">Crear contenido lección</h1>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="mt-12 flex w-full flex-col">
                    <div className="flex flex-col gap-[30px] border-b border-black-5 pb-10">
                        <div className="flex flex-col gap-2.5">
                            <FormField
                                control={form.control}
                                name="leccionId"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-16 font-bold">Lección</FormLabel>
                                        <Select onValueChange={(id: string) => {
                                            field.onChange(id);
                                        }}
                                        >
                                            <SelectTrigger className={cn('text-16 w-full border border-black rounded-[15px] bg-white-1 text-gray-1 focus-visible:ring-offset-orange-1')}>
                                                <SelectValue placeholder="Selecciona tipo de proyecto" className="placeholder:text-gray-1 " />
                                            </SelectTrigger>
                                            <SelectContent className="text-16 font-lexend border-black bg-black-1 bg-white-1 font-semibold focus:ring-orange-1">
                                                {dataLecciones!.map((leccion: Leccion) => (
                                                    <SelectItem key={leccion._id} value={leccion._id} className="normal-case focus:bg-orange-1">
                                                        {leccion.nombreLeccion}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>

                                        </Select>
                                        <FormMessage className="text-marca-pink" />
                                    </FormItem>
                                )
                                }
                            />
                        </div>
                        <Editor
                            placeholder="Escribe el contenido de la lección"
                            name="crear-contenido"
                            value={value}
                            onChange={(newValue) => setValue(newValue)}
                        />
                    </div>
                    
                    <div className="mt-10 w-full">
                        <Button type="submit" className="text-16 font-lexend my-5 bg-marca-pink py-4 text-white-1 font-extrabold transition-all duration-500 hover:bg-black-1">
                            {isSubmitting ? (
                                <>
                                    Submitting
                                    <Loader size={20} className="animate-spin ml-2" />
                                </>
                            ) : (
                                'Publicar contenido'
                            )}
                        </Button>
                    </div>
                </form>
            </Form>
        </section>



    );
}

export default FormularioCrearContenido