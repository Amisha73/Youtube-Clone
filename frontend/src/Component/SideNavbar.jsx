import React from 'react'
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import HistoryIcon from '@mui/icons-material/History';
import PlaylistPlaySharpIcon from '@mui/icons-material/PlaylistPlaySharp';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ContentCutIcon from '@mui/icons-material/ContentCut';
import RecentActorsIcon from '@mui/icons-material/RecentActors';
import crimetak from '../assestes/crimetak.jpeg'
import tseries from '../assestes/tseries.png'
import SettingsIcon from '@mui/icons-material/Settings';

const SideNavbar = ({sideNavbar}) => {

  return (
    <div className={sideNavbar ? 'no-scrollbar hidden md:flex flex-col box-border h-[92vh] overflow-y-auto fixed top-14 left-0 w-64 px-3 py-2 bg-black text-white' : 'hidden transition '}>
        <div className='flex flex-col flex-[0.16 1] border-b border-[rgba(86,85,85)] pb-[10px]'>
            <Link to={"/"} className='flex items-center gap-5 w-full px-2 py-[10px] rounded-2xl cursor-pointer hover:bg-[rgba(35,35,35)]'>
                <HomeIcon className='text-white'/>
                <div className='font-semibold text-sm'>Home</div>
            </Link>
            <div className='flex items-center gap-5 w-full px-2 py-[10px] rounded-2xl cursor-pointer hover:bg-[rgba(35,35,35)]'>
                <VideoCallIcon className='text-white'/>
                <div className='font-semibold text-sm'>Shorts</div>
            </div>
            <div className='flex items-center gap-5 w-full px-2 py-[10px] rounded-2xl cursor-pointer hover:bg-[rgba(35,35,35)]'>
                <SubscriptionsIcon className='text-white'/>
                <div className='font-semibold text-sm '>Subscriptions</div>
            </div>
        </div>

        <div className='flex flex-col border-b border-[rgba(86,85,85)] px-2 py-[10px]'>
            <div className=' flex items-center gap-5 w-full px-2 py-[10px] rounded-2xl cursor-pointer hover:bg-[rgba(35,35,35)]'>
                <div className=' font-semibold text-sm'>You</div>
                <KeyboardArrowRightIcon/>
            </div>
            <div className='flex items-center gap-5 w-full px-2 py-[10px] rounded-2xl cursor-pointer hover:bg-[rgba(35,35,35)]'>
                <RecentActorsIcon className='text-white'/>
                <div className='font-semibold text-sm '>Your Channel</div>
            </div>
            <div className='flex items-center gap-5 w-full px-2 py-[10px] rounded-2xl cursor-pointer hover:bg-[rgba(35,35,35)]'>
                <HistoryIcon className='text-white'/>
                <div className='font-semibold text-sm'>History</div>
            </div>
            <div className='flex items-center gap-5 w-full px-2 py-[10px] rounded-2xl cursor-pointer hover:bg-[rgba(35,35,35)]'>
                <PlaylistPlaySharpIcon className='text-white'/>
                <div className='font-semibold text-sm'>Playlists</div>
            </div>
            <div className='flex items-center gap-5 w-full px-2 py-[10px] rounded-2xl cursor-pointer hover:bg-[rgba(35,35,35)]'>
                <AccessTimeIcon className='text-white'/>
                <div className='font-semibold text-sm'>Watch later</div>
            </div>
            <div className='flex items-center gap-5 w-full px-2 py-[10px] rounded-2xl cursor-pointer hover:bg-[rgba(35,35,35)]'>
                <ThumbUpOffAltIcon className='text-white'/>
                <div className='font-semibold text-sm'>Liked videos</div>
            </div>
            <div className='flex items-center gap-5 w-full px-2 py-[10px] rounded-2xl cursor-pointer hover:bg-[rgba(35,35,35)]'>
                <ContentCutIcon className='text-white'/>
                <div className='font-semibold text-sm'>Your clips</div>
            </div>
        </div>


         <div className='flex flex-col border-b border-[rgba(86,85,85)] px-2 py-[10px]'>
            <div className=' flex items-center gap-5 w-full px-2 py-[10px] rounded-2xl cursor-pointer'>
                <div className=' font-semibold text-sm'>Subscriptions</div>
            </div>
            <div className='flex items-center gap-5 w-full px-2 py-[10px] rounded-2xl cursor-pointer hover:bg-[rgba(35,35,35)]'>
                <img src={crimetak} alt="crimetak" className='w-6 h-6 rounded-full' />
                <div className='font-semibold text-sm '>Crime Tak</div>
            </div>
            <div className='flex items-center gap-5 w-full px-2 py-[10px] rounded-2xl cursor-pointer hover:bg-[rgba(35,35,35)]'>
                <img src={tseries} alt="tseries" className='w-6 h-6 rounded-full' />
                <div className='font-semibold text-sm'>T series</div>
            </div>
            <div className='flex items-center gap-5 w-full px-2 py-[10px] rounded-2xl cursor-pointer hover:bg-[rgba(35,35,35)]'>
                <img src={tseries} alt="tseries" className='w-6 h-6 rounded-full' />
                <div className='font-semibold text-sm'>T series</div>
            </div>
            <div className='flex items-center gap-5 w-full px-2 py-[10px] rounded-2xl cursor-pointer hover:bg-[rgba(35,35,35)]'>
                <img src={crimetak} alt="crimetak" className='w-6 h-6 rounded-full' />
                <div className='font-semibold text-sm '>Crime Tak</div>
            </div>
        </div>

        <div className='flex flex-col px-2 py-[10px]'>
            <div className='flex items-center gap-5 w-full px-2 py-[10px] rounded-2xl cursor-pointer hover:bg-[rgba(35,35,35)]'>
                <SettingsIcon className='text-white'/>
                <div className=' font-semibold text-sm'>Settings</div>
            </div>
        </div>
    </div>
  )
}

export default SideNavbar