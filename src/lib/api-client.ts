import axios from 'axios'
import { useAuthStore } from './store/auth-store'
import type { AuthResponse } from '../types/auth-response'

export const httpClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
})

httpClient.interceptors.request.use((config) => {
  const accessToken = useAuthStore.getState().accessToken
  if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`
  return config
})

let refreshPromise: Promise<AuthResponse> | null = null

export const refreshSession = () => {
  refreshPromise ??= axios
    .post<AuthResponse>(
      `${import.meta.env.VITE_API_URL}/auth/refresh`,
      {},
      { withCredentials: true },
    )
    .then((response) => response.data)
    .finally(() => {
      refreshPromise = null
    })

  return refreshPromise
}

httpClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    if (!originalRequest) {
      return Promise.reject(error)
    }

    const isAuthEndpoint = ['/auth/login', '/auth/refresh'].some((path) =>
      originalRequest.url?.includes(path),
    )

    if (error.response?.status !== 401 || isAuthEndpoint || originalRequest._retry) {
      return Promise.reject(error)
    }

    originalRequest._retry = true

    try {
      const { accessToken } = await refreshSession()
      useAuthStore.getState().setAccessToken(accessToken)
      originalRequest.headers.Authorization = `Bearer ${accessToken}`
      return httpClient(originalRequest)
    } catch (refreshError) {
      refreshPromise = null
      useAuthStore.getState().clearSession()
      return Promise.reject(refreshError)
    }
  },
)
