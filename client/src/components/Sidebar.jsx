import { assets } from '../assets/assets'
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import MenuItems from './MenuItems';
import { CirclePlus, LogOut, MoonIcon, SunIcon } from 'lucide-react';
import { UserButton, useClerk } from "@clerk/clerk-react";
import { useDispatch } from 'react-redux';
import { setTheme } from '../features/theme/themeSlice';

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {

    const navigate = useNavigate();
    const user = useSelector((state) => state.user.value);
    const { signOut } = useClerk();
    const dispatch = useDispatch();
    const theme = useSelector((state) => state.theme.value);

    const toggleTheme = () => {
        const next = theme === 'dark' ? 'light' : 'dark';
        dispatch(setTheme(next));
    }




    return (
        <div className={`w-60 xl:w-72 bg-white border-r border-gray-200 flex flex-col jusbtify-between items-center max-sm:absolute top-0 bottom-0 z-20 ${sidebarOpen ? 'translate-x-0' : 'max-sm:-translate-x-full'} transition-all duration-300 ease-in-out `}>
            <div className='w-full'>
                <div>

                    <img onClick={() => navigate('/')} src={assets.logo} className='w-26 ml-7 my-2 cursor-pointer' alt="" />

                </div>
                <hr className='border-gray-300 mb-8' />

                <MenuItems setSidebarOpen={setSidebarOpen} />

                <Link to='/create-post' className='flex items-center justify-center gap-2 py-2.5 mt-6 mx-6 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-700 hover:to-purple-800 active:scale-95 text-white transition cursor-pointer'>
                    <CirclePlus className='w-5 h-5' />
                    Create Post
                </Link>
            </div>

            <div className='w-full border-t border-gray-200 p-4 px-7 flex items-center justify-between mt-auto'>
                <div className='flex flex-col gap-2 cursor-pointer'>
                    <div className='flex gap-2 items-center'>
                        <UserButton />
                        <div>
                            <h1 className='text-sm font-medium'>{user.full_name}</h1>
                            <p className='text-xs text-gray-500'>@{user.username}</p>
                        </div>
                    </div>
                    <button onClick={toggleTheme} className='flex items-center gap-2 px-3 py-1 rounded-full border border-gray-200 hover:shadow-sm transition bg-white'>
                        {theme === 'dark' ? <SunIcon className='w-4 h-4 text-yellow-400' /> : <MoonIcon className='w-4 h-4 text-gray-600' />}
                        <span className='text-xs text-gray-600'>{theme === 'dark' ? 'Light' : 'Dark'}</span>
                    </button>
                </div>
                <LogOut onClick={signOut} className='w-4.5 text-gray-400 hover:text-gray-700 transition cursor-pointer' />

            </div>
        </div>
    )
}

export default Sidebar
