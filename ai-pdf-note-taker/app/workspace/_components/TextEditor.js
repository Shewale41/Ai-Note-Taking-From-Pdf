"use client"
import React, { useEffect } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import { StarterKit } from '@tiptap/starter-kit'
import { Placeholder } from '@tiptap/extensions'
import Bold from '@tiptap/extension-bold'
import EditorExtension from './EditorExtension'
import { useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'


function TextEditor({ fileId }) {
  // 1. Fetch notes
  const notes = useQuery(api.notes.GetNotes, { fileId });

  // 2. Initialize editor
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "Start taking your notes with Ai...",
      }),
    ],
    editorProps: {
      attributes: {
        class: "focus:outline-none h-screen p-5",
      },
    },
    immediatelyRender: false,
  });

  // 3. Sync notes to editor
  useEffect(() => {
    if (editor && notes) {
      editor.commands.setContent(notes);
    }
  }, [editor, notes]);

  // 4. Render conditionally inside return
  return (
    <div>
      {editor ? (
        <>
          <EditorExtension editor={editor} />
          <div className="overflow-scroll h-[88vh]">
            <EditorContent editor={editor} />
          </div>
        </>
      ) : (
        <p>Loading editor...</p>
      )}
    </div>
  );
}

export default TextEditor;
