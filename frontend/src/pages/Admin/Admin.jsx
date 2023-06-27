import './admin.css';
import Bar from '../../components/Bar/Bar'
import Dashboard from '../../components/Dashboard/Dashboard';

export default function Admin() {
    return (
        <div style={{position: 'relative'}}>
            <Bar/>
            <Dashboard/>
        </div>
    )
}
