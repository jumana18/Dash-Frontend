import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../utils/axios";

/* ---------------- Types ---------------- */
export interface Course {
  _id: string;
  title: string;
}

export interface Student {
  _id: string;
  name: string;
  email: string;
  phone: string;
  status: string;
  course: Course;
}

export interface CreateStudentPayload {
  name: string;
  email: string;
  phone: string;
  status: string;
  course: string; // can be ObjectId or new course name
}

/* ---------------- API ---------------- */
export const createStudent = (data: CreateStudentPayload) =>
  axiosInstance.post("/students/createstudent", data);

export const getAllStudents = async (): Promise<Student[]> => {
  const res = await axiosInstance.get("/students/getstudents");
  return res.data.students;
};

export const getAllCourses = async (): Promise<Course[]> => {
  const res = await axiosInstance.get("/courses/getcourses");
  return res.data.courses;
};

/* ---------------- Hooks ---------------- */
export const useCreateStudent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createStudent,
    onSuccess: () => queryClient.invalidateQueries(["students"]),
  });
};

export const useGetStudents = () =>
  useQuery({
    queryKey: ["students"],
    queryFn: getAllStudents,
  });

export const useGetCourses = () =>
  useQuery({
    queryKey: ["courses"],
    queryFn: getAllCourses,
  });
