import React, { useState, useEffect, useRef } from 'react'
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import './Slider.css'


const Slider = ({ slidesContent }) => {
    if (!slidesContent || slidesContent.length === 0) {
        return <div>No hay diapositivas para mostrar.</div>;
    }

    const totalSlides = slidesContent.length

    const [currentIndex, setCurrentIndex] = useState(0);

    const slideGroupRef = useRef(null); // Ref para el div.slide_group
    const slidesRef = useRef([]);      // Ref para cada div.slide (será un array de refs)
    const timeoutRef = useRef(null);   // Ref para almacenar el ID del setTimeout (para el avance automático)

const goToNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex === totalSlides - 1 ? 0 : prevIndex + 1));
    }

    const goToPrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? totalSlides - 1 : prevIndex - 1));
    }

    const startAutoAdvance = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = setTimeout(() => {
            goToNext();
        }, 4000);
    };

    useEffect(() => {
        if (!slideGroupRef.current) {
            return;
        }

        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        // Aplica la transformación para mover el grupo de diapositivas
        const offset = -currentIndex * 100;
        slideGroupRef.current.style.transform = `translateX(${offset}%)`;

        startAutoAdvance();

        // Función de limpieza para detener el avance automático al desmontar o re-ejecutar el efecto
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, [currentIndex, totalSlides])

    return (
        <div className='slider_container'>
            <div className="slider">
                <div className="slide_viewer">
                    <div className="slide_group" ref={slideGroupRef}>
                        {
                            slidesContent.map((content, index) => (
                                <div key={index} className="slide" ref={el => (slidesRef.current[index] = el)}>
                                    <img src={content} alt={`Slide ${index + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>

            <div className="directional_nav">
                <button className="previous_btn"><SlArrowLeft /></button>
                <button className="next_btn"><SlArrowRight /></button>
            </div>
        </div>
    )
}

export default Slider