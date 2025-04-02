import React from 'react';
import Image from 'next/image';
import styles from './OverlayPanel.module.scss';

interface OverlayPanelProps {
    handleClickSignIn: () => void;
    handleClickSignUp: () => void;
    isPanel: boolean;
}

import logo from '@/public/static/assets/images/logo/chatify_rm_bg_main.png';

const OverlayPanel: React.FC<OverlayPanelProps> = ({ handleClickSignIn, handleClickSignUp, isPanel }) => {
    return (
        <div className={`${styles.overlay}`}>
            <div className={`${styles.overlay_panel}`}>
                {isPanel ? (
                    <div className={`${styles.overlay_panel_right}`}>
                        <Image className={`${styles.img_logo}`} src={logo} alt='image logo' />
                        <span className={`${styles.title_overlay}`}>Welcome Back!</span>
                        <p className={`${styles.para}`}>To keep connected with us please login with your personal info</p>
                        <button className={`${styles.btn_signup}`} onClick={handleClickSignIn}>
                            Sign In
                        </button>
                    </div>
                ) : (
                    <div className={`${styles.overlay_panel_left}`}>
                        <Image className={`${styles.img_logo}`} src={logo} alt='image logo' />
                        <span className={`${styles.title_overlay}`}>Hello, Friend!</span>
                        <p className={`${styles.para}`}>Enter your personal details and start journey with us</p>
                        <button className={`${styles.btn_signin}`} onClick={handleClickSignUp}>
                            Sign Up
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default OverlayPanel;