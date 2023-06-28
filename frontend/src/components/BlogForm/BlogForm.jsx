import { useContext, useEffect, useState } from 'react'
import './BlogForm.css'
import { Context } from '../../context/Context'
import axios from 'axios';

export default function BlogForm({ titleValue = "", textValue = "", updateBlog = false, blogId = "", blogEmail = ""}) {
    const [titleVal, setTitleVal] = useState("");
    useEffect(() => {
        setTitleVal(titleValue);
    }, [titleValue]);
    useEffect(() => {
        setTextVal(textValue);
    }, [textValue]);
    const [textVal, setTextVal] = useState(textValue);
    const {user} = useContext(Context);

    async function handleSubmit(e) {
        e.preventDefault();
        if (updateBlog) {
            try {
                await axios.put(`${process.env.REACT_APP_SERVER_URL}/blogs/${blogId}`, {
                    title: titleVal,
                    desc: textVal,
                    email: user.email
                });
                // window.location.replace(`/`);
                window.location.replace(`/blog/${blogId}`);
            } catch(err) {
                console.log(err);
            }
        } else {
            try {
                const res = await axios.post(`${process.env.REACT_APP_SERVER_URL}/blogs/`, {
                    title: titleVal,
                    desc: textVal,
                    email: user.email,
                    username: `${user.firstName} ${user.lastName}`
                })
                // window.location.replace(`/`);
                window.location.replace(`/blog/${res?.data?._id}`);
            } catch(err) {
                console.log(err);
            }
        }
    }
    return (
        <form className={`blog-form-wrapper wrapper`} onSubmit={handleSubmit}>
            <div className="title-wrapper">
                <div className="title-icon-container">
                    <div className="title-image-container">
                        <img src={`https://ui-avatars.com/api/?name=${user.firstName}+${user.lastName}`} />
                    </div>
                    <span>Title</span>
                </div>
                <input type="text" className='title-input' placeholder='Enter title ...' autoFocus required value={titleVal} onChange={(e) => setTitleVal(e.target.value)}/>
            </div>
            <div className="textarea-wrapper">
                <textarea className='textarea-element' placeholder='Hello everyone!' required value={textVal} onChange={(e) => setTextVal(e.target.value)}></textarea>
            </div>
            <div className="submit-button">
                <button type='submit'>Post</button>
            </div>
        </form>
    )
}
