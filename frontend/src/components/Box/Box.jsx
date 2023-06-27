import './box.css';

export default function Box({icon, boxText, boxNumber, bgColor}) {
    return (
        <div className='box-container' style={{backgroundColor: bgColor}}>
            <div className="icon-container">
                {icon}
            </div>
            <span className="box-text">{boxText}</span>
            <span className="box-number">{boxNumber}</span>
        </div>
    )
}
