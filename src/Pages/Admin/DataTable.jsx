import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import './Css.css';
import { Link } from 'react-router-dom';

function DataTable({ rows, columns, slug, searchField, id }) {
    const [searchValue, setSearchValue] = useState('');

    const handleSearchChange = (event) => {
        setSearchValue(event.target.value);
    };

    const filterRows = () => {
        return rows.filter((item) =>
            item[searchField] && item[searchField].toLowerCase().includes(searchValue.toLowerCase())
        );
    };

    return (
        <div style={{ display: 'flex', marginTop: '100px', minHeight: '100vh', marginLeft: '100px' }} className='DataTable'>
            <div style={{ height: 'fit-content', width: '100%' }}>
                <h2>{slug} Table</h2>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div className="InputContainer">
                        <input placeholder="Search.." id="input" className="input" name="text" type="text" value={searchValue} onChange={handleSearchChange} />
                    </div>
    
                    {slug !== 'contact' && (
                        <>
                            {slug === 'sservice' || slug === 'User' ? (
                                <>
                                </>
                            ) : (
                                <>
                                    {slug === 'SubService' ? (
                                        <>
                                            <Link to={`/add/${slug}/${id}`} style={{ background: '#2a3b5a', color: 'white', padding: '12px 10px', borderRadius: '10px', marginBottom: '10px' }}>Add {slug}</Link>
                                        </>
                                    ) : (
                                        <>
                                            <Link to={`/add/${slug}`} style={{ background: '#2a3b5a', color: 'white', padding: '12px 10px', borderRadius: '10px', marginBottom: '10px' }}>Add {slug}</Link>
                                        </>
                                    )}
                                </>
                            )}
                        </>
                    )}
                </div>
                <div style={{ width: 'calc(100% - 35px)' }}>
                    <DataGrid
                        style={{ background: 'white', margin: 'auth', textAlign: 'center' }}
                        rows={filterRows()}
                        columns={columns}
                        pagination
                        pageSize={5}
                        checkboxSelection
                        disableColumnFilter
                        disableDensitySelector
                        disableColumnSelector
                    />
                </div>
            </div>
        </div>
    );
    
}

export default DataTable;
