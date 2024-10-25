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


function FormCrearSeccion() {

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [imgsUrl, setImgsUrl] = useState([""]);
    const { toast } = useToast()
    const router = useRouter()


    console.log('Urls imagenes en FormCrearSeccion', imgsUrl)

    const dataCursos = useQuery(api.lecciones.getCursos)
    const enviarContenido = useMutation(api.contenido.createNuevaSeccion)

    //1. se define el schema
    const formSchema = z.object({
        description: z.string(),
        nombreSeccion: z.string(),
        contenido: z.optional(z.string()),
        cursoId: z.string(),
        route: z.string()


    })
    //2.se de4ine el form pasándole el schemm3
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            nombreSeccion: "",
            route: "",

        },
    })

    async function onSubmit(data: z.infer<typeof formSchema>) {
        console.log('se ejecuta onSubmit()')
        console.log('Form data', data);
        console.log('Form errors', form.formState.errors);
        try {
            console.log('Urls imagenes en Page', imgsUrl)

            setIsSubmitting(true);
            //función para subir el contenido a la base de datos
            const contenido = await enviarContenido({

                nombreSeccion: data.nombreSeccion,
                description: data.description,
                imgUrl: imgsUrl ? imgsUrl[0] : '',
                contenido: data.contenido,
                cursoId: data.cursoId as Id<'cursos'>,
                route: data.route,

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


    if (!dataCursos) {
        return <p>Cargando data Secciones...</p>
    }

    return (
        <section className="mt-10 flex flex-col px-6">
            <h1 className="text-20 font-bold">Crear nueva sección</h1>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="mt-12 flex w-full flex-col">
                    <div className="flex flex-col gap-[30px] border-b border-black-5 pb-10">
                        <div className="flex flex-col gap-2.5">
                            <FormField
                                control={form.control}
                                name="cursoId"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-16 font-bold">Curso</FormLabel>
                                        <Select onValueChange={(id: string) => {
                                            field.onChange(id);
                                        }}
                                        >
                                            <SelectTrigger className={cn('text-16 w-full border border-black rounded-[15px] bg-white-1 text-gray-1 focus-visible:ring-offset-orange-1')}>
                                                <SelectValue placeholder="Selecciona tipo de proyecto" className="placeholder:text-gray-1 " />
                                            </SelectTrigger>
                                            <SelectContent className="text-16 font-lexend border-black bg-black-1 bg-white-1 font-semibold focus:ring-orange-1">
                                                {dataCursos!.map((curso) => (
                                                    <SelectItem key={curso._id} value={curso._id} className="normal-case focus:bg-orange-1">
                                                        {curso.nombreCurso}
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
                            name="nombreSeccion"
                            render={({ field }) => (
                                <FormItem className="flex flex-col gap-2.5">
                                    <FormLabel className="text-16 font-bold">Nombre sección</FormLabel>
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
                            name="contenido"
                            render={({ field }) => (
                                <FormItem className="flex flex-col gap-2.5">
                                    <FormLabel className="text-16 font-bold">Contenido</FormLabel>
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

export default FormCrearSeccion