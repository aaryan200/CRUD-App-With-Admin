import { Link } from 'react-router-dom'
import './buton.css'

export default function Buton({ pointerEvents = true ,bgColor, textContent, isLink = false, linkTo = "/", handleDelete = () => { } }) {
    return (
        <>
            {
                isLink ? (
                    <button className={`buton ${!pointerEvents && "pointer-event-none"}`} style={{ backgroundColor: bgColor }} onClick={handleDelete}>
                        <Link to={linkTo} className='link'>
                            {textContent}
                        </Link>
                    </button>
                ) : (
            <button className={`buton ${!pointerEvents && "pointer-event-none"}`} style={{ backgroundColor: bgColor }} onClick={handleDelete}>
                {textContent}
            </button>
            )
            }
        </>
    )
}
