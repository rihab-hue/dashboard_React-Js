
import { useState } from "react";
import { Box, Button, TextField, useMediaQuery, Typography } from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Formik } from "formik"; // For handling form state and submission
import * as yup from "yup"; // For schema validation of form inputs
import { useNavigate } from "react-router-dom"; // To programmatically navigate to other routes
import { useDispatch } from "react-redux"; // To dispatch Redux actions
import { setLogin } from "../../state/index"; // Action to set login state in Redux


const loginSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
});


// Initial form values for the login form
const initialValuesLogin = {
  email: "",
  password: "",
};


// Functional component for the Form
const Form = () => {
  const [pageType, setPageType] = useState("login"); // Local state to toggle between login and register
  const dispatch = useDispatch(); // Redux's dispatch function
  const navigate = useNavigate(); // Hook for navigation
  const isNonMobile = useMediaQuery("(min-width:600px)"); // Check for non-mobile screen width
  const isLogin = pageType === "login"; // Boolean to check if current form is login


  // Function to handle registration process


  // Function to handle login process
  const login = async (values, onSubmitProps) => {
    const response = await fetch("http://localhost:3002/loginAdmin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    const result = await response.json();
    onSubmitProps.resetForm();
    if (response.ok) {
      alert("login successfully")
      dispatch(setLogin({ admin: result.admin, token: result.token }));
      navigate("/home"); // Navigate to home on successful login
    } else {
      alert(result.message); // Show error message on failure
    }
  };

  // Function to decide which form submission handler to use
  const handleFormSubmit = async (values, onSubmitProps) => {
    await login(values, onSubmitProps);
  };

  // Form component structure using Formik for form handling
  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={ initialValuesLogin }
      validationSchema={ loginSchema }
    >
      {({values,errors,handleBlur,handleChange,handleSubmit,setFieldValue,resetForm,})=> (
        <form onSubmit={handleSubmit}>
          <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
              "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
            }}
          >
       
            <TextField
              label="Email"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.email}
              name="email"
              error={ Boolean(errors.email)}
              helperText={ errors.email}
              sx={{ gridColumn: "span 4" }}
            />
            <TextField
              label="Password"
              type="password"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.password}
              name="password"
              error={ Boolean(errors.password)}
              helperText={ errors.password}
              sx={{ gridColumn: "span 4" }}
            />
          </Box>

          {/* Form submission buttons */}
          <Box>
            <Button
              fullWidth
              type="submit"
              sx={{
                m: "2rem 0",
                p: "1rem",
                backgroundColor: "#ffd21f",
                color:"#FFFFFF",
                "&:hover": { color: "#ffd21f" },
              }}
            >
              LOGIN
            </Button>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default Form; // Exports the Form component for use elsewhere in the app
