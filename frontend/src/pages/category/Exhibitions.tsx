import React, {useEffect} from 'react';
import styles from './Exhibitions.module.css';
import ExhibitionsBanner from "../../components/exhibitions/ExhibitionsBanner";


const Exhibitions = ({category}: any) => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [category]);

    return (
        <div className={styles.container}>
            <div className={styles.inner}>
                <ExhibitionsBanner/>
            </div>
        </div>
    );
};

export default Exhibitions;
