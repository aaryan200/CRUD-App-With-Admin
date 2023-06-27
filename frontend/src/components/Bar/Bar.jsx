// import { useEffect, useState } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import TopBar from '../TopBar/TopBar';
import './bar.css';

export default function Bar() {
    // const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    // const [prevWindowWidth, setPrevWindowWidth] = useState(windowWidth);

    // useEffect(() => {
    //     const handleResize = () => {
    //         setWindowWidth(window.innerWidth);
    //     };
    //     window.addEventListener('resize', handleResize);

    //     setPrevWindowWidth(windowWidth);

    //     if (windowWidth < 1000) setShowText(false);

    //     // Clean up the event listener when the component unmounts
    //     return () => {
    //         window.removeEventListener('resize', handleResize);
    //     };
    // }, []);
    // useEffect(() => {
    //     // console.log(`Previous Width: ${prevWindowWidth}, Current Width: ${windowWidth}`)
    //     if (prevWindowWidth >= 1000 && windowWidth < 1000) {
    //         setPrevWindowWidth(windowWidth);
    //         setShowText(false);
    //     }
    //     else if (prevWindowWidth < 1000 && windowWidth >= 1000) {
    //         setPrevWindowWidth(windowWidth);
    //         setShowText(true);
    //     }
    //     // console.log('Window width changed:', windowWidth);
    // }, [windowWidth]);
    // useEffect(() => {
    //     const sideBarWrapper = document.querySelector('.sidebar-wrapper');
    //     const toggleButton = document.querySelector('.topbar-wrapper .menu-icon');
    //     toggleButton.addEventListener('click', () => {
    //         sideBarWrapper.classList.toggle('close');
    //     })
    // }, [])
    return (
        <>
            {/* <div className={`${showText ? 'width-225' : 'width-73'} sidebar-wrapper`}>
                <Sidebar showText={showText} />
            </div> */}
            <div className={`sidebar-wrapper`}>
                <Sidebar />
            </div>
            {/* <div className={`${showText ? 'ml-225' : 'ml-73'} topbar-wrapper wrapper`}>
                <TopBar showText={showText} setShowText={setShowText} />
            </div> */}
            <div className={`topbar-wrapper wrapper`}>
                <TopBar/>
            </div>
        </>
    )
}
