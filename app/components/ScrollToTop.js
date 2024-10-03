"use client";
import React, { useState, useEffect } from 'react';


const ScrollToTop = () => {
    const [isVisible, setIsVisible] = useState(false);

    // Show button when page is scrolled down
    const toggleVisibility = () => {
        if (window.pageYOffset > 300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    // Scroll the page to the top
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', toggleVisibility);
        return () => {
            window.removeEventListener('scroll', toggleVisibility);
        };
    }, []);

    return (
        <div className="fixed bottom-[30px] right-[40px] z-40 opacity-65">
            {isVisible && (
                <button onClick={scrollToTop} className='w-[50px] '>
                  <img src='/arrow-top.png' alt="Scroll to top" />
                </button>
            )}
        </div>
    );
};

export default ScrollToTop;
