export const convertImage = ({ src, w, h }) => `
         <Image src="${src}" width="${w}" height="${h}" quality="1"/>
                           `
export const toBase64 = (str) =>
  typeof window === 'undefined' ? Buffer.from(str).toString('base64') : window.btoa(str)
