/* eslint-disable react/no-danger-with-children */
import React, {useEffect, useState} from 'react'
import { useLocation } from 'react-router-dom';
import { Divider, message, Input, Typography, Tooltip, Button } from 'antd';
import  "./question-paper.css"
import { DownloadOutlined } from '@ant-design/icons';
import baseURL from '../baseURL'
import EquationEditor from 'equation-editor-react';

import html2pdf from 'html2pdf.js';


const { Text } = Typography;
export default function QuestionPaper() {
 
  const [pageNo, setPageNo] = useState(0);
  const [questionNumber, setQuestionNumber] = useState('');
  const [equationValue, setEquationValue] = useState(""); // State to store equation value
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const location = useLocation();
  const data = location.state;
  const questions = data.matchedQuestions;

  const [imageData, setImageData] = useState([]);

  useEffect(() => {
    // Add event listener to update the state when the window size changes
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 600);
    };

    // Initial check and add listener
    handleResize();
    window.addEventListener('resize', handleResize);

    // Cleanup by removing event listener
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(()=>{
    const printableHeight = 277
    const element = document.getElementById('a4')
    const divHeightInPixels = element.offsetHeight
    const page = Math.ceil(divHeightInPixels / 848.8)
    setPageNo(page)
  },[])





  useEffect(() => {
    const fetchImageData = async () => {
      const imagePromises = questions.map(async (question) => {
        if (question.imageSrc) {
          const response = await fetch(baseURL + "/questions/getImage/" + question.imageSrc);
          const blob = await response.blob();
          const base64data = await blobToBase64(blob);
          return base64data;
        }
        return null;
      });
      const images = await Promise.all(imagePromises);
      setImageData(images);
    };

    fetchImageData();
  }, [questions]);


  // Handle equation value change
  const handleEquationChange = (newValue) => {
    setEquationValue(newValue);
  };


  const blobToBase64 = (blob) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };

  const handleDownloadPDF = async () => {
    const printableHeight = 277;
    const element = document.getElementById('a4');
    const options = {
      margin: 10,
      filename: 'question_paper.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
    };

    const divsPerPage = Math.ceil(element.clientHeight / printableHeight);
    const pageCount = Math.ceil(element.children.length / divsPerPage);
    const pages = [];
    for (let i = 0; i < pageCount; i++) {
      const start = i * divsPerPage;
      const end = (i + 1) * divsPerPage;
      const pageDivs = Array.from(element.children).slice(start, end);
      const pageContent = document.createElement('div');
      pageDivs.forEach((div) => {
        pageContent.appendChild(div.cloneNode(true));
      });
      pages.push(pageContent);
    }

    const pdf = html2pdf().set(options);

    pages.forEach((page, index) => {
      pdf.from(page).toPdf().output('datauristring').then((dataUri) => {
        if (index === 0) {
          pdf.output('dataurlnewwindow');
        }
      });
    });
  };



    
  
    const adjustMargin = (marginChange) => {

      const questionElement = document.getElementById(`question-number-${questionNumber}`);
      
      if (questionElement) {
        const currentMargin = parseInt(getComputedStyle(questionElement).marginTop, 10) || 0;
        const newMargin = currentMargin + marginChange;
        questionElement.style.transition = 'margin-top 0.2s';
        questionElement.style.marginTop = `${newMargin}px`;
      } else {
        // Handle the case where the element with the given question number doesn't exist
        message.error(`Question Number ${questionNumber} not found.`)
      }
    }


  return (
    <div className="Question-paper-section">

      {/* <div className='background-box'>
      {Array.from({ length: pageNo }, (_, index) => (
        <div key={index} className={`page-color ${index % 2 === 0 ? 'even-page' : 'odd-page'}`}></div>
      ))}
      </div> */}

      <div className="margin-input-section">

        <Button onClick={() => adjustMargin(-10)}>-</Button>
        <Input 
        type='number'
        id="margin-input" 
        placeholder='QNo'
        value={questionNumber}
        onChange={(e) => setQuestionNumber(e.target.value)} 
        />
        <Button onClick={() => adjustMargin(10)}>+</Button>
      </div>

      <div id='a4' className="question-paper">
        <div className="first-page">  
          <div className="parent">
            <div className="logo">
              <img className="logo-img" src="/logo.png" alt="" />
            </div>
            <div className="university" contentEditable>
              University of Technology and Applied Sciences - Muscat
            </div>
            <div className="department" contentEditable>DEPARTMENT: Information Technology</div>
            <div className="exam">
              <h3 className="h-tag" contentEditable>Final Examination (Theory)</h3>
              <h4 className="h-tag" contentEditable>Semester: 2 A. Y: 2022 / 2023</h4>
            </div>
            <div className="details">
              <div className="detail" contentEditable>Date: 31-05-2023</div>
              <div className="detail" contentEditable>Time: 02.30 PM- 05.00 PM</div>
              <div className="detail" contentEditable>Version B</div>
            </div>
            <div className="student-name">Student Name</div>
            <div className="student-id">Student ID</div>
            <div className="specialization">Specialization</div>
            <div className="invi-sign">Invigilator Signature</div>
            <div className="level">Level</div>
            <div className="course-name">Course Name</div>
            <div className="course-code">Course Code</div>
            <div className="section">Section</div>
            <div className="Advanced-diploma" contentEditable>Advanced Diploma</div>
            <div className="probablity-stas" contentEditable>Probability and Statistics</div>
            <div className="stat3101" contentEditable>STAT3101</div>
            <div className="blank" contentEditable></div>
            <div className="blank2" contentEditable></div>
            <div className="blank3" contentEditable></div>
            <div className="blank4" contentEditable></div>
            <div className="blank5" contentEditable></div>
          </div> 

          <div className="instructions">
            <h4>INSTRUCTIONS TO STUDENTS:</h4>
            <ol>
              <li>
                Do not open this question paper until told to do so by the
                invigilator.
              </li>
              <li>
                This exam paper consists of (12) pages including the front page
                and the statistical table.
              </li>
              <li>Time allowed is 1 hour 30 minutes.</li>
              <li>
                Cheating / malpractice in any form will be dealt as an offence.{" "}
              </li>
              <li>
                Use only Black or Blue pen for answering the questions. However,
                pencils can be used for diagrams, problem solving and program
                writing purposes only.{" "}
              </li>
              <li>Exchanging or sharing of resources is prohibited.</li>
              <li>
                Use of mobile phones, Bluetooth, smart watches, dictionary, or
                any translator gadget in the examination hall is not allowed.
              </li>
              <li>
                Non programmable calculators are ☑ allowed/   not allowed to be
                used.
              </li>
            </ol>
          </div>

          <div className="marks">
            <div contentEditable className="section-">Section</div>
            <div contentEditable className="max-marks">Max. Marks</div>
            <div contentEditable className="obtained-marks">Obtained Marks</div>
            <div contentEditable className="A">A</div>
            <div contentEditable className="B">B</div>
            <div contentEditable className="ten">10</div>
            <div contentEditable className="twenty">20</div>
            <div contentEditable className="blank1"></div>
            <div contentEditable className="blank2"></div>
            <div contentEditable className="sub-total-marks">Sub-Total Marks</div>
            <div contentEditable className="grand-total-marks">Grand Total Marks</div>
            <div contentEditable className="black3"></div>
            <div contentEditable className="blank4"></div>
            <div contentEditable className="thirty">30</div>
            <div contentEditable className="blank5"></div>
          </div>

          <div className="student-sec">
            <div className="sec">
              <div contentEditable className="marker">First Marker :</div>
              <div contentEditable className="sign">Signature :</div>
              <div contentEditable className="Date">Date :</div>
            </div>
            <div className="sec">
              <div contentEditable className="marker">Second Marker :</div>
              <div contentEditable className="sign">Signature :</div>
              <div contentEditable className="Date">Date :</div>
            </div>
          </div>
        </div>

        <div style={{margin:"100px 0px",marginTop:"120px"}}></div>

        {questions.map((question, index) => (
          <div className="question-paper-math" key={index}>
          <div id={`question-number-${index+1}`} ></div>
          <Divider className='line'/>
          <div contentEditable className='qusetion-head'>
          <Text className='antd-font'>Question {index + 1}</Text>
          <Text className='antd-font'>{question.mark} marks</Text>
          </div>
          <Divider className='line'/>
          
          {question.subject == "Maths" ? <EquationEditor value={question.question} onChange={handleEquationChange} autoCommands="pi theta sqrt sum prod alpha beta gamma rho int" autoOperatorNames="sin cos tan"/>: <div contentEditable className='question'>{question.question}</div>}
            
          {/* {question.imageSrc && <img className='question-img' src={baseURL+"/questions/getImage/"+question.imageSrc} alt="" />} */}
          {question.imageSrc && (
            <img
              className='question-img'
              src={imageData[index]} // Use base64 data from imageData
              alt=''
              data-index={index} // Set data-index attribute to match with imageData
            />
          )}

            {question.tableData && (
              
              <table contentEditable className='question-table'>
                <tbody>
                  {JSON.parse(question.tableData).map((row, rowIndex) => (
                    <tr key={rowIndex}>
                      <td>{row.col0}</td>
                      <td>{row.col1}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

          <div className="options" contentEditable >
          {question.opta && <Text  className='antd-font'>Option A: {question.opta}</Text>}
          {question.optb && <Text  className='antd-font'>Option B: {question.optb}</Text>}
          {question.optc && <Text  className='antd-font'>Option C: {question.optc}</Text>}
          {question.optd && <Text  className='antd-font'>Option D: {question.optd}</Text>}
          </div>

          <Divider className='line'/>
          

          {[...Array(question.space)].map((_, spaceIndex) => (
            <Divider key={spaceIndex} dashed />
          ))}



          </div>
        ))}

      </div>

      <Tooltip
      title={isSmallScreen ? "Download not available on small screens" : ""}
      placement="top"
      trigger={isSmallScreen ? "hover" : []}
    >
      <Button
        onClick={handleDownloadPDF}
        disabled={isSmallScreen}
        block
        icon={<DownloadOutlined />}
      >
        Download
      </Button>
    </Tooltip>
    </div>
  );
}


