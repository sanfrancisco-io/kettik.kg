import React, { useContext, useEffect } from 'react';
import { clientContext } from '../contexts/ClientContext';
import MediaCard from './Card';
// import Pagination from './Pagination';

const Content = () => {
    // const { getProducts, product, currentPosts } = useContext(clientContext)
    const { getTours, tours } = useContext(clientContext)
    useEffect(() => {
        getTours()
    }, [])
    console.log(tours);
    return (
        <>
            {
                tours ? (
                    <div className='content'>
                        <div className="content-block">
                            {
                                tours.map(item => (
                                    <MediaCard item={item} key={item.id} />
                                ))
                            }
                        </div>
                        {/* <Pagination /> */}
                    </div>
                ) :

                    (
                        <h2>Loading...</h2>
                    )
            }
        </>
    );
};

export default Content;