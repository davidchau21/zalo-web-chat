import { Link as RouterLink } from "react-router-dom";
import { Stack, Typography, Link } from "@mui/material";
import React from "react";
// import AuthSocial from "../../sections/auth/AuthSocial";
import LoginForm from "../../sections/auth/LoginForm";

const Login = () => {
  return (
    <>
      <Stack spacing={0.5} sx={{ mb: 5, position: "relative" }}>
        <Typography
          variant="content"
          sx={{ textAlign: "center", fontWeight: 400, fontSize: "1.2rem" }}
        >
          Đăng nhập tài khoản Zalo
        </Typography>
        <Typography
          variant="content"
          sx={{ textAlign: "center", fontWeight: 400, fontSize: "1.2rem" }}
        >
          để kết nối với ứng dụng Zalo Web
        </Typography>
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
            {/* Login From */}
            <LoginForm />
            <Stack direction={"row"} spacing={0.5}>
              <Typography variant="body2">New User?</Typography>
              <Link
                to="/auth/register"
                component={RouterLink}
                variant="subtitle2"
              >
                Create an account
              </Link>
            </Stack>

            {/* Auth Social Login cach khac */}
            {/* <AuthSocial /> */}
          </Stack>
        </Stack>
      </Stack>
    </>
  );
};

export default Login;
