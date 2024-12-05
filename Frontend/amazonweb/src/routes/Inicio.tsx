import { useEffect } from 'react';

import Navbar from '../components/Navbar';
import Section1 from '../components/Inicio/Section1';
import Section2 from '../components/Inicio/Section2';
import Section3 from '../components/Inicio/Section3';
import Section4 from '../components/Inicio/Section4';
export default function Route(){

    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);

    return (
    <>
        <Navbar/>
        <Section1/>
        <Section2/>
        <Section3/>
        <Section4/>
    </>
    )
}