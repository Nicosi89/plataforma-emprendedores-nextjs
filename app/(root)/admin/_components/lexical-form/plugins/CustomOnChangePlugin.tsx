import React, { useEffect, useState } from "react";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $generateHtmlFromNodes, $generateNodesFromDOM } from "@lexical/html";
import { $getRoot, $insertNodes } from "lexical";

interface CustomOnChangePluginProps {
    value: string;
    onChange: (value: string) => void;
}

export default function CustomOnChangePlugin({
    value,
    onChange,
}: CustomOnChangePluginProps) {
    const [editor] = useLexicalComposerContext();
    const [isFirstRender, setIsFirstRender] = useState(true);

    useEffect(() => {
        //si la data de value es vacía o no es la primra renderizada
        if (!value || !isFirstRender) return;

        setIsFirstRender(false);
        editor.update(() => {
            //genera un documento string html 
            const currentHTML = $generateHtmlFromNodes(editor);

            //si ha cambiado el contenido se inserta en el editor
            if (currentHTML !== value) {
                $getRoot().clear();
                const parser = new DOMParser();
                const dom = parser.parseFromString(value, "text/html");
                //genera nodos
                const nodes = $generateNodesFromDOM(editor, dom);
                //inserta los nodos 
                $insertNodes(nodes);
            }
        });
    }, [editor, value, isFirstRender]);

    useEffect(() => {
        setIsFirstRender(true);
    }, [value]);

    return (
        <OnChangePlugin
            onChange={(editorState) => {
                editorState.read(() => {
                    //lo pone en el estado
                    onChange($generateHtmlFromNodes(editor));
                });
            }}
        />
    );
}