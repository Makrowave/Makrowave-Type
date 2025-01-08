import axios, { AxiosError } from 'axios'

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
})

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // console.log(error)
    let axiosError = error as AxiosError
    let errorMessage = axiosError.response?.data
    if (typeof errorMessage === 'string') axiosError.message = errorMessage
    return Promise.reject(axiosError)
  },
)

export default axiosInstance
