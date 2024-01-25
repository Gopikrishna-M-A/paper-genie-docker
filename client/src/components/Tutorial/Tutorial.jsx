import React from 'react';
import { Button, Typography, Collapse, Modal, message } from 'antd';

const { Title, Text, Link } = Typography;
const { Panel } = Collapse;

export default function Tutorial() {
  const showModal = () => {
    Modal.info({
      title: 'Example Modal',
      content: (
        <div>
          <p>This is an example modal content.</p>
        </div>
      ),
      onOk() {},
    });
  };

  const handleButtonClick = (msg) => {
    // Display success message
    message.success(msg)

  };
  const handleWarning = (msg) => {
    // Display success message
    message.warning(msg)

  };
  

  return (
    <div style={{marginBottom:"50px"}} className="tutorial-section">
      <div className="tutorial-page">
        <header>
          <Title level={1}>Welcome to Our Platform</Title>
        </header>
        <main>
          <section>
            <Title level={2}>1. Add Question to Database</Title>
            <Text>
              To add a new question to our database, follow these steps:
            </Text>
            <ol>
              <li>Select the subject for the new question.</li>
              <li>Enter the question in the provided input field.</li>
              <li>Choose the difficulty level from the dropdown.</li>
              <li>Select the cognitive level from the dropdown.</li>
              <li>Set the marks for the question.</li>
              <li>Specify the section of the question.</li>
              <li>You can also upload an image if needed.</li>
              <li>Add four options for the question.</li>
              <li>Use the toggle button to enable table inputs.</li>
              <li>
                If enabled, enter the number of rows and columns for the table
                and generate the table.
              </li>
              <li>
                Finally, click the <Button size='small' onClick={()=>handleButtonClick("submitted successfully!")} type="primary">Submit</Button> button to add the new question to the
                database.
              </li>
        
            </ol>
          </section>
          <section>
            <Title level={2}>2. View and Update Question in DB</Title>
            <Text>
              To view and update questions in the database, follow these steps:
            </Text>
            <ol>
              <li>Select the subject for which you want to view questions.</li>
              <li>
                Scroll down to view questions displayed in an infinite scroll
                manner.
              </li>
              <li>
                Each question is collapsible. Click on a question to view its
                properties.
              </li>
              <li>You'll see two buttons: "Edit" and "Delete."</li>
              <li>Click "Delete" to remove the question from the database.</li>
              <li>Click "Edit" to open a modal.</li>
              <li>
                In the modal, you can edit the question, difficulty level,
                cognitive level, marks, and section.
              </li>
              <li>
                Leave fields blank if you don't want to change certain
                properties.
              </li>
              <li>
                Click <Button size='small'  onClick={()=>handleButtonClick("saved successfully!")} type="primary">Save</Button> to save the changes
                or <Button size='small'   type="default">Cancel</Button> to discard them.
              </li>
            </ol>
            <Button size='small'  type="primary" onClick={showModal}>
              Show Example Modal
            </Button>
          </section>

          <section>
            <Title level={2}>3. Two Ways to Create Paper</Title>
            <Collapse  accordion>
              <Panel header="Random Paper Generation" key="1">
                <ol>
                  <li>
                    Specify the number of hard, medium, and easy questions you
                    need.
                  </li>
                  <li>Select the subject for the paper.</li>
                  <li>The total number of questions will be displayed.</li>
                  <li>
                    Click the <Button size='small'  onClick={()=>handleWarning("No match found!")} type="primary">Generate</Button> button to
                    create a random paper.
                  </li>
                  
                </ol>
              </Panel>
              <Panel header="Custom Paper Generation" key="2">
                <ol>
                  <li>
                    To create a custom paper, click the "Add" button to add a
                    question section.
                  </li>
                  <li>
                    Each section includes mark, section, difficulty level, and
                    cognitive level.
                  </li>
                  <li>Use the red cross button to remove a section.</li>
                  <li>
                    The "Number of Questions" text displays the number of
                    sections added.
                  </li>
                  <li>
                    Click the <Button size='small'  onClick={()=>handleWarning("No match found!")} type="primary">Generate Paper</Button> button to create a paper based on your
                    criteria.
                  </li>
                  <li>
                    Note that only questions matching your criteria will be
                    included in the paper.
                  </li>
                </ol>
              </Panel>
            </Collapse>
          </section>

          <section>
            <Title level={2}>Download Option</Title>
            <Text>
              Please be aware that the download option for question papers is
              available on larger screens.
            </Text>
            <Text>
              That's it! You're now ready to explore and use our platform
              effectively.
            </Text>
            <Text>
              If you have any questions or need further assistance, feel free
              to reach out to us. Happy learning!
            </Text>
          </section>
        </main>
      </div>
    </div>
  );
}
