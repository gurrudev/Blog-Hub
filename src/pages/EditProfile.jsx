import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import endpointForUser from '../utils/endpointForUser'
import { FaUserCircle } from "react-icons/fa";
import { } from "react-icons/md";

const EditProfile = () => {

    const [user, setUserData] = useState({})
    const [profileData, setProfileData] = useState({})

    const token = localStorage.getItem('token')

    // console.log(user)

    const getProfileData = (e) => {
        setProfileData({ ...profileData, [e.target.name]: e.target.value })
    }

    const getUserData = async () => {
        try {
            const userData = await endpointForUser(token);
            setUserData(userData.user)
        } catch (error) {
            // Handle errors
            console.error(error);
        }
    };
    useEffect(() => {
        getUserData()
    }, []);
    
    return (
        <>
            <div className='p-8 pt-4 lg:p-52 lg:pt-4 md:p-20 md:pt-4'>
                <div>
                    <div className="space-y-12">
                        <div className="">
                            <div className='flex justify-between'>
                                <Link to={'/'} className="leading-7 text-3xl text-gray-900 mt-1 logo">BlogHub</Link>
                                <div className='flex justify-between gap-2'>
                                    {/* <button type='submit' onClick={'handleBlogSubmit'} className='text-white bg-black p-3 pt-0.5 pb-0.5 lg:pl-3 lg:pt-0 lg:pb-0 rounded-sm form-text'>Post</button> */}
                                    <Link to={'/profile'}><img className='rounded-full w-8' src={user.profile_pic} alt="" srcSet="" /></Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='pt-10'>

                        <div className="mb-6">
                        <label htmlFor="skills" className='form-text font-semibold'>Name</label>
                            <input type="text" id="name" name='name' className="text-gray-900 border border-gray-400 text-base form-text py-1.5 px-3 mt-1 rounded-sm  outline-none block w-full" placeholder="Ex. Jon Doe" required autoFocus />
                        </div>

                        <div className="mb-6">
                        <label htmlFor="skills" className='form-text font-semibold'>User Title</label>
                            <input type="text" id="user_title" name='user_title' className="text-gray-900 form-text border border-gray-400 text-base form-text py-1.5 px-3 mt-1 rounded-sm outline-none block w-full" placeholder="Ex. Web Developer" required autoFocus />
                        </div>

                        <div className="mb-6">
                        <label htmlFor="skills" className='form-text font-semibold'>Profile pic URL</label>
                            <div className="flex">
                                <span className="inline-flex items-center px-3 text-base mt-1 text-gray-900 bg-gray-100 border border-gray-400 rounded-s-sm ">
                                    <FaUserCircle/>
                                </span>
                                <input type="text" id="profile_pic" name='profile_pic' onChange={getProfileData} className="rounded-none mt-1 rounded-e-sm border border-gray-400 text-gray-900  block flex-1 min-w-0 w-full text-base form-text py-1.5 px-3 outline-none" placeholder="Your profile pic link here..." required />
                            </div>
                        </div>

                        <div className="mb-6">
                            <label htmlFor="skills" className='form-text font-semibold'>Skills</label>
                            <input type="text" id="skills" name='skills' className="text-gray-900 border border-gray-400 text-base form-text py-1.5 px-3 mt-1 rounded-sm outline-none block w-full" placeholder="Ex. Writing, Java," required autoFocus />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EditProfile