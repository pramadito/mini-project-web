"use client";

import { FC } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Label } from "./ui/label";
import { useFormikContext } from "formik";
import TipTapMenuBar from "./TipTapMenuBar";

interface TipTapRichtextEditorProps {
  label: string;
  name: string;
}

const TipTapRichtextEditor: FC<TipTapRichtextEditorProps> = ({
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
      if (editor?.isEmpty) setFieldError(name, `${label} isrequired`);
    },
  });

  return (
    <div>
      <Label>{label}</Label>
      <TipTapMenuBar editor={editor} />
      <EditorContent editor={editor} />
      {editor?.isEmpty && touched[name] && (
        <p className="text-xs text-red-500">{label} is required</p>
      )}
    </div>
  );
};

export default TipTapRichtextEditor;
