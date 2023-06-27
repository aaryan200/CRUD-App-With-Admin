import { useLocation } from 'react-router-dom';
import Bar from '../../components/Bar/Bar';
import BlogForm from '../../components/BlogForm/BlogForm';
import './edit.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Edit() {
    const location = useLocation();
    const blogId = location.pathname.split("/")[2];
    const [blog, setBlog] = useState({});
    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/blogs/${blogId}`);
                // console.log(res.data);
                setBlog(res.data);
            } catch(err) {
                console.log(err);
            }
        }
        fetchBlog();
        // console.log(blog);
    }, [blogId]);
    return (
        <div style={{ position: 'relative' }}>
            <Bar />
            <BlogForm titleValue={blog?.title} textValue={blog?.desc} updateBlog={true} blogId={blogId} blogEmail={blog.email}/>
        </div>
    )
}
