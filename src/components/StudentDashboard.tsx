import { useEffect, useState } from "react";
import {
  useCreateStudent,
  useDeleteStudent,
  useGetStudents,
  useUpdateStudent,
} from "../utils/studentAPI";
import { getAllCourses,  } from "../utils/courseAPI"; 
import type { Course } from "../utils/courseAPI"; // type-only import
// <- import Course type

const StudentDashboard = () => {
  const { data: students = [], refetch } = useGetStudents();
  const {mutate:createStudent} = useCreateStudent();
  const { mutate: updateStudent } = useUpdateStudent();
  const deleteStudent = useDeleteStudent();

  const [courses, setCourses] = useState<Course[]>([]);
  const [editId, setEditId] = useState<string | null>(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    course: "",
  });

  useEffect(() => {
    getAllCourses().then(setCourses);
  }, []);

  const handleSubmit = async () => {
    if (!form.course) {
      alert("Please select a course");
      return;
    }

    if (editId) {
      await updateStudent({
        studentId: editId,
        studentData: form,
      },{
        onSuccess(){

        },
        onError(){

        }
      });
    } else {
      await createStudent(form,{
        onSuccess(){

        },
        onError(){

        }
      });
    }

    setForm({ name: "", email: "", phone: "", course: "" });
    setEditId(null);
    refetch();
  };

  const handleEdit = (s: any) => {
    setEditId(s._id);
    setForm({
      name: s.name,
      email: s.email,
      phone: s.phone,
      course: s.course._id,
    });
  };

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-5">Student Management</h1>

      {/* FORM */}
      <div className="bg-white p-4 rounded shadow grid grid-cols-2 gap-4">
        <input
          className="border p-2"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          className="border p-2"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          className="border p-2"
          placeholder="Phone"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          r
        />

        <select
          className="border p-2"
          value={form.course}
          onChange={(e) => setForm({ ...form, course: e.target.value })}
        >
          <option value="">Select Course</option>
          {courses.map((c) => (
            <option key={c._id} value={c._id}>
              {c.title}
            </option>
          ))}
        </select>

        <button
          onClick={handleSubmit}
          className="col-span-2 bg-blue-600 text-white py-2 rounded"
        >
          {editId ? "Update Student" : "Create Student"}
        </button>
      </div>

      {/* TABLE */}
      <table className="w-full mt-6 bg-white shadow">
        <thead className="bg-gray-200">
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Course</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {students.map((s: any) => (
            <tr key={s._id} className="border-b text-center">
              <td>{s.name}</td>
              <td>{s.email}</td>
              <td>{s.phone}</td>
              <td>{s.course?.title}</td>
              <td>
                <button
                  onClick={() => handleEdit(s)}
                  className="bg-yellow-500 text-white px-3 py-1 mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteStudent.mutate(s._id)}
                  className="bg-red-600 text-white px-3 py-1"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentDashboard;
