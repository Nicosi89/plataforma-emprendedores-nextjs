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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { paises, tipoProyecto, sectoresProyecto, tiempoProyecto } from "@/utils/constants";
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
    edad: z.string({
        message: "Introduce tu edad.",
        invalid_type_error: "La edad que introduciste debe ser un número"
    }),
    paisResidencia: z.string({ required_error: "Selecciona un país." }),
    nombreProyecto: z.string({
        required_error: "Introduce el nombre de tu proyecto.",
    }),
    tipoProyecto: z.string({ required_error: "Escoge un tipo de proyecto." }),
    sectorProyecto: z.string({
        required_error: "Escoge un sector de tu proyecto.",
    }),
    estadoProyecto: z.string({
        required_error: "Escoge el estado de tu proyecto.",
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
    const insertarInfoAdicionalUser = useMutation(api.users.insertarInfoAdicionalUser)
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

            await insertarInfoAdicionalUser({
                nombreCompleto: data.nombreCompleto,
                edad: data.edad,
                paisResidencia: data.paisResidencia,
                nombreProyecto: data.nombreCompleto,
                tipoProyecto: data.tipoProyecto,
                sectorProyecto: data.sectorProyecto,
                tiempoProyecto: data.estadoProyecto,

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
                    className="space-y-3">
                    <FormField
                        //control es para invocar useForm
                        control={form.control}
                        name="nombreCompleto"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nombre completo</FormLabel>
                                <FormControl>
                                    <Input placeholder="Escribe tu nombre completo" {...field} className="rounded-[15px] border border-black" />
                                </FormControl>

                                <FormMessage className="text-marca-pink"/>
                            </FormItem>
                        )}
                    />
                    <FormField
                        //control es para invocar useForm
                        control={form.control}
                        name="edad"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Edad</FormLabel>
                                <FormControl>
                                    <Input type="text" placeholder="Escribe tu edad en años" {...field} className="rounded-[15px] border border-black" />
                                </FormControl>
                                <FormMessage className="text-marca-pink" />
                            </FormItem>
                        )}
                    />
                    <div className="flex flex-col gap-2.5">
                        {/* campos controlados */}
                        <FormField
                            control={form.control}
                            name="paisResidencia"
                            render={({ field, fieldState }) => (
                                <FormItem>
                                    <FormLabel>País de residencia</FormLabel>
                                    <Select
                                        onValueChange={(pais: string) => {
                                            field.onChange(pais);
                                        }}
                                        defaultValue={field.value}
                                    >
                                        <SelectTrigger className={cn('text-16 w-full border border-black rounded-[15px] bg-white-1 text-gray-1 focus-visible:ring-offset-orange-1')}>
                                            <SelectValue placeholder="Selecciona país" className="placeholder:text-gray-1 " />
                                        </SelectTrigger>
                                        <SelectContent className="text-16 font-lexend border-black bg-black-1 bg-white-1 font-semibold focus:ring-orange-1">
                                            {paises.map((pais) => (
                                                <SelectItem key={pais} value={pais} className="normal-case focus:bg-orange-1">
                                                    {pais}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>

                                    </Select>
                                    <FormMessage className="text-marca-pink"/>
                                    
                                </FormItem>
                            )
                            }
                        />

                    </div>
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
                                <FormDescription>
                                    Tu proyecto puede ser un emprendimiento social o con ánimo de lucro, una microempresa o una pequeña fundación. En cualquier etapa, bien sea solo una idea o un proyecto establecido.
                                </FormDescription>
                                <FormMessage className="text-marca-pink" />
                            </FormItem>
                        )}
                    />
                    <div className="flex flex-col gap-2.5">
                        <FormField
                            control={form.control}
                            name="tipoProyecto"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Que ofrece tu proyecto</FormLabel>
                                    <Select onValueChange={(tipo: string) => {
                                        field.onChange(tipo);
                                    }}
                                    >
                                        <SelectTrigger className={cn('text-16 w-full border border-black rounded-[15px] bg-white-1 text-gray-1 focus-visible:ring-offset-orange-1')}>
                                            <SelectValue placeholder="Selecciona tipo de proyecto" className="placeholder:text-gray-1 " />
                                        </SelectTrigger>
                                        <SelectContent className="text-16 font-lexend border-black bg-black-1 bg-white-1 font-semibold focus:ring-orange-1">
                                            {tipoProyecto!.map((tipo) => (
                                                <SelectItem key={tipo} value={tipo} className="normal-case focus:bg-orange-1">
                                                    {tipo}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>

                                    </Select>
                                    <FormMessage className="text-marca-pink"/>
                                </FormItem>
                            )
                            }
                        />

                    </div>
                    <div className="flex flex-col gap-2.5">
                        <FormField
                            control={form.control}
                            name="sectorProyecto"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>En que sector se encuentra tu proyecto</FormLabel>
                                    <Select onValueChange={(sector: string) => {
                                        field.onChange(sector);
                                    }}
                                    >
                                        <SelectTrigger className={cn('text-16 w-full border border-black rounded-[15px] bg-white-1 text-gray-1 focus-visible:ring-offset-orange-1')}>
                                            <SelectValue placeholder="Selecciona sector" className="placeholder:text-gray-1 " />
                                        </SelectTrigger>
                                        <SelectContent className="text-16 font-lexend border-black bg-black-1 bg-white-1 font-semibold focus:ring-orange-1">
                                            {sectoresProyecto!.map((sector) => (
                                                <SelectItem key={sector} value={sector} className="normal-case focus:bg-orange-1">
                                                    {sector}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>

                                    </Select>
                                    <FormMessage className="text-marca-pink"/>
                                </FormItem>
                            )
                            }
                        />

                    </div>
                    <div className="flex flex-col gap-2.5">
                        <FormField
                            control={form.control}
                            name="estadoProyecto"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Tiempo de existencia de tu proyecto</FormLabel>
                                    <Select onValueChange={(estado: string) => {
                                        field.onChange(estado);
                                    }}
                                    >
                                        <SelectTrigger className={cn('text-16 w-full border border-black rounded-[15px] bg-white-1 text-gray-1 focus-visible:ring-offset-orange-1')}>
                                            <SelectValue placeholder="Selecciona tiempo" className="placeholder:text-gray-1 " />
                                        </SelectTrigger>
                                        <SelectContent className="text-16 font-lexend border-black bg-black-1 bg-white-1 font-semibold focus:ring-orange-1">
                                            {tiempoProyecto!.map((tiempo) => (
                                                <SelectItem key={tiempo} value={tiempo} className="normal-case focus:bg-orange-1">
                                                    {tiempo}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>

                                    </Select>
                                    <FormMessage className="text-marca-pink"/>
                                </FormItem>
                            )
                            }
                        />

                    </div>
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
