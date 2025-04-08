"use client"
import React from 'react'
import Sidebar from '../components/Sidebar'
import Home from '../components/Home'
import Modal from '../components/Modal'

const page = () => {

  
  return (
    <div className='flex'>
      <Sidebar/>
      <Home/>
    </div>
  )
}

export default page