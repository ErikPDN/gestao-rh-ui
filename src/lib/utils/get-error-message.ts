import { isAxiosError } from 'axios'

export const getErrorMessage = (error: unknown, fallback: string) => {
  if (isAxiosError(error)) {
    const message = error.response?.data?.message

    if (Array.isArray(message)) return message.join('. ')
    if (typeof message === 'string' && message) return message
  }

  return fallback
}
