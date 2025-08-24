import React from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import { StarterKit } from '@tiptap/starter-kit'

function TextEditor() {
    const editor = useEditor({
        extensions: [StarterKit],
        content: '<p>Hello World! 🌎️</p>',
        // Don't render immediately on the server to avoid SSR issues
        immediatelyRender: false,
      })
  return (
    <div>
        <div>
            <EditorContent editor={editor} />
        </div>
    </div>
  )
}

export default TextEditor