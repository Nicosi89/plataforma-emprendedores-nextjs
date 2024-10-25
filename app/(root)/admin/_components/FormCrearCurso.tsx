'use client'
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useMutation, useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"
import CargarImagenes from "@/components/CargarImagenes"
import { Id } from "@/convex/_generated/dataModel"
import { Loader } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"

function FormCrearCurso() {

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [imgsUrl, setImgsUrl] = useState([""]);
    const { toast } = useToast()
    const router = useRouter()


    console.log('Urls imagenes en Page', imgsUrl)


    const enviarContenido = useMutation(api.contenido.createNuevoCurso)

    //1. se define el schema
    const formSchema = z.object({
        nombreCurso: z.string().min(2, 'El contenido como mínimo debe tener 2 letras'),
        route: z.string().min(2, 'El contenido como mínimo debe tener 2 letras'),
        descripcion: z.string().min(2, 'El contenido como mínimo debe tener 2 letras'),
    })
    //2.se de4ine el form pasándole el schemm3
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            nombreCurso: "",
            route: "",
            
        },
    })

    async function onSubmit(data: z.infer<typeof formSchema>) {
        try {
            console.log('Urls imagenes en Page', imgsUrl)

            setIsSubmitting(true);
            //función para subir el contenido a la base de datos
            const contenido = await enviarContenido({

                /* videoStorageId: videoStorageId,
                videoUrl: videoUrl, */
                nombreCurso: data.nombreCurso,
                route: data.route,
                imagenUrl: imgsUrl[0],
                descripcion: data.descripcion
            })
            toast({ title: 'Contenido creado' })
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
        <section className="mt-10 flex flex-col px-6">
            <h1 className="text-20 font-bold">Crear curso nuevo</h1>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="mt-12 flex w-full flex-col">
                    <div className="flex flex-col gap-[30px] border-b border-black-5 pb-10">
                        
                        <FormField
                            control={form.control}
                            name="nombreCurso"
                            render={({ field }) => (
                                <FormItem className="flex flex-col gap-2.5">
                                    <FormLabel className="text-16 font-bold">Nombre curso</FormLabel>
                                    <FormControl>
                                        <Textarea className="input-class resize focus-visible:ring-offset-marca-pink" placeholder="Aquí el contenido..." {...field} />
                                    </FormControl>
                                    <FormMessage className="text-marca-pink" />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="route"
                            render={({ field }) => (
                                <FormItem className="flex flex-col gap-2.5">
                                    <FormLabel className="text-16 font-bold">Ruta</FormLabel>
                                    <FormControl>
                                        <Textarea className="input-class resize focus-visible:ring-offset-marca-pink" placeholder="Aquí el contenido..." {...field} />
                                    </FormControl>
                                    <FormMessage className="text-marca-pink" />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="descripcion"
                            render={({ field }) => (
                                <FormItem className="flex flex-col gap-2.5">
                                    <FormLabel className="text-16 font-bold">Descripcion</FormLabel>
                                    <FormControl>
                                        <Textarea rows={5} cols={50} className="input-class resize focus-visible:ring-offset-marca-pink" placeholder="Aquí el contenido..." {...field} />
                                    </FormControl>
                                    <FormMessage className="text-marca-pink" />
                                </FormItem>
                            )}
                        />
                        <div className="flex flex-col pt-10">
                            <CargarImagenes
                                setImgsUrl={setImgsUrl}

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
                    </div>
                </form>

            </Form>
        </section>
    )



}

export default FormCrearCurso