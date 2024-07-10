import { Box, Stack, Typography, Avatar, IconButton } from "@mui/material";
import React, { useEffect } from "react";
import {
  FetchChatArr,
  FetchChatGroupArr,
  removeMessage,
  sendReplyMessage,
} from "../../redux/slices/app";
import { useDispatch, useSelector } from "react-redux";
import { ArrowArcRight, Trash } from "phosphor-react";

const Message = ({ menu }) => {
  const dispatch = useDispatch();

  const [hoveredIndex, setHoveredIndex] = React.useState(null);
  const [iconButtonHovered, setIconButtonHovered] = React.useState(false);

  const { ChatArr, ChatGroupArr } = useSelector((state) => state.app);

  useEffect(() => {
    dispatch(FetchChatArr());
    // dispatch(FetchChatGroupArr());
  }, [dispatch]);

  useEffect(() => {
    console.log("Tin nhắn group :", ChatGroupArr);
  }, [ChatGroupArr]);

  let Msg = <></>;
  if (ChatArr != null) {
    Msg = (
      <Box p={3}>
        <Stack spacing={3}>
          {ChatArr?.map((el, index) => {
            const isSentByUser =
              el.from === window.localStorage.getItem("user_id");

            return (
              <Box
                key={index}
                display="flex"
                alignItems="center"
                justifyContent={isSentByUser ? "flex-end" : "flex-start"}
              >
                <Box
                  display="flex"
                  flexDirection={isSentByUser ? "row" : "row-reverse"}
                >
                  {hoveredIndex === index && (
                    <Box
                      onMouseEnter={() => setIconButtonHovered(true)}
                      onMouseLeave={() => setIconButtonHovered(false)}
                    >
                      <IconButton>
                        <ArrowArcRight size={20} />
                      </IconButton>
                      <IconButton
                        onClick={() => dispatch(removeMessage(el._id))}
                      >
                        <Trash size={20} />
                      </IconButton>
                    </Box>
                  )}
                  <Box
                    p={1}
                    borderRadius={el.file ? 1 : 1}
                    bgcolor={isSentByUser ? "rgb(214 231 249)" : "#ffffff"}
                    style={{ cursor: "pointer" }}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => {
                      if (!iconButtonHovered) {
                        setHoveredIndex(null);
                      }
                    }}
                  >
                    <Box display="flex" flexDirection="column">
                      <Typography
                        variant="body1"
                        style={{
                          marginLeft: el.file
                            ? isSentByUser
                              ? "auto"
                              : "0px"
                            : "10px",
                          marginRight: el.file
                            ? isSentByUser
                              ? "10px"
                              : "auto"
                            : "10px",
                          marginBottom: el.file ? 10 : "auto",
                        }}
                      >
                        {el.text}
                      </Typography>
                      <Box
                        display="flex"
                        alignItems="center"
                        flexDirection="column"
                        borderRadius={1}
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
              </Box>
            );
          })}
        </Stack>
      </Box>
    );
  } else if (ChatGroupArr != null && ChatGroupArr.messages != null) {
    Msg = (
      <Box p={3}>
        <Stack spacing={3}>
          {ChatGroupArr?.messages.map((el, index) => {
            const isSentByUser =
              el.sender === window.localStorage.getItem("user_id");

            return (
              <Box
                key={index}
                display="flex"
                alignItems="center"
                justifyContent={isSentByUser ? "flex-end" : "flex-start"}
              >
                <Box>
                {!isSentByUser &&
                  <Box style={{marginBottom: 5}}>
                    {ChatGroupArr.members.map((item)=> 
                    {
                      if (item._id === el.sender) {
                        return (
                          <span key={index}>
                            {item.firstName} {item.lastName}
                          </span>
                        );
                      }
                      return null;
                    }
                    )}
                  </Box>
                }
                <Box
                  display="flex"
                  flexDirection={isSentByUser ? "row" : "row-reverse"}
                  justifyContent={"flex-end"}
                >
                  {!el.isRemove && hoveredIndex === index && (
                    <Box
                      onMouseEnter={() => setIconButtonHovered(true)}
                      onMouseLeave={() => setIconButtonHovered(false)}
                    >
                      <IconButton
                        onClick={()=> dispatch(sendReplyMessage({ message:  `${el.file ? "[Hình ảnh]" : ""}${el.text}`}))}>
                        <ArrowArcRight size={22} />
                      </IconButton>
                      <IconButton
                        onClick={() =>
                          dispatch(removeMessage(el._id, ChatGroupArr._id))
                        }
                      >
                        <Trash size={22} />
                      </IconButton>
                    </Box>
                  )}
                  <Box
                   style={{display: 'flex'}}
                   flexDirection={'column'}
                   >
                  {el.replyToTxt &&
                    <Box
                    p={1}
                    borderRadius={1}
                    bgcolor={"#e5e5e5"}
                    style={{paddingBottom: 20, marginBottom: -10, alignSelf: isSentByUser ? 'flex-end' : 'flex-start'
                  }}
                    >
                  <Typography
                  style={{color: '#727272'}}>
                    {el.replyToTxt}
                  </Typography>
                  </Box>
                  }
                  <Box
                    p={1}
                    borderRadius={el.file ? 1 : 1}
                    bgcolor={isSentByUser ? "rgb(214 231 249)" : "#ffffff"}
                    style={{ cursor: "pointer", alignSelf: isSentByUser ? 'flex-end' : 'flex-start'}}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => {
                      if (!iconButtonHovered) {
                        setHoveredIndex(null);
                      }
                    }}
                  >
                    <Box display="flex" flexDirection="column">
                      <Typography
                        variant="body2"
                        style={{
                          marginLeft: el.file
                            ? isSentByUser
                              ? "auto"
                              : "0px"
                            : "10px",
                          marginRight: el.file
                            ? isSentByUser
                              ? "10px"
                              : "auto"
                            : "10px",
                          marginBottom: el.file ? 10 : "auto",
                          color: el.isRemove ? 'grey' : 'black',
                          fontStyle: el.isRemove && 'italic'
                        }}
                      >
                        {el.isRemove ? 'Tin nhắn đã bị thu hồi': el.text}
                      </Typography>
                      <Box
                        display="flex"
                        alignItems="center"
                        flexDirection="column"
                        borderRadius={5}
                      >
                        {el.file && (
                          <img
                            src={el.file}
                            alt="File"
                            style={{ maxWidth: "50vh", borderRadius: 5 }}
                          />
                        )}
                      </Box>
                    </Box>
                  </Box>
                  </Box>
                </Box>
              </Box>
              </Box>
            );
          })}
        </Stack>
      </Box>
    );
  }
  return Msg;
};

export default Message;
