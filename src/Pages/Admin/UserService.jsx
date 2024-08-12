import React, { useEffect, useState } from 'react';
import DataTable from './DataTable';
import axios from 'axios';
import { useParams, useLocation, Link } from 'react-router-dom';
import Swal from 'sweetalert2';

function UserService() {
    const columns = [
        { field: 'id', headerName: 'ID', },
        { field: 'servicesName', headerName: 'service Name' },
        {
            field: 'image',
            headerName: 'Avatar',
            width: 200,
            renderCell: (params) => <img src={params.value} alt="Avatar" style={{ width: 50, height: 50 }} />,
        },
        { field: 'servicesDescription', headerName: 'Description', width: 90 },
        { field: 'price', headerName: 'Price' },
        { field: 'time', headerName: 'Delivery duration' },
        {
            field: 'explain',
            headerName: 'explain',
            width: 150,
            renderCell: (params) => {
                const serviceId = id;
                return (

                    <div className='action' style={{ gap: '20px', display: 'flex' }}>
                        <Link
                            to={`/show/${serviceId}/${params.row._id}`}
                            state={{ rowData: params.row }}
                            className='subservice'
                            style={{ color: 'white' }}
                        >
                            show
                        </Link>

                    </div>
                );
            },
        },
        {
            field: 'action',
            headerName: 'Action',
            editable: false,
            width: 150,
            renderCell: (params) => {
                return (
                    <div className='action' style={{ gap: '20px', display: 'flex' }}>
                        <Link
                            to={`/update/${modeId}/${serviceId}/${params.row._id}`}
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
    const { serviceId, id } = useParams();
const modeId=id;
    const [AllData, setAllData] = useState()
    let slug = 'sservice'
    const getData = async () => {
        try {
            const { data } = await axios.get(`http://localhost:3001/api/v1/servicesByUser/all/${id}`);
            console.log('dataservice ', data);
            setAllData(data)
            const formattedData = data.servicingUser.flat().map((item, index) => {
                const user = item.user && item.user.length > 0 ? { ...item.user[0] } : {};
                return {
                    id: index + 1,
                    ...user,
                };
            });

            console.log('for', formattedData)
            // console.log('formatted', formattedData[0].user)

            setTableData(formattedData);
            console.log('tableData', tableData)
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    let token = `rand__${localStorage.getItem('token')}`
    const handleDelete = async (userId) => {
        const headers = {
            token
        };
        const servicesId = AllData.map((item) => {
            if (item.user.length > 0 && item.user[0]._id === userId) {
                console.log('item_id', item._id)
                return item._id;
            }
        });
        console.log(servicesId)
        console.log('userId', userId)

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
                    await axios.delete(`http://localhost:3001/api/v1/servicesByUser/delet/${id}/${servicesId}/${userId}`, { headers });
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your file has been deleted.",
                        icon: "success"
                    });
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
    useEffect(() => {

    }, [AllData])
    return (
        <div>
            <DataTable rows={tableData} columns={columns} slug={slug} searchField="servicesName" id={id} />

        </div>)
}

export default UserService