import { Box, Stack, Typography, Avatar } from "@mui/material";
import React, { useEffect } from "react";
import { FetchChatArr } from "../../redux/slices/app";
import { useDispatch, useSelector } from "react-redux";

const MessageGroup = ({ menu }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(FetchChatArr());
  }, [dispatch]);

  const { ChatArr } = useSelector((state) => state.app);

  return (
    <Box p={3}>
      <Stack spacing={3}>
        {ChatArr?.map((el, index) => {
          const isSentByUser = el.from === window.localStorage.getItem("user_id");

          return (
            <Box
              key={index}
              display="flex"
              alignItems="center"
              justifyContent={isSentByUser ? "flex-end" : "flex-start"}
            >
              <Box
                p={1}
                borderRadius={10}
                bgcolor={isSentByUser ? "#F0F0F0" : "#E1FFC7"}
              >
                <Box display="flex" alignItems="center" flexDirection="column">
                  <Typography
                    variant="body1"
                    style={{
                      marginLeft: isSentByUser ? "auto" : "10px",
                      marginRight: isSentByUser ? "10px" : "auto",
                    }}
                  >
                    {el.text}
                  </Typography>
                  <Box
                    display="flex"
                    alignItems="center"
                    flexDirection="column"
                  >
                    {el.file && (
                      <img
                        src={el.file}
                        alt="File"
                        style={{ maxWidth: "100%" }}
                      />
                    )}
                  </Box>
                </Box>
              </Box>
            </Box>
          );
        })}
      </Stack>
    </Box>
  );
};

export default MessageGroup;
