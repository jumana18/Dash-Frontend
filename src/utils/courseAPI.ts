import { useMutation } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";
import { axiosInstance } from "../utils/axios";

/* -------------------- Types -------------------- */
export interface Course {
  _id: string;
  title: string;
  duration: string;
}

export interface CreateCoursePayload {
  title: string;
  duration: string;
}

export interface UpdateCoursePayload {
  courseId: string;
  courseData: CreateCoursePayload;
}

/* -------------------- API Functions -------------------- */

// Get all courses
export const getAllCourses = async (): Promise<Course[]> => {
  const res = await axiosInstance.get<{ data: Course[] }>(
    "/courses/getcourses"
  );
  return res.data.data;
};

// Create course
export const createCourse = async (
  courseData: CreateCoursePayload
): Promise<AxiosResponse<Course>> => {
  return axiosInstance.post<Course>("/courses/createcourses", courseData);
};

// Update course
export const updateCourse = async ({
  courseId,
  courseData,
}: UpdateCoursePayload): Promise<AxiosResponse<Course>> => {
  return axiosInstance.put<Course>(
    `/courses/updatecourses/${courseId}`,
    courseData
  );
};

// Delete course
export const deleteCourse = async (
  courseId: string
): Promise<AxiosResponse<{ message: string }>> => {
  return axiosInstance.delete(`/courses/deletecourses/${courseId}`);
};

/* -------------------- React Query Hooks -------------------- */

export const useCreateCourse = () => {
  return useMutation({
    mutationKey: ["createCourse"],
    mutationFn: createCourse,
  });
};

export const useUpdateCourse = () => {
  return useMutation({
    mutationKey: ["updateCourse"],
    mutationFn: updateCourse,
  });
};

export const useDeleteCourse = () => {
  return useMutation({
    mutationKey: ["deleteCourse"],
    mutationFn: deleteCourse,
  });
};
