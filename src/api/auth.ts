import api from '@/lib/axios'

export const registerUser = async ({
  name,
  email,
  password,
}: {
  name: string
  email: string
  password: string
}) => {
  try {
    const result = await api.post('/auth/register', { name, email, password })
    return result.data
  } catch (error: any) {
    const message = error.response?.data?.message || 'Failed to register'
    throw new Error(message)
  }
}
