import { useEffect } from 'react';

import Section1 from '../components/Cuenta_Corporativa/Corporativa_correo';
export default function Route(){

    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);

    return (
    <>
        <Section1/>
    </>
    )
}