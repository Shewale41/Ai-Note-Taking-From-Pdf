"use client";
import { api } from '@/convex/_generated/api';
import { useUser } from '@clerk/nextjs'
import { useQuery } from 'convex/react';
import Image from 'next/image';
import Link from 'next/link';
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
      {/* //also added the skeleton effect in the ternary operator */}
      <div className=" grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 mt-10 "> 
      {
  !fileList ? (
    // Loading skeleton
    [1,2,3,4,5,6,7].map((_, i) => (
      <div key={i} className="bg-slate-200 rounded-md h-[150px] animate-pulse"></div>
    ))
  ) : fileList.length > 0 ? (
    // Files present
    fileList.map((file, i) => (
      <Link key={i} href={'/workspace/'+file?.fileId}>
      <div key={i} className="flex justify-center items-center flex-col border p-5 
      cursor-pointer hover:scale-105 transition-all shadow-md rounded-md ">
        <Image src="/pdf.png" alt="file" width={70} height={70} />
        <h2 className="mt-3 text-lg font-medium">{file.fileName}</h2>
      </div>
      </Link>
      
    ))
  ) : (
    // Empty state
    <p>No files yet. Upload your first file!</p>
  )
}

      </div>
    </div>
  )
}

export default Dashboard