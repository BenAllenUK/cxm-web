import { CloudinaryContext } from 'cloudinary-react'
import { Cloudinary as CoreCloudinary, Util } from 'cloudinary-core'

export const url = (publicId: any, options: any) => {
  try {
    const scOptions = Util.withSnakeCaseKeys(options)
    const cl = CoreCloudinary.new(scOptions)
    return cl.url(publicId, scOptions)
  } catch (e) {
    console.error(e)
    return null
  }
}

export const fetchPhotos = async (query: string) => {
  const options = {
    cloudName: 'dbiqces70',
    format: 'json',
    type: 'list',
    version: Math.ceil(new Date().getTime() / 1000),
  }

  const urlPath = url(query, options)

  return fetch(`https://res.cloudinary.com/dbiqces70/image/list/sample.json`)
    .then((res) => res.text())
    .then((text) => (text ? JSON.parse(text).resources : []))
}
