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
import { Loader } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import { Id } from "@/convex/_generated/dataModel"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"


function FormCrearLeccion() {

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [imgsUrl, setImgsUrl] = useState([""]);
    const { toast } = useToast()
    const router = useRouter()


    console.log('Urls imagenes en Page', imgsUrl)

    const dataSecciones = useQuery(api.lecciones.getSecciones)
    const enviarContenido = useMutation(api.contenido.createNuevaLeccion)

    //1. se define el schema
    const formSchema = z.object({
        description: z.string(),
        nombreLeccion: z.string(),
        route: z.string(),
        seccionId: z.string(),
        numLeccion: z.string()


    })
    //2.se de4ine el form pasándole el schemm3
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            nombreLeccion: "",
            route: "",

        },
    })

    async function onSubmit(data: z.infer<typeof formSchema>) {
        try {
            console.log('Urls imagenes en Page', imgsUrl)

            setIsSubmitting(true);
            //función para subir el contenido a la base de datos
            const contenido = await enviarContenido({

                nombreLeccion: data.nombreLeccion,
                description: data.description,
                imgUrl: imgsUrl[0],
                seccionId: data.seccionId as Id<'secciones'>,
                route: data.route,
                numLeccion: Number(data.numLeccion)

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


    if (!dataSecciones) {
        return <p>Cargando data Secciones...</p>
    }

    return (
        <div>
            <section className="mt-10 flex flex-col px-6">
                <h1 className="text-20 font-bold">Crear nueva Lección</h1>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="mt-12 flex w-full flex-col">
                        <div className="flex flex-col gap-[30px] border-b border-black-5 pb-10">
                            <div className="flex flex-col gap-2.5">
                                <FormField
                                    control={form.control}
                                    name="seccionId"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-16 font-bold">Sección a la que pertenece</FormLabel>
                                            <Select onValueChange={(id: string) => {
                                                field.onChange(id);
                                            }}
                                            >
                                                <SelectTrigger className={cn('text-16 w-full border border-black rounded-[15px] bg-white-1 text-gray-1 focus-visible:ring-offset-orange-1')}>
                                                    <SelectValue className="placeholder:text-gray-1 " />
                                                </SelectTrigger>
                                                <SelectContent className="text-16 font-lexend border-black bg-black-1 bg-white-1 font-semibold focus:ring-orange-1">
                                                    {dataSecciones!.map((seccion) => (
                                                        <SelectItem key={seccion._id} value={seccion._id} className="normal-case focus:bg-orange-1">
                                                            {seccion.nombreSeccion}
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
                            <FormField
                                control={form.control}
                                name="nombreLeccion"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col gap-2.5">
                                        <FormLabel className="text-16 font-bold">Nombre seccion</FormLabel>
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
                                name="description"
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
                            <FormField
                                control={form.control}
                                name="numLeccion"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col gap-2.5">
                                        <FormLabel className="text-16 font-bold">Número de lección</FormLabel>
                                        <FormControl>
                                            <Input type='number' className="input-class resize focus-visible:ring-offset-marca-pink" placeholder="Aquí el contenido..." {...field} />
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
            
        </div>
    )



}

export default FormCrearLeccion