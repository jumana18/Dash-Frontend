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
import { getAllCourses } from "../utils/courseAPI";



function TeacherPage () {
  const [addModal, setAddModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [updateId, setUpdateId] = useState();
  const [form] = Form.useForm();
  const [updateForm] = Form.useForm();
}