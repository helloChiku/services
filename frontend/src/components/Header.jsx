import React from 'react'
import { getUserProfile } from '../api/auth'
import toast from 'react-hot-toast';
import ProfileModel from '../model/Profile'
import {logOutUser} from '../utils/auth'
function Header() {
    const [showProfile, setShowProfile] = React.useState(false);
    const [userProfile, setUserProfile] = React.useState({})


    const getCurrentUserProfile = async () => {
        try {
            const response = await getUserProfile()
            console.log(response, "helo===========>")
            if (response.data) {
                setUserProfile(response?.data)
            } else {
                throw new Error('Unable to get user profile')
            }


        } catch (err) {
            toast.error(err.message || 'user profile  failed to fetch !');
        }
    };

    React.useEffect(() => {

        getCurrentUserProfile()
    }, [])
    return (
        <header className="flex justify-between items-center px-6 py-4 bg-white shadow-md">
            <ProfileModel show={showProfile} onClose={setShowProfile} user={userProfile}></ProfileModel>
            <div className="text-2xl font-bold text-blue-700">🗓️ MyAppoint</div>


            <div className="relative group">
                <button className="flex items-center gap-2 text-blue-800 font-medium focus:outline-none">
                    {/* <span className="hidden sm:inline">Profile</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg> */}
                     <img
                src={userProfile?.profile}
                alt="Profile"
                className="w-10 h-10 rounded-full mx-auto mb-4 border-4 border-blue-200"
              />
                </button>


                <div className="absolute right-0 top-0 mt-2 w-32 bg-white rounded-lg shadow-lg opacity-0 group-hover:opacity-100 group-hover:translate-y-1 transition-all duration-200 pointer-events-none group-hover:pointer-events-auto z-50">
                    <ul className="text-sm text-gray-700">
                        <li>
                            <button className="w-full text-left px-4 py-2 hover:bg-blue-50 cursor-pointer" onClick={() => setShowProfile(true)}>View</button>
                        </li>
                        <li>
                            <button className="w-full text-left px-4 py-2 hover:bg-blue-50 cursor-pointer" onClick={logOutUser}>Logout</button>
                        </li>
                    </ul>
                </div>
            </div>
        </header>
    )
}

export default Header