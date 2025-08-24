import { NextResponse } from "next/server";
import { WebPDFLoader } from "@langchain/community/document_loaders/web/pdf";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";


const pdfUrl="https://neighborly-stoat-164.convex.cloud/api/storage/a8f5951f-ee3e-499c-927b-900f5947a404";
export async function GET(req){
    
    //step 1.Load the PDF file
    const response=await fetch(pdfUrl);
    const data=await response.blob();
    const loader=new WebPDFLoader(data); //this is from langchain 
    const docs=await loader.load();

    //taking only the page content form json 
    let pdfTextContent='';
    docs.forEach(doc=>{
        pdfTextContent=pdfTextContent+doc.pageContent;
    })

    //step 2.Split the text into small Chunks
     //we're using lanchain 
    const splitter = new RecursiveCharacterTextSplitter({
        chunkSize: 100,
        chunkOverlap: 20,
      }); 
    const output = await splitter.createDocuments([pdfTextContent]);
    
    //storing the output data (splitted data) in a list 
    const splitterList=[];
    output.forEach(doc=>{
        splitterList.push(doc.pageContent);//as in json pageContent contains the paragraph lines
    })
  

    return NextResponse.json({result:splitterList});

}