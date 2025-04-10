"use client"
import React from 'react'
import Sidebar from '../components/Sidebar'
import Home from '../components/Home'
import Modal from '../components/Modal'
import Login from '../components/Login'

const page = () => {

  
  return (
    <div className='flex'>
      <Sidebar/>
       <div>
        <Home/>
       </div>
       <div className='hidde w-full justify-center items-center'>
      <Login/>
      </div>
    </div>
  )
}

export default page