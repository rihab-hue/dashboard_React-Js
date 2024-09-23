
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
//import LoginPage from "./pages/loginPage";
import Home from "./components/Home";
import Orderadd from "./pages/add pages/addCourse" ;
import AddUser from "./pages/add pages/addUser" ; 
import RestoList from "./pages/lists pages/AdminList";
import FeedbackList from "./pages/lists pages/FeedbackList" ; 
import { useSelector } from "react-redux";
import AddResto from "./pages/add pages/addAdmin";
import AddTest from "./pages/add pages/addTest";
import AddFeedback from "./pages/add pages/addFeedback";
import AddEnrollement from "./pages/add pages/addEnrollement";
import UserList from "./pages/lists pages/userList";
import OrdersList from "./pages/lists pages/courseList";
import EnrollmentsList from "./pages/lists pages/enrollementList";
import TestsList from "./pages/lists pages/testsList";
// update
import Restoupdate from "./pages/update pages/updateAdmin";
import UpdateOrder from "./pages/update pages/updateCourse";
import UpdateUser from "./pages/update pages/updateUser";
// import UpdateEnrollement from "./pages/update pages/updateEnrollement";
import UpdateFeedback from "./pages/update pages/updateFeedback";
import ViewAdmin from "./pages/view pages/viewAdmin";
import ViewUser from "./pages/view pages/viewUser";
import ViewEnrollement from "./pages/view pages/viewEnrollement";
import ViewFeedback from "./pages/view pages/viewFeedback";
import ViewCourse from "./pages/view pages/viewCourse";
import ViewTest from "./pages/view pages/viewTest";
import UpdateTest from "./pages/update pages/updateTest";
import AddMenu from "./pages/add pages/addTeacher";
import TeacherList from "./pages/lists pages/TeacherList";
import Menuupdate from "./pages/update pages/updateTeacher";
import ViewTeacher from "./pages/view pages/viewTeacher";
import Login from "./pages/Login/Login";
// view


function App() {
  const isVerified = Boolean(useSelector((state) => state.token));
  return (
    <div className="app">
      <BrowserRouter>
          <Routes>
          <Route path="/" element={<Login /> } />
            <Route path="/home" element={<Home /> } />
            <Route path="/addUser" element={<AddUser />  } />
            <Route path="/addTest" element={<AddTest />  } />
            <Route path="/addAdmin" element={<AddResto />} />
            <Route path="/addTeacher" element={<AddMenu />  } />
            <Route path="/addFeedback" element={<AddFeedback />  } />
            <Route path="/addCourse" element={<Orderadd />  } />
            <Route path="/addEnrollement" element={<AddEnrollement />  } />
            <Route path="/usersList" element={<UserList />  } />
            <Route path="/adminsList" element={<RestoList />  } />
            <Route path="/TestsList" element={<TestsList />  } />
            <Route path="/feedbacksList" element={<FeedbackList />  } />
            <Route path="/coursesList" element={<OrdersList />  } />
            <Route path="/teachersList" element={<TeacherList/>  } />
            <Route path="/enrollementsList" element={<EnrollmentsList />  } />
            <Route path="/updateAdmin/:id" element={<Restoupdate />  } />
            <Route path="/UpdateUser/:userId" element={<UpdateUser />  } />
            <Route path="/UpdateCourse/:courseId" element={<UpdateOrder />  } />
            <Route path="/UpdateTeacher/:teacherId" element={<Menuupdate />  } />
            <Route path="/UpdateTest/:testId" element={<UpdateTest />  } />
            {/* <Route path="/UpdateEnrollement/:enrollId" element={<UpdateEnrollement />  } /> */}
            <Route path="/UpdateFeedback/:feedbackId" element={<UpdateFeedback />  } />
            <Route path="/ViewAdmin/:adminId" element={<ViewAdmin />  } />
            <Route path="/ViewUser/:userId" element={<ViewUser />  } />
            <Route path="/ViewEnrollement/:enrollId" element={<ViewEnrollement />  } />
            <Route path="/ViewFeedback/:feedbackId" element={<ViewFeedback />  } />
            <Route path="/ViewCourse/:courseId" element={<ViewCourse />  } />
            <Route path="/ViewTest/:testId" element={<ViewTest />  } />
            <Route path="/ViewTeacher/:teacherId" element={<ViewTeacher />  } />

            <Route
              path="/home"
              element={ <Home /> }
            />

          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
// form validation
