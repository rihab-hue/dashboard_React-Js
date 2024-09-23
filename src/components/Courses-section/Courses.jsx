import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import "./courses.css";
import CourseCard from "./CourseCard";
import { useNavigate } from 'react-router-dom';

const Courses = () => {
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate('/courses');
  };

  const [courses, setCourses] = useState([]); // Stores the courses data
  const [loading, setLoading] = useState(true); // Tracks loading state
  const [error, setError] = useState(null); // Stores any error

  useEffect(() => {
    fetch('http://localhost:3002/courses') // URL of your API
      .then(response => {
        if (!response.ok) { // Check if response is OK
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setCourses(data); // Set courses data
        setLoading(false); // Set loading to false once data is loaded
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
        setError(error.message); // Set error message
        setLoading(false); // Ensure loading is false on error
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>  
      <section id="courses">
        <Container>
          <Row>
            <Col lg="12" className="mb-5">
              <div className="course__top d-flex justify-content-between align-items-center">
                <div className="course__top__left w-50">
                  <h2>Our Popular Courses</h2>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae
                    consequatur libero quod voluptatibus ullam quia quas, vitae
                    voluptatem recusandae reprehenderit!
                  </p>
                </div>
                <div className="w-50 text-end">
                  <button onClick={handleNavigation} className="btn">See All</button>
                </div>
              </div>
            </Col>
            {courses.slice(0, 3).map((item) => ( // Slice to get only the first 3 courses
              <Col lg="4" md="6" sm="6" key={item.id}>
                <CourseCard item={item} />
              </Col>
            ))}
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Courses;
