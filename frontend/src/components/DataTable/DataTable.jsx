// import { useEffect, useState } from 'react';
import TableRow from '../TableRow/TableRow';
import './dataTable.css';
// import axios from 'axios';

export default function DataTable({ blogs }) {
    
    return (
        <div className='data-table-wrapper'>
            <div className="data-table-headings">
                <span className="data-table-heading">Name</span>
                <span className="data-table-heading">Email</span>
                <span className="data-table-heading">Title</span>
                <span className="data-table-heading">Created</span>
            </div>
            {
                blogs.map((blog) => (
                    <TableRow key={blog?._id} blog={blog} />
                ))
            }
        </div>
    )
}
