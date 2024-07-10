import { Stack, Box, IconButton, Typography } from "@mui/material";
import { CaretLeft } from "phosphor-react";
import React, { useEffect } from "react";
import ProfileForm1 from "./../../sections/settings/ProfileForm1";
import { FetchProfile } from "../../redux/slices/app";
import { useDispatch, useSelector } from "react-redux";

const Profile = () => {
  const dispatch = useDispatch();

  const { profile } = useSelector((state) => state.app);

  useEffect(() => {
    dispatch(FetchProfile());
  }, []);
  return (
    <>
      <Stack direction={"row"} sx={{ width: "100%" }}>
        {/* Left */}
        <Box
          sx={{
            height: "100vh",
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? "#F8FAFF"
                : theme.palette.background,
            width: 320,
            boxShadow: "0px 0px 2px rgba(0,0,0,0..25)",
          }}
        >
          <Stack p={4} spacing={5}>
            <Stack direction={"row"} alignItems={"center"} spacing={3}>
              <IconButton>
                <CaretLeft size={24} color="#4B4B4B" />
              </IconButton>
              <Typography variant={"h5"}>Profile</Typography>
            </Stack>
            {/* Profile */}
            <ProfileForm1 profile={profile} />
          </Stack>
        </Box>
      </Stack>
    </>
  );
};

export default Profile;
