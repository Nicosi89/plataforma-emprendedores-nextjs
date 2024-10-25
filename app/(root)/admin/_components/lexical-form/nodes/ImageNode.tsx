import {
    DecoratorNode,
    DOMConversionMap,
    DOMConversionOutput,
    DOMExportOutput,
    LexicalNode,
    NodeKey,
} from "lexical";
import Image from "next/image";

//crea el nodo para insertarlo en el Editor Lexical 
export const $createImageNode = ({
    altText,
    height,
    maxWidth = 400,
    src,
    width,
}: {
    altText: string;
    height: number;
    maxWidth?: number;
    src: string;
    width: number;
}) => {
    return new ImageNode({ altText, height, maxWidth, src, width });
};

//función para crea una imagen a partir de un elemento img HTML
const convertImageElement = (domNode: Node): DOMConversionOutput | null => {
    if (domNode instanceof HTMLImageElement) {
        const { src, alt, width, height } = domNode;
        const node = $createImageNode({ src, width, height, altText: alt });
        return { node };
    }
    return null;
};


export class ImageNode extends DecoratorNode<JSX.Element> {
    __src: string;
    __altText: string;
    __height: number;
    __width: number;
    __maxWidth: number;

    constructor({
        src,
        altText,
        maxWidth,
        width,
        height,
        key,
    }: {
        src: string;
        altText: string;
        maxWidth: number;
        width: number;
        height: number;
        key?: NodeKey;
    }) {

        super(key);
        this.__altText = altText;
        this.__width = width;
        this.__height = height;
        this.__maxWidth = maxWidth;
        this.__src = src;
    }

    static getType(): string {
        return "image";
    }

    //crea una copia usando el método estático clone
    static clone(_node: ImageNode): ImageNode {
        return new ImageNode({
            altText: _node.__altText,
            src: _node.__src,
            height: _node.__height,
            width: _node.__width,
            maxWidth: _node.__maxWidth,
            key: _node.getKey(),
        });
    }


    //crea la imagen
    decorate(): JSX.Element {

        console.log("Before Update: ", {
            width: this.__width,
            height: this.__height,
            maxWidth: this.__maxWidth
        });

        const imageElement = (
            <Image
                src={this.__src}
                alt={this.__altText}
                width={this.__width}
                height={this.__height}
                style={{
                    maxWidth: this.__maxWidth,
                    width: this.__width,   // Asegúrate de que estas propiedades existan
                    height: this.__height,
                }}
            />
        );

        console.log("After Update: ", {
            width: this.__width,
            height: this.__height,
            maxWidth: this.__maxWidth
        });

        return imageElement;
    }

    //serializacion 
    createDOM(): HTMLElement {
        const span = document.createElement("span");
        return span;
    }

    //crea un elemento HTML a partir de esta instancia
    exportDOM(): DOMExportOutput {
        const image = document.createElement("img");
        image.setAttribute("src", this.__src);
        image.setAttribute("alt", this.__altText);
        //image.setAttribute("width", this.__width);

        return { element: image };
    }

    //importa el elemento del DOM oara crear una instancia de este objecto
    static importDOM(): DOMConversionMap | null {
        return {
            img: (node: Node) => {
                return { conversion: convertImageElement, priority: 0 };
            },
        };
    }
}