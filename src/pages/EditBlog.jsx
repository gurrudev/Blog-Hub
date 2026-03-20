/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useRef, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { FaImage, FaArrowLeft } from "react-icons/fa6";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateBlog } from "../redux/features/blogSlice";
import getBlogById from "../utils/getBlogById";
import endpointForUser from "../utils/endpointForUser";
import toast, { Toaster } from "react-hot-toast";
import { Helmet } from "react-helmet";
import keywordStyles from "../utils/keywordsStyles";

const inputCls =
    "w-full bg-white border border-slate-200 text-slate-800 placeholder-slate-400 rounded-lg px-3.5 py-2.5 text-sm outline-none focus:border-slate-700 focus:ring-1 focus:ring-slate-700 transition-all";
const labelCls =
    "block mb-1.5 text-xs font-semibold uppercase tracking-widest text-slate-500";

const allTags = [
    "Adventure",
    "Action",
    "Travel",
    "Landmark",
    "Programming",
    "Tutorial",
    "Blog",
];
const maxTags = 2;

const EditBlog = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const token = sessionStorage.getItem("token");

    const [user, setUser] = useState({});
    const [post, setPost] = useState(null);
    const [blogData, setBlogData] = useState({});
    const [editorValue, setEditorValue] = useState("");
    const [selectedTags, setSelectedTags] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const codeRef = useRef(null);

    const editorModules = {
        toolbar: [
            [{ header: [1, 2, false] }],
            ["bold", "italic", "link", "blockquote", "code", "code-block"],
            [{ list: "ordered" }, { indent: "+1" }],
        ],
    };

    function highlightKeywords(container) {
        const keywords = Object.keys(keywordStyles);
        keywords.forEach((keyword) => {
            const escapedKeyword = keyword.replace(
                /[-/\\^$*+?.()|[\]{}]/g,
                "\\$&",
            );
            const regex = new RegExp(`\\b${escapedKeyword}\\b`, "g");
            container.querySelectorAll("pre").forEach((pre) => {
                pre.innerHTML = pre.innerHTML.replace(
                    regex,
                    `<span style="${keywordStyles[keyword]}">${keyword}</span>`,
                );
            });
        });
    }

    useEffect(() => {
        if (codeRef.current) highlightKeywords(codeRef.current);
    }, [editorValue]);

    // Auth guard
    useEffect(() => {
        if (!token) {
            navigate("/");
            return;
        }
        endpointForUser(token)
            .then((d) => setUser(d.user))
            .catch(console.error);
    }, []);

    // Load the blog to edit
    useEffect(() => {
        if (!id) return;
        getBlogById(id)
            .then((res) => {
                const blog = res.blog;
                setPost(blog);
                setBlogData({ title: blog.title, image_url: blog.image_url });
                setEditorValue(blog.description || "");
                setSelectedTags(blog.blog_tags || []);
                setIsLoading(false);
            })
            .catch(console.error);
    }, [id]);

    const getBlogDataField = (e) =>
        setBlogData({ ...blogData, [e.target.name]: e.target.value });

    const handleSelectTag = (tag) => {
        if (selectedTags.includes(tag)) {
            setSelectedTags(selectedTags.filter((t) => t !== tag));
        } else if (selectedTags.length < maxTags) {
            setSelectedTags([...selectedTags, tag]);
        }
    };

    const handleSubmit = async () => {
        try {
            const data = {
                title: blogData.title || post.title,
                description: editorValue,
                image_url: blogData.image_url || post.image_url,
                blog_tags: selectedTags,
                user: post.user,
                username: post.username,
            };
            const response = await dispatch(updateBlog({ id, data }));
            if (response.meta.requestStatus === "fulfilled") {
                toast.success("Blog updated!");
                setTimeout(() => navigate("/profile"), 1600);
            } else {
                toast.error("Update failed, please try again.");
            }
        } catch (error) {
            console.error(error);
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center">
                <div
                    className="text-slate-400 text-sm"
                    style={{ fontFamily: "Inter, sans-serif" }}
                >
                    Loading post…
                </div>
            </div>
        );
    }

    return (
        <>
            <Helmet>
                <title>Edit Post | Blogiefy</title>
            </Helmet>
            <Toaster position="top-center" reverseOrder={false} />

            {/* Top bar */}
            <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 h-14 bg-white border-b border-slate-200">
                <button
                    onClick={() => navigate("/profile")}
                    className="flex items-center gap-1.5 text-slate-500 hover:text-slate-900 text-sm font-medium transition-colors"
                    style={{ fontFamily: "Inter, sans-serif" }}
                >
                    <FaArrowLeft size={11} /> Back
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
                        onClick={handleSubmit}
                        className="bg-slate-900 hover:bg-slate-700 text-white text-sm font-bold px-5 py-1.5 rounded-md transition-colors"
                        style={{ fontFamily: "Inter, sans-serif" }}
                    >
                        Save Changes
                    </button>
                    {user.profile_pic && (
                        <Link to="/profile">
                            <img
                                className="rounded-full w-8 h-8 object-cover border-2 border-slate-200"
                                src={user.profile_pic}
                                alt="Profile"
                            />
                        </Link>
                    )}
                </div>
            </header>

            {/* Main content */}
            <main className="pt-14 min-h-screen bg-[#f8fafc]">
                <div className="max-w-3xl mx-auto px-6 py-10">
                    {/* Editing label */}
                    <p
                        className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3"
                        style={{ fontFamily: "Inter, sans-serif" }}
                    >
                        ✎ Editing Post
                    </p>

                    {/* Title */}
                    <div className="mb-6">
                        <input
                            type="text"
                            name="title"
                            defaultValue={post?.title}
                            onChange={getBlogDataField}
                            className="w-full bg-transparent text-slate-900 text-3xl font-extrabold outline-none placeholder-slate-300 border-none"
                            placeholder="Post title..."
                            style={{
                                fontFamily: "Inter, sans-serif",
                                letterSpacing: "-0.5px",
                            }}
                        />
                    </div>

                    <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-5 mb-6">
                        {/* Cover image URL */}
                        <div>
                            <label className={labelCls}>Cover Image URL</label>
                            <div className="flex">
                                <span className="inline-flex items-center px-3 bg-slate-50 border border-r-0 border-slate-200 rounded-l-lg text-slate-400">
                                    <FaImage size={14} />
                                </span>
                                <input
                                    type="text"
                                    name="image_url"
                                    defaultValue={post?.image_url}
                                    onChange={getBlogDataField}
                                    className="flex-1 bg-white border border-slate-200 rounded-r-lg px-3.5 py-2.5 text-sm text-slate-800 placeholder-slate-400 outline-none focus:border-slate-700 transition-all"
                                    placeholder="https://your-image-link.com/photo.jpg"
                                />
                            </div>
                            {/* Image preview */}
                            {(blogData.image_url || post?.image_url) && (
                                <img
                                    src={blogData.image_url || post?.image_url}
                                    alt="Cover preview"
                                    className="mt-3 w-full h-48 object-cover rounded-lg border border-slate-200"
                                    onError={(e) =>
                                        (e.target.style.display = "none")
                                    }
                                />
                            )}
                        </div>

                        {/* Tags */}
                        <div>
                            <label className={labelCls}>
                                Tags (pick up to 2)
                            </label>
                            <div className="flex flex-wrap gap-2 mt-1">
                                {allTags.map((tag, i) => (
                                    <button
                                        key={i}
                                        type="button"
                                        onClick={() => handleSelectTag(tag)}
                                        className={`text-xs font-bold px-3 py-1 rounded-full border transition-all ${
                                            selectedTags.includes(tag)
                                                ? "bg-slate-900 text-white border-slate-900"
                                                : "bg-white text-slate-600 border-slate-200 hover:border-slate-400"
                                        }`}
                                        style={{
                                            fontFamily: "Inter, sans-serif",
                                        }}
                                    >
                                        {tag}
                                    </button>
                                ))}
                            </div>
                            {selectedTags.length > 0 && (
                                <p
                                    className="mt-2 text-xs text-slate-400"
                                    style={{ fontFamily: "Inter, sans-serif" }}
                                >
                                    Selected: {selectedTags.join(", ")}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Editor */}
                    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden mb-6">
                        <div className="px-4 py-2.5 border-b border-slate-100">
                            <p
                                className="text-xs font-semibold uppercase tracking-widest text-slate-400"
                                style={{ fontFamily: "Inter, sans-serif" }}
                            >
                                Content
                            </p>
                        </div>
                        <div style={{ minHeight: "350px" }}>
                            <ReactQuill
                                theme="snow"
                                value={editorValue}
                                onChange={setEditorValue}
                                modules={editorModules}
                                className="write-quill"
                            />
                        </div>
                    </div>

                    {/* Preview */}
                    {editorValue && (
                        <div className="bg-white rounded-xl border border-slate-200 p-6 mb-6">
                            <p
                                className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-3"
                                style={{ fontFamily: "Inter, sans-serif" }}
                            >
                                Preview
                            </p>
                            <div
                                ref={codeRef}
                                style={{
                                    fontFamily:
                                        "Inter, customeRegular, sans-serif",
                                    fontSize: "0.95rem",
                                    lineHeight: "1.8",
                                    color: "#374151",
                                }}
                                dangerouslySetInnerHTML={{
                                    __html: editorValue,
                                }}
                            />
                        </div>
                    )}

                    {/* Bottom save */}
                    <div className="flex justify-end gap-3">
                        <button
                            onClick={() => navigate("/profile")}
                            className="text-sm font-semibold text-slate-600 px-5 py-2.5 rounded-lg border border-slate-200 hover:bg-slate-50 transition"
                            style={{ fontFamily: "Inter, sans-serif" }}
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSubmit}
                            className="bg-slate-900 hover:bg-slate-700 text-white text-sm font-bold px-8 py-2.5 rounded-lg transition-colors"
                            style={{ fontFamily: "Inter, sans-serif" }}
                        >
                            Save Changes
                        </button>
                    </div>
                </div>
            </main>
        </>
    );
};

export default EditBlog;
