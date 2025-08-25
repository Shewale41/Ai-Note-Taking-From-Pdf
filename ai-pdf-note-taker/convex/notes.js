import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

//this function saves our notes in the text editor into the db
export const AddNotes=mutation({
    args:{
        fileId:v.string(),
        notes:v.any(),
        createdBy:v.string()
    },
    handler: async (ctx, args) => {
        const record = await ctx.db
            .query("notes")
            .filter((q) => q.eq(q.field('fileId'), args.fileId))
            .collect();


        if(record?.length==0){              //if data doesnt exist then add 
            await ctx.db.insert('notes',{
                fileId:args.fileId,
                notes:args.notes,
                createdBy:args.createdBy
            })
        }else{                             //else update the existing data
            await ctx.db.patch(record[0]._id,{notes:args.notes});
        }
    }
})

export const GetNotes=query({
    args:{
        fileId:v.string()
    },
    handler:async(ctx,args)=>{
        const result = await ctx.db.query('notes')
        .filter((q)=>q.eq(q.field('fileId'),args.fileId))
        .collect();

        return result[0]?.notes;
    }
});