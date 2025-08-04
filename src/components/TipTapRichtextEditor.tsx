// components/TiptapRichtextEditor.tsx
"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useFormikContext } from "formik";
import { FC } from "react";

import { Label } from "./ui/label";
import TipTapMenuBar from "./TipTapMenuBar";

interface TiptapRichtextEditorProps {
  label: string;
  name: string;
}

const TiptapRichtextEditor: FC<TiptapRichtextEditorProps> = ({
  label,
  name,
}) => {
  const { setFieldValue, setFieldTouched, setFieldError, touched, values } =
    useFormikContext<any>();

  const editor = useEditor({
    extensions: [StarterKit],
    content: values[name],
    editorProps: {
      attributes: {
        class:
          "prose dark:prose-invert border rounded-md p-3 min-h-[156px] max-w-none",
      },
    },
    onUpdate: ({ editor }) => {
      setFieldValue(name, editor.getHTML());
    },
    onFocus: () => {
      setFieldTouched(name, true);
    },
    onBlur: () => {
      if (editor?.isEmpty) setFieldError(name, `${label} is required`);
    },
    immediatelyRender: false,
  });

  return (
    <div>
      <Label>{label}</Label>
      <TipTapMenuBar editor={editor} />
      <EditorContent editor={editor} />
      {editor?.isEmpty && touched[name] && (
        <p className="text-red-500">Content is required</p>
      )}
    </div>
  );
};

export default TiptapRichtextEditor;