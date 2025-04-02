import { NextAuthOptions } from 'next-auth';
import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { OAuthRefreshToken, OAuthSignIn, OAuthSignInGG, OAuthSignUp } from '@/apis/auth/apiAuth';

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID as string;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET as string;

export const authOptions: NextAuthOptions = {
    session: {
        strategy: 'jwt',
    },
    pages: {
        signIn: '/sign-in',
    },
    providers: [
        GoogleProvider({
            clientId: GOOGLE_CLIENT_ID,
            clientSecret: GOOGLE_CLIENT_SECRET,
            authorization: {
                params: {
                    prompt: 'select_account'
                }
            }
        }),
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                type: { label: 'Auth', type: 'text' },
                email: { label: 'Email', type: 'text' },
                password: { label: 'Password', type: 'password' }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password || !credentials?.type) {
                    return null;
                }

                try {
                    if (credentials.type === 'signin') {
                        const response = await OAuthSignIn(
                            credentials.email,
                            credentials.password,
                        );

                        if (response?.data?.token) {
                            return {
                                id: credentials.email,
                                email: credentials.email,
                                type: 'signin' as const,
                                accessToken: response?.data?.token?.access,
                                refreshToken: response?.data?.token?.refresh,
                                expiresIn: response?.data?.token?.expired_in
                            };
                        }
                    } 
                    
                    if (credentials.type === 'signup') {
                        const response = await OAuthSignUp(
                            credentials.email,
                            credentials.password,
                        );

                        if (response?.data?.token) {
                            return {
                                id: credentials.email,
                                email: credentials.email,
                                type: 'signup' as const,
                                accessToken: response?.data?.token?.access,
                                refreshToken: response?.data?.token?.refresh,
                                expiresIn: response?.data?.token?.expired_in
                            };
                        }
                    }
                    
                    return null;
                } catch (error) {
                    console.error('Authorize error:', error);
                    return null;
                }
            }
        }),
    ],
    callbacks: {
        async signIn({ account, profile, user }) {
            if (account?.provider === 'google') {
                return !!profile?.email;
            }
            
            if (account?.provider === 'credentials') {
                return !!user;
            }

            return false;
        },
        async jwt({ token, account, user, profile }) {
            if (user?.type) {
                token.type = user.type;
            }

            if (account?.provider === 'google' && profile) {
                token.accessTokenGG = account.access_token ?? '';
                token.idTokenGG = account.id_token ?? '';
                token.email = profile.email;

                try {
                    const rsp = await OAuthSignInGG(account.access_token as string);
                    token.accessToken = rsp?.data?.token?.access;
                    token.refreshToken = rsp?.data?.token?.refresh;
                    token.accessTokenExpires = rsp?.data?.token?.expired_in;
                } catch (error) {
                    console.error('Error fetching Google tokens:', error);
                    return { ...token, error: 'GoogleAuthError' };
                }
            }

            if (account?.provider === 'credentials' && user) {
                token.accessToken = user.accessToken;
                token.refreshToken = user.refreshToken;
                token.accessTokenExpires = user.accessTokenExpires;
            }

            if (token.accessTokenExpires && 
                Date.now() > token.accessTokenExpires - 60000) {
                return await refreshAccessToken(token);
            }

            return token;
        },
        async session({ session, token }) {
            return {
                ...session,
                accessToken: token.accessToken,
                refreshToken: token.refreshToken,
                accessTokenGG: token.accessTokenGG,
                accessTokenExpires: token.accessTokenExpires,
                idTokenGG: token.idTokenGG,
                email: token.email,
                error: token.error
            };
        },
    },
};

async function refreshAccessToken(token: any) {
    try {
        const rsp = await OAuthRefreshToken(token.refreshToken);
        return {
            ...token,
            accessToken: rsp?.data?.token?.access,
            accessTokenExpires: rsp?.data?.token?.expired_in,
            error: undefined
        };
    } catch (error) {
        console.error('Error refreshing access token:', error);
        return {
            ...token,
            error: 'RefreshAccessTokenError',
        };
    }
}

export default NextAuth(authOptions);