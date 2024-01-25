import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { Button, Divider, Form, Input, message, Typography, Tooltip } from 'antd';
import { GoogleOutlined } from '@ant-design/icons'
import axios from 'axios';
import baseURL from '../baseURL'

const { Text, Link } = Typography;


export default function Login({ user, setUser}) {
  const navigate = useNavigate();
  const [loading,setLoading] = useState(false)

  const nav = ()=> {
    navigate("/signup")
}

  const onFinish = async(values) => {
    setLoading(true)
    try {
      const response = await axios.post(`${baseURL}/auth/login`, values, {
        withCredentials: true, 
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (response.status === 200) { 
        message.success('Login successful.');
        axios
        .get(`${baseURL}/auth/check-auth`, { withCredentials: true })
        .then((response) => {
          if (response.data.isAuthenticated) {
            setUser(response.data.user);
            console.log(response.data.user);
          } else {
            setUser(null);
          }
        })
        .catch((error) => {
          console.error("Error fetching user data");
        });
        navigate('/');
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      message.error(error.response.data.error);
    } finally{
      setLoading(false)
    }
  }; 
  const onFinishFailed = (errorInfo) => {
    console.log('Form failed');
  };

  return (
       <div className='Login-page'>

         <div className="login-head">Hey,Hello</div>
         <div className="login-para font">Sign in to continue.</div>
         <Form
            className='login-form'
            name="basic"

            initialValues={{
            remember: true,
            }}

            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Form.Item
            hasFeedback
            name="username"
            rules={[
                {
                required: true,
                message: 'Please input your username!',
                },
            ]}
            >
            <Input size='large' placeholder='Username'/>
            </Form.Item>

            <Form.Item
            hasFeedback
            name="password"
            rules={[
                {
                required: true,
                message: 'Please input your password!',
                },
            ]}
            >
            <Input.Password size='large' placeholder='password'/>
            </Form.Item>


            <Form.Item>
            <Button  size='large'loading={loading} block type="primary" htmlType="submit">
            Sign in
            </Button>
            </Form.Item>

            <Divider id='login-line' plain>or</Divider>

            <Form.Item>
            <Tooltip title="Google Sign-In is currently under development.">
            <Button disabled size='large' icon={<GoogleOutlined />} block  >
                Sign in with Google
            </Button>
            </Tooltip>
            </Form.Item>

            <Text type="secondary">Don't have an account? <Link onClick={nav} >Sign up</Link></Text> 

        </Form>
       </div>
  )
}
