import { makeStyles } from '@material-ui/core/styles';
import React from 'react';

const useStyles = makeStyles({
    backgroundStyles: {
        backgroundColor: '#d1f7f9',
        width: '100%',
        height: '500px',
        margin: '0 auto',
        borderRadius: '20px',
        marginTop: '50px',
        lineHeight: '28px',
        fontSize: '20px',
        padding: '15px',
        color: '#0e2d68',
        fontWeight: 'bold'
    },
    imagesStyles: {
        width: '50%',
        height: '50%'
    },
    displayStyles: {
        display: 'flex'
    }
})
// #d1f7f9
const AboutUs = () => {
    const classes = useStyles();
    return (
        <div className={classes.backgroundStyles}>
            <h2 style={{ textAlign: 'center', fontSize: '40px' }}>О нас</h2>
            <div className={classes.displayStyles}>
                <img className={classes.imagesStyles} src="https://cdn.shopify.com/s/files/1/0279/9277/files/illustration-text-1_1020x.png?v=1587990875" alt="" />
                <p >
                    Предоставить возможность всему миру узнать больше о Кыргызстане.
                    Развитие устойчивого туризма в Кыргызстане через профессиональное отношение и улучшение качества туров
                    Позволить нашим клиентам чувствовать себя как дома, предлагая им лучший, уникальный и незабываемый турпродукт
                    Наша природа всё ещё мало изучена, и мы хотим передать её в первозданном виде для будущих поколений
                    Мы поддерживаем древние традиции гостеприимства, чтобы наши гости чувствовали себя уютно и безопасно. Наши клиенты – наша главная ценность.
                    Наши сотрудники — это наша семья и мы хотим, чтобы они развивались и оставались с нами многие годы.</p>
            </div>
        </div>
    );
};

export default AboutUs;