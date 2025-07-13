import React from 'react'
import SideNavbar from '../Component/SideNavbar'
import HomePage from '../Component/HomePage'

const Home = ({sideNavbar}) => {
  return (
    <div className='flex w-full pb-2 box-border'>
      <SideNavbar sideNavbar={sideNavbar}  />
      <HomePage sideNavbar={sideNavbar} />
    </div>
  )
}

export default Home