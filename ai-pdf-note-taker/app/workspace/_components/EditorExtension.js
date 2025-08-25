import { chatSession } from '@/configs/AiModel';
import { api } from '@/convex/_generated/api';
import { useUser } from '@clerk/nextjs';
import { useAction, useMutation } from 'convex/react';
import { Bold, Italic, Sparkles } from 'lucide-react'
import { useParams } from 'next/navigation';
import React from 'react'
import { toast } from "sonner"


function EditorExtension({editor}) {

    const {fileId}=useParams();
    const searchAI=useAction(api.myAction.search);
    const saveNotes=useMutation(api.notes.AddNotes);
    const {user}=useUser();

    //very important function - on click it will get the selected text from the doc
    const onAiClick=async()=>{
      toast("Ai is Working on your answer..")
        const selectedText=editor.state.doc.textBetween(
            editor.state.selection.from,
            editor.state.selection.to,
            ' '
        );
        console.log("Selected Text",selectedText);
        
        const result=await searchAI({
            query:selectedText,
            fileId:fileId
        })
        //for debugging only 
        console.log("fileId in params:", fileId);
        
        const UnFormattedAns=JSON.parse(result);
        let AllUnformattedAns='';
        UnFormattedAns&&UnFormattedAns.forEach(item=>{
          AllUnformattedAns=AllUnformattedAns+item.pageContent
        });

        const PROMPT="For question"+selectedText+"and with given content as answer ,"+
        "please give appropraite answer in HTML format. The answer content is :"+AllUnformattedAns;
        
        const AiModelResult= await chatSession.sendMessage(PROMPT);
        console.log(AiModelResult.response.text());
        const FinalAns=AiModelResult.response.text().replace('```','').replace('html','').replace('```','');

        //getting the existing text in the text editor and adding our response below import PropTypes from 'prop-types'
        //keeping the existing text and just adding this instead of overriding the text
        const AllText=editor.getHTML();
        editor.commands.setContent(AllText+'<p><strong>Answer:</strong>'+FinalAns+'</p>');

        //here is to save our notes in the db 'yey!'
        saveNotes({
          notes:editor.getHTML(),
          fileId:fileId,
          createdBy:user?.primaryEmailAddress?.emailAddress
        })
        
    }

  return editor&&(
    <div className='p-5'>
        <div className="control-group">
        <div className="button-group flex gap-3 ">
            {/* bold button */}
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={editor.isActive('bold') ? 'text-blue-500' : ''} //yeh text-blue-500 kaam nahi kar raha hai
          >
            <Bold/>
          </button>
          {/* italic button */}
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={editor.isActive('italic') ? 'text-blue-500' : ''}
          >
            <Italic/>
          </button>
          {/* ai button  */}
          <button
            onClick={() =>onAiClick() }
            className={'hover:text-blue-500'}
          >
            <Sparkles/>
          </button>
          </div>
          </div>
    </div>
  )
}

export default EditorExtension