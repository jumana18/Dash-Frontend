import {
  Button,
  Form,
  Input,
  message,
  Modal,
  Select,
  Table,
  Popconfirm,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  getAllStudents,
  useCreateStudent,
  useDeleteStudent,
} from "../utils/studentAPI";
import { getAllCourses } from "../utils/courseAPI";

function StudentsPage() {
  const [addModal, setAddModal] = useState(false);
  const [form] = Form.useForm();

  const { data, refetch } = useQuery({
    queryKey: ["getStudents"],
    queryFn: getAllStudents,
  });

  const { data: courseData } = useQuery({
    queryKey: ["getCourses"],
    queryFn: getAllCourses,
  });

  const { mutate: createStudent } = useCreateStudent();
  const { mutate: deleteStudent } = useDeleteStudent();

  const columns: ColumnsType = [
    {
      title: "Id",
      dataIndex: "_id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },

    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },

    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Course",
      dataIndex: ["course", "title"],
      key: "course",
    },

    {
      title: "Action",
      key: "action",
      render: (_, record: any) => (
        <Popconfirm
          title="Delete Student"
          description="Are you sure you want to delete this student?"
          okText="Yes"
          cancelText="No"
          onConfirm={() => handleDelete(record._id)}
        >
          <Button danger size="small">
            Delete
          </Button>
        </Popconfirm>
      ),
    },
  ];

  const handleSubmit = (values: any) => {
    console.log({ values });

    createStudent(values, {
      onSuccess() {
        form.resetFields();
        refetch();
        setAddModal(false);
      },
      onError() {
        message.error("faild");
      },
    });
  };

  // Delete Student
  const handleDelete = (id: string) => {
    deleteStudent(id, {
      onSuccess() {
        message.success("Student deleted");
        refetch();
      },
      onError() {
        message.error("Delete failed");
      },
    });
  };

  return (
    <>
      <div className="w-full flex justify-end items-center">
        <Button onClick={() => setAddModal(true)}>Add</Button>
      </div>
      <div>
        <Table columns={columns} className="shadow-md" dataSource={data} />
      </div>

      <Modal
        open={addModal}
        onCancel={() => setAddModal(false)}
        footer={null}
        title={"Create Student"}
      >
        <Form layout="vertical" onFinish={handleSubmit} form={form}>
          <Form.Item
            label="Name"
            name={"name"}
            rules={[{ required: true, message: "Name is required" }]}
          >
            <Input placeholder="enter name" />
          </Form.Item>
          <Form.Item
            label="Email"
            name={"email"}
            rules={[
              { required: true, message: "email is required" },
              {
                pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/,
                message: "enter valid email",
              },
            ]}
          >
            <Input placeholder="enter email" />
          </Form.Item>
          <Form.Item
            label="Phone"
            name={"phone"}
            rules={[
              { required: true, message: "phone is required" },
              { min: 10, message: "10 digits required" },
              { max: 10, message: "10 digits maximmum" },
            ]}
          >
            <Input placeholder="enter phone number" type="number" />
          </Form.Item>
          <Form.Item
            label="Courses"
            name={"course"}
            rules={[{ required: true, message: "Select course" }]}
          >
            <Select
              placeholder={"select course"}
              options={
                courseData &&
                courseData.map((course) => ({
                  label: course.title, // what user sees
                  value: course._id, // the actual value sent in the form
                }))
              }
            />
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit" type="primary" className="w-full">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default StudentsPage;
