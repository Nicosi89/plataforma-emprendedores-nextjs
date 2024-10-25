import { useEffect, useRef, useState } from "react";
import { useMutation } from "convex/react";
import { useToast } from "@/components/ui/use-toast"
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { api } from "@/convex/_generated/api";

function CargarImagenes({ setImgsUrl, cantImgPermitidas = 1 }: CargarImagenesProps) {
    const [isImageLoading, setIsImageLoading] = useState(false);
    const [imagenesEscogidas, setImagenesEscogidas] = useState<File[]>([]);

    //hooks
    //1. se general la url de la api para cargar la imagen en el store
    const generateUploadUrl = useMutation(api.files.generateUploadUrl);
    const getImageUrl = useMutation(api.contenido.getUrl);
    const { toast } = useToast()
    //const { startUpload } = useUploadFiles(generateUploadUrl)
    const imageInput = useRef<HTMLInputElement>(null);

    console.log("Imagenes escogidas", imagenesEscogidas);

    useEffect(() => {
        if (imagenesEscogidas.length > 0) {
            handleSendImage();  // Ahora handleSendImage se ejecuta solo después de que se actualicen las imágenes
        }
    }, [imagenesEscogidas]);

    //funcion para tratar las imagenes
    async function handleSendImage() {
        console.log("Se ejecuta función handleSendImage");

        // Step 1: Get a short-lived upload URL
        const postUrl = await generateUploadUrl();
        console.log("Generated post URL:", postUrl);

        setIsImageLoading(true)

        try {
            const tempUrls: string[] = [];
            await Promise.all(imagenesEscogidas.map(async (image) => {
                try {
                    console.log("Uploading image:", image);

                    const result = await fetch(postUrl, {
                        method: "POST",
                        headers: { "Content-Type": image.type },
                        body: image,
                    });

                    console.log("Fetch result:", result);

                    if (!result.ok) {
                        throw new Error(`Upload failed: ${result.statusText}`);
                    }

                    const json = await result.json();
                    const { storageId } = json;

                    console.log("Storage ID:", storageId);

                    // Step 3: Save the newly allocated storage id to the database
                    const urlImagen = await getImageUrl({ storageId });
                    console.log("Generated image URL:", urlImagen);

                    // Acumular las URLs y los IDs en los arrays temporales
                    /* if (urlImagen) {
                        setUrlTem((prev) => [...prev, urlImagen]);
                    }*/
                    if (urlImagen) {
                        tempUrls.push(urlImagen);  // Almacena la URL en el array temporal
                    }



                    /* newImgsUrl.push(urlImagen!);
                    newStorageIds.push(storageId); */
                    //console.log("Array temp Urls", newImgsUrl);
                } catch (error) {
                    console.error("Error during image upload:", error);  // Log error inside the map
                    throw error;  // Propagate error to outer catch
                }
            }));
            setImgsUrl(tempUrls)
            setImagenesEscogidas([])
            setIsImageLoading(false)
        } catch (error) {
            setIsImageLoading(false)
            console.error("Error in image upload process:", error);  // Global error catch
            toast({
                title: 'No pudimos procesar la imagen',
                variant: 'destructive',
            });
        }


    }

    if (isImageLoading) {
        return <p>Subiendo imagen...</p>
    }

    return (
        <div>
            <form className="space-y-2">
                {cantImgPermitidas > 1 ?
                    <>
                        <Label className="font-normal">Añadir imágenes acompañantes (máximo {cantImgPermitidas})</Label>
                        <div className="flex flex-col">
                            <Input
                                id="image"
                                type="file"
                                accept="image/*"
                                ref={imageInput}
                                onChange={(event) => {
                                    setImagenesEscogidas(Array.from(event.target.files || []))

                                }}
                                multiple
                                className="cursor-pointer w-fit bg-zinc-100 text-zinc-700 border-zinc-300 hover:bg-zinc-200 hover:border-zinc-400 focus:border-zinc-400 focus:bg-zinc-200"
                                disabled={imagenesEscogidas.length !== 0}
                            />

                        </div>
                    </>
                    :
                    <>
                        <Label className="font-normal">Añadir imágen acompañante (máximo {cantImgPermitidas})</Label>
                        <div className="flex flex-col">
                            <Input
                                id="image"
                                type="file"
                                accept="image/*"
                                ref={imageInput}
                                onChange={(event) => {
                                    setImagenesEscogidas(Array.from(event.target.files || []))

                                }}
                                className="cursor-pointer w-fit bg-zinc-100 text-zinc-700 border-zinc-300 hover:bg-zinc-200 hover:border-zinc-400 focus:border-zinc-400 focus:bg-zinc-200"
                                disabled={imagenesEscogidas.length !== 0}
                            />

                        </div>
                    </>
                }
            </form>
        </div>
    )
}

export default CargarImagenes
