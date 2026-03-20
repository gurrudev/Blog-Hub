import { useState, useEffect } from "react";
import { FaArrowLeft, FaLocationDot } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { MdDateRange } from "react-icons/md";
import Cards from "../components/Cards";
import { getBlogsData } from "../../api/apiCalls";
import { useDispatch } from "react-redux";
import joinedDate from "../utils/joinedDate";
import endpointForUser from "../utils/endpointForUser";
import { FaUserEdit, FaPencilAlt } from "react-icons/fa";
import { IoLogOut, IoCreate } from "react-icons/io5";
import { RiLockPasswordFill } from "react-icons/ri";
import profileCoverImage from "../assets/img/profileCover.jpg";
import { logout } from "../redux/features/userSlice";
import RandomColor from "../utils/RandomColor";
import UserProfileSkeleton from "../components/Skeleton/UserProfileSkeleton";
import { Helmet } from "react-helmet";
import { deleteBlog } from "../redux/features/blogSlice";

function UserProfile() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUserData] = useState({});
    const [cardData, setCardData] = useState([]);
    const [fetchBlog, setFetchBlog] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const token = sessionStorage.getItem("token");
    const dispatch = useDispatch();

    const userBlogs = cardData.filter((data) => data.user === user?._id);

    if (user === undefined || user.message === "Invalid token") navigate("/");

    const getUserData = async () => {
        if (!token) {
            navigate("/");
            return;
        }
        try {
            const userData = await endpointForUser(token);
            setUserData(userData?.user);
            if (userData?.user) setIsLoading(false);
        } catch (error) {
            console.error(error);
        }
    };

    const BlogCardData = async () => {
        const data = await getBlogsData();
        setCardData(data?.blogs_data);
    };

    const handleLogout = () => {
        dispatch(logout());
        navigate("/");
    };

    const getColorClass = (index) => RandomColor[index % RandomColor.length];

    const handleDeleteBlog = async (id) => {
        if (window.confirm("Delete this blog?"))
            try {
                await dispatch(deleteBlog(id));
                setFetchBlog((prev) => !prev);
            } catch (error) {
                console.log(error.message);
            }
    };

    useEffect(() => {
        BlogCardData();
    }, [fetchBlog]);
    useEffect(() => {
        getUserData();
    }, []);

    const initials = user?.name
        ? user.name
              .trim()
              .split(" ")
              .map((p) => p[0])
              .join("")
              .slice(0, 2)
              .toUpperCase()
        : "?";

    return (
        <>
            <Helmet>
                <title>
                    {user?.name
                        ? `${user.name} | Blogiefy`
                        : "Profile | Blogiefy"}
                </title>
            </Helmet>

            {isLoading ? (
                <UserProfileSkeleton />
            ) : (
                <div className="min-h-screen bg-[#f8fafc]">
                    {/* Cover */}
                    <div className="relative h-52 md:h-64">
                        <img
                            src={profileCoverImage}
                            alt="Cover"
                            className="w-full h-full object-cover object-center"
                        />
                        <div className="absolute inset-0 bg-black/40" />
                        {/* Back */}
                        <button
                            onClick={() => navigate("/")}
                            className="absolute top-5 left-5 flex items-center gap-1.5 text-white text-sm font-semibold py-1.5 px-3 rounded-md bg-white/10 border border-white/25 hover:bg-white/20 transition"
                            style={{ fontFamily: "Inter, sans-serif" }}
                        >
                            <FaArrowLeft size={11} /> Home
                        </button>
                    </div>

                    {/* Profile card */}
                    <div className="max-w-4xl mx-auto px-6">
                        <div className="bg-white rounded-xl border border-slate-200 -mt-12 relative z-10 p-6 md:p-8">
                            <div className="flex flex-col md:flex-row md:items-start gap-5">
                                {/* Avatar */}
                                <div className="flex-shrink-0">
                                    {user.profile_pic ? (
                                        <img
                                            src={user.profile_pic}
                                            alt={user.name}
                                            className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md"
                                        />
                                    ) : (
                                        <div className="w-24 h-24 rounded-full bg-slate-900 flex items-center justify-center border-4 border-white shadow-md">
                                            <span
                                                className="text-white text-2xl font-black"
                                                style={{
                                                    fontFamily:
                                                        "Inter, sans-serif",
                                                }}
                                            >
                                                {initials}
                                            </span>
                                        </div>
                                    )}
                                </div>

                                {/* Info */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-start justify-between gap-4">
                                        <div>
                                            <h1
                                                className="text-2xl font-extrabold text-slate-900 leading-tight"
                                                style={{
                                                    fontFamily:
                                                        "Inter, sans-serif",
                                                    letterSpacing: "-0.5px",
                                                }}
                                            >
                                                {user.name}
                                            </h1>
                                            {user.user_title && (
                                                <p
                                                    className="text-slate-500 text-sm mt-0.5"
                                                    style={{
                                                        fontFamily:
                                                            "Inter, sans-serif",
                                                    }}
                                                >
                                                    {user.user_title}
                                                </p>
                                            )}
                                        </div>

                                        {/* Actions menu */}
                                        <div className="relative flex-shrink-0">
                                            <button
                                                onClick={() =>
                                                    setMenuOpen(!menuOpen)
                                                }
                                                className="flex items-center gap-2 text-sm font-semibold text-slate-700 border border-slate-200 bg-white hover:bg-slate-50 px-4 py-2 rounded-lg transition"
                                                style={{
                                                    fontFamily:
                                                        "Inter, sans-serif",
                                                }}
                                            >
                                                <FaPencilAlt size={11} />{" "}
                                                Settings
                                            </button>
                                            {menuOpen && (
                                                <div className="absolute right-0 mt-2 w-48 bg-white border border-slate-200 rounded-xl shadow-xl z-50">
                                                    <div className="py-1.5 px-1">
                                                        <Link
                                                            to="/create-post"
                                                            onClick={() =>
                                                                setMenuOpen(
                                                                    false,
                                                                )
                                                            }
                                                            className="flex items-center gap-2.5 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 rounded-lg transition"
                                                            style={{
                                                                textDecoration:
                                                                    "none",
                                                                fontFamily:
                                                                    "Inter, sans-serif",
                                                            }}
                                                        >
                                                            <IoCreate className="text-base text-slate-400" />{" "}
                                                            Create Post
                                                        </Link>
                                                        <Link
                                                            to="/edit-profile"
                                                            onClick={() =>
                                                                setMenuOpen(
                                                                    false,
                                                                )
                                                            }
                                                            className="flex items-center gap-2.5 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 rounded-lg transition"
                                                            style={{
                                                                textDecoration:
                                                                    "none",
                                                                fontFamily:
                                                                    "Inter, sans-serif",
                                                            }}
                                                        >
                                                            <FaUserEdit className="text-base text-slate-400" />{" "}
                                                            Edit Profile
                                                        </Link>
                                                        <span
                                                            className="flex items-center gap-2.5 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 rounded-lg cursor-pointer transition"
                                                            style={{
                                                                fontFamily:
                                                                    "Inter, sans-serif",
                                                            }}
                                                        >
                                                            <RiLockPasswordFill className="text-base text-slate-400" />{" "}
                                                            Change Password
                                                        </span>
                                                        <hr className="my-1 border-slate-100" />
                                                        <span
                                                            onClick={
                                                                handleLogout
                                                            }
                                                            className="flex items-center gap-2.5 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg cursor-pointer transition"
                                                            style={{
                                                                fontFamily:
                                                                    "Inter, sans-serif",
                                                            }}
                                                        >
                                                            <IoLogOut className="text-base" />{" "}
                                                            Logout
                                                        </span>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Bio */}
                                    {user.bio && (
                                        <div
                                            className="mt-3 text-sm text-slate-600 leading-relaxed max-w-lg"
                                            style={{
                                                fontFamily: "Inter, sans-serif",
                                            }}
                                            dangerouslySetInnerHTML={{
                                                __html: user.bio,
                                            }}
                                        />
                                    )}

                                    {/* Meta: location, joined */}
                                    <div
                                        className="mt-3 flex flex-wrap items-center gap-4 text-sm text-slate-400"
                                        style={{
                                            fontFamily: "Inter, sans-serif",
                                        }}
                                    >
                                        {user.location && (
                                            <span className="flex items-center gap-1.5">
                                                <FaLocationDot size={12} />{" "}
                                                {user.location}
                                            </span>
                                        )}
                                        <span className="flex items-center gap-1.5">
                                            <MdDateRange size={13} /> Joined{" "}
                                            {joinedDate(user.createdAt)}
                                        </span>
                                    </div>

                                    {/* Skills */}
                                    {user.skills?.filter((s) => s).length >
                                        0 && (
                                        <div className="mt-4 flex flex-wrap gap-1.5">
                                            {user.skills.map((skill, i) =>
                                                skill ? (
                                                    <span
                                                        key={i}
                                                        className={`${getColorClass(i)} text-white text-xs font-semibold py-0.5 px-2.5 rounded-full`}
                                                        style={{
                                                            fontFamily:
                                                                "Inter, sans-serif",
                                                        }}
                                                    >
                                                        {skill}
                                                    </span>
                                                ) : null,
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* User's posts section */}
                        {userBlogs.length > 0 && (
                            <div className="mt-8 mb-2">
                                <h2
                                    className="text-lg font-bold text-slate-900 flex items-center gap-2"
                                    style={{
                                        fontFamily: "Inter, sans-serif",
                                        letterSpacing: "-0.3px",
                                    }}
                                >
                                    <span className="inline-block w-1 h-5 bg-slate-900 rounded" />
                                    Published Posts ({userBlogs.length})
                                </h2>
                            </div>
                        )}
                    </div>

                    {/* Blog cards */}
                    <Cards
                        cardsData={userBlogs}
                        totalCards={userBlogs.length || 4}
                        isLoading={userBlogs.length === 0}
                        deleteBlogData={handleDeleteBlog}
                        isProfile
                    />
                </div>
            )}
        </>
    );
}

export default UserProfile;
