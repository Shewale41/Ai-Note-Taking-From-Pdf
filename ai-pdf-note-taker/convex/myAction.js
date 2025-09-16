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
    await ConvexVectorStore.fromTexts(
      args.splitText,
      args.fileId,
      new GoogleGenerativeAIEmbeddings({
        apiKey: 'AIzaSyCBV0Iu1PjeSzCr8tsdK5ivhYBbRjTboxw',
        model: "text-embedding-004",
        taskType: TaskType.RETRIEVAL_DOCUMENT,
        title: "Document title",
      }),
      { ctx }
    );
    const docs = await ctx.db.query('documents').collect();
    console.log('Stored documents:', docs);

    return "Completed :)"
  },
});

//this is to send the selectedText from doc to search in the vector db
export const search = action({
  args: {
    query: v.string(),
    fileId: v.string(),
  },
  handler: async (ctx, args) => {
    const vectorStore = new ConvexVectorStore(
      new GoogleGenerativeAIEmbeddings({
        apiKey: 'AIzaSyCBV0Iu1PjeSzCr8tsdK5ivhYBbRjTboxw',
        model: "text-embedding-004",
        taskType: TaskType.RETRIEVAL_DOCUMENT,
        title: "Document title",
      }),
      { ctx }
    );

    // Get top 10 relevant chunks
    const rawResults = await vectorStore.similaritySearch(args.query, 10);
    console.log("Raw similarity results:", rawResults);

    // Fix: metadata might just be fileId string, or an object with fileId property
    const filteredResults = rawResults.filter((q) => {
      if (typeof q.metadata === "string") {
        return q.metadata === args.fileId;
      }
      if (q.metadata && typeof q.metadata === "object" && q.metadata.fileId) {
        return q.metadata.fileId === args.fileId;
      }
      return false;
    });

    console.log("Filtered results:", filteredResults);

    // Combine all pageContent/text fields for AI context
    const combinedText = filteredResults
      .map(r => r.pageContent || r.text)
      .filter(Boolean)
      .join("\n---\n");

    return JSON.stringify({
      results: filteredResults,
      combinedText
    });
  },
});
