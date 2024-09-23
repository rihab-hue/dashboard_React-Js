import React, { useState, useEffect } from 'react';
import { useParams , Link} from 'react-router-dom';
import Sidebar from '../../components/aside/asideHeader';
import Header from '../../components/head/head';
import './View.css'; // Assuming you have created a CSS file for this component

function ViewTest() {
  const { testId } = useParams();
  const [test, setTest] = useState(null);
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:3002/tests/${testId}`)
      .then(response => response.json())
      .then(data => setTest(data))
      .catch(error => console.error('Error fetching test details:', error));
  }, [testId]);
console.log(test)
  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  if (!test) {
    return <div>Loading...</div>;
  }

  return (
    <div className='grid-container details-container'>
      <Header OpenSidebar={OpenSidebar} />
      <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
      <main className='main-container'>
        <h1 className='text-dark text-center details-title'>Test Details</h1>
        <div className='details'>
          <p><strong>Course:</strong> {test.course.name}</p>
          <p><strong>Passing Score:</strong> {test.passingScore}</p>
          <h2 style={{color: "#596B65"}}>Questions:</h2>
          {test.questions.map((question, index) => (
            <div key={index} className="question">
              <p><strong>Question {index + 1}:</strong> {question.questionText}</p>
              <p><strong>Options:</strong></p>
              <ul style={{color: "#596B65"}}>
                {question.options.map((option, optionIndex) => (
                  <li key={optionIndex}>{option}</li>
                ))}
              </ul>
              <p><strong>Correct Answer:</strong> {question.correctAnswer}</p>
          <Link to="/testsList">Back to List </Link>

            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default ViewTest;
