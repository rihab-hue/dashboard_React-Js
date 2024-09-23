import { useState } from 'react'
import './home.css'
import Header from './head/head'
import Sidebar from './aside/asideHeader'
import Main from "./main/main"

function Home() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }

  return (
    <div className='grid-container'>
      <Header OpenSidebar={OpenSidebar}/>
      <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
      <Main />
    </div>
  )
}

export default Home