import { useMutation } from '@tanstack/react-query'
import type { AxiosResponse } from 'axios'
import { axiosInstance } from '../utils/axios'

/* -------------------- Types -------------------- */
export interface Course {
  _id: string
  title: string
  duration: string
}

export interface CreateCoursePayload {
  title: string
  duration: string
}

export interface UpdateCoursePayload {
  courseId: string
  courseData: CreateCoursePayload
}

/* -------------------- API Functions -------------------- */

// Get all courses
export const getAllCourses = async (): Promise<AxiosResponse<{ data: Course[] }>> => {
  return axiosInstance.get<{ data: Course[] }>('/getcourses')
}

// Create course
export const createCourse = async (
  courseData: CreateCoursePayload
): Promise<AxiosResponse<Course>> => {
  return axiosInstance.post<Course>('/createcourses', courseData)
}

// Get course by ID
export const getCourseById = async (
  courseId: string
): Promise<AxiosResponse<Course>> => {
  return axiosInstance.get<Course>(`/getcourses/${courseId}`)
}

// Update course
export const updateCourse = async ({
  courseId,
  courseData,
}: UpdateCoursePayload): Promise<AxiosResponse<Course>> => {
  return axiosInstance.put<Course>(
    `/updatecourses/${courseId}`,
    courseData
  )
}

// Delete course
export const deleteCourse = async (
  courseId: string
): Promise<AxiosResponse<{ message: string }>> => {
  return axiosInstance.delete(`/deletecourses/${courseId}`)
}

/* -------------------- React Query Hooks -------------------- */

export const useCreateCourse = () => {
  return useMutation<AxiosResponse<Course>, unknown, CreateCoursePayload>({
    mutationKey: ['createCourse'],
    mutationFn: createCourse,
  })
}

export const useDeleteCourse = () => {
  return useMutation<AxiosResponse<{ message: string }>, unknown, string>({
    mutationKey: ['deleteCourse'],
    mutationFn: deleteCourse,
  })
}
