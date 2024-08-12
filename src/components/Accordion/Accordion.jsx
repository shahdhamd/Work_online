import React from 'react'
import { Link } from 'react-router-dom'

function Accordion({ id, services, modelId }) {
    return (
        <div><div className="accordion my-3" id="accordionExample">
            <div className="accordion-item">
                <h2 className="accordion-header">
                    <button className="accordion-button" type="button" style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #dee0e1' }} data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                        الاقسام
                    </button>
                </h2>
                <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                    <div className="accordion-body">
                        <ul>
                            {
                                services.map((item, index) => (
                                    <li key={index}>
                                        <Link to={`/category/${item._id}`} style={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <span className={id && id === item._id ? 'is-active' : ''}>{item.name}</span>
                                            <span className='box'>(4556)</span>
                                        </Link>
                                        
                                        <ul style={{ margin: '0px 0 20px', padding: '0 20px 0 0', borderRight: '2px solid #445b63' }}>
                                            {item.modeling.map((i, subIndex) => (
                                                <li key={subIndex}>
                                                    <Link to={`/subcategory/${item._id}/${i[0]._id}`} style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                        <span className={id && id === item._id && modelId === i[0]._id ? 'is-active' : ''}>{i[0].name}</span>
                                                        <span className='box'>(672)</span>
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        </div>
    )
}

export default Accordion