import React from 'react'
import CreamyAboutImg from '../../Assets/images/Creamy_about.png'
import './aboutus.css'

const AboutUs = () => {
    return (
        <div className='about-container'>
            <h1 className='about-title'>¿Quienes somos?</h1>
            <img className='about-img' src={CreamyAboutImg} alt="Creamy" />
            <div className='about-text'>
                <p>
                    Creamy es una tienda online especializada en cosmética importada. Nuestro objetivo es acercarte productos de belleza y cuidado personal de alta calidad, seleccionados con curaduría desde distintas partes del mundo.
                </p>
                <p>
                    Creemos en una experiencia de compra simple, visualmente agradable y completamente digital. Por eso, operamos exclusivamente online, ofreciendo un catálogo cuidado, detalles claros y envíos a todo el país.
                </p>
                <p>
                    Nuestra selección incluye productos de skincare, maquillaje y fragancias, con un enfoque minimalista, suave y efectivo.
                </p>
                <p>
                    Descubrí tu próximo favorito en Creamy, sin moverte de casa.
                </p>
            </div>
        </div>
    )
}

export default AboutUs