import React from 'react'
// import Header from '../layout/Header'
import Sidebar from './Sidebar'
import MessageBox from './MessageBox'
import './css/HomePage.css'

const HomePage = () => {
  return (
    <>

       <div className='container  mt-3 p-3  d-flex' style={{height:"600px"}}>
              {/* <h1 className='text-center'>HomePage</h1> */}

              <div className='main_msg_box_container d-flex  p-3 w-100' >
              <Sidebar/>
              <MessageBox/>

              </div>
       </div>
    </>
  )
}

export default HomePage