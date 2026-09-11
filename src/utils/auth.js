import jwtDecode from 'jwt-decode'

export const getToken = () => {
  return localStorage.getItem('token')
}

export const isAuthenticated = () => {
  return !!getToken()
}

export const getUserFromToken = () => {
  const token = getToken()

  if (!token) {
    return null
  }

  try {
    return jwtDecode(token)
  } catch (error) {
    return null
  }
}

export const getRole = () => {
  return localStorage.getItem('role')
}

export const logout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('role')
}