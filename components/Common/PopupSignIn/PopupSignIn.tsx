import Image from 'next/image';
import React from 'react';
import styles from './PopupSignIn.module.scss';

import brand_google from '../../../public/static/assets/icons/brand_google.svg';

interface PopupSignInProps {
  url: string;
  title: string;
}

const PopupSignIn: React.FC<PopupSignInProps> = ({ url, title }) => {
  const openPopup = () => {
    if (typeof window === "undefined") return;
  
    const dualScreenLeft = window.screenLeft ?? window.screenX;
    const dualScreenTop = window.screenTop ?? window.screenY;
  
    const width =
      window.innerWidth ??
      (typeof document !== "undefined" ? document.documentElement.clientWidth : screen.width);
  
    const height =
      window.innerHeight ??
      (typeof document !== "undefined" ? document.documentElement.clientHeight : screen.height);
  
    const systemZoom = width / window.screen.availWidth;
  
    const left = (width - 500) / 2 / systemZoom + dualScreenLeft;
    const top = (height - 550) / 2 / systemZoom + dualScreenTop;
  
    const newWindow = window.open(
      url,
      title,
      `width=${500 / systemZoom},height=${550 / systemZoom},top=${top},left=${left}`
    );
  
    newWindow?.focus();
  };

  return (
    <button
      type="button"
      className={`${styles.btn_sign_in_gg}`}
      onClick={() => openPopup()}
  >
      <Image src={brand_google} alt='image google' width={16} height={16} className='me-2' />
      {title}
  </button>
  );
};

export default PopupSignIn;