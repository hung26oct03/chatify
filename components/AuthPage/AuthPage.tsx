import React, { useState } from 'react';
import styles from './AuthPage.module.scss';
import LoginPage from './components/LoginPage/LoginPage';
import RegisterPage from './components/RegisterPage/RegisterPage';
import OverlayPanel from './components/OverlayPanel/OverlayPanel';

const AuthPage = () => {
    const [isPanel, setIsPanel] = useState(false);

    const handleClickSignIn = () => {
        setIsPanel(false);
    }

    const handleClickSignUp = () => {
        setIsPanel(true);
    }

    return (
        <div className={`${styles.auth_page}`}>
            <div className={`${styles.auth_page_container} ${isPanel && styles.active_overlay}`}>
                <div className={`${styles.container_login_page}`}>
                    <LoginPage />
                </div>

                <div className={`${styles.container_register_page}`}>
                    <RegisterPage />
                </div>

                <div className={`${styles.container_overlay_panel}`}>
                    <OverlayPanel handleClickSignIn={handleClickSignIn} handleClickSignUp={handleClickSignUp} isPanel={isPanel}/>
                </div>
            </div>
        </div>
    );
};

export default AuthPage;