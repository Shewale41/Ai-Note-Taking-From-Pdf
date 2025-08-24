import React from 'react'

function PdfViewer({fileUrl}) {
    console.log(fileUrl);
  return (
    <div>
        {/* //with this toolbar property we can remove the toolbar section from pdf viewer
        //we can add that later maybe if we want lets see later */}
        <iframe src={fileUrl+"#toolbar=0"} height="90vh" width="100%" className='h-[90vh]'/>
    </div>
  )
}

export default PdfViewer