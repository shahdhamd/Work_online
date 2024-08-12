
import React, { useEffect, useState } from 'react';
import DataTable from './DataTable';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

function Contactlist() {
    const columns = [
        { field: 'id', headerName: 'ID', width: 200 },
        { field: 'proplem', headerName: 'Problem', width: 200 },
        { field: 'createdBy', headerName: 'Created By', width: 200 },
        { field: 'serviceName', headerName: 'Service Name', width: 200 },
        {
            field: 'action',
            headerName: 'Action',
            editable: false,
            width: 200,
            renderCell: (params) => {
                return (
                    <div className='action' style={{ gap: '20px', display: 'flex' }}>
                        <Link className='Delete' onClick={() => handleDelete(params.row._id)}>
                            <i className="fa-solid fa-trash-can DeleteIcon"></i>
                        </Link>
                    </div>
                );
            },
        }
    ];

    const [tableData, setTableData] = useState([]);
    let slug = 'contact';
 
    
    const getData = async () => {
        const token = `rand__${localStorage.getItem('token')}`;
        const headers = { token };
        try {
            const response = await axios.get('http://localhost:3001/api/v1/contact/all',{headers});
            const data = response.data;
    
            if (!data || !data.showAll) {
                throw new Error('Invalid data format received from the server');
            }
    
            const newData = data.showAll.map((item, index) => ({ ...item, id: index + 1 }));
            setTableData(newData);
        } catch (error) {
            console.log('Error fetching data:', error);
        }
    };
    

    const handleDelete = async (id) => {
        const token = `rand__${localStorage.getItem('token')}`;
        const headers = { token };
        console.log(id)

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axios.delete(`http://localhost:3001/api/v1/contact/delet/${id}`, { headers });
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your file has been deleted.",
                        icon: "success"
                    });
                    getData();
                } catch (error) {
                    console.error('Error deleting contact:', error);
                }
            }
        });
    }

    useEffect(() => {
        getData();
    }, [DataTable]);

    return (
        <div>
            <DataTable rows={tableData} columns={columns} slug={slug} searchField="proplem" />
        </div>
    );
}

export default Contactlist;