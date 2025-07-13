import React from 'react'
import SideNavbar from '../Component/SideNavbar'
import moanathumbnail from "../assestes/moana-thumbnail.jpeg"
import ArrowRightIcon from '@mui/icons-material/ArrowRight'
import { Link } from 'react-router-dom'

const Profile = ({sideNavbar}) => {
  return (
    <div className='flex w-full pt-5 pb-5 px-5 bg-black text-white'>
        <SideNavbar sideNavbar={sideNavbar} />

        <div className={sideNavbar ? 'flex flex-col overflow-x-hidden flex-1 text-white mt-14 ml-64 justify-center items-center ': 'flex flex-col overflow-x-hidden flex-1 text-white mt-14 justify-center items-center '} >
          <div className='w-full '>
              <img src={moanathumbnail} alt="moana" className='w-full h-32 mb-4 '/>
            </div>
          {/* user channel upper section */}
          <div className='w-full flex '>
            <div className='w-[15%]'>
              <img src={moanathumbnail} alt="profileimage" className={sideNavbar ? 'w-full h-[175px] rounded-full' : 'w-full h-[200px] rounded-full'} />
            </div>

            <div className='flex flex-col gap-2 py-2 px-4 w-[85%]'>
              <div className='text-[33px] font-semibold'>ChunnyMovies</div>
              <div className='text-base text-[rgba(153,153,153)]'>@user  . 4 videos</div>
              <div className='text-base text-[rgba(153,153,153)]'>About Section of channel</div>
              <div className="bg-white text-black w-fit py-4 px-4 rounded-3xl flex justify-center items-center h-9 font-semibold cursor-pointer text-sm hover:bg-gray-200">
                Subscribe
              </div>
            </div>
          </div>

          {/* user channel video section */}
          <div className='w-full mt-8'>
            <div className='text-xl text-gray-100 pb-2 font-medium flex items-center border-b border-[rgba(153,153,153)]'>Videos &nbsp; <ArrowRightIcon/></div>

            <div className='flex gap-6 h-screen flex-wrap mt-5'>
              {/* div for a video1 */}
            <Link to={"/watch/123"} className='w-52 cursor-pointer '>
              <div className='w-full'>
                <img src={moanathumbnail} alt="moanathumbnail" className='w-full h-full' />
              </div>

              <div className='flex flex-col w-full'>
                <div className='text-base text-gray-100 font-medium'>Video Title</div>
                <div className='text-base text-[rgba(153,153,153)]'>Video Description</div>
                <div className='text-xs text-gray-400'>Created at 2 days ago</div>
              </div>
            </Link>
            {/* div for a video2 */}
            <Link to={"/watch/123"} className='w-52 cursor-pointer'>
              <div className='w-full'>
                <img src={moanathumbnail} alt="moanathumbnail" className='w-full h-full' />
              </div>

              <div className='flex flex-col w-full'>
                <div className='text-base text-gray-100 font-medium'>Video Title</div>
                <div className='text-base text-[rgba(153,153,153)]'>Video Description</div>
                <div className='text-xs text-gray-400'>Created at 2 days ago</div>
              </div>
            </Link>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Profile