import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SectionHead from "../Common/SectionHead";
import "../Common/math.css";
import axios from "axios";
import EquationEditor from 'equation-editor-react';
import baseURL from '../baseURL'
import {
  message,
  Button,
  Form,
  Input,
  Select,
  Upload,
  Modal,
  InputNumber
} from "antd";
import { FileAddOutlined, PlusOutlined, InfoCircleOutlined } from "@ant-design/icons";
import DynamicTableGenerator from "./DynamicTableGenerator";
const { TextArea } = Input;
const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

export default function AddQuestion({user}) {

  const navigate = useNavigate();
  const [showHelp, setShowHelp] = useState(false);
  const [equation, setEquation] = useState("");
  const [tableData, setTableData] = useState(null); // Add actual value
  const [rowCount, setRowCount] = useState(null); // Add actual value
  const [colCount, setColCount] = useState(null); // Add actual value
  const [subject, setSubject] = useState(null); // Add actual value
  const [loading, setLoading] = useState(false); // Add actual value
  const [form] = Form.useForm();
  const subjectType = user.subjects[subject];
      const handleSuccess = () => {
        message.success('Question added successfully!');
        const sub = form.getFieldValue("subject")
        form.resetFields(); 
        form.setFieldsValue({ subject:sub });
        setEquation(" ")
      };
      
      const handleError = () => {
        message.error('Failed to add question. Please try again.');
      };
   

 
    
    

    const handleSubmit = async (values) => {
      setLoading(true)
      const formData = new FormData();
  
      formData.append("question", equation);
      formData.append("Dlevel", values.Dlevel);
      formData.append("Clevel", values.Clevel);
      formData.append("section", values.section);
      formData.append("mark", values.mark);
      formData.append("subject", values.subject);
      formData.append("tableData", JSON.stringify(tableData)); // Convert to string
      formData.append("row", rowCount);
      formData.append("col", colCount);
      formData.append("opta", values.opta);
      formData.append("optb", values.optb);
      formData.append("optc", values.optc);
      formData.append("optd", values.optd);
      formData.append("space", values.space);
      if(values.image){
        formData.append("image", values.image[0].originFileObj);
      }

      // for (const entry of formData.entries()) {
      //   const [fieldName, fieldValue] = entry;
      //   console.log(`${fieldName}: ${fieldValue}`);
      // }

      
      try {
        const response = await axios.post(`${baseURL}/questions`, formData, {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data", // Set content type to multipart/form-data
          },
        });

        console.log("Response data:", response.data)
        handleSuccess();

      } catch (error) {
        console.error("Error:", error);
        handleError();


        if (error.response && error.response.status === 401) {
            navigate("/login");
        }
      }finally{
        setLoading(false)
      }
     
    };


  return (
    <div style={{ marginBottom: "50px" }} className="Add-question-section">
      <div className="add-section-wrapper">
        <SectionHead
          icon={<FileAddOutlined />}
          title={"ADD QUESTION"}
        ></SectionHead>

        <Form
          form={form}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          style={{ maxWidth: 600 }}
          onFinish={handleSubmit}
        >
          <Form.Item
            style={{ marginTop: "10px" }}
            name="subject"
            rules={[
              {
                required: true,
                message: "Please select a subject!",
              },
            ]}
            hasFeedback
          >
            <Select
              placeholder="Subject"
              onChange={(value) => setSubject(value)}
            >
              {user &&
                user.subjects &&
                Object.keys(user.subjects).map((subjectName) => (
                  <Select.Option key={subjectName} value={subjectName}>
                    {subjectName}
                  </Select.Option>
                ))}
            </Select>
          </Form.Item>

          {subjectType === "math" ? (
            <Form.Item>
              <div className="equation-editor-container">
                <EquationEditor
                  value={equation}
                  onChange={setEquation}
                  autoCommands="pi theta sqrt sum prod alpha beta gamma rho int"
                  autoOperatorNames="sin cos tan"
                />
                {!equation && (
                  <div className="equation-editor-placeholder">
                    Type your equation here...
                  </div>
                )}
              </div>
              <Button
                style={{ marginTop: "10px" }}
                onClick={() => setShowHelp(true)}
              >
                Formatting Guide <InfoCircleOutlined />
              </Button>
            </Form.Item>
          ) : (
            <Form.Item
              name="question"
              rules={[
                {
                  required: true,
                  message: "Please input a question!",
                },
              ]}
            >
              <TextArea
                rows={4}
                placeholder="type new question here ..."
                onChange={(e) => setEquation(e.target.value)}
              />
            </Form.Item>
          )}
          {showHelp && (
            <Modal
              title="Equation Editor Help"
              open={showHelp}
              onCancel={() => setShowHelp(false)}
              footer={null}
            >
              <div className="equation-help-content">
                <p>
                  Welcome to the Equation Editor! This tool helps you create
                  math equations with ease. Here's how you can use it:
                </p>
                <h3>Basic Commands:</h3>
                <ul>
                  <li>
                    Type <strong>sin</strong> for sine.
                  </li>
                  <li>
                    Type <strong>cos</strong> for cosine.
                  </li>
                  <li>
                    Type <strong>tan</strong> for tangent.
                  </li>
                  <li>
                    Type <strong>sqrt</strong> for square root.
                  </li>
                  <li>
                    Type <strong>pi</strong> for the π symbol.
                  </li>
                  <li>
                    Type <strong>theta</strong> for θ (theta).
                  </li>
                  <li>
                    Type <strong>sum</strong> for summation (∑).
                  </li>
                  <li>
                    Type <strong>prod</strong> for product (∏).
                  </li>
                  <li>
                    Type <strong>alpha</strong> for α (alpha).
                  </li>
                  <li>
                    Type <strong>beta</strong> for β (beta).
                  </li>
                  <li>
                    Type <strong>gamma</strong> for γ (gamma).
                  </li>
                  <li>
                    Type <strong>rho</strong> for ρ (rho).
                  </li>
                  <li>
                    Type <strong>int</strong> for integral (∫).
                  </li>
                </ul>
                <h3>Subscripts and Superscripts:</h3>
                <p>
                  To add subscripts, use <strong>_</strong> (e.g., x_1 for x
                  subscript 1). To add superscripts, use <strong>^</strong>{" "}
                  (e.g., x^2 for x squared).
                </p>
                <h3>Using Mathematical Keywords:</h3>
                <p>
                  Certain keywords like "choosing" include mathematical
                  functions or symbols within them. To differentiate them from
                  regular text, use a backslash (\) before the keyword. For
                  example, typing "\choosing" will keep the "sin" within
                  "choosing" from being treated as a function.
                </p>
              </div>
            </Modal>
          )}

          <Form.Item
            name="Dlevel"
            rules={[
              {
                required: true,
                message: "Please select a Difficulty level!",
              },
            ]}
            hasFeedback
          >
            <Select placeholder="Difficulty level">
              <Select.Option value="Easy">Easy</Select.Option>
              <Select.Option value="Moderate">Moderate</Select.Option>
              <Select.Option value="Difficult">Difficult</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="Clevel"
            rules={[
              {
                required: true,
                message: "Please select a Cognitive level!",
              },
            ]}
            hasFeedback
          >
            <Select placeholder="Cognitive level">
              <Select.Option value="Knowledge">Knowledge</Select.Option>
              <Select.Option value="Comprehension">Comprehension</Select.Option>
              <Select.Option value="Application">Application</Select.Option>
              <Select.Option value="Analysis">Analysis</Select.Option>
              <Select.Option value="Synthesis">Synthesis</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="mark"
            rules={[
              {
                required: true,
                message: "Please add Marks!",
              },
            ]}
            hasFeedback
          >
            <InputNumber style={{width:"100%"}} placeholder="Marks" />
              
          </Form.Item>

          <Form.Item
            name="section"
            rules={[
              {
                required: true,
                message: "Please add Section!",
              },
            ]}
            hasFeedback
          >
            <Input placeholder="Section" />
          </Form.Item>

          <p>Upload Image</p>

          <Form.Item
            name="image"
            valuePropName="fileList"
            getValueFromEvent={normFile}
          >
            <Upload
              action={`${baseURL}/questions`}
              listType="picture-card"
              maxCount={1}
              // beforeUpload={(file) => false}
            >
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            </Upload>
          </Form.Item>

          <Form.Item name="opta" hasFeedback>
            <Input placeholder="option A" />
          </Form.Item>

          <Form.Item name="optb" hasFeedback>
            <Input placeholder="option B" />
          </Form.Item>

          <Form.Item name="optc" hasFeedback>
            <Input placeholder="option C" />
          </Form.Item>

          <Form.Item name="optd" hasFeedback>
            <Input placeholder="option D" />
          </Form.Item>

            <Form.Item 
            name="space"
            rules={[
              {
                required: true,
                message: 'Please add Section!',
              },
             ]}
             hasFeedback>
              <InputNumber placeholder="Spaces"  />
            </Form.Item>

            <p>Insert Table</p>

            <Form.Item >
              <DynamicTableGenerator 
              tableData={tableData}
              setTableData={setTableData}
              rowCount={rowCount}
              setRowCount={setRowCount}
              colCount={colCount}
              setColCount={setColCount}
              />
            </Form.Item>

            <Form.Item>
              <Button block type="primary" htmlType="submit" loading={loading}>Submit</Button>
            </Form.Item>

          </Form>
      </div>
    </div>
  );
}
