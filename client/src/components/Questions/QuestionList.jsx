import React, { useState, useEffect } from 'react';
import { message, Modal, ConfigProvider, Button, Spin, Empty, Collapse, Tag } from 'antd';
import { MathQuillStatic } from '../Common/MathQuillInput.jsx'
import EditForm from './EditForm';
import baseURL from '../baseURL'
import "../Common/eq1.css"
import "../Common/eq2.css"
const QuestionList = ({ subject, setSubject, user }) => {
  const [questions, setQuestions] = useState([]);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [loading, setLoading] = useState(true); 
  const [questionId, setQuestionId] = useState()
  const [qObj, setQobj] = useState({})

  
  const subjectType = user.subjects[subject];

  const handleSuccess = (msg) => {
    message.success(msg);
  };
  
  const handleError = (msg) => {
    message.error(msg);
  };

  useEffect(() => {
    const fetchQuestions = async () => {
        try {
            setLoading(true)
            const response = await fetch(`${baseURL}/questions/subject/${subject}`,{
              method: 'GET',
              credentials: 'include'
            });
            if (response.ok) {
              const data = await response.json();
              setQuestions(data);
            } else {
              console.error('Failed to fetch questions:', response.statusText);
            }
          } catch (error) {
            console.error('Error fetching questions:', error);
          } finally {
            setLoading(false); // Turn off loading state
          }
    };

    fetchQuestions();
  }, [subject]);

  useEffect(()=>{
    const fetchQuestions = async () => {
        try {
            setLoading(true)
            const response = await fetch(`${baseURL}/questions/subject/${subject}`);
            if (response.ok) {
              const data = await response.json();
              setQuestions(data);
            } else {
              console.error('Failed to fetch questions:', response.statusText);
            }
          } catch (error) {
            console.error('Error fetching questions:', error);
          } finally {
            setLoading(false); // Turn off loading state
          }
    };

    fetchQuestions();
  },[])

  const handleDelete = async (id) => {
    try {
      // Show a confirmation modal before deleting
      Modal.confirm({
        title: 'Confirm Deletion',
        content: 'Are you sure you want to delete this question?',
        onOk: async () => {
          try {
            const response = await fetch(`${baseURL}/questions/${id}`, {
              method: 'DELETE',
            });

            if (response.status === 200) {
                handleSuccess("Question deleted successfully!")
                setQuestions(questions.filter(q => q._id !== id));
            } else {
                handleError("Failed to delete question")
            }
          } catch (error) {
            console.error('Error deleting question:', error);
          }
        },
      });
    } catch (error) {
      console.error('Error handling deletion:', error);
    }
  };

  const handleEdit = async(editedValues) => {
    
    try {
        const response = await fetch(`${baseURL}/questions/${questionId}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(editedValues),
        });
    
        if (response.ok) {
            setQuestions((prevQuestions) =>
            prevQuestions.map((question) =>
              question._id === questionId ? { ...question, ...editedValues } : question
            )
          );
          handleSuccess("Question edited successfully!")
        } else {
          handleError("Error in editing!")
        }
      } catch (error) {
        console.error('Error updating question:', error);
      }
  };








  return (
    <ConfigProvider
    theme={{
      token: {
        // Seed Token
        colorPrimary: "#242527",
        // Alias Token
        colorBgContainer: "#ffffff",
      },
    }}
  >
    <div className='Questions-wrapper'>
      {loading ? ( // Display loading animation when loading is true
        <Spin size="large" style={{marginTop:"20px"}} />
      ) : questions.length === 0 ? (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      ) : (
        questions.map((q, index) => (
          <Collapse
            className='collapsible'
            expandIconPosition='end'
            bordered={false}  
            key={q._id}
            items={[
              {
                key: q._id,
                label: subjectType === "math" ? (
                  <MathQuillStatic latex={q.question} />
                ) : (
                  q.question
                ) ,
                children: (
                  <div>
                    <Tag className='collapse-tag' bordered={false} color="default">{q.Clevel}</Tag>
                    <Tag className='collapse-tag' bordered={false} color={q.Dlevel === 'Easy' ? 'green' : q.Dlevel === 'Difficult' ? 'red' : q.Dlevel === 'Moderate' ? 'blue' : 'black' }>{q.Dlevel}</Tag>
                    <Tag className='collapse-tag' bordered={false} color="default">mark : {q.mark}</Tag>
                    <Tag className='collapse-tag' bordered={false} color="default">sec : {q.section}</Tag>
                    <Tag className='collapse-tag' bordered={false} color="default">space : {q.space}</Tag>
                    <Button size="small" type="primary" 
                    onClick={() => {
                      setEditModalVisible(true)
                      setQuestionId(q._id)
                      setQobj(q)
                      
                    }
                    }
                      > Edit </Button>
                    <Button onClick={() => handleDelete(q._id)} style={{marginLeft:"10px"}} size="small" type="primary"> Delete </Button>
                    <EditForm visible={editModalVisible} onCancel={() => setEditModalVisible(false)} onEdit={handleEdit} subject={subject} qObj={qObj}/>
                  </div> 
                ),
              },
            ]}
          />
        ))
      )}
    </div>
    </ConfigProvider>
  );
};

export default QuestionList;
