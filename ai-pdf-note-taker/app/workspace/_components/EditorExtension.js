import { Bold, Italic } from 'lucide-react'
import React from 'react'


function EditorExtension({editor}) {
  return editor&&(
    <div className='p-5'>
        <div className="control-group">
        <div className="button-group flex gap-3 ">
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={editor.isActive('bold') ? 'text-blue-500' : ''} //yeh text-blue-500 kaam nahi kar raha hai
          >
            <Bold/>
          </button>
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={editor.isActive('italic') ? 'text-blue-500' : ''}
          >
            <Italic/>
          </button>
          </div>
          </div>
    </div>
  )
}

export default EditorExtension