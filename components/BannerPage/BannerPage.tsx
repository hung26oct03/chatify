import React from 'react';
import Image from 'next/image';
import styles from './BannerPage.module.scss';

import logo from '@/public/static/assets/images/logo/chatify_rm_bg_main.png';
import Loading from '@/public/static/assets/animations/GlobalLoading.json';
import Lottie from 'lottie-react';

const BannerPage = () => {

    return (
        <div className={`${styles.banner_page}`}>
            <div className={`${styles.banner_page_container}`}>
                <Image src={logo} alt='logo chatify' className={`${styles.logo_app}`} />
                <div 
                    className={`${styles.loading} `}
                >
                    <Lottie
                        animationData={Loading}
                        loop={true}
                        autoplay={true}
                    />
                </div>
            </div>
        </div>
    );
};

export default BannerPage;