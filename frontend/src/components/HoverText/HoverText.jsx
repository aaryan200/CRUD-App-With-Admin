import './hoverText.css';

export default function HoverText({ textContent }) {
    return (
        <div className='hover-text-container'>
            <h3>{textContent}</h3>
        </div>
    )
}
