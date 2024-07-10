import { Stack, Typography, Link } from "@mui/material";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import RegisterForm from "../../sections/auth/RegisterForm";

const Register = () => {
  return (
    <>
      <Stack spacing={2} sx={{ mb: 5, position: "relative" }}>
        <Typography variant="h4">Get Started</Typography>
        <Stack sx={{ textAlign: "center", justifyItems: "center" }}>
          <Stack
            sx={{
              width: 400,
              height: 400,
              backgroundColor: "#fff",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              margin: "auto",
              marginTop: "10px",
            }}
          >
            <Stack direction={"row"} spacing={0.5}>
              <Typography variant="body2">Already have an account?</Typography>
              <Link component={RouterLink} to="/auth/login" variant="subtitle2">
                Sign in
              </Link>
            </Stack>
            {/* Register Form */}
            <RegisterForm />
            <Typography
              component={"div"}
              sx={{
                color: "text.secondary",
                mt: 3,
                typography: "caption",
                textAlign: "center",
              }}
            >
              {"By signing up, I agree to "}
              <Link underline="always" color="text.primary">
                Terms of Service
              </Link>
              <Link underline="always" color="text.primary">
                Privacy Policy
              </Link>
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </>
  );
};

export default Register;
