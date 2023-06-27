import './topbar.css';
import { BiMenu } from 'react-icons/bi';
import { BiSearch } from 'react-icons/bi';
// import logo from '../../assets/logo.png';
import { FiMoon } from 'react-icons/fi';
import { MdLightMode } from 'react-icons/md';
import { useContext, useEffect } from 'react';
import { Context } from '../../context/Context';
import { Link } from 'react-router-dom';

export default function TopBar() {
    const { user } = useContext(Context);
    useEffect(() => {
        const bodyElement = document.querySelector('body');
        const sideBarWrapper = document.querySelector('.sidebar-wrapper');
        const getMode = localStorage.getItem("mode");
        if (getMode && bodyElement) {
            if (getMode === "light" && bodyElement.classList.contains("dark")) {
                bodyElement.classList.remove("dark");
            }
            else if (getMode === "dark" && (!bodyElement.classList.contains("dark"))) {
                bodyElement.classList.add("dark");
            }
        }
        const getSidebarStatus = localStorage.getItem("status");
        if (getSidebarStatus && sideBarWrapper) {
            if (getSidebarStatus === "open" && sideBarWrapper.classList.contains("close")) {
                sideBarWrapper.classList.remove("open");
            }
            else if (getSidebarStatus === "close" && (!sideBarWrapper.classList.contains("close"))) {
                sideBarWrapper.classList.add("close");
            }
        }

    }, []);
    // const [onClickShow, setOnClickShow] = useState(false);
    // useEffect(() => {
    //     if (onClickShow) {
    //         const onClickMenu = document.querySelector('.onclick-menu');
    //         const onClickMenuContent = document.querySelectorAll('.onclick-menu *');
    //         // console.log(onClickMenuContent);
    //         const profileImage = document.querySelector('.profile img');
    //         const handleWindowClick = (e) => {
    //             if (e.target !== onClickMenu && (!(Array.from(onClickMenuContent).includes(e.target))) && e.target !== profileImage) setOnClickShow(false);
    //         }
    //         window.addEventListener('click', handleWindowClick);
    //         return () => {
    //             window.removeEventListener('click', handleWindowClick);
    //         }
    //     }
    // }, [onClickShow]);
    function handleToggleMode(e) {
        e.preventDefault();
        const bodyElement = document.querySelector('body');
        bodyElement.classList.toggle('dark');
        if (bodyElement.classList.contains("dark")) {
            localStorage.setItem("mode", "dark");
        }
        else localStorage.setItem("mode", "light");
    }
    function toggleClose() {
        const sideBarWrapper = document.querySelector('.sidebar-wrapper');
        sideBarWrapper.classList.toggle('close');
        if (sideBarWrapper.classList.contains("close")) {
            localStorage.setItem("status", "close");
        }
        else localStorage.setItem("status", "open");
    }
    return (
        <>
            <div className="menu-icon">
                <BiMenu onClick={toggleClose} />
            </div>
            <div className="search-box">
                <BiSearch className='search-icon' />
                <input type="search" placeholder='Search...' />
            </div>
            {
                user ? (
                    <div className="profile">
                        <div className="toggle-mode-container">
                            <FiMoon className='dark-mode-icon' onClick={handleToggleMode} />
                            <MdLightMode className='light-mode-icon' onClick={handleToggleMode} />
                        </div>
                        <img src={`https://ui-avatars.com/api/?name=${user.firstName}+${user.lastName}`} alt='avatar' />
                        {/* <img src={`https://ui-avatars.com/api/?name=${user.firstName}+${user.lastName}`} onClick={() => setOnClickShow(!onClickShow)} alt='avatar' />
                        {onClickShow && (
                            <div className="onclick-menu">
                                <div className="user-details">
                                    <span className='user-name ellipsis w-full'>{user.firstName} {user.lastName}</span>
                                    <span className='user-email ellipsis w-full'>{user.email}</span>
                                </div>
                                <span className='onclick-menu-item w-full'>Help</span>
                                <span className='onclick-menu-item w-full'>Pricing</span>
                                <span className='onclick-menu-item w-full'>Terms & Policies</span>
                                <div className="dark-mode w-full" onClick={handleToggleMode}>
                                    <span className='dark-mode-text'>Dark Mode</span>
                                    <div className="switch-container">
                                        <FiMoon className='dark-mode-icon' />
                                    </div>
                                </div>
                            </div>)} */}
                    </div>
                ) : (
                    <div className='credentials-submit-button' style={{ marginTop: "0", marginLeft: "10px" }}>
                        <div className="toggle-mode-container">
                            <FiMoon className='dark-mode-icon' onClick={handleToggleMode} />
                            <MdLightMode className='light-mode-icon' onClick={handleToggleMode} />
                        </div>
                        <button className='submit'>
                            <Link to='/login' className='link'>Login</Link>
                        </button>
                    </div>
                )
            }

        </>
    )
}
