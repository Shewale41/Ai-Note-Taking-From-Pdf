// import { handler } from "next/dist/build/templates/app-page";
import { mutation , query } from "./_generated/server";
import { v } from "convex/values";

export const createUser=mutation({
        args:{
            email:v.string(),
            userName:v.string(),
            imageUrl:v.string()
        },
        handler:async(ctx,args)=>{
            //if user already exists
            //for this purpose were matching the current args email with db email
            // checking if it exists in the table 
            const user =await ctx.db.query('users')
            .filter((q)=>q.eq(q.field('email'),args.email)) //comparing equality 
            .collect();

            //If not then insert new user entry
              //so we will insert the current args data into the db
                //we're doing mutation here - insert type 
            if(user?.length==0){
                await ctx.db.insert('users',{
                    email:args.email,
                    userName:args.userName,
                    imageUrl:args.imageUrl,
                    upgrade:false
                });

                return 'Inserted New User ... '
            }

            return 'User Already Exists ... '

        }
})

export const userUpgradePlan=mutation({
    args:{
        userEmail:v.string(),
    },
    handler:async(ctx,args)=>{
        const result=await ctx.ad.query('users')
        .filter((q)=>q.eq(q.field('email'),args.userEmail))
        .collect();

        if(result){
            await ctx.db.patch(result[0]._id,{upgrade:true});
            return 'Success'
        }
        return 'Something went wrong 😭Error';
    }
})

export const GetUserInfo = query({
    args: {
        userEmail: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        if (!args.userEmail) {
            return;
        }
        const result = await ctx.db
            .query("users")
            .filter((q) => q.eq(q.field("email"), args.userEmail))
            .collect();

        return result[0];
    },
});