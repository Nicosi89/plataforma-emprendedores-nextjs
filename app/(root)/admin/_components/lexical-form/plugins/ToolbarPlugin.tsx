// src/components/editor/plugins/toolbar-plugin.tsx

import { useCallback, useEffect, useState } from "react";
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { Toggle } from "@/components/ui/toggle";
import { $getSelection, $isRangeSelection, $isRootOrShadowRoot, CAN_REDO_COMMAND, CAN_UNDO_COMMAND, COMMAND_PRIORITY_CRITICAL, FORMAT_ELEMENT_COMMAND, FORMAT_TEXT_COMMAND, REDO_COMMAND, SELECTION_CHANGE_COMMAND, UNDO_COMMAND } from "lexical";
import { MdFormatUnderlined } from "react-icons/md";
import { RxFontBold } from "react-icons/rx";
import { RxFontItalic } from "react-icons/rx";
import { $findMatchingParent, $getNearestNodeOfType, mergeRegister } from '@lexical/utils';
import { Button } from "@/components/ui/button";
import { IoReloadOutline } from "react-icons/io5";
import { LuSeparatorHorizontal } from "react-icons/lu";
import BlockTypeDropdown from "./components/block-type-dropdown";
import { blockTypeToBlockName } from "./components/block-types";
import { $isListNode, ListNode } from "@lexical/list";
import { $isHeadingNode } from "@lexical/rich-text";
import { FaCode } from "react-icons/fa6";
import { MdFormatAlignLeft } from "react-icons/md";
import { MdFormatAlignRight } from "react-icons/md";
import { MdFormatAlignCenter } from "react-icons/md";
import { MdOutlineFormatAlignJustify } from "react-icons/md";
import ImagePlugin from "./ImagePlugin";



// src/components/editor/plugins/toolbar-plugin.tsx
export default function ToolbarPlugin() {
  const [editor] = useLexicalComposerContext();
  const [isBold, setIsBold] = useState<boolean>(false);
  const [isItalic, setIsItalic] = useState<boolean>(false);
  const [isUnderline, setIsUnderline] = useState<boolean>(false);
  const [isCode, setIsCode] = useState<boolean>(false);
  const [canUndo, setCanUndo] = useState<boolean>(false);
  const [canRedo, setCanRedo] = useState<boolean>(false);
  const [blockType, setBlockType] =
    useState<keyof typeof blockTypeToBlockName>("paragraph");



  //actualizar toolbar
  const $updateToolbar = useCallback(() => {
    const selection = $getSelection();
    //revisa el texto seleccionado tiene alguno de los formatos
    if ($isRangeSelection(selection)) {
      setIsBold(selection.hasFormat("bold"));
      setIsItalic(selection.hasFormat("italic"));
      setIsUnderline(selection.hasFormat("underline"));
      setIsCode(selection.hasFormat("code"));


      const anchorNode = selection.anchor.getNode();

      //busca el LexicalNode del padre
      let element =
        anchorNode.getKey() === "root"
          ? anchorNode
          : $findMatchingParent(anchorNode, (e) => {
            const parent = e.getParent();
            return parent !== null && $isRootOrShadowRoot(parent);
          });

      if (element === null) {
        element = anchorNode.getTopLevelElementOrThrow();
      }

      const elementDOM = editor.getElementByKey(element.getKey());

      if (elementDOM !== null) {
        //si es una lista
        if ($isListNode(element)) {
          const parentList = $getNearestNodeOfType<ListNode>(
            anchorNode,
            ListNode
          );
          const type = parentList
            ? parentList.getListType()
            : element.getListType();
          setBlockType(type);
          console.log('este es el tipo', type)
        } else {
          //sino crea un headingnpm
          const type = $isHeadingNode(element)
            ? element.getTag()
            : element.getType();
          if (type in blockTypeToBlockName) {
            setBlockType(type as keyof typeof blockTypeToBlockName);
            console.log('este es el tipo heading', type)
          }
        }
      }
    }
  }, [editor]);


  //cambios de los ocmandos
  useEffect(() => {
    return mergeRegister(
      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        () => {
          $updateToolbar();
          return false;
        },
        COMMAND_PRIORITY_CRITICAL
      ),
      //registra el cambio de estado
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          $updateToolbar();
        });
      })
    );
  }, [editor, $updateToolbar]);

  //rehacer y deshacar 
  useEffect(() => {
    return mergeRegister(
      editor.registerCommand(
        CAN_UNDO_COMMAND,
        //se puede o no deshacer
        (payload) => {
          setCanUndo(payload);
          return false;
        },
        COMMAND_PRIORITY_CRITICAL
      ),
      editor.registerCommand(
        CAN_REDO_COMMAND,
        //se puede o no rehacer

        (payload) => {
          setCanRedo(payload);
          return false;
        },
        COMMAND_PRIORITY_CRITICAL
      )
    );
  }, [editor]);

  return (
    <div className="w-full p-1 border-b z-10">
      <div className="flex space-x-2 justify-center">
        <Button
          className="h-8 px-2"
          variant={"ghost"}
          disabled={!canUndo}
          onClick={() => editor.dispatchCommand(UNDO_COMMAND, undefined)}
        >
          {/* reload flip to left */}
          <IoReloadOutline className="transform -scale-x-100" />
        </Button>

        <Button
          className="h-8 px-2"
          variant={"ghost"}
          disabled={!canRedo}
          onClick={() => editor.dispatchCommand(REDO_COMMAND, undefined)}
        >
          <IoReloadOutline />
        </Button>

        <LuSeparatorHorizontal orientation="vertical" className="h-auto my-1" />
        <Toggle
          className={`${isBold ? 'bg-marca-pink text-white-1' : ''} `}
          area-label="Bold"
          size="sm"
          pressed={isBold}
          onPressedChange={(pressed) => {
            editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold");
            setIsBold(pressed);
          }}
        >
          <RxFontBold />
        </Toggle>

        <Toggle
          className={`${isItalic ? 'bg-marca-pink text-white-1' : ''} `}
          area-label="Italic"
          size="sm"
          pressed={isItalic}
          onPressedChange={(pressed) => {
            editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic");
            setIsItalic(pressed);
          }}
        >
          <RxFontItalic />
        </Toggle>
        <Toggle
          className={`${isCode ? 'bg-marca-pink text-white-1' : ''} `}
          area-label="code"
          size="sm"
          pressed={isCode}
          onPressedChange={(pressed) => {
            editor.dispatchCommand(FORMAT_TEXT_COMMAND, "code");
            setIsCode(pressed);
          }}
        >
          <FaCode />
        </Toggle>

        <Toggle
          className={`${isUnderline ? 'bg-marca-pink text-white-1' : ''} `}
          area-label="Underline"
          size="sm"
          pressed={isUnderline}
          onPressedChange={(pressed) => {
            editor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline");
            setIsUnderline(pressed);
          }}
        >
          <MdFormatUnderlined />
        </Toggle>
        <Toggle
          area-label="left-align"
          size="sm"
          //pressed={isLeftAlign}
          onPressedChange={(pressed) => {
            editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "left");
            setIsUnderline(pressed);
          }}
        >
          <MdFormatAlignLeft />
        </Toggle>
        <Toggle
          area-label="right"
          size="sm"
          //pressed={isRightAlign}
          onPressedChange={(pressed) => {
            editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "right");
            setIsUnderline(pressed);
          }}
        >
          <MdFormatAlignRight />
        </Toggle>
        <Toggle
          area-label="center"
          size="sm"
          //pressed={isCenterAlign}
          onPressedChange={(pressed) => {
            editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "center");
            setIsUnderline(pressed);
          }}
        >
          <MdFormatAlignCenter />
        </Toggle>
        <Toggle

          area-label="justify"
          size="sm"
          //pressed={isJustify}
          onPressedChange={(pressed) => {
            editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "justify");
            setIsUnderline(pressed);
          }}
        >
          <MdOutlineFormatAlignJustify />
        </Toggle>
        <ImagePlugin />

        <BlockTypeDropdown blockType={blockType} />
      </div>
    </div>
  );
}

