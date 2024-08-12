import React, { useEffect, useState } from 'react';
import DataTable from './DataTable';
import axios from 'axios';

const columns = [
  { field: 'id', headerName: 'ID', width: 100 },
  { field: 'userName', headerName: 'User Name', width: 150 },
  { field: 'email', headerName: 'Email', width: 200 },
  { field: 'role', headerName: 'Role' },
  { field: 'confirmEmail', editable: false, headerName: 'Confirm Email', type: 'boolean', width: 150 },
  { field: 'lastOpenDate', headerName: 'Last Open Date', width: 200 },
];
function UserList() {
  const [tableData, setDataTable] = useState([]);

  const getData = async () => {
    try {
      const { data } = await axios.get('http://localhost:3001/api/v1/auth/all');
      const formattedData = data.findAll.map((item, index) => ({
        id: index + 1,
        ...item,
      }));
      setDataTable(formattedData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  return (

    <div>
      <DataTable rows={tableData} columns={columns} slug="User" searchField="userName" />

    </div>
  );
}

export default UserList;
