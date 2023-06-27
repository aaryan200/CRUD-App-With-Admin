import { useEffect, useState, useContext } from 'react';
import Heading from '../Heading/Heading';
import './SinglePostContent.css';
import { Context } from '../../context/Context';
import axios from 'axios';

export default function SinglePostContent({ blog }) {
    // console.log(blog.username);
    const { user } = useContext(Context);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    useEffect(() => {
        const username = blog?.username;
        const arr = username?.split(" ");
        // const arr = ["Hello", "World"];
        if (arr && arr.length > 0) {
            setFirstName(arr[0]);
            setLastName(arr[1]);
        }
    }, [blog]);
    // Since fetching of blog is asynchrnous, we need to write blog? so that app doesn't crash
    async function handleDelete(e) {
        e.preventDefault();
        try {
            // console.log(user.email);
            // console.log(blog.email);
            // console.log(blog._id);
            await axios.delete(`${process.env.REACT_APP_SERVER_URL}/blogs/${blog?._id}`, { data: {
                email: user.email
            }});
            window.location.replace("/");
        } catch(err) {
            console.log(err);
        }
    }
    return (
        <div className={`single-post-wrapper wrapper`}>
            <Heading icon={<img src={`https://ui-avatars.com/api/?name=${firstName}+${lastName}`} />} headingText={blog?.title} buttons={((user?.email === blog?.email) || (user?._id === process.env.REACT_APP_ADMIN_ID)) ? true : false} blogId={((user?.email === blog?.email) || (user?._id === process.env.REACT_APP_ADMIN_ID)) ? blog?._id : ""} handleDelete={handleDelete}/>
            <div className="rule"><hr /></div>
            <div className="single-post-text">
                <span>{blog?.desc}</span>
            </div>
        </div>
    )
}
