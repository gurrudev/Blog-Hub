import { useState } from "react";
import bgImg from "../assets/img/cover.jpeg";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userLogin } from "../redux/features/userSlice";
import toast, { Toaster } from "react-hot-toast";
import Helmet from "react-helmet";

const inputCls =
    "w-full bg-white border border-slate-200 text-slate-800 placeholder-slate-400 rounded-lg px-3.5 py-3 text-sm outline-none focus:border-slate-800 focus:ring-1 focus:ring-slate-800 transition-all";
const labelCls =
    "block mb-1.5 text-xs font-semibold uppercase tracking-widest text-slate-500";

const Login = () => {
    const navigate = useNavigate();
    const [user, setUsers] = useState({});
    const dispatch = useDispatch();

    const getUsersData = (e) =>
        setUsers({ ...user, [e.target.name]: e.target.value });

    const handleSubmit = async () => {
        try {
            let data = await dispatch(userLogin(user));
            if (data.payload.massage === "login successful!") {
                toast.success("Login successful!");
                setTimeout(() => navigate("/"), 2000);
            }
            if (data.payload.message === "Invalid password")
                toast.error("Password is incorrect!");
            if (data.payload.message === "User not found")
                toast.error("Email does not exist!");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <Helmet>
                <title>Login | Blogiefy</title>
            </Helmet>
            <Toaster position="top-right" reverseOrder={false} />

            <section className="flex h-screen overflow-hidden relative">
                {/* Back to Home */}
                <Link
                    to="/"
                    className="absolute top-4 left-5 z-50 flex items-center gap-1.5 text-sm font-semibold text-white/80 hover:text-white transition-colors"
                    style={{
                        fontFamily: "Inter, sans-serif",
                        textDecoration: "none",
                    }}
                >
                    ← Home
                </Link>
                {/* Left — image panel */}
                <div className="hidden lg:block lg:w-1/2 relative">
                    <img
                        src={bgImg}
                        alt="Background"
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div
                        className="absolute inset-0"
                        style={{ background: "rgba(5,10,25,0.5)" }}
                    />
                    <div className="absolute inset-0 flex flex-col justify-end p-12">
                        <h2
                            className="text-white text-3xl font-extrabold leading-tight mb-3"
                            style={{
                                fontFamily: "Inter, sans-serif",
                                letterSpacing: "-1px",
                            }}
                        >
                            Where ideas
                            <br />
                            come alive.
                        </h2>
                        <p
                            className="text-white/55 text-sm"
                            style={{ fontFamily: "Inter, sans-serif" }}
                        >
                            Join thousands of readers and writers on Blogiefy.
                        </p>
                    </div>
                </div>

                {/* Right — form panel */}
                <div className="w-full lg:w-1/2 flex items-center justify-center bg-[#f8fafc] px-6">
                    <div className="w-full max-w-sm">
                        <div className="mb-8">
                            <span
                                className="text-2xl font-black text-slate-900 tracking-tight"
                                style={{ fontFamily: "Inter, sans-serif" }}
                            >
                                Blogiefy
                            </span>
                            <h1
                                className="text-xl font-bold text-slate-900 mt-5 mb-1"
                                style={{ fontFamily: "Inter, sans-serif" }}
                            >
                                Sign in to your account
                            </h1>
                            <p
                                className="text-sm text-slate-500"
                                style={{ fontFamily: "Inter, sans-serif" }}
                            >
                                Welcome back! Enter your credentials to
                                continue.
                            </p>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label htmlFor="email" className={labelCls}>
                                    Email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    onChange={getUsersData}
                                    className={inputCls}
                                    placeholder="name@example.com"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="password" className={labelCls}>
                                    Password
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    onChange={getUsersData}
                                    className={inputCls}
                                    placeholder="••••••••"
                                    required
                                />
                            </div>

                            <div className="flex items-center justify-between">
                                <label className="flex items-center gap-2 text-slate-500 text-sm cursor-pointer select-none">
                                    <input
                                        type="checkbox"
                                        className="rounded border-slate-300 w-4 h-4 accent-slate-800"
                                    />
                                    Remember me
                                </label>
                                <a
                                    href="#"
                                    className="text-slate-700 text-sm font-semibold hover:underline"
                                    style={{ textDecoration: "none" }}
                                >
                                    Forgot password?
                                </a>
                            </div>

                            <button
                                onClick={handleSubmit}
                                className="w-full bg-slate-900 hover:bg-slate-700 text-white font-bold text-sm py-3 rounded-lg transition-colors mt-1"
                                style={{ fontFamily: "Inter, sans-serif" }}
                            >
                                Sign In
                            </button>

                            <p
                                className="text-center text-slate-500 text-sm pt-1"
                                style={{ fontFamily: "Inter, sans-serif" }}
                            >
                                Don't have an account?{" "}
                                <Link
                                    to="/signup"
                                    className="text-slate-900 font-semibold hover:underline"
                                    style={{ textDecoration: "none" }}
                                >
                                    Sign up
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Login;
