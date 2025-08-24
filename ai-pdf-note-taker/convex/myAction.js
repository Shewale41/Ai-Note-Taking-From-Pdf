"use node";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { ConvexVectorStore } from "@langchain/community/vectorstores/convex";
import { action } from "./_generated/server.js";
import { api } from "./_generated/api.js";
import { TaskType } from "@google/generative-ai";
import { v } from "convex/values";


export const ingest = action({
  args: {
    splitText:v.any(),
    fileId:v.string(),
  },
  handler: async (ctx,args) => {
    await ConvexVectorStore.fromTexts(//this particular code generates embedding for the list values with the props
      args.splitText,    //Array
      args.fileId,         //String
      new GoogleGenerativeAIEmbeddings({
        apiKey:'AIzaSyCBV0Iu1PjeSzCr8tsdK5ivhYBbRjTboxw',
        model: "text-embedding-004", // 768 dimensions
        taskType: TaskType.RETRIEVAL_DOCUMENT,
        title: "Document title",
      }),
      { ctx }

    );
    return "Completed :)"
  },
});
