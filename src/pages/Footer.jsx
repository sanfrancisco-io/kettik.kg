import React from 'react';
import HomeWorkIcon from '@material-ui/icons/HomeWork'
import { makeStyles } from '@material-ui/core/styles';
import MailIcon from '@material-ui/icons/Mail'
import PhoneIcon from '@material-ui/icons/Phone';
import { textAlign } from '@mui/system';
const useStyles = makeStyles({
    footerStyles: {
        marginTop: '50px',
        backgroundColor: '#424545',
        display: 'flex',
        width: '100%'
    },
    footerChildren: {
        width: '25%',
        margin: '0 auto',
        color: '#fff',
        lineHeight: '40px',
        fontSize: '17px'
    },
    footerChildrenItems: {
        listStyle: 'none',
        textAlign: 'center'
    },
    textStyles: {
        textAlign: 'center'
    }
})
const Footer = () => {
    const classes = useStyles();
    return (
        <div className={classes.footerStyles}>
            <div className={classes.footerChildren}>
                <h2 className={classes.textStyles}>Kettik</h2>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos non blanditiis dignissimos excepturi quas ad numquam quia sit facilis dicta at eum molestias ducimus, quam quis.</p>
            </div>
            <div className={classes.footerChildren}>
                <h2 className={classes.textStyles}>Туры</h2>
                <ul className={classes.footerChildrenItems}>
                    <li>Экскурсионные туры</li>
                    <li>Споритивные туры</li>
                    <li>Горные туры</li>
                </ul>
            </div>
            <div className={classes.footerChildren}>
                <h2 className={classes.textStyles}>Контакты</h2>
                <ul className={classes.footerChildrenItems}>
                    <li><HomeWorkIcon />Бульвар Эркиндик 28</li>
                    <li><MailIcon />kettikTours@gmail.com</li>
                    <li><PhoneIcon />+959 222955</li>
                </ul>
            </div>
        </div>
    );
};

export default Footer;