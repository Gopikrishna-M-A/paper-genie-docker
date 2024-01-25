import React, { useState } from 'react';
import { Button, Divider, message, Form, Input, Cascader, Typography, Tooltip } from 'antd';
import { GoogleOutlined } from '@ant-design/icons'
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import baseURL from '../baseURL'
const { SHOW_CHILD } = Cascader;
const { Text, Link } = Typography;


const options = [
    {
      label: 'Numerical',
      value: 'math',
      children: [
        {
          label: 'Maths',
          value: 'Maths',
        },
        {
          label: 'Algebra',
          value: 'Algebra',
        },
        {
          label: 'Calculus',
          value: 'Calculus',
        },
        {
          label: 'Geometry',
          value: 'Geometry',
        },
        {
          label: 'Physics',
          value: 'Physics',
        },
        {
          label: 'Chemistry',
          value: 'Chemistry',
        },
        {
          label: 'Biology',
          value: 'Biology',
        },
        {
          label: 'Engineering',
          value: 'Engineering',
        },
      ],
    },
    {
      label: 'Non-numerical',
      value: 'normal',
      children: [
        {
          label: 'English',
          value: 'English',
        },
        {
          label: 'History',
          value: 'History',
        },
        {
          label: 'Geography',
          value: 'Geography',
        },
        {
          label: 'Economics',
          value: 'Economics',
        },
        {
          label: 'Political science',
          value: 'Political science',
        },
        {
          label: 'Sociology',
          value: 'Sociology',
        },
        {
          label: 'Psychology',
          value: 'Psychology',
        },
        {
          label: 'Literature',
          value: 'Literature',
        },
        {
          label: 'Art',
          value: 'Art',
        },
        {
          label: 'Music',
          value: 'Music',
        },
        {
          label: 'Philosophy',
          value: 'Philosophy',
        },
      ],
    },
  ];




export default function Signup() {
    const navigate = useNavigate();
    const [subjectsarr, setSubjects] = useState([['math', 'Maths'],['normal', 'English']]);
    const [loading,setLoading] = useState(false)
    const nav = ()=> {
        navigate("/login")
    }

    const onChange = (value) => {
        setSubjects(value);
    };

    const onFinish = async(values) => {
        setLoading(true)
        try {        
            const subjects = subjectsarr.reduce((result, [type, name]) => {
              result[name] = type;
              return result;
            }, {});
        
        
            // Send data to the login route
            const response = await axios.post(`${baseURL}/auth/signup`, {
              values,
              subjects
            });

            if (response.status == 201) {
              message.success('Signup successful.');
              navigate('/login');
            }else{
              message.error(response.data.message);
            }
          } catch (error) {
            message.error(error.response.data.error);
          } finally{
            setLoading(false)
          }
    };
    
    const onFinishFailed = (errorInfo) => {
     console.log('Form failed')
    };
      

    return (
        <div className='Login-page'>
 
          <div className="login-head">Hey,Hello</div>
          <div className="login-para font">Enter your information to register.</div>
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
             name="email"
             rules={[
                 {
                type:"email",
                 required: true,
                 message: 'Please input your email!',
                 },
             ]}
             >
             <Input size='large' placeholder='Email'/>
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

             <Form.Item hasFeedback name="phone" >
             <Input size='large' placeholder='Phone (Optional)'/>
             </Form.Item>

             <Form.Item hasFeedback> 
             <Cascader
                size='large'
                placeholder="Subjects"
                style={{
                width: '100%',
                }}
                options={options}
                onChange={onChange}
                multiple
                maxTagCount="responsive"
                showCheckedStrategy={SHOW_CHILD}
                defaultValue={[
                ['normal', 'English'],
                ['math', 'Maths']
                ]}
                  />
             </Form.Item>
 
             <Form.Item>
             <Button size='large' loading={loading} block type="primary" htmlType="submit">
                 Sign up
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
             <Text type="secondary">Have an account? <Link onClick={nav} >Sign in</Link></Text> 
         </Form>
        </div>
   )
}


