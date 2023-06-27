import Buton from '../Buton/Buton';
import './heading.css';

export default function Heading({ icon, headingText, buttons = false, blogId="", handleDelete = () => {}}) {
    return (
        <div className='heading-wrapper'>
            <div className="heading-main-wrapper">
                <div className="heading-icon-container">
                    {icon}
                </div>
                <span>{headingText}</span>
            </div>
            {
                buttons && (
                    <div className="table-row-buttons" style={{ display: "flex" }}>
                        <Buton bgColor="var(--primary-color)" textContent="Edit" isLink={true} linkTo={(blogId === "") ? "/" : `/edit/${blogId}`}/>
                        <Buton bgColor="var(--danger-color)" textContent="Delete" isLink={false} handleDelete={handleDelete}/>
                    </div>
                )
            }
        </div>
    )
}
