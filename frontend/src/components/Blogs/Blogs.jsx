import { AiOutlineClockCircle } from 'react-icons/ai';
import './Blogs.css';
import Heading from '../Heading/Heading';
import BlogCard from '../BlogCard/BlogCard';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

export default function Blogs() {
    const [blogs, setBlogs] = useState([]);
    const {search} = useLocation();
    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/blogs/${search}`);
                setBlogs(res.data);
            } catch (err) {
                console.log(err);
            }
        }
        fetchBlogs();
        // console.log(search);
    }, [search]);
    return (
        <div className={`blogs-wrapper wrapper`}>
            <Heading icon={<AiOutlineClockCircle />} headingText={ search ? "Results":"Explore Blogs"} />
            <div className="blog-cards-container">
                {
                    blogs.map((blog) => (
                        <BlogCard key={blog._id} blog={blog} />
                    ))
                }
                {/* <BlogCard/>
                <BlogCard/>
                <BlogCard/>
                <BlogCard/> */}
            </div>
        </div>
    )
}
