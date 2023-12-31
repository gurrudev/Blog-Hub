import React, { useState, useEffect } from 'react'
import _avatar from '../assets/img/img_avatar.png'
import { FaArrowLeft } from "react-icons/fa6";
import { Link, useNavigate } from 'react-router-dom';
import { MdDateRange } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import Cards from '../components/Cards';
import { getBlogsData } from '../../api/apiCalls'
import { useDispatch, useSelector } from 'react-redux';
import joinedDate from '../../utils/joinedDate';
import endpointForUser from '../../utils/endpointForUser';
import { BsThreeDots } from "react-icons/bs";
import { FaUserEdit } from "react-icons/fa";
import profileCoverImage from '../assets/img/profileCover.jpg'
import { RiLockPasswordFill } from "react-icons/ri";
import { IoLogOut } from "react-icons/io5";
import { logout } from '../redux/features/userSlice';
import { IoCreate } from "react-icons/io5";

function UserProfile() {

  const navigate = useNavigate()
  const [user, setUserData] = useState({})
  const [cardData, setCardData] = useState(null)

  const token = localStorage.getItem('token')
  const dispatch = useDispatch()

  // console.log(user)

  if (user === undefined || user.message === 'Invalid token') {
    navigate('/')
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

  const BlogCardData = async () => {
    const data = await getBlogsData()
    setCardData(data.blogs_data)
  }



  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };


  const handleLogout = () => {
    // Dispatch the logout action
    dispatch(logout());
    navigate("/");
  };



  useEffect(() => {
    getUserData()
    BlogCardData()
  }, [])

  return (
    <>
      <div className="bg-gray-100">
        <div className="relative">
          <img
            src={profileCoverImage}
            alt="Cover"
            className="w-full h-40 md:h-64 object-cover object-center"
          />
          <div className="absolute inset-0 bg-black opacity-40"></div>
          <div className="absolute top-0  py-6 px-6">
            <FaArrowLeft className='form-text text-2xl text-white cursor-pointer' onClick={() => navigate('/')} />

          </div>

          <div className="absolute bottom-0 left-20 lg:left-34 md:left-36 transform -translate-x-1/2 translate-y-1/3 bg-white p-1 rounded-full">
            <img
              src={user.profile_pic}
              alt=""
              className="h-24 w-24 md:h-32 md:w-32 rounded-full object-cover"
            />
          </div>
        </div>


        <div className="container mx-auto px-6 py-8 md:flex">

          {/* Left Section - User Details */}
          <div className="md:w-1/2">
            <div className="flex items-center">

              {/* User Info */}
              <div className="ml-2 lg:ml-14 md:ml-8 mt-2 lg:mt-4 md:mt-4">
                <div className='flex justify-between gap-48'>
                  <h1 className="text-3xl form-heading font-bold text-gray-800">{user.name}</h1>
                  <div className="relative inline-block text-left">
                    <div>
                      <button onClick={toggleMenu} className="flex items-center focus:outline-none">
                        <BsThreeDots className='text-2xl' />
                      </button>
                    </div>
                    {isOpen && (
                      <div className="absolute right-0 lg:left-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg">
                        <div className="py-1 form-text ">
                          <Link to={'/create-post'} className="flex items-center cursor-pointer px-4 py-2 text-gray-800 hover:bg-gray-100">
                            <IoCreate className='text-xl mr-2'/>
                            Create Post
                          </Link>
                          <span className="flex items-center cursor-pointer px-4 py-2 text-gray-800 hover:bg-gray-100">
                            <FaUserEdit className='text-xl mr-2'/>
                            Edit Profile
                          </span>
                          <span className="flex items-center cursor-pointer px-4 py-2 text-gray-800 hover:bg-gray-100">
                            <RiLockPasswordFill className='text-lg ml-[-2px] mr-3'/>
                            Change Password
                          </span>
                          <span onClick={handleLogout} className="flex items-center cursor-pointer px-4 py-2 text-gray-800 hover:bg-gray-100">
                            <IoLogOut className='text-xl mr-2'/>
                            Logout
                          </span>
                        </div>
                      </div>
                    )}
                  </div></div>
                <p className="text-lg form-text text-gray-600">{'Web Developer'}</p>
                {/* Additional user details */}

              </div>
            </div>
            {/* User bio */}
            <div className="mt-3 text-gray-700 ml-2 md:ml-8 lg:ml-14 md:mr-2 max-w-md">
              <p className="text-base form-text">
                An enthusiastic professional passionate about <span className="font-bold">technology</span> and <span className="font-bold">innovation</span>. Constantly exploring new horizons in the tech world.
              </p>
            </div>
            <div className="ml-2 lg:ml-14 md:ml-8 mt-2 lg:mt-4 md:mt-4">
              <div className="text-sm form-text text-gray-600 mt-4 flex gap-2">
                <div className='flex gap-1'>
                  <FaLocationDot className='mt-1' />
                  <p>New York, USA</p>
                </div>
                <div className='flex gap-1'>
                  <MdDateRange className='mt-1' />
                  <p>Joined {joinedDate(user.createdAt)}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Section - Skills */}
          <div className="md:w-1/2 mt-8 lg:mt-0 md:mt-8 md:mr-12 ml-2 lg:ml-0 ">
            <h2 className="text-2xl form-text font-bold mb-4">Skills</h2>
            <div className="flex flex-wrap text-md form-text gap-1">
              <span className='bg-blue-900 text-white py-1 px-3 rounded-sm '>Adv</span>
              <span className='bg-red-900 text-white py-1 px-3 rounded-sm '>Adventu</span>
              <span className='bg-green-900 text-white py-1 px-3 rounded-sm '>Adventure</span>
              <span className='bg-yellow-900 text-white py-1 px-3 rounded-sm '>A</span>
              <span className='bg-orange-900 text-white py-1 px-3 rounded-sm '>Adven</span>
              <span className='bg-purple-900 text-white py-1 px-3 rounded-sm '>Adventure</span>
              <span className='bg-emerald-900 text-white py-1 px-3 rounded-sm '>Adventure</span>
              <span className='bg-sky-900 text-white py-1 px-3 rounded-sm '>Adventure</span>
              <span className='bg-fuchsia-900 text-white py-1 px-3 rounded-sm '>Adventure</span>
            </div>
          </div>
        </div>

      </div>

      <Cards cardsData={cardData} totalCards={8} cardAction={''} />

    </>
  )
}

export default UserProfile