"use client"
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { UserButton, useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import Image from "next/image";
import { useEffect } from "react";

export default function Home() {

  const {user}=useUser();
  const createUser=useMutation(api.user.createUser);


  //useEffect will call CheckUser only if user exists
  useEffect(()=>{
    user&&CheckUser();
  },[user]);

  const CheckUser=async()=>{
    const result = await createUser({
      email:user?.primaryEmailAddress?.emailAddress,
      imageUrl:user?.imageUrl,
      userName:user?.fullName
    });

    console.log(result);
  }

  return (
    <>
    <div>
    helloji Namaste
    <br></br>
    <Button>Subscribe</Button>
    <br></br>
    <UserButton/>
    </div>
    </>
   
  );
}
