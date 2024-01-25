import React, { useState, useEffect } from 'react';
import { Modal, Form, Button, Input, Select, InputNumber } from 'antd';
import EquationEditor from 'equation-editor-react';
const { TextArea } = Input;

const EditForm = ({ visible, onCancel, onEdit, subject, qObj }) => {
  const [question, setQuestion] = useState()
  const [editedValues, setEditedValues] = useState({});
  useEffect(() => {
    // Reset the question and editedValues states when the modal is opened
    setQuestion('')
    setEditedValues({})
  }, [visible])


  const handleFormSubmit = () => {
    // Call the onEdit function and pass the updated values
    const updatedValues = { ...editedValues };
    if (question !== undefined && question.trim() !== "") {
      updatedValues.question = question;
    }
    onEdit(updatedValues);
    onCancel(); // Close the modal
    setQuestion('')
  };

  return (
    <Modal
      title="Edit Question"
      open={visible}
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={handleFormSubmit}>
          Save
        </Button>,
      ]}
      destroyOnClose={true} 
    >
      <Form >
        {/* Add form fields for editing */}


            {subject === "Maths" ? (
                <Form.Item label="Question" >
                  <div className="equation-editor-container">
                  <EquationEditor
                    value={question}
                    onChange={setQuestion}
                    autoCommands="pi theta sqrt sum prod alpha beta gamma rho int"
                    autoOperatorNames="sin cos tan"
                  />
                    {!question && (
                    <div className="equation-editor-placeholder">{qObj.question}</div>
                  )}
                </div>
                </Form.Item>
              ) : (
                <Form.Item 
                label="Question"
                name="question"
                >
                  <TextArea rows={4} 
                  placeholder={qObj.question}
                  onChange={(e) => setQuestion(e.target.value)}
                  />
                </Form.Item>
              )}


            <Form.Item label="Difficulty" name="Dlevel" hasFeedback>
            <Select
                placeholder={qObj.Dlevel}
                onChange={(value) =>
                setEditedValues({ ...editedValues, Dlevel: value })
                }
            >
                <Select.Option value="Easy">Easy</Select.Option>
                <Select.Option value="Moderate">Moderate</Select.Option>
                <Select.Option value="Difficult">Difficult</Select.Option>
            </Select>
            </Form.Item>

            <Form.Item label="Cognitive" name="Clevel" hasFeedback>
            <Select
                placeholder={qObj.Clevel}
                onChange={(value) =>
                setEditedValues({ ...editedValues, Clevel: value })
                }
            >
                <Select.Option value="Knowledge">Knowledge</Select.Option>
                <Select.Option value="Comprehension">Comprehension</Select.Option>
                <Select.Option value="Application">Application</Select.Option>
                <Select.Option value="Analysis">Analysis</Select.Option>
                <Select.Option value="Synthesis">Synthesis</Select.Option>
            </Select>
            </Form.Item>

            <Form.Item label="Mark" name="mark" hasFeedback>
            <InputNumber
                placeholder={qObj.mark}
                onChange={(value) =>
                setEditedValues({ ...editedValues, mark: value })
                }
            />
            </Form.Item>

            <Form.Item label="Section" name="section" hasFeedback>
            <InputNumber
                placeholder={qObj.section}
                onChange={(value) =>
                setEditedValues({ ...editedValues, section: value })
                }
            />
            </Form.Item>

            <Form.Item label="Space" name="space" hasFeedback>
            <InputNumber
                placeholder={qObj.space}
                onChange={(value) =>
                setEditedValues({ ...editedValues, space: value })
                }
            />
            </Form.Item>




        {/* Add other form fields */}
      </Form>
    </Modal>
  );
};

export default EditForm;
