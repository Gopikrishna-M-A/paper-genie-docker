import SectionHead from '../Common/SectionHead'
import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';
import { Button, message, Typography, Form, Select, InputNumber } from 'antd';
import { CloudDownloadOutlined, PlusOutlined, CloseOutlined } from '@ant-design/icons';
import baseURL from '../baseURL'

const { Text } = Typography;

export default function GeneratePaper({user}) {

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [criteria, setCriteria] = useState([{ key: uuidv4(), mark: "", section: "", Dlevel: "", Clevel: "" }]);
  const [ subject,setSubject] = useState()
  const [ section,setSection] = useState()


  useEffect(() => {
    // Fetch data based on the selected subject
    if (subject) {
      fetchSubTopics(subject);
    } else {
      // Reset sub-topic options when subject is not selected
      // setSubTopicOptions([]);
    }
  }, [subject]);

  const fetchSubTopics = async (selectedSubject) => {
    try {
      const response = await fetch(`${baseURL}/questions/subject/${selectedSubject}`,{
        method: 'GET',
        credentials: 'include'
      });
      if (response.ok) {
        const data = await response.json();
        const sec = new Set();
        data.forEach(question => {
          sec.add(question.section);
        })
        setSection(sec)
      } else {
        console.error('Failed to fetch sub-topics:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching sub-topics:', error);
    }
  };

  const addCriteria = () => {
    const newCriteriaId = uuidv4();
    setCriteria([...criteria, { key: newCriteriaId, mark: "", section: "", Dlevel: "", Clevel: "" }]);
  };

  const removeCriteria = (criteriaKey) => {
    setCriteria(criteria.filter((criterion) => criterion.key !== criteriaKey));
  };

  // const handleSuccess = (msg) => {
  //   message.success(msg);
  // };
  
  const handleError = (msg) => {
    message.error(msg);
  };

  const handleCriteriaChange = (criteriaKey, field, value) => {
    setCriteria((prevCriteria) =>
      prevCriteria.map((criterion) =>
        criterion.key === criteriaKey ? { ...criterion, [field]: value } : criterion
      )
    );
  };

  const submitForm = async () => {
    setLoading(true);
    const formData = {
      subject: subject, 
      criteria: criteria, 
    };
  
    try {
      const response = await fetch(`${baseURL}/questions/filter`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        // Handle the response from the server
        const data = await response.json();
        if(data.unmatchedCriteria.length > 0){
          handleError("no match found for some criteria!")
        }else{
          navigate('/question-paper',{ state: data });
        }

      } else {
        const errorResponse = await response.json(); // Parse the error response JSON
        const errorMessage = errorResponse.message || "An error occurred";
        handleError(errorMessage)
      }
    } catch (error) {
      handleError(error)
      console.error('Error sending request:', error);
    }finally{
      setLoading(false);
    }
  };
  



  return (
      <div style={{marginBottom:"50px"}} className='Generate-paper-page'>

        <SectionHead
          icon={<CloudDownloadOutlined />}
          title={"GENERATE"}
        ></SectionHead>

        <div className='add-btn-wrapper'>
          <Text type="secondary">Number of Questions: {criteria.length}</Text>
          <Button onClick={addCriteria} className='Home-card-button' type="primary" icon={<PlusOutlined />} size={"large"}>ADD</Button>
        </div>

        <Select 
        placeholder="Subject"
        onChange={(value) => setSubject(value)}>
              {user && user.subjects && Object.keys(user.subjects).map((subjectName) => (
                <Select.Option key={subjectName} value={subjectName}>
                  {subjectName}
                </Select.Option>
              ))}
         </Select>

        

        <Form className='Generate-form'>
          {criteria.map((criterion) => (
            <div className='question-criteria-wrapper' key={criterion.key} id={criterion.key}>
     
                 <Form.Item 
                 className='spec-item' 
                 name={`mark${criterion.key}`} 
                 hasFeedback
                 rules={[
                  {
                    required: true,
                     message: '',
                  },
                 ]}>
                 <InputNumber 
                 style={{width:"100%"}}
                 placeholder="Mark"
                 onChange={(value) => handleCriteriaChange(criterion.key, "mark", value)}/>

                 </Form.Item>

                 <Form.Item 
                 className='spec-item' 
                 name={`section${criterion.key}`} 
                 hasFeedback
                 rules={[
                  {
                    required: true,
                     message: '',
                  },
                 ]}>
                 <Select placeholder="Section"
                 onChange={(value) => handleCriteriaChange(criterion.key, "section", value)}>
                  {section &&
                      Array.from(section).map(sec => (
                        <Select.Option key={sec} value={sec}>
                          {sec}
                        </Select.Option>
                      ))}
                 </Select>
                 </Form.Item>

                 <Form.Item 
                 className='spec-item' 
                 name={`Dlevel${criterion.key}`} 
                 hasFeedback
                 rules={[
                  {
                    required: true,
                     message: '',
                  },
                 ]}>
                 <Select placeholder="D level"
                 onChange={(value) => handleCriteriaChange(criterion.key, "Dlevel", value)}>
                     <Select.Option value="Easy">Easy</Select.Option>
                     <Select.Option value="Moderate">Moderate</Select.Option>
                     <Select.Option value="Difficult">Difficult</Select.Option>
                 </Select>
                 </Form.Item>

                 <Form.Item 
                 className='spec-item' 
                 name={`Clevel${criterion.key}`} 
                 hasFeedback
                 rules={[
                  {
                    required: true,
                     message: '',
                  },
                 ]}>
                 <Select placeholder="C level"
                 onChange={(value) => handleCriteriaChange(criterion.key, "Clevel", value)}>
                     <Select.Option value="Knowledge">Knowledge</Select.Option>
                     <Select.Option value="Comprehension">Comprehension</Select.Option>
                     <Select.Option value="Application">Application</Select.Option>
                     <Select.Option value="Analysis">Analysis</Select.Option>
                     <Select.Option value="Synthesis">Synthesis</Select.Option>
                 </Select>
                 </Form.Item>
              
              <Button onClick={() => removeCriteria(criterion.key)} type='primary' danger>
                <CloseOutlined />
              </Button>
            </div>
          ))}

          <Button className='Generate-btn' type="primary" size='large' onClick={submitForm} htmlType='submit' loading={loading}>GENERATE PAPER</Button>
        </Form>
      </div>
  );
}
