import * as url from './constantApi';
import axiosService from '@/utils/axiosServiceUtils';

export const OAuthSignIn = (email: string, password: string) => {
    return axiosService.post(`${url.oauth_signin}`, {email, password});
};

export const OAuthSignUp = (email: string, password: string) => {
    return axiosService.post(`${url.oauth_signup}`, {email, password});
};

export const OAuthSignInGG = (token_response: string) => {
    return axiosService.post(`${url.oauth_signin_gg}`, {token_response});
};

export const OAuthSignOut = (refresh_token: string) => {
    return axiosService.post(`${url.oauth_signout}`, {refresh_token});
};

export const OAuthRefreshToken = (refresh_token: string) => {
    return axiosService.post(`${url.oauth_refresh_token}`, {refresh_token});
};

export const OAuthChangePassword = (accessToken: string, old_password: string, new_password: string) => {
    axiosService.setBearerToken(accessToken);
    return axiosService.post(`${url.oauth_change_password}`, {old_password, new_password});
};