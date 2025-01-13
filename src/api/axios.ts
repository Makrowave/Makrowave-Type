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
    let errors = error.response?.data?.errors
    if (errors !== null && errors !== undefined) {
      let message = ''
      for (let key in errors) {
        message += errors[key][0] += '\n'
      }
      axiosError.message = message
    } else if (typeof errorMessage === 'string') axiosError.message = errorMessage
    if (error.message === '') error.message = 'Unexpected error happened'
    return Promise.reject(axiosError)
  },
)

export default axiosInstance
