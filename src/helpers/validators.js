export const isValidImage = (value) => {
  if (!value) return true

  if (typeof value !== 'string') return false

  const validFormats = ['png', 'jpeg', 'jpg', 'svg']
  const extension = value.split('.').pop()

  return validFormats.includes(extension)
}
