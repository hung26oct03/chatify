export const URL_SITE = process.env.NEXT_PUBLIC_API_BASE_URL;

export const oauth_signin = `${URL_SITE}/auth/login`;
export const oauth_signup = `${URL_SITE}/auth/signup`;
export const oauth_signin_gg = `${URL_SITE}/auth/google-login`;
export const oauth_signout = `${URL_SITE}/auth/logout`;
export const oauth_change_password = `${URL_SITE}/auth/change-password`;
export const oauth_refresh_token = `${URL_SITE}/auth/refresh-token`;