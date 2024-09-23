import { Box, Typography, useMediaQuery } from "@mui/material";
import Form from "./Form";

const LoginPage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
    return (
    <Box>
      <Box
        width="100%"
        backgroundColor={"#fff"}
        p="1rem 6%"
        textAlign="center"
      >
        
      </Box>

      <Box
        width={isNonMobileScreens ? "50%" : "80%"}
        p="2rem"
        m="2rem auto"
        borderRadius="1.5rem"
        backgroundColor={"#ffffff"}
        boxShadow="9px 4px 23px -8px rgba(156,148,156,1)"
      >
        <Typography fontWeight="500"  textAlign="center" variant="h5" sx={{ mb: "1.5rem" }}>
          Welcome to My dashboard 
        </Typography>
        <Form />
      </Box>
    </Box>
  );
};

export default LoginPage;
