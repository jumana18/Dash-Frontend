import { Modal, Form, Input, Select, Button, message } from "antd";
import { useCreateStudent } from "../utils/studentAPI";
import type { Course } from "../utils/studentAPI";

interface Props {
  open: boolean;
  onClose: () => void;
  courses: Course[];
}

const CreateStudentModal: React.FC<Props> = ({ open, onClose, courses }) => {
  const [form] = Form.useForm();
  const { mutate: createStudent, isLoading } = useCreateStudent();

  const onFinish = (values: any) => {
    createStudent(values, {
      onSuccess: () => {
        message.success("Student created successfully");
        form.resetFields();
        onClose();
      },
      onError: () => message.error("Student creation failed"),
    });
  };

  return (
    <Modal open={open} title="Create Student" footer={null} onCancel={onClose}>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item name="name" label="Name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item name="email" label="Email" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item name="phone" label="Phone" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        {/* Course field allows any typed value */}
        <Form.Item
          name="course"
          label="Course"
          rules={[
            { required: true, message: "Please enter or select a course" },
          ]}
        >
          <Select
            mode="tags"
            placeholder="Type or select course"
            tokenSeparators={[","]}
          >
            {courses.map((c) => (
              <Select.Option key={c._id} value={c.title}>
                {c.title}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item name="status" initialValue="active">
          <Select>
            <Select.Option value="active">Active</Select.Option>
            <Select.Option value="inactive">Inactive</Select.Option>
          </Select>
        </Form.Item>

        <Button type="primary" htmlType="submit" loading={isLoading} block>
          Create Student
        </Button>
      </Form>
    </Modal>
  );
};

export default CreateStudentModal;
