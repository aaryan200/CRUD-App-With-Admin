// import { Link } from 'react-router-dom';
import Buton from '../Buton/Buton'
import './TableRow.css'
import axios from 'axios';
import { useContext } from 'react';
import { Context } from '../../context/Context';

export default function TableRow({ blog }) {
    const { user } = useContext(Context);
    async function handleDelete(e) {
        e.preventDefault();
        try {
            // console.log(user.email);
            // console.log(blog.email);
            // console.log(blog._id);
            await axios.delete(`${process.env.REACT_APP_SERVER_URL}/blogs/${blog?._id}`, {
                data: {
                    email: user.email
                }
            });
            window.location.replace("/");
            // document.addEventListener("DOMContentLoaded", function () {
                // window.location.replace("/");
                // setTimeout(function () {
                //     const adminButton = document.querySelector("#root > div > div.sidebar-wrapper > div.nav-links > div.main-navs > div:nth-child(5) > a");
                //     console.log(adminButton);
                //     adminButton.click();
                // }, 5000); // 1000 milliseconds delay (adjust as needed)
            // });

        } catch (err) {
            console.log(err);
        }
    }
    return (
        <>
            <div className='table-row'>
                <div className="row-element row-username">{blog?.username}</div>
                <div className="row-element">{blog?.email}</div>
                <div className="row-element">{blog?.title}</div>
                <div className="row-element">{new Date(blog?.createdAt).toDateString()}</div>
                <div className="table-row-buttons">
                    <Buton bgColor="var(--success-color)" isLink={true} textContent="Open" linkTo={`/blog/${blog?._id}`} />
                    <Buton pointerEvents={(user?._id === process.env.REACT_APP_ADMIN_ID)} bgColor="var(--primary-color)" isLink={true} textContent="Edit" linkTo={`/edit/${blog?._id}`} />
                    <Buton pointerEvents={(user?._id === process.env.REACT_APP_ADMIN_ID)} bgColor="var(--danger-color)" isLink={false} textContent="Delete" handleDelete={handleDelete} />
                </div>
            </div>
        </>
    )
}
