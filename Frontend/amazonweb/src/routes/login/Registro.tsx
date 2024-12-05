import { useEffect } from 'react';

import Section1 from '../../components/login/Registro/Registro';
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