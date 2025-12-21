import React, { useState } from 'react';
import { Table, Button, Modal, Form, Input, message, Popconfirm } from 'antd';
import { useCreateCourse, getAllCourses, useDeleteCourse } from '../utils/courseAPI';
import { useQuery } from '@tanstack/react-query';
import type { ColumnsType } from 'antd/es/table';

// -------------------- Types --------------------
interface Course {
  _id: string;
  title: string;
  duration: string;
}

interface FormValues {
  title: string;
  duration: string;
}

// -------------------- Component --------------------
const CoursePage: React.FC = () => {
  // Fetch courses
  const { data, isLoading, refetch } = useQuery<{ data: Course[] }>({
    queryKey: ['getCourses'],
    queryFn: getAllCourses,
  });

  const { mutate: createCourse } = useCreateCourse();
  const { mutate: deleteCourse } = useDeleteCourse();

  // Modal state
  const [openModal, setOpenModal] = useState(false);
  const [form] = Form.useForm<FormValues>();

  // -------------------- Modal submit --------------------
  const onCreateFormSubmit = (values: FormValues) => {
    console.log("FORM VALUES:", values);

    createCourse(values, {
      onSuccess: (res) => {
        console.log("SUCCESS:", res);
        form.resetFields();
        setOpenModal(false);
        refetch();
      },
      onError: (err: any) => {
        console.log("ERROR:", err.response?.data || err.message);
      },
    });
  };

  const handleDelete = (id: string) => {
    deleteCourse(id, {
      onSuccess: () => {
        message.success('Course deleted successfully');
        refetch();
      },
      onError: (err: any) => {
        console.log(err);
        message.error('Delete failed');
      },
    });
  };

  // -------------------- Table columns --------------------
  const columns: ColumnsType<Course> = [
    { title: 'Title', dataIndex: 'title', key: 'title' },
    { title: 'Duration', dataIndex: 'duration', key: 'duration' },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Popconfirm
          title="Delete course?"
          onConfirm={() => handleDelete(record._id)}
          okText="Yes"
          cancelText="No"
        >
          <Button danger size="small">
            Delete
          </Button>
        </Popconfirm>
      ),
    },
  ];

  return (
    <div>
      <Button
        type="primary"
        onClick={() => setOpenModal(true)}
        style={{ marginBottom: 16 }}
      >
        Add Course
      </Button>

      <Table
        dataSource={Array.isArray(data?.data) ? data.data : []}
        columns={columns}
        rowKey="_id"
        loading={isLoading}
      />

      <Modal
        open={openModal}
        title="Create Course"
        onCancel={() => setOpenModal(false)}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={onCreateFormSubmit}>
          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true, message: 'Title is required' }]}
          >
            <Input placeholder="Enter course title" />
          </Form.Item>

          <Form.Item
            label="Duration"
            name="duration"
            rules={[{ required: true, message: 'Duration is required' }]}
          >
            <Input placeholder="Enter course duration" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CoursePage;

