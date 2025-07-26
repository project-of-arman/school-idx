
"use client";

import 'react-quill/dist/quill.snow.css';
import { useCallback, useRef } from 'react';
import type Quill from 'quill';

interface RichTextEditorProps {
    value: string;
    onChange: (value: string) => void;
}

const modules = {
  toolbar: [
    [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
    [{size: []}],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{'list': 'ordered'}, {'list': 'bullet'}, 
     {'indent': '-1'}, {'indent': '+1'}],
    ['link', 'image', 'video'],
    ['clean']
  ],
  clipboard: {
    matchVisual: false,
  }
}

// This is a workaround for the findDOMNode error in React 18 Strict Mode.
// We are dynamically importing Quill and creating the editor manually.
export default function RichTextEditor({ value, onChange }: RichTextEditorProps) {
  const quillRef = useRef<Quill | null>(null);

  const wrapperCallback = useCallback((wrapper: HTMLDivElement | null) => {
    if (typeof window === 'undefined') {
        return;
    }
    
    if (wrapper === null) return;
    if (quillRef.current) return;

    // Dynamically import Quill only on the client-side
    import('quill').then((Quill) => {
        const editor = new Quill.default(wrapper, {
            theme: 'snow',
            modules: modules,
        });

        quillRef.current = editor;

        // Set initial value
        if (value) {
            editor.clipboard.dangerouslyPasteHTML(value);
        }
        
        // Listen for changes
        editor.on('text-change', () => {
            onChange(editor.root.innerHTML);
        });
    });
  }, [onChange, value]);

  return (
    <div ref={wrapperCallback} className="bg-white"></div>
  );
}
