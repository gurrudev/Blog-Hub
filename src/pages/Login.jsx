import React from 'react'
import bgImg from '../assets/img/cover.jpeg'
import { Link, useNavigate } from 'react-router-dom'


const Login = () => {

    const navigate = useNavigate()
    return (
        <>

            <section className="bg-gray-50 relative overflow-hidden h-screen">
                {/* <!-- New div for the background image --> */}
                <div className="absolute inset-0 z-0">
                    <img src={bgImg} alt="Background" className="object-cover w-full h-[100vh] filter blur-sm" />
                    <div className="bg-black opacity-40 absolute inset-0"></div>
                </div>

                {/* <!-- Your existing content --> */}
                <div className="relative z-10 flex flex-col items-center justify-center px-6 py-8 mx-auto h-full lg:mt-0 md:mt-0 sm:mt-0">
                    
                    <div className="w-full bg-white rounded-sm shadow dark:border md:mt-0 sm:max-w-md xl:p-0 ">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight form-heading tracking-tight text-gray-900 md:text-2xl ">
                                Sign in to your account
                                
                            </h1>
                            <form className="form-text space-y-4 md:space-y-6" action="#">
                                <div className=''>
                                    <label for="email" className="block mb-2 text-sm font-medium text-gray-900 ">Your email</label>
                                    <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-sm focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="name@company.com" required="" />
                                </div>
                                <div className=''>
                                    <label for="password" className="block mb-2 text-sm font-medium text-gray-900 ">Password</label>
                                    <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-sm focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " required="" />
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-start">
                                        <div className="flex items-center h-5">
                                            <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 " required="" />
                                        </div>
                                        <div className="ml-3 text-sm">
                                            <label for="remember" className="text-gray-500 ">Remember me</label>
                                        </div>
                                    </div>
                                    <a href="#" className="text-sm font-medium text-primary-600 hover:underline ">Forgot password?</a>
                                </div>
                                <button type="submit" className="w-full text-white bg-[black] hover:bg-[#36363b] focus:outline-none  font-medium rounded-sm text-lg px-5 py-2.5 text-center " onClick={()=>navigate('/')}>Sign in</button>
                                <p className="text-sm font-light text-gray-500 ">
                                    Don’t have an account yet? <Link to={'/signup'}> <span className="font-medium text-primary-600 hover:underline ">Sign up</span></Link>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

        </>
    )
}

export default Login