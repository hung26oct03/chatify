import NextAuth from "next-auth"

declare module "next-auth" {
    interface Session {
        accessToken?: string
        refreshToken?: string
        accessTokenGG?: string
        idTokenGG?: string
        accessTokenExpires?: number
        error?: string
        email?: string
        type?: 'signin' | 'signup'
    }

    interface User { 
        id: string
        email?: string
        username?: string
        password?: string
        type?: 'signin' | 'signup'
        accessToken?: string
        refreshToken?: string
        accessTokenExpires?: number
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        accessToken?: string
        refreshToken?: string
        accessTokenGG?: string
        idTokenGG?: string
        accessTokenExpires?: number
        error?: 'GoogleAuthError' | 'CredentialsAuthError' | 'RefreshAccessTokenError' | 'InvalidCredentials'
        email?: string
        type?: 'signin' | 'signup'
    }
}