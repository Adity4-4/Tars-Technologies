import React, { useState, useEffect } from 'react'
import mainBlog from '../assets/images/main-blog.jpg'
import blogProfile from '../assets/images/blog-profile.png'
import axios from 'axios'
import { useParams, Link } from "react-router-dom";
import BlogCard from '../components/BlogCard'

function BlogDetails() {
    const { id } = useParams();
    const [blogData, setBlogData] = useState(null)
    const [relatedBlogs, setRelatedBlogs] = useState([])

    // format date safely
    const formattedDate = blogData?.date ? new Date(blogData.date).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric"
    }) : "";

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/blogs/${id}`);
                setBlogData(res.data);
            } catch (err) {
                console.error("Error fetching blog:", err)
            }
        }

        const fetchRelatedBlogs = async () => {
            try {
                const res = await axios.get("http://localhost:5000/api/blogs")

                // exclude current blog, take 3 others
                const filtered = res.data.filter(b => b._id !== id).slice(0, 3);
                setRelatedBlogs(filtered);
            } catch (err) {
                console.error("Error fetching related blogs:", err)
            }
        }

        fetchBlog();
        fetchRelatedBlogs();
    }, [id])

    if (!blogData) return <p>Loading...</p>

    

    return (
        <>
            <div className=' lg:pt-16 pb-10 flex flex-col gap-6 bg-gradient-to-b from-black to-[#1E1E1E] text-white '>
                <img
                    src={blogData.images?.[0]?.url || mainBlog}
                    className="h-[220px] md:h-[500px] w-[330px] md:w-[1200px] object-cover mx-auto mt-18 rounded-[12px]"
                />
                <div className='px-10 lg:px-50 space-y-2 md:space-y-6'>
                    <p className='text-[25px] lg:text-[48px] font-[700] '>{blogData.title}</p>
                    <div>
                        <div className='flex items-center '>
                            <img src={blogProfile} className='w-[22px] md:w-[36px] ' />
                            <span className='ml-1 md:ml-2 text-[16px] md:text-[20px] text-[#dfe2ec] font-[600] '>{blogData.author}</span>
                        </div>
                        <div className='ml-2 md:ml-12 space-y-5 text-[13px] md:text-[16px] text-[#6D6E76] '>
                            <div className='text-[14px] md:text-[20px] text-center'>
                                <span className='ml-2'>{formattedDate}</span>
                                <span className='ml-2'>{blogData.readingTime}</span>
                            </div>

                            {/* Render sections dynamically */}
                            {blogData.sections && blogData.sections.length > 0 && (
                                blogData.sections.map((section, index) => (
                                    <div key={index} className='mt-4 md:mt-6'>
                                        <p className='text-[20px] md:text-[36px] text-[#eaebef]'>{section.subtitle}</p>
                                        <p>{section.content}</p>
                                    </div>
                                ))
                            )}

                            {/* Render points */}
                            {blogData.points && blogData.points.length > 0 && (
                                <ul className='list-disc list-inside text-[14px] md:text-[24px] text-[#bdbec4] mt-3 md:mt-4'>
                                    {blogData.points.map((point, index) => (
                                        <li key={index}>{point}</li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>
                </div>
            </div>


            {/* Related blogs section */}
            <div className='bg-gradient-to-b from-black to-[#1E1E1E] text-white py-10 lg:py-20'>
                <h2 className='text-[18px] md:text-3xl font-bold text-center mb-10'>More Blogs</h2>
                <div className='flex flex-wrap justify-center gap-6'>
                    {relatedBlogs.map((item) => (
                        <BlogCard
                            key={item._id}
                            name={item.name}
                            title={item.title}
                            tag={item.tag}
                            date={item.date}
                            images={item.images}
                            link={`/blogs-details/${item._id}`}
                        />
                    ))}
                </div>
            </div>
        </>
    )
}

export default BlogDetails
