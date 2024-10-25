import { LineBreakNode } from 'lexical';
import { useEffect, useState } from 'react';

import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import { InitialConfigType, LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { TRANSFORMERS } from '@lexical/markdown';
import { AutoLinkNode, LinkNode } from '@lexical/link';
import { ListNode, ListItemNode } from '@lexical/list';
import { HeadingNode, QuoteNode } from '@lexical/rich-text';
import { CodeNode, CodeHighlightNode } from '@lexical/code';
import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin';
import { MarkdownShortcutPlugin } from '@lexical/react/LexicalMarkdownShortcutPlugin';
import ToolbarPlugin from './plugins/ToolbarPlugin';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import CustomOnChangePlugin from './plugins/CustomOnChangePlugin';
import { ImageNode } from './nodes/ImageNode';




interface EditorProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    name: string;
}

const Editor = ({ value, onChange, placeholder, name }: EditorProps) => {
    const config: InitialConfigType = {
        namespace: name,
        theme: {
            text: {
                underline: "underline",
                bold: 'bold',
                code: 'text-black p-2 bg-[#eee]',
            },
            heading: {
                h1: 'text-4xl font-bold', // Ajusta el tamaño y estilo para h1
                h2: 'text-3xl font-bold', // Ajusta el tamaño y estilo para h2
                h3: 'text-2xl font-semibold', // Ajusta el tamaño y estilo para h3
                h4: 'text-xl font-semibold', // Ajusta el tamaño y estilo para h4
                h5: 'text-lg font-semibold', // Ajusta el tamaño y estilo para h5
                h6: 'text-base font-semibold', // Ajusta el tamaño y estilo para h6
            },
            list: {
                ul: 'list-disc',
                ol: 'list-decimal'

            }

        },

        nodes: [
            HeadingNode,
            ListNode,
            LineBreakNode,
            ListItemNode,
            QuoteNode,
            CodeNode,
            CodeHighlightNode,
            AutoLinkNode,
            LinkNode,
            ImageNode
        ],

        onError: (error) => {
            console.error(error);
        },
    };

    /* function onChange(editorState) {
       // Call toJSON on the EditorState object, which produces a serialization safe string
    const editorStateJSON = editorState.toJSON();
    // However, we still have a JavaScript object, so we need to convert it to an actual string with JSON.stringify
    setEditorState(JSON.stringify(editorStateJSON));
    } */

    return (
        <div>
            <LexicalComposer initialConfig={config}>
                <div
                    className={`mx-auto relative prose dark:prose-invert flex flex-col mt-10 border shadow rounded-lg`}
                >
                    <ToolbarPlugin />

                    <div className="relative">
                        <RichTextPlugin
                            contentEditable={
                                <ContentEditable className="focus:outline-none w-full px-8 py-4 h-[500px] overflow-auto relative" />
                            }
                            placeholder={
                                <p className="text-muted-foreground absolute top-0 px-8 py-4 w-full pointer-events-none">
                                    {placeholder}
                                </p>
                            }
                            ErrorBoundary={LexicalErrorBoundary}
                        />
                        <HistoryPlugin />
                    </div>
                    {/* <AutoFocusPlugin /> */}

                    <LinkPlugin />

                    <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
                    <CustomOnChangePlugin value={value} onChange={onChange} />
                </div>
                <AutoFocusPlugin />
            </LexicalComposer>
        </div>
    );
};


export default Editor;
