import React, { useContext } from 'react';
import { clientContext } from '../contexts/ClientContext';
import { makeStyles } from '@material-ui/core/styles';

const Pagination = () => {
    const { postPerPage, totalPosts, changePage } = useContext(clientContext)
    const pageNumber = []
    for (let i = 1; i <= Math.ceil(totalPosts / postPerPage); i++) {
        pageNumber.push(i)
    }
    const useStyles = makeStyles({
        paginationStyles: {
            listStyle: 'none',
            display: 'inline',
            cursor: 'pointer',
            border: '1px double black',
            width: '15px',
            padding: '4px',
            margin: '5px',
            borderRadius: '3px',
            fontWeight: 'bold',
            '&:hover': {
                backgroundColor: '#9FE2BF'
            }
        }
    })
    const classes = useStyles();
    return (
        <div style={{ textAlign: 'center' }}>
            {
                pageNumber.map(item => (
                    <li className={classes.paginationStyles} onClick={() => {
                        changePage(item)
                        window.scrollTo(0, 0)
                    }} key={item}>
                        {item}
                    </li>
                ))
            }
        </div>
    );

};

export default Pagination;