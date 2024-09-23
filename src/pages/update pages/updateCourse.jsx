import React, { useState, useEffect } from "react";
import Sidebar from "../../components/aside/asideHeader";
import Header from "../../components/head/head";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button, TextField, Typography } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "../../firebaseConfig"; // Ensure this import is correct
import { doc, getDoc, updateDoc } from "firebase/firestore";

function UpdateOrder() {
  const { id } = useParams(); // Get order ID from URL parameters
  const navigate = useNavigate();

  const [restoData, setRestoData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  

  // Form validation schema using Yup
  const validationSchema = Yup.object().shape({
    name: Yup.string(),
    email: Yup.string().email("Invalid email format"),
    address: Yup.string(),
    mobile: Yup.string(),
    paymentMode: Yup.string(),
  });

  // Fetch order data from Firestore
  const getOrder = async () => {
    try {
      const orderDoc = doc(db, "orders", id);
      const docSnap = await getDoc(orderDoc);
      if (docSnap.exists()) {
        setRestoData(docSnap.data());
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.error("Error fetching order:", error);
    }
  };

  useEffect(() => {
    if (id) {
      getOrder();
    }
  }, [id]);

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const orderDoc = doc(db, "orders", id);
      await updateDoc(orderDoc, values);
      console.log("Order updated successfully");
      navigate("/coursesList"); // Redirect after successful update
    } catch (error) {
      setError("Error updating the order");
      console.error("Error updating order:", error);
    } finally {
      setLoading(false);
    }
  };

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  }

  return (
    <div className='grid-container'>
    <Header OpenSidebar={OpenSidebar} />
    <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
    <main className='main-container'>
      <Typography variant="h4" color="#000">Update Order</Typography>
      <Formik
        initialValues={{
          name: restoData?.name || "",
          email: restoData?.email || "",
          address: restoData?.address || "",
          mobile: restoData?.mobile || "",
          paymentMode: restoData?.paymentMode || "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
          {({ handleChange, values }) => (
            <Form>
              <Field
                name="name"
                as={TextField}
                label="Client Name"
                fullWidth
                margin="normal"
                onChange={handleChange}
                value={values.name}
              />
              <ErrorMessage name="name" component="div" style={{ color: 'red' }} />

              <Field
                name="email"
                as={TextField}
                label="Client Email"
                fullWidth
                margin="normal"
                onChange={handleChange}
                value={values.email}
              />
              <ErrorMessage name="email" component="div" style={{ color: 'red' }} />

              <Field
                name="address"
                as={TextField}
                label="Client Address"
                fullWidth
                margin="normal"
                onChange={handleChange}
                value={values.address}
              />
              <ErrorMessage name="address" component="div" style={{ color: 'red' }} />

              <Field
                name="mobile"
                as={TextField}
                label="Mobile"
                fullWidth
                margin="normal"
                onChange={handleChange}
                value={values.mobile}
              />
              <ErrorMessage name="mobile" component="div" style={{ color: 'red' }} />

              <Field
                name="paymentMode"
                as={TextField}
                label="Payment Mode"
                fullWidth
                margin="normal"
                onChange={handleChange}
                value={values.paymentMode}
              />
              <ErrorMessage name="paymentMode" component="div" style={{ color: 'red' }} />

              {error && <div style={{ color: "red" }}>{error}</div>}

              <Button
                type="submit"
                variant="contained"
                className="btn mt-5"
                disabled={loading}
              >
                {loading ? "Updating..." : "Update Order"}
              </Button>
            </Form>
          )}
        </Formik>
      </main>
    </div>
  );
}

export default UpdateOrder;
