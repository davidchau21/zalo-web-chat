import { createSlice } from "@reduxjs/toolkit";

import axios from "../../utils/axios";

const initialState = {
  sidebar: {
    open: false,
    type: "CONTACT",
  },
  snackbar: {
    open: null,
    message: null,
    severity: null,
  },
  profile: [],
  ChatArr: [],
  ChatGroupArr: [],
  users: [],
  friends: [],
  groups: [],
  friendRequests: [],
  chat_type: null,
  room_id: null,
  reply_message: "",
};

const slice = createSlice({
  name: "app",
  initialState,
  reducers: {
    updateProfile(state, action) {
      state.profile = action.payload.profile;
    },
    updateChatArr(state, action) {
      state.ChatArr = action.payload.ChatArr;
    },
    clearChatArr(state, action) {
      state.ChatArr = null;
    },
    updateChatGroupArr(state, action) {
      state.ChatGroupArr = action.payload.ChatGroupArr;
    },
    toggleSidebar(state, action) {
      state.sidebar.open = !state.sidebar.open;
    },
    updateSidebarType(state, action) {
      state.sidebar.type = action.payload.type;
    },
    openSnackBar(state, action) {
      state.snackbar.open = true;
      state.snackbar.severity = action.payload.severity;
      state.snackbar.message = action.payload.message;
    },
    closeSnackBar(state, action) {
      state.snackbar.open = false;
      state.snackbar.message = null;
      state.snackbar.severity = null;
    },
    updateUsers(state, action) {
      state.users = action.payload.users;
    },
    updateFriends(state, action) {
      state.friends = action.payload.friends;
    },
    updateGroups(state, action) {
      state.groups = action.payload.groups;
    },
    updateFriendRequests(state, action) {
      state.friendRequests = action.payload.request;
    },
    selectConversation(state, action) {
      state.chat_type = "individual";
      state.room_id = action.payload.room_id;
    },
    logout(state, action) {
      state = {};
    },
    sendReplyMessage(state, action) {
      state.reply_message = action.payload.message;
    },
  },
});

//Reducer
export default slice.reducer;

export function toggleSidebar() {
  return async (dispatch, getState) => {
    dispatch(slice.actions.toggleSidebar());
  };
}

export function updateSidebarType(type) {
  return async (dispatch, getState) => {
    dispatch(slice.actions.updateSidebarType({ type }));
  };
}

export function sendReplyMessage(message) {
  return async (dispatch, getState) => {
    dispatch(slice.actions.sendReplyMessage({ message }));
  };
}

export const clearReplyMessage = () => {
  return async (dispatch, getState) => {
    dispatch(slice.actions.sendReplyMessage(""));
  };
};
export const showSnackbar =
  ({ severity, message }) =>
  async (dispatch, getState) => {
    dispatch(
      slice.actions.openSnackBar({
        message,
        severity,
      })
    );

    setTimeout(() => {
      dispatch(slice.actions.closeSnackBar());
    }, 4000);
  };
export const closeSnackbar = () => async (dispatch, getState) => {
  dispatch(slice.actions.closeSnackBar());
};

export const FetchProfile = () => {
  // console.log("chay lay thong tin người dung");
  return async (dispatch, getState) => {
    await axios
      .get("/users/profile", {
        params: {
          uid: window.localStorage.getItem("user_id"),
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getState().auth.token}`,
        },
      })
      .then((response) => {
        // console.log("response get Profile:", response);

        dispatch(slice.actions.updateProfile({ profile: response.data }));
      })
      .catch((error) => {
        console.log("error :", error);
      });
  };
};

export const FetchUsers = () => {
  return async (dispatch, getState) => {
    await axios
      .get("/users/get-users", {
        params: {
          uid: window.localStorage.getItem("user_id"),
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getState().auth.token}`,
        },
      })
      .then((response) => {
        console.log("response :", response);
        dispatch(slice.actions.updateUsers({ users: response.data.data }));
      })
      .catch((error) => {
        console.log("error :", error);
      });
  };
};

export const FetchFriends = () => {
  return async (dispatch, getState) => {
    console.log(window.localStorage.getItem("user_id"));
    await axios
      .get("/users/get-friends", {
        params: {
          uid: window.localStorage.getItem("user_id"),
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getState().auth.token}`,
        },
      })
      .then((response) => {
        console.log("response :", response);
        dispatch(slice.actions.updateFriends({ friends: response.data.data }));
      })
      .catch((error) => {
        console.log("error :", error);
      });
  };
};

export const FetchGroups = () => {
  return async (dispatch, getState) => {
    await axios
      .get(`/groupchat/${window.localStorage.getItem("user_id")}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getState().auth.token}`,
        },
      })
      .then((response) => {
        console.log("lấy nhóm :", response);
        if (response.data) {
          dispatch(slice.actions.updateGroups({ groups: response.data.data }));
        }
      })
      .catch((error) => {
        console.log("error :", error);
      });
  };
};

export const FetchFriendRequests = () => {
  return async (dispatch, getState) => {
    await axios
      .get("/user/get-friend-requests", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getState().auth.token}`,
        },
      })
      .then((response) => {
        console.log("response :", response);
        dispatch(
          slice.actions.updateFriendRequests({ request: response.data.data })
        );
      })
      .catch((error) => {
        console.log("error :", error);
      });
  };
};

export const SelectConversation = ({ room_id }) => {
  return async (dispatch, getState) => {
    dispatch(slice.actions.selectConversation({ room_id }));
  };
};

export const FetchChatArrGroup = (req, res) => {
  //cpn msg
  console.log("req nhóm: ", req.messages);
  return async (dispatch, getState) => {
    dispatch(slice.actions.updateChatArr({ ChatArr: req.messages }));
    // dispatch(slice.actions.updateChatArr({ ChatArr: req }));
  };
};
export const FetchChatArr = () => {
  return async (dispatch, getState) => {
    await axios
      .get("/chat/conversation", {
        params: {
          from: window.localStorage.getItem("user_id"),
          to: "66178a2c0e756ee344648c85",
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getState().auth.token}`,
        },
      })
      .then((response) => {
        // console.log("chay lay cuoc noi chuyen");
        // console.log(response.data.data.messages);
        dispatch(
          slice.actions.updateChatArr({ ChatArr: response.data.data.messages })
        );
      })
      .catch((error) => {
        console.log("error :", error);
      });
  };
};
export const FetchChatGroupArr = () => {
  // console.log("chay lay thong tin người dung");
  return async (dispatch, getState) => {
    await axios
      .get("/groupchat/conversation/66199ed5b9a80f0c6dbaee5a", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getState().auth.token}`,
        },
      })
      .then((response) => {
        // console.log("response get Profile:", response);

        dispatch(
          slice.actions.updateChatGroupArr({
            ChatGroupArr: response.data.data.messages,
          })
        );
      })
      .catch((error) => {
        console.log("error :", error);
      });
  };
};
export const FetchChatGroupArr1 = (id) => {
  // console.log("chay vao FetchChatGroupArr1 với id", id);
  return async (dispatch, getState) => {
    await axios
      .get(`/groupchat/conversation/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getState().auth.token}`,
        },
      })
      .then((response) => {
        console.log("response get tro chuyen:", response.data.data);

        dispatch(
          slice.actions.updateChatGroupArr({
            ChatGroupArr: response.data.data,
          })
        );
        dispatch(slice.actions.clearChatArr({}));
      })
      .catch((error) => {
        console.log("error :", error);
      });
  };
};

export const removeMessage = (id, groupId) => {
  console.log("chay vao FetchChatGroupArr1 với id1", id);
  console.log("chay vao FetchChatGroupArr1 với grid", groupId);
  return async (dispatch, getState) => {
    await axios
      .put(
        `/groupchat/remove/`,
        {
          msgId: id,
          groupId: groupId,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getState().auth.token}`,
          },
        }
      )
      .then((response) => {
        console.log("xoa tin nhan ", response);
        dispatch(FetchChatGroupArr1(groupId));
      })
      .catch((error) => {
        console.log("error :", error);
      });
  };
};
export const signOut = () => {
  return async (dispatch, getState) => {
    dispatch(slice.actions.logout());
  };
};
