import NavLink from '../NavLink/NavLink'
import './sidebar.css'
import logo from '../../assets/logo.png';
import { BiHomeAlt} from 'react-icons/bi'
// import { BiHomeAlt, BiBarChartSquare } from 'react-icons/bi'
// import { LuFiles } from 'react-icons/lu';
// import { AiOutlineLike } from 'react-icons/ai';
// import { FaRegComments } from 'react-icons/fa';
// import { PiShareFatBold } from 'react-icons/pi';
import { FiLogOut } from 'react-icons/fi';
import { GrAddCircle, GrUserAdmin } from 'react-icons/gr';
import { CgProfile } from 'react-icons/cg';
import { GiPerspectiveDiceSixFacesRandom } from 'react-icons/gi';
import { useContext, useEffect, useState } from 'react';
import { Context } from '../../context/Context';
import axios from 'axios';

export default function Sidebar() {
    const { user, dispatch } = useContext(Context);
    const [randomId, setRandomId] = useState("");
    // console.log((user._id === process.env.ADMIN_ID));
    // console.log(process.env.ADMIN_ID);
    function handleLogout(e) {
        e.preventDefault();
        dispatch({ type: "LOGOUT"});
        // window.location.replace("/");
    }
    useEffect(() => {
        try {
            const fetchRandomId = async () => {
                const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/blogs/get/random`);
                // console.log(res);
                setRandomId(res.data?._id);
            }
            fetchRandomId();
        } catch(err) {
            console.log(err);
        }
    }, []);
    return (
        <>
            <div className="logo-section">
                <div className="logo-image">
                    <img src={logo} alt="logo" />
                </div>
                {/* {showText && (
                    <div className="logo-name">
                        <span className='transition-text'>Aaryan</span>
                    </div>
                )
                } */}
                <div className="logo-name">
                    <span>Aaryan</span>
                </div>
            </div>
            <div className="nav-links">
                <div className="main-navs">
                    <NavLink icon={<BiHomeAlt />} textContent="Home" linkTo='/' />
                    <NavLink icon={<GrAddCircle />} textContent="Create" linkTo='/create' />
                    {/* TODO */}
                    <NavLink icon={<GiPerspectiveDiceSixFacesRandom />} textContent="Random blog" linkTo={`/blog/${randomId}`} />
                    <NavLink icon={<CgProfile />} textContent="Profile" linkTo='/update' />
                    {/* <NavLink icon={<FaRegComments />} textContent="Comments" /> */}
                    {/* <NavLink icon={<PiShareFatBold />} textContent="Share" /> */}
                    {
                        // ((user && user._id === process.env.ADMIN_ID) && (
                        //     <NavLink icon={<GrUserAdmin />} textContent="Admin" />
                        // ))
                        ((user) && (
                            <NavLink icon={<GrUserAdmin/>} textContent="Admin" linkTo='/admin'/>
                        ))
                    }
                </div>
                {user && (
                    <div className="logout">
                        <NavLink icon={<FiLogOut />} textContent="Logout" handleLogout={handleLogout}/>
                    </div>
                )}
            </div>
        </>
    )
}
