import { useEffect } from 'react';

import Section1 from '../../components/login/login';
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