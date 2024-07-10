import { Container, Stack } from "@mui/material";
import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import Logo from "../../assets/Images/zlogo.png";
import backgroundImage from "../../assets/Images/background.png";
import { useSelector } from "react-redux";

const MainLayout = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);

  if (isLoggedIn) {
    return <Navigate to="/app" />;
  }

  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
      }}
    >
      <Container sx={{ paddingTop: "60px" }} maxWidth="sm">
        <Stack spacing={5} sx={{ p: 2 }}>
          <Stack
            sx={{ width: "100%" }}
            direction={"column"}
            alignItems={"center"}
          >
            <img src={Logo} alt="Logo" style={{ height: 41, width: 114 }} />
          </Stack>
        </Stack>
        {/* <div>Main Layout</div> */}
        <Outlet />
      </Container>
    </div>
  );
};

export default MainLayout;
