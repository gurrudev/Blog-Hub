import { useState } from "react";
import bgImg from "../assets/img/cover.jpeg";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../redux/features/userSlice";
import toast, { Toaster } from "react-hot-toast";
import { Helmet } from "react-helmet";

const inputCls =
    "w-full bg-white border border-slate-200 text-slate-800 placeholder-slate-400 rounded-lg px-3.5 py-3 text-sm outline-none focus:border-slate-800 focus:ring-1 focus:ring-slate-800 transition-all";
const labelCls =
    "block mb-1.5 text-xs font-semibold uppercase tracking-widest text-slate-500";

const Signup = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState({});
    const dispatch = useDispatch();

    const getUsersData = (e) =>
        setUsers({ ...users, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (users.password === users.confpassword) {
            try {
                let resp = await dispatch(addUser(users));
                if (resp?.payload?.message === "User already exists!") {
                    toast.error("User already exists!");
                } else {
                    navigate("/login");
                }
            } catch (error) {
                console.log(error);
            }
        } else {
            toast.error("Passwords do not match!");
        }
    };

    return (
        <>
            <Helmet>
                <title>Sign Up | Blogiefy</title>
            </Helmet>
            <Toaster position="top-right" reverseOrder={false} />

            <section className="flex min-h-screen overflow-hidden relative">
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
                            Share your story
                            <br />
                            with the world.
                        </h2>
                        <p
                            className="text-white/55 text-sm"
                            style={{ fontFamily: "Inter, sans-serif" }}
                        >
                            Create an account and start writing today.
                        </p>
                    </div>
                </div>

                {/* Right — form panel */}
                <div className="w-full lg:w-1/2 flex items-center justify-center bg-[#f8fafc] px-6 py-10">
                    <div className="w-full max-w-sm">
                        <div className="mb-7">
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
                                Create your account
                            </h1>
                            <p
                                className="text-sm text-slate-500"
                                style={{ fontFamily: "Inter, sans-serif" }}
                            >
                                Start your writing journey today.
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label htmlFor="name" className={labelCls}>
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    onChange={getUsersData}
                                    className={inputCls}
                                    placeholder="Jon Doe"
                                    required
                                />
                            </div>
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
                            <div>
                                <label
                                    htmlFor="confpassword"
                                    className={labelCls}
                                >
                                    Confirm Password
                                </label>
                                <input
                                    type="password"
                                    name="confpassword"
                                    id="confpassword"
                                    onChange={getUsersData}
                                    className={inputCls}
                                    placeholder="••••••••"
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-slate-900 hover:bg-slate-700 text-white font-bold text-sm py-3 rounded-lg transition-colors mt-1"
                                style={{ fontFamily: "Inter, sans-serif" }}
                            >
                                Create Account
                            </button>

                            <p
                                className="text-center text-slate-500 text-sm pt-1"
                                style={{ fontFamily: "Inter, sans-serif" }}
                            >
                                Already have an account?{" "}
                                <Link
                                    to="/login"
                                    className="text-slate-900 font-semibold hover:underline"
                                    style={{ textDecoration: "none" }}
                                >
                                    Sign in
                                </Link>
                            </p>
                        </form>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Signup;
