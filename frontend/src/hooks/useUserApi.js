import toast from 'react-hot-toast'
import {
  deleteProfile,
  getProfile,
  loginUser,
  registerUser,
  updateProfile
} from '../api/userApi'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

//* Get user Profile or details
const useGetUserProfile = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: getProfile
  })
}

//* Register User
const useRegisterUser = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      toast.success('User registered.')
      queryClient.invalidateQueries({ queryKey: ['users'] })
    },
    onError: error => {
      console.log({ error })
      const message = error?.response?.data?.message
      toast.error(message)
    }
  })
}

//* Login User
const useLoginUser = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: loginUser,
    onSuccess: () => {
      toast.success('Logged in!')
      queryClient.invalidateQueries({ queryKey: ['users'] })
    },
    onError: error => {
      console.log({ error })
      const message = error?.response?.data?.message
      toast.error(message)
    }
  })
}

//* Update Profile
const useUpdateProfile = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateProfile,
    onSuccess: () => {
      toast.success('Profile up to date.')
      queryClient.invalidateQueries({ queryKey: ['users'] })
    },
    onError: error => {
      console.log({ error })
      const message = error?.response?.data?.message
      toast.error(message)
    }
  })
}

//* Delete user Account
const useDeleteAccount = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteProfile,
    onSuccess: () => {
      toast.success('Account deleted.')
      queryClient.invalidateQueries({ queryKey: ['users'] })
    },
    onError: error => {
      console.log({ error })
      const message = error?.response?.data?.message
      toast.error(message)
    }
  })
}

export {
  useRegisterUser,
  useLoginUser,
  useUpdateProfile,
  useDeleteAccount,
  useGetUserProfile
}
