import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import endpointForUser from "../utils/endpointForUser";
import { FaUserCircle, FaArrowLeft } from "react-icons/fa";
import ReactQuill from "react-quill";
import { useDispatch } from "react-redux";
import { userUpdate } from "../redux/features/userSlice";
import { Toaster, toast } from "react-hot-toast";
import { Helmet } from "react-helmet";

const inputCls =
    "w-full bg-white border border-slate-200 text-slate-800 placeholder-slate-400 rounded-lg px-3.5 py-2.5 text-sm outline-none focus:border-slate-700 focus:ring-1 focus:ring-slate-700 transition-all mt-1.5";
const labelCls =
    "block text-xs font-semibold uppercase tracking-widest text-slate-500";

const EditProfile = () => {
    const [user, setUserData] = useState({});
    const [profileData, setProfileData] = useState({});
    const [editorValue, setEditorValue] = useState(null);
    const [skills, setSkills] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const token = sessionStorage.getItem("token");

    const editorModules = {
        toolbar: [["bold", "italic", "link"]],
    };

    const getProfileData = (e) =>
        setProfileData({ ...profileData, [e.target.name]: e.target.value });

    const data = {
        name: profileData.name,
        user_title: profileData.user_title,
        profile_pic: profileData.profile_pic,
        skills: skills.trim().split(", "),
        location: profileData.location,
        bio: editorValue,
    };

    const updateUserData = async () => {
        try {
            const response = await dispatch(userUpdate({ id: user._id, data }));
            if (response.meta.requestStatus === "fulfilled") {
                toast.success("Profile updated!");
                setTimeout(() => navigate("/profile"), 1800);
            } else {
                toast.error("Something went wrong.");
            }
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        if (!token) {
            navigate("/");
            return;
        }
        const fetch = async () => {
            try {
                const userData = await endpointForUser(token);
                setUserData(userData.user);
            } catch (error) {
                console.error(error);
            }
        };
        fetch();
    }, []);

    const editorRef = useRef(null);
    useEffect(() => {
        if (editorRef.current) {
            const quillEditor =
                editorRef.current.getElementsByClassName("ql-editor")[0];
            if (quillEditor) quillEditor.style.minHeight = "120px";
        }
    }, [setEditorValue]);

    return (
        <>
            <Helmet>
                <title>Edit Profile | Blogiefy</title>
            </Helmet>
            <Toaster position="top-center" />

            {/* Top bar */}
            <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 h-14 bg-white border-b border-slate-200">
                <button
                    onClick={() => navigate("/profile")}
                    className="flex items-center gap-1.5 text-slate-500 hover:text-slate-900 text-sm font-medium transition-colors"
                    style={{ fontFamily: "Inter, sans-serif" }}
                >
                    <FaArrowLeft size={11} /> Back to Profile
                </button>
                <Link
                    to="/"
                    className="text-xl font-black text-slate-900 tracking-tight"
                    style={{ fontFamily: "Inter, sans-serif" }}
                >
                    Blogiefy
                </Link>
                <div className="flex items-center gap-3">
                    <button
                        type="button"
                        onClick={() => navigate("/profile")}
                        className="text-sm font-semibold text-slate-600 hover:text-slate-900 px-4 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 transition"
                        style={{ fontFamily: "Inter, sans-serif" }}
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        onClick={updateUserData}
                        className="bg-slate-900 hover:bg-slate-700 text-white text-sm font-bold px-5 py-1.5 rounded-lg transition-colors"
                        style={{ fontFamily: "Inter, sans-serif" }}
                    >
                        Save Changes
                    </button>
                </div>
            </header>

            {/* Main */}
            <main className="pt-14 min-h-screen bg-[#f8fafc]">
                <div className="max-w-2xl mx-auto px-6 py-10">
                    {/* Page title */}
                    <div className="mb-8">
                        <h1
                            className="text-2xl font-extrabold text-slate-900"
                            style={{
                                fontFamily: "Inter, sans-serif",
                                letterSpacing: "-0.5px",
                            }}
                        >
                            Edit Profile
                        </h1>
                        <p
                            className="text-sm text-slate-500 mt-1"
                            style={{ fontFamily: "Inter, sans-serif" }}
                        >
                            Update your public profile information.
                        </p>
                    </div>

                    <div className="space-y-5">
                        {/* Profile Picture */}
                        <div className="bg-white rounded-xl border border-slate-200 p-6">
                            <h2
                                className="text-sm font-bold text-slate-800 mb-4"
                                style={{ fontFamily: "Inter, sans-serif" }}
                            >
                                Profile Picture
                            </h2>
                            <div className="flex items-center gap-4 mb-3">
                                {user.profile_pic ? (
                                    <img
                                        src={
                                            profileData.profile_pic ||
                                            user.profile_pic
                                        }
                                        alt="Preview"
                                        className="w-16 h-16 rounded-full object-cover border-2 border-slate-200"
                                    />
                                ) : (
                                    <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center border-2 border-slate-200">
                                        <FaUserCircle className="text-slate-300 text-3xl" />
                                    </div>
                                )}
                                <div className="flex-1">
                                    <label className={labelCls}>
                                        Profile Picture URL
                                    </label>
                                    <div className="flex mt-1.5">
                                        <span className="inline-flex items-center px-3 bg-slate-50 border border-r-0 border-slate-200 rounded-l-lg text-slate-400 text-sm">
                                            <FaUserCircle size={14} />
                                        </span>
                                        <input
                                            type="text"
                                            id="profile_pic"
                                            name="profile_pic"
                                            onChange={getProfileData}
                                            className="flex-1 bg-white border border-slate-200 rounded-r-lg px-3.5 py-2.5 text-sm text-slate-800 placeholder-slate-400 outline-none focus:border-slate-700 transition-all"
                                            placeholder="https://your-photo-url.com/photo.jpg"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Basic Info */}
                        <div className="bg-white rounded-xl border border-slate-200 p-6">
                            <h2
                                className="text-sm font-bold text-slate-800 mb-4"
                                style={{ fontFamily: "Inter, sans-serif" }}
                            >
                                Basic Info
                            </h2>
                            <div className="space-y-4">
                                <div>
                                    <label htmlFor="name" className={labelCls}>
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        onChange={getProfileData}
                                        className={inputCls}
                                        placeholder="e.g. John Doe"
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="user_title"
                                        className={labelCls}
                                    >
                                        Title / Headline
                                    </label>
                                    <input
                                        type="text"
                                        id="user_title"
                                        name="user_title"
                                        onChange={getProfileData}
                                        className={inputCls}
                                        placeholder="e.g. Full Stack Developer & Writer"
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="location"
                                        className={labelCls}
                                    >
                                        Location
                                    </label>
                                    <input
                                        type="text"
                                        id="location"
                                        name="location"
                                        onChange={getProfileData}
                                        className={inputCls}
                                        placeholder="e.g. Mumbai, India"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Skills */}
                        <div className="bg-white rounded-xl border border-slate-200 p-6">
                            <h2
                                className="text-sm font-bold text-slate-800 mb-1"
                                style={{ fontFamily: "Inter, sans-serif" }}
                            >
                                Skills
                            </h2>
                            <p
                                className="text-xs text-slate-400 mb-3"
                                style={{ fontFamily: "Inter, sans-serif" }}
                            >
                                Comma-separated list of skills, e.g. Writing,
                                React, Design
                            </p>
                            <label className={labelCls}>Skills</label>
                            <input
                                type="text"
                                id="skills"
                                name="skills"
                                value={skills}
                                onChange={(e) => setSkills(e.target.value)}
                                className={inputCls}
                                placeholder="Writing, JavaScript, Design, ..."
                            />
                        </div>

                        {/* Bio */}
                        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                            <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between">
                                <h2
                                    className="text-sm font-bold text-slate-800"
                                    style={{ fontFamily: "Inter, sans-serif" }}
                                >
                                    About / Bio
                                </h2>
                                <span
                                    className="text-xs text-slate-400"
                                    style={{ fontFamily: "Inter, sans-serif" }}
                                >
                                    Supports bold, italic, links
                                </span>
                            </div>
                            <div ref={editorRef} style={{ minHeight: "160px" }}>
                                <ReactQuill
                                    theme="snow"
                                    value={editorValue}
                                    onChange={setEditorValue}
                                    modules={editorModules}
                                    className="edit-quill"
                                />
                            </div>
                        </div>

                        {/* Save bottom */}
                        <div className="flex justify-end gap-3 pt-2">
                            <button
                                type="button"
                                onClick={() => navigate("/profile")}
                                className="text-sm font-semibold text-slate-600 px-5 py-2.5 rounded-lg border border-slate-200 hover:bg-slate-50 transition"
                                style={{ fontFamily: "Inter, sans-serif" }}
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                onClick={updateUserData}
                                className="bg-slate-900 hover:bg-slate-700 text-white text-sm font-bold px-8 py-2.5 rounded-lg transition-colors"
                                style={{ fontFamily: "Inter, sans-serif" }}
                            >
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
};

export default EditProfile;
