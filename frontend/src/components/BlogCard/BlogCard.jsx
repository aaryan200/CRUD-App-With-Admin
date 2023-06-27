import { useEffect, useState } from 'react'
import './BlogCard.css'
// import axios from 'axios'
import { Link } from 'react-router-dom';

export default function BlogCard({ blog }) {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    useEffect(() => {
        // const fetchUser = async () => {
        //     try {
        //         const res = await axios.get(`/users/?email=${blog.email}`);
        //         // console.log(res);
        //         setFirstName(res.data.firstName);
        //         setLastName(res.data.lastName);
        //     } catch(err) {
        //         console.log(err);
        //     }
        // }
        // fetchUser();
        // // console.log(blog.email)
        // // console.log(firstName)
        // // console.log(lastName)
        const username = blog?.username;
        const arr = username.split(" ");
        setFirstName(arr[0]);
        setLastName(arr[1]);
    }, []);
    function goToSingleBlog() {
        window.location.replace(`/blog/${blog._id}`);
    }
    return (
        <div className='blog-card-wrapper'>
            <div className="blog-author-container">
                <img src={`https://ui-avatars.com/api/?name=${firstName}+${lastName}`} />
                <div className="author-date-container">
                    <span className="author-name">
                        <Link to={`/?email=${blog.email}`} className='link'>
                            {firstName} {lastName}
                        </Link>
                    </span>
                    <span className="creation-date">{new Date(blog.createdAt).toDateString()}</span>
                </div>
            </div>
            <div className="blog-card-title">
                <span className='blog-card-title-content' onClick={goToSingleBlog}>
                    {blog.title}
                </span>
            </div>
            <div className="blog-card-desc">
                <span className="blog-card-desc-content">
                    {blog.desc}
                </span>
            </div>
        </div>
    )
}
