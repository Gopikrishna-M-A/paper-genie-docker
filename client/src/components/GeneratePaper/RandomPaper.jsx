import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SectionHead from "../Common/SectionHead";
import { Button, Typography, message, InputNumber, Form, Select } from "antd";
import { CloudDownloadOutlined } from "@ant-design/icons";
import baseURL from "../baseURL";
const { Text } = Typography;



export default function RandomPaper({ user }) {

  const navigate = useNavigate();
  const [ easy, setEasy ] = useState(0)
  const [ diff, setDiff ] = useState(0)
  const [ med, setMed ] = useState(0)
  const [ loading, setLoading] = useState(false)

  const onFinish = async (values) => {
    const sum = values.difficult + values.medium + values.easy;

    try {
      setLoading(true)
      // Send the form data to the API endpoint with credentials
      const response = await fetch(`${baseURL}/questions/filter/random`, {
        method: "POST", // Change to the appropriate HTTP method (POST, GET, etc.)
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
        credentials: "include", // Include credentials (e.g., cookies) with the request
      });

      if (response.ok) {
        // Handle a successful response from the API
        const data = await response.json();
        navigate("/question-paper", { state: data });
      } else {
        const errorResponse = await response.json(); // Parse the error response JSON
        const errorMessage = errorResponse.message || "An error occurred";
        message.error(errorMessage);
      }
    } catch (error) {
      // Handle network or other errors
      console.error("API request error:", error);
      message.error("API request error.");
    }finally{
      setLoading(false)
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="Generate-paper-page">
      <SectionHead
        icon={<CloudDownloadOutlined />}
        title={"GENERATE RANDOM"}
      ></SectionHead>

      <Text style={{ marginTop: "20px" }} type="secondary">
        Number of Questions: {easy + diff + med}
      </Text>
      <Form
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        className="Generate-form"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <div className="diffulty-ratio-wrapper">
          <label className="samll-label">No of Difficult level questions</label>
          <Form.Item
            label="Difficult"
            name={"difficult"}
            className="ratio-select"
            rules={[
              {
                required: true,
                message: "Please input number of questions!",
              },
            ]}
          >
            <InputNumber onChange={(value) => setDiff(value)}  style={{ width: "100%" }} min={0} max={100} />
          </Form.Item>

          <label className="samll-label">No of Medium level questions</label>
          <Form.Item
            label="Medium"
            name={"medium"}
            className="ratio-select" 
            rules={[
              {
                required: true,
                message: "Please input number of questions!",
              },
            ]}
          >
            <InputNumber onChange={(value) => setMed(value)} style={{ width: "100%" }} min={0} max={100} />
          </Form.Item>

          <label className="samll-label">No of Easy level questions</label>
          <Form.Item
            label="Easy"
            name={"easy"}
            className="ratio-select"
            rules={[
              {
                required: true,
                message: "Please input number of questions!",
              },
            ]}
          >
            <InputNumber onChange={(value) => setEasy(value)}  style={{ width: "100%" }} min={0} max={100} />
          </Form.Item>

          <Form.Item
            name="subject"
            label="Subject"
            className="ratio-select"
            rules={[
              {
                required: true,
                message: "Please input the subject!",
              },
            ]}
          >
            <Select placeholder="Select a subject">
              {user &&
                user.subjects &&
                Object.keys(user.subjects).map((subjectName) => (
                  <Select.Option key={subjectName} value={subjectName}>
                    {subjectName}
                  </Select.Option>
                ))}
            </Select>
          </Form.Item>
        </div>

        <Button
          className="Generate-btn"
          type="primary"
          size="large"
          htmlType="submit"
          loading={loading}
        >
          GENERATE PAPER
        </Button>
      </Form>
    </div>
  );
}
