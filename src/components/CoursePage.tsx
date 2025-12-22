import React, { useState } from "react";
import { Table, Button, Modal, Form, Input, message, Popconfirm } from "antd";
import {
  useCreateCourse,
  useDeleteCourse,
  useUpdateCourse,
  getAllCourses,
} from "../utils/courseAPI";
import { useQuery } from "@tanstack/react-query";
import type { ColumnsType } from "antd/es/table";

/* -------------------- Types -------------------- */
interface Course {
  _id: string;
  title: string;
  duration: string;
}

interface FormValues {
  title: string;
  duration: string;
}

/* -------------------- Component -------------------- */
const CoursePage: React.FC = () => {
  /* ---------- Fetch Courses ---------- */
  const { data, isLoading, refetch } = useQuery<Course[]>({
    queryKey: ["getCourses"],
    queryFn: getAllCourses,
  });

  /* ---------- Mutations ---------- */
  const { mutate: createCourse } = useCreateCourse();
  const { mutate: updateCourse } = useUpdateCourse();
  const { mutate: deleteCourse } = useDeleteCourse();

  /* ---------- State ---------- */
  const [openModal, setOpenModal] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [form] = Form.useForm<FormValues>();

  /* ---------- Submit (Create / Update) ---------- */
  const onFormSubmit = (values: FormValues) => {
    if (editingCourse) {
      // UPDATE
      updateCourse(
        {
          courseId: editingCourse._id,
          courseData: values,
        },
        {
          onSuccess: () => {
            message.success("Course updated successfully");
            setEditingCourse(null);
            setOpenModal(false);
            form.resetFields();
            refetch();
          },
        }
      );
    } else {
      // CREATE
      createCourse(values, {
        onSuccess: () => {
          message.success("Course created successfully");
          setOpenModal(false);
          form.resetFields();
          refetch();
        },
      });
    }
  };

  /* ---------- Delete ---------- */
  const handleDelete = (id: string) => {
    deleteCourse(id, {
      onSuccess: () => {
        message.success("Course deleted successfully");
        refetch();
      },
      onError: () => message.error("Delete failed"),
    });
  };

  /* ---------- Open Update Modal ---------- */
  const openUpdateModal = (course: Course) => {
    setEditingCourse(course);
    form.setFieldsValue({
      title: course.title,
      duration: course.duration,
    });
    setOpenModal(true);
  };

  /* ---------- Table Columns ---------- */
  const columns: ColumnsType<Course> = [
    { title: "Title", dataIndex: "title", key: "title" },
    { title: "Duration", dataIndex: "duration", key: "duration" },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <>
          <Button
            type="primary"
            size="small"
            onClick={() => openUpdateModal(record)}
            style={{ marginRight: 8 }}
          >
            Edit
          </Button>

          <Popconfirm
            title="Delete course?"
            onConfirm={() => handleDelete(record._id)}
          >
            <Button danger size="small">
              Delete
            </Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  /* ---------- UI ---------- */
  return (
    <div>
      <Button
        type="primary"
        onClick={() => {
          setEditingCourse(null);
          form.resetFields();
          setOpenModal(true);
        }}
        style={{ marginBottom: 16 }}
      >
        Add Course
      </Button>

      <Table
        dataSource={data ?? []}
        columns={columns}
        rowKey="_id"
        loading={isLoading}
      />

      <Modal
        open={openModal}
        title={editingCourse ? "Update Course" : "Create Course"}
        footer={null}
        onCancel={() => {
          setOpenModal(false);
          setEditingCourse(null);
          form.resetFields();
        }}
      >
        <Form form={form} layout="vertical" onFinish={onFormSubmit}>
          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true, message: "Title is required" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Duration"
            name="duration"
            rules={[{ required: true, message: "Duration is required" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              {editingCourse ? "Update" : "Create"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CoursePage;
