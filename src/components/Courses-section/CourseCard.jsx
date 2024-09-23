import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

const CourseCard = (props) => {
  const { _id, name, topic, description, feedback } = props.item;
  const [course, setCourse] = useState(null);
  
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const courseResponse = await fetch(`http://localhost:3002/courses/${_id}`);
        if (!courseResponse.ok) throw new Error('Failed to fetch course');
        const courseData = await courseResponse.json();
        setCourse(courseData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCourse();
  }, [_id]);
  
  return (
    <div className="single__course__item shadow rounded-3 pt-5">
      <div className="course__img d-flex justify-content-center ">
        {course && course.image && (
          <img height="100px"  src={`http://localhost:3002/images/${course.image}`} alt="cover image" className="w-75" />
        )}
      </div>
      <div className="course__details">
        <h6 className="course__title mb-4">{name}</h6>
        <div className="d-flex justify-content-between align-items-center">
          <p className="lesson d-flex align-items-center gap-1">
            <i className="ri-book-open-line"></i> {topic} 
          </p>
        </div>
        <div className="d-flex justify-content-between align-items-center">
          <p className="rating d-flex align-items-center gap-1">
            <i className="ri-star-fill"></i> {feedback}
          </p>
          <p className="enroll d-flex align-items-center gap-1">
            <Link to={`/courses/${_id}`} className="btn">Enroll Now</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
