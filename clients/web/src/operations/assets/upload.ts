import axios, { AxiosRequestConfig } from 'axios'

const upload = async (url: string, data: any, type: string, config: AxiosRequestConfig = {}) => {
  try {
    const response = await axios.put(url, data, {
      ...config,
      headers: {
        ...config.headers,
        'Content-Type': type,
      },
    })
    return response
  } catch (error) {
    console.error(error)
    return null
  }
}

export default upload
