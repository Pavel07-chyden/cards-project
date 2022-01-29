import {instance} from './axios-instance'
import axios, {AxiosResponse} from 'axios'

// Requests
export type LoginData = { // Login
    email: string,
    password: string,
    rememberMe: boolean
}

export type RegistrationsData = { // Registartion
    email: string
    password: string
}

export type ChangeUsersInfoData = { // changeUsersInfo
    name: string
    avatar: string
}

export type PasswordRecoveryData = { // passwordRecovery
    email: string,
    from: string,
    message: string
}

export type NewPasswordData = { // newPassword
    password: string,
    resetPasswordToken: string | undefined
}

// Responses
type LogoutResponse = { // logout
    info: string
    error?: string
}

export type UsersInfoResponse = { // checkAuth -->  dispatch( 'K' AppRouter)     //login -->  'K' Header
    email: string
    name: string
    avatar?: string
    publicCardPacksCount: number
}

type UpdateUserResponse = {   // changeUsersInfo
    updatedUser: UsersInfoResponse
    error?: string
}

export type PasswordResponse = {  // passwordRecovery          //newPassword
    info: string,
    error: string
}

// API
export const authAPI = {
    registration: (payload: RegistrationsData) => instance
        .post<RegistrationsData, AxiosResponse<{ error?: string }>>('/auth/register', payload),

    logout: () => instance
        .delete<LogoutResponse>('/auth/me'),

    checkAuth: () => instance
        .post<{}, AxiosResponse<UsersInfoResponse>>('/auth/me', {}),

    changeUsersInfo: (payload: ChangeUsersInfoData) => instance
        .put<ChangeUsersInfoData, AxiosResponse<UpdateUserResponse>>('/auth/me', payload),

    login: (payload: LoginData) => instance
        .post<LoginData, AxiosResponse<UsersInfoResponse>>(`/auth/login`, payload),

    passwordRecovery: (payload: PasswordRecoveryData) => { return axios
        .post<PasswordRecoveryData, AxiosResponse<PasswordResponse>>('https://neko-back.herokuapp.com/2.0/auth/forgot', payload)},

    newPassword: (payload: NewPasswordData) => axios
        .post<NewPasswordData, AxiosResponse<PasswordResponse>>(`https://neko-back.herokuapp.com/2.0/auth/set-new-password`, payload)
}