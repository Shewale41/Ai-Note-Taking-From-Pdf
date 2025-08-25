"use client";
import { api } from '@/convex/_generated/api';
import { useUser } from '@clerk/nextjs'
import { useQuery } from 'convex/react';
import Image from 'next/image';
import React from 'react'
// import { redirect } from "next/navigation";


function Dashboard() {

  const { user } = useUser();
    // if (!user) {
    //     redirect("/sign-in");
    // }
    const fileList = useQuery(api.fileStorage.GetUserFiles, {
        userEmail: user?.primaryEmailAddress?.emailAddress,
    }); 

  console.log(fileList);

  return (
    <div>
      <h2 className='font-medium text-2xl'>WorkSpace</h2>
      {/* //acc to devices the grid will chnaged (mobile first apprch) */}
      <div className=" grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 mt-10 "> 
        {
          fileList&&fileList?.map((file,index)=>(
            <div key={index} className='flex justify-center items-center flex-col
            border p-5 shadow-md rounded-md cursor-pointer hover:scale-105 transition-all '>
              <Image src={'/pdf.png'} alt="file" width={70} height={70}/>
              <h2 className='mt-3 text-lg font-medium '>{file?.fileName}</h2>
              {/* <h2>{file?.createdBy}</h2> */}
            </div>  
          ))
        }
      </div>
    </div>
  )
}

export default Dashboard