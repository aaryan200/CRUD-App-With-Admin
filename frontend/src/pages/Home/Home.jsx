import Bar from '../../components/Bar/Bar';
import Blogs from '../../components/Blogs/Blogs';
import './home.css';

export default function Home() {
    return (
        <div style={{position: 'relative'}}>
            <Bar />
            <Blogs />
        </div>
    )
}
