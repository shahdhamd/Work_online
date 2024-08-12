import React, { useEffect, useState } from 'react'
import DataTable from './DataTable';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import './Css.css'
import { useParams } from 'react-router-dom';

function SubserviceList() {
    const { id } = useParams();
    const columns = [
        { field: 'id', headerName: 'ID', width: 200 },
        { field: 'name', headerName: 'Model Name', width: 200 },
        {
            field: 'Subservice',
            headerName: 'Subservice',
            editable: false,
            width: 200,
            renderCell: (params) => {
                const serviceId = id;
                return (

                    <div className='action' style={{ gap: '20px', display: 'flex' }}>
                        <Link
                            to={`/show/${serviceId}/${params.row._id}`}
                            state={{ rowData: params.row }}
                            className='subservice'
                        >
                            <i className="fa-solid fa-layer-group"></i>
                        </Link>

                    </div>
                );
            },
        },
        {
            field: 'action',
            headerName: 'Action',
            editable: false,
            width: 200,
            renderCell: (params) => {
                const modelId = params.row._id;
                return (
                    <div className='action' style={{ gap: '20px', display: 'flex' }}>

                        <Link
                            to={`/update/${id}/${modelId}`}
                            state={{ rowData: params.row }}
                            className='edit'
                        >
                            <i className="fa-solid fa-pen-to-square editIcon"></i>
                        </Link>
                        <Link className='Delete' onClick={() => handleDelete(params.row._id)}>
                            <i className="fa-solid fa-trash-can DeleteIcon"></i>
                        </Link>
                    </div>
                );
            },
        }
    ];

    const [tableData, setTableData] = useState([]);
    let slug = 'SubService'
    const getData = async () => {
        try {
            const { data } = await axios.get(`http://localhost:3001/api/v1/services/allModel/${id}`);
            console.log('all', data)
            console.log('dataservice ', data.findServices.modeling);

            const formattedData = data.findServices.modeling.flat().map((item, index) => ({
                id: index + 1,
                ...item
            }))
            setTableData(formattedData);
            console.log('formatted', formattedData)

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    let token = `rand__${localStorage.getItem('token')}`
    const handleDelete = async (Id) => {
        const headers = {
            token
        };

        // Show SweetAlert confirmation dialog
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
                    await axios.delete(`http://localhost:3001/api/v1/services/deletModel/${id}/${Id}`, { headers });

                    // If deletion is successful, show success message
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your file has been deleted.",
                        icon: "success"
                    });

                    // Update data after successful deletion
                    getData();
                } catch (error) {
                    console.error('Error deleting service:', error);
                }
            }
        });
    }
    useEffect(() => {
        getData()
    }, [DataTable])
    return (
        <div>
            <DataTable rows={tableData} columns={columns} slug={slug} searchField="name" id={id} />
        </div>
    )
}

export default SubserviceList