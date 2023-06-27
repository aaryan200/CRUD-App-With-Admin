import Bar from '../../components/Bar/Bar';
import BlogForm from '../../components/BlogForm/BlogForm';
import './CreateBlog.css';

export default function CreateBlog() {
    return (
        <div style={{ position: 'relative' }}>
            <Bar />
            <BlogForm />
        </div>
    )
}
