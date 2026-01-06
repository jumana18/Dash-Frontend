import {
  Button,
  Form,
  Input,
  message,
  Modal,
  Select,
  Table,
  Popconfirm,
  Upload,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  getAllStudents,
  useCreateStudent,
  useDeleteStudent,
} from "../utils/studentAPI";
import { getAllCourses } from "../utils/courseAPI";

function StudentsPage() {
  const [addModal, setAddModal] = useState(false);
  const [file, setFile] = useState<File | null>(null);
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

  const columns: ColumnsType<any> = [
    {
      title: "Image",
      dataIndex: "image",
      render: (img) =>
        img ? (
          <img
            src={`http://localhost:3000${img}`}
            width={40}
            height={40}
            style={{ borderRadius: 6, objectFit: "cover" }}
          />
        ) : (
          "No Image"
        ),
    },
    { title: "Name", dataIndex: "name" },
    { title: "Email", dataIndex: "email" },
    { title: "Phone", dataIndex: "phone" },
    { title: "Course", dataIndex: ["course", "title"] },
    {
      title: "Action",
      render: (_, record) => (
        <Popconfirm
          title="Delete Student?"
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
    const formData = new FormData();

    formData.append("name", values.name);
    formData.append("email", values.email);
    formData.append("phone", values.phone);
    formData.append("course", values.course);
   
    console.log({file});
    

    if (file) {
      formData.append("image", file); // must be "image"
    }

    createStudent(formData, {
      onSuccess() {
        message.success("Student created");
        form.resetFields();
        setFile(null);
        refetch();
        setAddModal(false);
      },
      onError() {
        message.error("Create failed");
      },
    });
  };
  
  console.log("hsgrvfgvber",FormData);
  

  const handleDelete = (id: string) => {
    deleteStudent(id, {
      onSuccess() {
        message.success("Deleted");
        refetch();
      },
      onError() {
        message.error("Delete failed");
      },
    });
  };

  return (
    <>
      <div className="w-full flex justify-end">
        <Button onClick={() => setAddModal(true)}>Add Student</Button>
      </div>

      <Table columns={columns} dataSource={data} rowKey="_id" />

      <Modal
        open={addModal}
        onCancel={() => setAddModal(false)}
        footer={null}
        title="Create Student"
      >
        <Form layout="vertical" onFinish={handleSubmit} form={form}>
          <Form.Item label="Name" name="name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item label="Email" name="email" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item label="Phone" name="phone" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item label="Course" name="course" rules={[{ required: true }]}>
            <Select
              placeholder="Select course"
              options={
                courseData?.map((c) => ({
                  label: c.title,
                  value: c._id,
                })) || []
              }
            />
          </Form.Item>

          <Form.Item label="Student Image">
            <Upload
              beforeUpload={(file) => {
                setFile(file);
                return false; // stop auto upload
              }}
              maxCount={1}
              accept="image/*"
            >
              <Button icon={<UploadOutlined />}>Select Image</Button>
            </Upload>
          </Form.Item>

          <Button htmlType="submit" type="primary" block>
            Submit
          </Button>
        </Form>
      </Modal>
    </>
  );
}

export default StudentsPage;
