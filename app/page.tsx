"use client"
import React from 'react'
import Sidebar from '../components/Sidebar'
import Home from '../components/Home'
import Modal from '../components/Modal'
import signin from '../components/signin'

const page = () => {

  
  return (
    <div className='flex'>
      <Sidebar/>
       <div>
        <Home/>
       </div>
       <div className='hidde w-full justify-center items-center'>

      </div>
    </div>
  )
}

export default page