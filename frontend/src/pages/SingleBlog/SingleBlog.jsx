import { useLocation } from 'react-router-dom'
import Bar from '../../components/Bar/Bar'
import SinglePostContent from '../../components/SinglePostContent/SinglePostContent'
import './singleBlog.css'
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function SingleBlog() {
    const location = useLocation();
    const blogId = location.pathname.split("/")[2];
    const [blog, setBlog] = useState({});
    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/blogs/${blogId}`);
                // console.log(typeof(res.data));
                // console.log(typeof(blog));
                setBlog(res.data);
            } catch(err) {
                console.log(err);
            }
        }
        fetchBlog();
        // console.log(blog);
    }, []);
    return (
        <div style={{ position: 'relative' }}>
            <Bar/>
            <SinglePostContent blog={blog}/>
        </div>
    )
}
