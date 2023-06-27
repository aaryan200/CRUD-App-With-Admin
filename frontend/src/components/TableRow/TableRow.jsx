// import { Link } from 'react-router-dom';
import Buton from '../Buton/Buton'
import './TableRow.css'
import axios from 'axios';
import { useContext } from 'react';
import { Context } from '../../context/Context';

export default function TableRow({ blog }) {
    const {user} = useContext(Context);
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
            window.location.reload();
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
