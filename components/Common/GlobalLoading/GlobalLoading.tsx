import React from 'react';
import Lottie from 'lottie-react';
import styles from './GlobalLoading.module.scss';

import Loading from '@/public/static/assets/animations/GlobalLoading.json';

interface CustomeLoading {
    width: number,
    height: number
}

const GlobalLoading: React.FC<CustomeLoading> = ({ width, height}) => {
    return (
        <div 
            className={`${styles.loading} `}
            style={{width, height}}
        >
            <Lottie
                animationData={Loading}
                loop={true}
                autoplay={true}
            />
        </div>
    );
};

export default GlobalLoading;