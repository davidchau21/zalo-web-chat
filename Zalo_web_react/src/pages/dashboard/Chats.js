import React, { useEffect } from "react";
import {
  Box,
  Stack,
  Divider,
  Button,
  Typography,
  IconButton,
  Modal,
  TextField,
} from "@mui/material";
import { MagnifyingGlass, UserPlus, Users } from "phosphor-react";
import { SimpleBarStyle } from "../../components/Scrollbar";
import {
  Search,
  SearchIconWrapper,
  StyledInputBase,
} from "../../components/Search";
import ChatElement from "../../components/ChatElement";
import Friends from "../../sections/main/Friends";
import { socket } from "../../socket";
import {
  FetchFriends,
  FetchGroups,
  FetchChatArrGroup,
  FetchChatGroupArr1,
  SelectConversation,
  clearReplyMessage
} from "../../redux/slices/app";
import Message from "../../components/Conversation/Message";
import axios from "../../utils/axios";
import { useSelector, useDispatch } from "react-redux";

const user_id = window.localStorage.getItem("user_id");

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

const Chats = () => {
  const [openDialog, setOpenDialog] = React.useState(false);
  const [openModalAddGroup, setOpenModalAddGroup] = React.useState(false);
  const [textAddGroup, setTextAddGroup] = React.useState(false);

  const { conversations } = useSelector(
    (state) => state.conversation.direct_chat
  );

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(FetchFriends());
    dispatch(FetchGroups());
  }, [dispatch]);

  const { friends, groups } = useSelector((state) => state.app);
  console.log("gourp", groups);
  useEffect(() => {
    socket.emit("get_direct_conversations", { user_id }, (data) => {
      // data => list of converssations
    });
  }, []);

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleGroupClick = (group) => {
    dispatch(FetchChatGroupArr1(group._id));
    dispatch(SelectConversation({ room_id: group._id }))
    dispatch(clearReplyMessage())
  };

  const addNewGroup = async ()  =>  {
    await axios
      .post(`/groupchat/`,           
      {
        admin: user_id,
        groupName: textAddGroup
      }, 
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer `,
        },
      })
      .then((response) => {
        console.log("Thêm group mới thành công")
        setTextAddGroup("")
        setOpenModalAddGroup(false);
        dispatch(FetchGroups());
      })
      .catch((error) => {
        console.log("error :", error);
      });
  };

  return (
    <>
      <Box
        sx={{
          position: "relative",

          width: 320,
          backgroundColor: "#F8FAFF",
          boxShadow: "0px 0px 2px rgba(0,0,0,0.25)",
        }}
      >
        <Stack p={2} spacing={1.5} sx={{ height: "100vh" }}>
          <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
            spacing={2}
          >
            <Stack sx={{ width: "100%", fontSize: 20 }}>
              <Search>
                <SearchIconWrapper>
                  <MagnifyingGlass color="#709CE6" />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search…"
                  inputProps={{ "aria-label": "search" }}
                />
              </Search>
            </Stack>
            <IconButton
              onClick={() => {
                handleOpenDialog();
              }}
            >
              <UserPlus size={25} />
            </IconButton>
            <Stack>
            <IconButton
            onClick={() => setOpenModalAddGroup(true)}
            >
              <Users size={25} />
              </IconButton>
            </Stack>
          </Stack>
          <Stack direction={"row"}>
            <Button>Tất cả</Button>
            <Button>Chưa đọc</Button>
          </Stack>
          <Stack>
            <Divider style={{ marginTop: "-15px" }} />
          </Stack>
          <Stack
            dỉrection={"column"}
            sx={{ flexGrow: 1, overflowY: "scroll", height: "100%" }}
          >
            <SimpleBarStyle timeout={500} clickOnTrack={false}>
              {/* <Stack spacing={1}>
                <Typography variant="subtitle2" sx={{ color: "#676767" }}>
                  Chưa đọc
                </Typography>
                {ChatList.filter((el) => el.pinned).map((el) => {
                  return <ChatElement {...el} />;
                })}
              </Stack> */}
              <Stack spacing={1}>
              <h4>Bạn bè</h4>
                {/* Hiển thị danh sách bạn bè */}
                {friends?.map((friend) => (
                  <Box
                    key={friend.id}
                    display="flex"
                    alignItems="center"
                    sx={{
                      "&:hover": {
                        backgroundColor: "rgb(232, 243, 255)",
                        cursor: "pointer",
                      },
                      borderRadius: "8px",
                      padding: "8px",
                    }}
                  >
                    <img
                      src={
                        friend?.img ||
                        "https://cdn-icons-png.flaticon.com/512/9187/9187604.png"
                      }
                      alt="Avatar"
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                      }}
                    />
                    <Typography
                      variant="subtitle2"
                      sx={{ color: "#676767", ml: 1 }}
                    >
                      {friend.firstName} {friend.lastName}
                    </Typography>
                  </Box>
                ))}
                {/* Hiển thị danh sách nhóm */}
                <Box style={{marginTop: 20}}>

                <h4>Nhóm</h4>
                {groups?.map((group) => (
                  <Box
                    key={group.id}
                    display="flex"
                    alignItems="center"
                    sx={{
                      "&:hover": {
                        backgroundColor: "rgb(232, 243, 255)",
                        cursor: "pointer",
                      },
                      borderRadius: "8px",
                      padding: "8px",
                    }}
                    onClick={() => handleGroupClick(group)}
                  >
                    <img
                      src={
                        group?.img ||
                        'https://cdn-icons-png.flaticon.com/512/6387/6387947.png'
                      }
                      alt="Avatar"
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                        objectFit: 'contain'
                      }}
                      
                    />
                    <Typography
                      variant="subtitle2"
                      sx={{ color: "#676767", ml: 1 }}
                    >
                      {group.groupName}
                    </Typography>
                  </Box>
                ))}
                </Box>
              </Stack>
            </SimpleBarStyle>
          </Stack>
        </Stack>
      </Box>
      <Modal
        open={openModalAddGroup}
        onClose={() => setOpenModalAddGroup(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2" style={{display: 'flex', alignItems: 'center'}}>
          <Users size={30} style={{marginRight: 10}}/>Tạo nhóm
          </Typography>
          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              id="standard-basic"
              label="Nhập tên nhóm..."
              variant="standard"
              onChange={(e) => setTextAddGroup(e.target.value)}
            />
          </Box>
          <Box style={{marginTop: 20}}>
          <Stack spacing={2} direction="row" justifyContent={'flex-end'}>
            <Button variant="text" onClick={()=>setOpenModalAddGroup(false)}>Hủy</Button>
            <Button variant="contained" onClick={addNewGroup}>Tạo nhóm</Button>
          </Stack>
          </Box>
        </Box>
      </Modal>
      {openDialog && (
        <Friends open={openDialog} handleClose={handleCloseDialog} />
      )}
    </>
  );
};
export default Chats;
