const isClient = () => {
  return typeof window !== 'undefined'
}

export default isClient
