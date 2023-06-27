import { Link } from 'react-router-dom';
import HoverText from '../HoverText/HoverText';
import './NavLink.css';

export default function NavLink({ icon, textContent, linkTo='/', handleLogout = () => {}}) {
    return (
        <div className="nav-link-wrapper">
            <Link to={linkTo} className='link'>
                <div className="nav-link-container" onClick={handleLogout}>
                    <div className="nav-icon-container">
                        {icon}
                        <HoverText textContent={textContent} />
                    </div>
                    {/* {showText && (
                    <div className="nav-text">
                        <span>{textContent}</span>
                    </div>
                )} */}
                    <div className="nav-text">
                        <span>{textContent}</span>
                    </div>

                </div>
            </Link>
        </div>
    )
}
