/* eslint-disable react/no-unescaped-entities */
// import React from 'react'
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

const NotFound404 = () => {
    return (
        <>
            <Helmet>
                <title>Page Not Found | Blogiefy</title>
            </Helmet>
            <section className="mt-6">
                <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
                    <div className="mx-auto max-w-screen-sm text-center">
                        <h1 className="mb-4 text-7xl text-slate-900 tracking-tight font-extrabold lg:text-9xl">
                            4O4
                        </h1>
                        <p className="mb-4 text-3xl tracking-tight font-bold text-slate-700 md:text-4xl ">
                            Something's missing.
                        </p>
                        <p className="mb-4 text-lg font-light text-gray-600 ">
                            Sorry, we can't find that page. You'll find lots to
                            explore on the home page.{" "}
                        </p>
                        <Link
                            to={"/"}
                            className="inline-flex text-white bg-black rounded-sm text-sm px-5 py-2.5 text-center my-4"
                        >
                            Back to Homepage
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
};

export default NotFound404;
