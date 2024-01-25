import React from 'react'
import SectionHead from '../Common/SectionHead'
import { SettingOutlined  } from '@ant-design/icons';
import { Typography, Button, Select, Form, Input, message } from 'antd';
import axios from 'axios';
import baseURL from '../baseURL'
const { Title, Text } = Typography;


export default function Settings() {

  const onFinish = async(values) => {
    console.log(values);
    try {
      const response = await axios.post(`${baseURL}/auth/add-subject`, values, {
        withCredentials: true, // Include cookies in the request
      });
      if (response.status === 200) {
        // Display a success message if the response status is 200
        message.success('Subject added successfully!');
      } else {
        // Display an error message for other response statuses
        message.error('Failed to add subject. Please try again later.');
      }
      console.log('Response from the server:', response.data);
      // You can handle the response data here as needed.
    } catch (error) {
      message.error('Failed to add subject. Please try again later.');
      console.error('Error:', error);
      // Handle any errors that occur during the request.
    }
  };
  
  const onFinishFailed = (error) => {
    console.log('Failed:', error);
  };


  
  return (
    <div className='settings'>
            <SectionHead
          icon={<SettingOutlined />}
          title={"SETTINGS"}
        ></SectionHead>

        <div className="settings-conent-wrapper">
          <div className="add-subject-wrapper">
            <Title level={5}>Add subject</Title>
            <div className="add-subject-input">
            <Form
              name="basic"
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >

              <div className="sub-inputs">
              <Form.Item
                hasFeedback
                name="subName"
                required
                rules={[{ required: true, message: 'Please input subject name!' }]}
              >
                <Input placeholder='Name'/>
              </Form.Item>

              <Form.Item
                hasFeedback
                name="subType"
                required
                rules={[{ required: true, message: 'Please input subject type!' }]}
              >
                <Select
                placeholder='Subject Type'
                options={[
                  {
                    value: 'math',
                    label: 'Numerical',
                  },
                  {
                    value: 'normal',
                    label: 'Non-numerical',
                  },
                ]}
              />
              </Form.Item>



              <Form.Item >
                <Button block type="primary" htmlType="submit">
                  ADD
                </Button>
              </Form.Item>

              </div>
              



            </Form>
            </div>
          </div>

          <Text type='secondary'>In our 'Add Subject' section, you have the power to expand your question library by introducing new subjects.</Text>
        </div>
    </div>
  )
}
