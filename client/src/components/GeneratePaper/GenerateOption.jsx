import React from 'react'
import { Button, Typography, Tag } from "antd";
import { Link } from 'react-router-dom';

const { Title, Text } = Typography;

export default function GenerateOption() {
  return (
    <div className="generate-opt-section">
    <div className="custom-paper-card">
      <Title level={2}>Custom Paper</Title>
      <Text type={'secondary'}>Create a paper with specific criteria:</Text>
      <div className='main'>
      <Tag bordered={false} style={{width:"100%"}}><Text>Choose the number of questions</Text></Tag>
         <Tag bordered={false} style={{width:"100%"}}><Text>Select difficulty levels</Text></Tag>
         <Tag bordered={false} style={{width:"100%"}}><Text>Select Cognitive levels</Text></Tag>
         <Tag bordered={false} style={{width:"100%"}}><Text>Specify section</Text></Tag>
         <Tag bordered={false} style={{width:"100%"}}><Text>Specify subject</Text></Tag>
      </div>
      <Link to={"/Create-custom-paper"}><Button block type='primary' size='large'>Generate Custom Paper</Button></Link>
    </div>
    
    <div className="random-paper-card">
      <Title level={2}>Random Paper</Title>
      <Text type={'secondary'}>Generate a paper with random questions:</Text>
      <div className='main'>
        <Tag bordered={false} style={{width:"100%"}}><Text>Specify the number of easy, medium <br /> and hard questions</Text></Tag>
        <Tag bordered={false} style={{width:"100%",maxWidth:"100%"}}><Text>Quickly create papers without <br /> specifying individual questions.</Text></Tag>
        <Tag bordered={false} style={{width:"100%"}}><Text>Specify subject</Text></Tag>
      </div>
      <Link to={"/Create-random-paper"}><Button block type='primary' size='large'>Generate Random Paper</Button></Link>
      
    </div>
  </div>
  )
}
