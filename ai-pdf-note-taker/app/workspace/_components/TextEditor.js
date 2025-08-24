"use client"
import React from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import { StarterKit } from '@tiptap/starter-kit'
import { Placeholder } from '@tiptap/extensions'
import Bold from '@tiptap/extension-bold'
import EditorExtension from './EditorExtension'


function TextEditor() {
    const editor = useEditor({
        extensions: [StarterKit,
        Placeholder.configure({
          placeholder:'Start taking your notes with Ai...'
        })
        ],
        editorProps:{
          attributes:{
            class:'focus:outline-none h-screen p-5'
          }
        },
        // Don't render immediately on the server to avoid SSR issues
        immediatelyRender: false,
      })

      if(!editor) return null

  return (
    <div>
            <EditorExtension editor={editor}/>
        <div>
            <EditorContent editor={editor} />
        </div>
    </div>
  )
}

export default TextEditor