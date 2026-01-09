import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";
import { axiosInstance } from "./axios";



//Types

export interface Teacher {
  _id: string;
  name: string;
  email: string;
  phone: string;
  department: string;
  course: {
    _id: string;
    title: string;
  };
}

export interface CreateTeacherPayload {
  name: string;
  email: string;
  phone: string;
  course: string; // Course ObjectId
  image: any;
}

export interface UpdateTeacherPayload {
  teacherId: string;
 teacherData: CreateTeacherPayload;
}


//API FUNCTION //

//Get all teacher

export const getAllTeacher = async (): Promise<Teacher[]> => {
  const res = await axiosInstance.get(
    "/teacher/getteacher"
  );
  return res.data ?? []; // never undefined
};


// Create teacher
export const createTeacher = async (teachertData: FormData) => {
  const res = await axiosInstance.post("/teacher/createteacher", teachertData, {
    headers: {
      "Content-Type": "multipart/formdata",
    },
  });
  return res.data;
};


// Update teacher
export const updateTeacher = async ({
  teacherId,
  teacherData,
}: {
  teacherId: string;
  teacherData: FormData;
}) => {
  const res = await axiosInstance.put(
    `/teacher/updateteacher/${teacherId}`,
    teacherData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return res.data;
};

// Delete teacher
export const deleteTeacher = async (
  teacherId: string
): Promise<{ message: string }> => {
  const res: AxiosResponse<{ message: string }> = await axiosInstance.delete(
    `/teacher/deleteteacher/${teacherId}`
  );
  return res.data;
};


//React Query Hooks//


// Get all teacher
export const useGetTeacher = () => {
  return useQuery({
    queryKey: ["teacher"],
    queryFn: getAllTeacher,
    placeholderData: [], // safe default
  });
};


// Create teacher
export const useCreateTeacher = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createTeacher,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["teacher"] });
    },
  });
};


// Update teacher
export const useUpdateTeacher = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateTeacher,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["teacher"] });
    },
  });
};


// Delete teacher
export const useDeleteTeachert = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteTeacher,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["teacher"] });
    },
  });
};
