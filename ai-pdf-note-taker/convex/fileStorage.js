
import { mutation, query } from "./_generated/server";
import { v } from "convex/values"

export const generateUploadUrl = mutation({
  handler: async (ctx) => {
    return await ctx.storage.generateUploadUrl();
  },
});

//args->accept the schema as arguments
//handlers->insert the data into schema
export const AddFileEntryToDb = mutation({
    args:{
        fileId:v.string(),
        storageId:v.string(),
        fileName:v.string(),
        fileUrl:v.string(),
        createdBy:v.string()
    },

    handler:async(ctx,args)=>{
        const result=await ctx.db.insert('pdfFiles',{
            fileId:args.fileId,
            storageId:args.storageId,
            fileName:args.fileName,
            fileUrl:args.fileUrl,
            createdBy:args.createdBy
        })
        return 'Inserted'
    }
})

export const getFileUrl=mutation({
    args:{
        storageId:v.string()
    },
    handler:async(ctx,args)=>{
        const url=await ctx.storage.getUrl(args.storageId);
        return url;
    }
})

//getting the fileUrl for the pdf viewer , writing a query to the convex db to fetch that fileUrl
export const GetFileRecord=query({
    args:{
        fileId:v.string()
    },
    handler:async(ctx,args)=>{
       const result = await ctx.db.query('pdfFiles').
        filter((q)=>q.eq(q.field('fileId'),args.fileId))
        .collect();
        console.log(result);
        return result[0];
    }
})