import React from "react";
import { useTheme, styled } from "@mui/material/styles";
import {
  Avatar,
  Box,
  Button,
  Stack,
  Typography,
  IconButton,
} from "@mui/material";
import { Chat, PlusCircle, MinusCircle  } from "phosphor-react";

import StyledBadge from "./StyledBadge";
import { socket } from "../socket";

const user_id = window.localStorage.getItem("user_id");
const StyledChatBox = styled(Box)(({ theme }) => ({
  "&:hover": {
    cursor: "pointer",
  },
}));

const UserComponent = ({ firstName, lastName, _id, online, img }) => {
  const theme = useTheme();
  const name = `${firstName} ${lastName}`;

  return (
    <StyledChatBox
      sx={{
        width: "100%",
        borderRadius: 1,
        backgroundColor: theme.palette.background.paper,
      }}
      p={2}
    >
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Stack direction={"row"} alignItems={"center"} spacing={2}>
          {online ? (
            <StyledBadge
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              variant="dot"
            >
              <Avatar alt={name} src={img} />
            </StyledBadge>
          ) : (
            <Avatar alt={name} src={img} />
          )}
          <Stack spacing={0.3}>
            <Typography variant="subtitle2">{name}</Typography>
          </Stack>
        </Stack>
        <Stack direction={"row"} spacing={2} alignItems={"center"}>
          <Button
            onClick={() => {
              socket.emit("friend_request", { to: _id, from: user_id }, () => {
                alert("Request Sent");
              });
            }}
          >
            Sent Request
          </Button>
        </Stack>
      </Stack>
    </StyledChatBox>
  );
};

const FriendRequestsComponent = ({
  firstName,
  lastName,
  _id,
  online,
  img,
  id,
}) => {
  const theme = useTheme();
  const name = `${firstName} ${lastName}`;

  return (
    <StyledChatBox
      sx={{
        width: "100%",
        borderRadius: 1,
        backgroundColor: theme.palette.background.paper,
      }}
      p={2}
    >
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Stack direction={"row"} alignItems={"center"} spacing={2}>
          {online ? (
            <StyledBadge
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              variant="dot"
            >
              <Avatar alt={name} src={img} />
            </StyledBadge>
          ) : (
            <Avatar alt={name} src={img} />
          )}
          <Stack spacing={0.3}>
            <Typography variant="subtitle2">{name}</Typography>
          </Stack>
        </Stack>
        <Stack direction={"row"} spacing={2} alignItems={"center"}>
          <Button
            onClick={() => {
              socket.emit("accept_request", { request_id: id }, () => {
                alert("Request Sent");
              });
            }}
          >
            Accept Request
          </Button>
        </Stack>
      </Stack>
    </StyledChatBox>
  );
};

const FriendComponent = ({ firstName, lastName, _id, online, img, purpose, onPressButton }) => {
  const theme = useTheme();
  const name = `${firstName} ${lastName}`;
  
 

  return (
    <StyledChatBox
      sx={{
        width: "100%",
        borderRadius: 1,
        backgroundColor: theme.palette.background.paper,
      }}
      p={2}
    >
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Stack direction={"row"} alignItems={"center"} spacing={2}>
          {online ? (
            <StyledBadge
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              variant="dot"
            >
              <Avatar alt={name} src={img || "https://cdn-icons-png.flaticon.com/512/9187/9187604.png"} />
            </StyledBadge>
          ) : (
            <Avatar alt={name} src={img || "https://cdn-icons-png.flaticon.com/512/9187/9187604.png"} />
          )}
          <Stack spacing={0.3}>
            <Typography variant="subtitle2">{name}</Typography>
          </Stack>
        </Stack>
        <Stack direction={"row"} spacing={2} alignItems={"center"}>
          {purpose === 'addToGroup' ?
              <IconButton
                onClick={onPressButton}
              >
                 <PlusCircle />
              </IconButton>
          :
          <IconButton
            onClick={() => {
              // start a new conversation
            }}
          >
            <Chat />
          </IconButton>
          }
        </Stack>
      </Stack>
    </StyledChatBox>
  );
};

const GroupListComponent = ({ firstName, lastName, _id, online, img }) => {
  const theme = useTheme();
  const name = `${firstName} ${lastName}`;
  
 

  return (
    <StyledChatBox
      sx={{
        width: "100%",
        borderRadius: 1,
        backgroundColor: theme.palette.background.paper,
      }}
      p={2}
    >
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Stack direction={"row"} alignItems={"center"} spacing={2}>
          {online ? (
            <StyledBadge
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              variant="dot"
            >
              <Avatar alt={name} src={img || "https://cdn-icons-png.flaticon.com/512/9187/9187604.png"} />
            </StyledBadge>
          ) : (
            <Avatar alt={name} src={img || "https://cdn-icons-png.flaticon.com/512/9187/9187604.png"} />
          )}
          <Stack spacing={0.3}>
            <Typography variant="subtitle2">{name}</Typography>
          </Stack>
        </Stack>
        <Stack direction={"row"} spacing={2} alignItems={"center"}>
              <IconButton
                onClick={() => {
                  }}
              >
                 <MinusCircle  />
              </IconButton>
    
        </Stack>
      </Stack>
    </StyledChatBox>
  );
};

export { UserComponent, FriendRequestsComponent, FriendComponent, GroupListComponent };
