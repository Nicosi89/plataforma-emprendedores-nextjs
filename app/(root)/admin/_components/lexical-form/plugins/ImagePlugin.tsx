import React, { useState } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $createImageNode } from "../nodes/ImageNode";
import { $createParagraphNode, $insertNodes } from "lexical";
import CargarImagenes from "@/components/CargarImagenes";
import { Button } from "@/components/ui/button";
import { BsFillImageFill } from "react-icons/bs";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"


export default function ImagePlugin() {
    const [url, setURL] = useState("");
    const [file, setFile] = useState<File>();

    const [editor] = useLexicalComposerContext();

    const onAddImage = () => {
        console.log('se ejecuta el onAddImage')
        console.log('este es la url en onAddImage', url)
        let src = "";
        if (url) src = url[0];
        if (file) src = URL.createObjectURL(file);

        // Valores predeterminados para ancho y alto
        const defaultWidth = 400;
        const defaultHeight = 300;


        editor.update(() => {
            //crea el nodo de Lexical
            const node = $createImageNode({
                src,
                width: defaultWidth || 400,
                height: defaultHeight || 300,
                altText: "Dummy text",

            });

            console.log('height del nodo antes', node.__height)
            console.log('height del nodo antes', node.__width)

            
            //Lo inserta en el editor
            $insertNodes([node]);
        });
        setFile(undefined);
        setURL("");
    };

    return (

        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" size="icon" type="button">
                    <BsFillImageFill />
                </Button>
            </DialogTrigger>
            <DialogContent className="bg-white-1">
                <DialogHeader>
                    <DialogTitle>Cargar imagen</DialogTitle>
                </DialogHeader>
                <CargarImagenes setImgsUrl={setURL} />
                <Button onClick={onAddImage} disabled={!url && !file} className="text-16 font-lexend my-5 bg-marca-pink py-4 text-white-1 font-extrabold transition-all duration-500 hover:bg-black-1">
                    Enviar
                </Button>

            </DialogContent>
        </Dialog>
    );
}