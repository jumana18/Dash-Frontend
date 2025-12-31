import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";
import { axiosInstance } from "./axios";

/* -------------------- Types -------------------- */
export interface Student {
  _id: string;
  name: string;
  email: string;
  phone: string;
  course: {
    _id: string;
    title: string;
  };
}

export interface CreateStudentPayload {
  name: string;
  email: string;
  phone: string;
  course: string; // Course ObjectId
}

export interface UpdateStudentPayload {
  studentId: string;
  studentData: CreateStudentPayload;
}

/* -------------------- API Functions -------------------- */

// Get all students
export const getAllStudents = async (): Promise<Student[]> => {
  const res = await axiosInstance.get(
    "/students/getstudents"
  );
  return res.data ?? []; // never undefined
};



// Create student
export const createStudent = async (studentData: CreateStudentPayload) => {
  const res = await axiosInstance.post("/students/createstudent",studentData);
  return res.data;
};

// Update student
export const updateStudent = async ({
  studentId,
  studentData,
}: UpdateStudentPayload): Promise<Student> => {
  const res: AxiosResponse<Student> = await axiosInstance.put(
    `/students/updatestudent/${studentId}`,
    studentData
  );
  return res.data;
};

// Delete student
export const deleteStudent = async (
  studentId: string
): Promise<{ message: string }> => {
  const res: AxiosResponse<{ message: string }> = await axiosInstance.delete(
    `/students/deletestudent/${studentId}`
  );
  return res.data;
};

/* -------------------- React Query Hooks -------------------- */

// Get all students
export const useGetStudents = () => {
  return useQuery({
    queryKey: ["students"],
    queryFn: getAllStudents,
    placeholderData: [], // safe default
  });
};
// Create student
export const useCreateStudent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createStudent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["students"] });
    },
  });
};

// Update student
export const useUpdateStudent = () => {
  return useMutation({
    mutationKey:['createStudent'],
    mutationFn: updateStudent,
  });
};

// Delete student
export const useDeleteStudent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteStudent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["students"] });
    },
  });
};
