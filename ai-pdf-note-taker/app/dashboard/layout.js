import React from 'react'
import SideBar from './_components/SideBar'
import Header from './_components/Header'

function DashboardLayout({children}) {
  return (
    <div>
        <div className=' md:w-64 h-screen fixed ' >
            <SideBar/>
        </div>
        <div className='md:ml-64 '>
            <Header/>
            {/* //this children is page component which can be rendered here  */}
            <div className='p-10'>
            {children}
            </div>   
        </div>
    </div>
  )
}

export default DashboardLayout