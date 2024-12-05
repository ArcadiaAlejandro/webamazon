import { useEffect } from 'react';

import Navbar from '../components/Navbar';
import Section1 from '../components/Idioma/idioma';

export default function Route(){

    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);

    return (
    <>
        <Navbar/>
        <Section1/>
    </>
    )
}