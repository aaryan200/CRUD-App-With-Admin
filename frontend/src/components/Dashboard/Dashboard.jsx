import Box from '../Box/Box';
import Heading from '../Heading/Heading'
import './dashboard.css'
import {BiTachometer} from 'react-icons/bi';
import { AiOutlineLike, AiOutlineClockCircle } from 'react-icons/ai';
import { FaRegComments } from 'react-icons/fa';
import { PiShareFatBold } from 'react-icons/pi';
import DataTable from '../DataTable/DataTable';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Context } from '../../context/Context';

export default function Dashboard() {
    const {user} = useContext(Context);
    const [blogs, setBlogs] = useState([]);
    const [numUsers, setNumUsers] = useState(10120);
    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const res = await axios.get("/blogs/");
                setBlogs(res.data);
            } catch (err) {
                console.log(err);
            }
        }
        fetchBlogs();
        const getNumUsers = async () => {
            try {
                const res = await axios.get(`/users/get/count/?email=${user?.email}`);
                setNumUsers(res.data);
            } catch(err) {
                console.log(err);
            }
        }
        getNumUsers();
    }, []);
    return (
        <div className={`dashboard-wrapper wrapper`}>
            <Heading icon={<BiTachometer/>} headingText="Dashboard"/>
            <div className="boxes">
                <Box icon={<AiOutlineLike/>} boxText="Total Blogs" boxNumber={blogs.length} bgColor={'var(--box1-color)'}/>
                <Box icon={<FaRegComments/>} boxText="Users" boxNumber={numUsers} bgColor={'var(--box2-color)'}/>
                <Box icon={<PiShareFatBold/>} boxText="Total Share" boxNumber="10120" bgColor={'var(--box3-color)'}/>
            </div>
            <Heading icon={<AiOutlineClockCircle/>} headingText="Recent Activity"/>
            <DataTable blogs={blogs}/>
        </div>
    )
}
