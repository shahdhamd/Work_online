import React, { useState, useEffect } from 'react';

function AccordionPrice({ allService, setSearchValue, services }) {
    const [priceRange, setPriceRange] = useState('');
    console.log('price', allService)
    const searchPrice = () => {
        if (allService) {
            if (priceRange !== '') {
                setSearchValue(allService.filter((item) => {
                    if (item.user.length > 0) {
                        return parseFloat(item.user[0].price) < parseFloat(priceRange);
                    }
                }));
            } else {
                setSearchValue(allService);
                console.log('Please select a price range');
            }
        } else if (services) {
            if (priceRange !== '') {
                const filter = services.filter((item) => {
                    return item.servicingUser.some(i => {
                        if (i.user.length > 0 && parseFloat(i.user[0].price) < parseFloat(priceRange)) {
                            return item;
                        }
                    });
                });
                setSearchValue(filter);
            } else {
                setSearchValue(services);
                console.log('Please select a price range');
            }
        }
    };
    

    const handlePriceChange = (e) => {
        const selectedPrice = e.target.value;
        console.log(selectedPrice)
        setPriceRange(selectedPrice);
    };

    useEffect(() => {
        searchPrice();
    }, [priceRange]);


    return (
        <div className="accordion" id="accordionExample2" style={{ marginBottom: '15px' }}>
            <div className="accordion-item">
                <h2 className="accordion-header">
                    <button className="accordion-button" type="button" style={{ display: 'flex', justifyContent: 'space-between' }} data-bs-toggle="collapse" data-bs-target="#collapse2" aria-expanded="true" aria-controls="collapse2">
                        سعر الخدمة
                    </button>
                </h2>
                <div id="collapse2" className="accordion-collapse collapse show" data-bs-parent="#accordionExample2">
                    <div className="accordion-body p-0">
                        <form action="" >
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item  py-3">
                                    <input type="radio" name="price" id="" value='' style={{ marginLeft: '10px' }} onChange={handlePriceChange} />
                                    <label htmlFor=""> كل الخيارات </label>
                                </li>
                                <li className="list-group-item  py-3">
                                    <input type="radio" name="price" id="" value='20' style={{ marginLeft: '10px' }} onChange={handlePriceChange} />
                                    <label htmlFor=""> اقل من 20$ </label>
                                </li>
                                <li className="list-group-item  py-3">
                                    <input type="radio" name="price" id="" value='30' style={{ marginLeft: '10px' }} onChange={handlePriceChange} />
                                    <label htmlFor=""> اقل من 30$ </label>
                                </li>
                                <li className="list-group-item  py-3">
                                    <input type="radio" name="price" id="" value='40' style={{ marginLeft: '10px' }} onChange={handlePriceChange} />
                                    <label htmlFor=""> اقل من 40$</label>
                                </li>
                            </ul>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AccordionPrice;
