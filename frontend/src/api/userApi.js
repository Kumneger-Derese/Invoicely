import axiosInstance from '../utils/axiosInstance'

const registerUser = async body => {
  const { data } = await axiosInstance.post('/users/register', body)
  return data
}

const loginUser = async body => {
  const { data } = await axiosInstance.post('/users/register', body)
  return data
}

const updateProfile = async body => {
  const { data } = await axiosInstance.put('/users/me', body)
  return data
}

const deleteProfile = async () => {
  const { data } = await axiosInstance.put('/users/delete')
  return data
}

const getProfile = async () => {
  const { data } = await axiosInstance.get('/users/me')
  return data
}
export { registerUser, loginUser, updateProfile, getProfile, deleteProfile }
