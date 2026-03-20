import { useState, useEffect, useRef } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate, useParams } from "react-router-dom";
import { MdDateRange } from "react-icons/md";
import getBlogById from "../utils/getBlogById";
import cardDate from "../utils/cardDate";
import BlogPostSkeleton from "../components/Skeleton/BlogPostSkeleton";
import { Helmet } from "react-helmet";
import keywordStyles from "../utils/keywordsStyles";

const BlogPost = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [post, setPost] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const response = await getBlogById(id);
                setPost(response.blog);
                if (response) setIsLoading(false);
            } catch (error) {
                console.error(error);
            }
        };
        if (id) fetchBlog();
    }, [id]);

    const codeRef = useRef(null);

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
    }, [post?.description]);

    return (
        <>
            <Helmet>
                <title>{post.title || "Blogiefy"}</title>
            </Helmet>
            {isLoading ? (
                <BlogPostSkeleton />
            ) : (
                <main className="pb-16 min-h-screen bg-white">
                    {/* Hero image */}
                    <div className="relative" style={{ height: "380px" }}>
                        <img
                            className="w-full h-full object-cover"
                            src={post.image_url}
                            alt={post.title}
                        />
                        <div
                            className="absolute inset-0"
                            style={{ background: "rgba(5,10,25,0.52)" }}
                        />

                        {/* Back */}
                        <button
                            onClick={() => navigate("/")}
                            className="absolute top-5 left-5 flex items-center gap-2 text-white text-sm font-semibold py-2 px-4 rounded-md bg-white/10 border border-white/25 hover:bg-white/20 transition"
                            style={{ fontFamily: "Inter, sans-serif" }}
                        >
                            <FaArrowLeft size={11} /> Back
                        </button>

                        {/* Post meta */}
                        <div
                            className="absolute bottom-0 left-0 right-0 px-6 pb-7 mx-auto max-w-3xl"
                            style={{ fontFamily: "Inter, sans-serif" }}
                        >
                            {post.blog_tags && (
                                <div className="flex flex-wrap gap-2 mb-3">
                                    {post.blog_tags.map((tag, index) => (
                                        <span
                                            key={index}
                                            className="text-xs font-bold uppercase tracking-widest text-white bg-white/15 border border-white/20 py-1 px-3 rounded-md"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            )}
                            <h1
                                className="text-white font-extrabold leading-tight mb-2"
                                style={{
                                    fontSize: "clamp(1.4rem, 3vw, 2.1rem)",
                                    letterSpacing: "-0.5px",
                                }}
                            >
                                {post.title}
                            </h1>
                            <div className="flex items-center gap-2.5 text-white/60 text-sm">
                                <span>
                                    by{" "}
                                    <strong className="text-white/80 font-semibold">
                                        {post.username}
                                    </strong>
                                </span>
                                <span className="w-1 h-1 rounded-full bg-white/30 inline-block" />
                                <span className="flex items-center gap-1">
                                    <MdDateRange size={13} />{" "}
                                    {cardDate(post.createdAt)}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Article */}
                    <div className="px-6 pt-10">
                        <article className="mx-auto w-full max-w-2xl">
                            <div
                                ref={codeRef}
                                style={{
                                    fontFamily:
                                        "Inter, customeRegular, sans-serif",
                                    fontSize: "1.02rem",
                                    lineHeight: "1.88",
                                    color: "#374151",
                                }}
                                dangerouslySetInnerHTML={{
                                    __html: post.description,
                                }}
                            />
                        </article>
                    </div>
                </main>
            )}
        </>
    );
};

export default BlogPost;
