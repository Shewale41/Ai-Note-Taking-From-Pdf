// import { handler } from "next/dist/build/templates/app-page";
import { mutation } from "./_generated/server";
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
                    imageUrl:args.imageUrl
                });

                return 'Inserted New User ... '
            }

            return 'User Already Exists ... '

        }
})