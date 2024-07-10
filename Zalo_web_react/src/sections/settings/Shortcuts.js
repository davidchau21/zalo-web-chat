import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Slide,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const list = [
  {
    key: 0,
    title: "Mark as unread",
    combination: ["Cmd", "Shift", "U"],
  },
  {
    key: 1,
    title: "Mute",
    combination: ["Cmd", "Shift", "M"],
  },
  {
    key: 2,
    title: "Delete",
    combination: ["Cmd", "Shift", "D"],
  },
  {
    key: 3,
    title: "Archive",
    combination: ["Cmd", "Shift", "A"],
  },
  {
    key: 4,
    title: "Search",
    combination: ["Cmd", "Shift", "S"],
  },
  {
    key: 5,
    title: "New Chat",
    combination: ["Cmd", "Shift", "N"],
  },
  {
    key: 6,
    title: "New Group",
    combination: ["Cmd", "Shift", "G"],
  },
  {
    key: 7,
    title: "Profile",
    combination: ["Cmd", "Shift", "P"],
  },
  {
    key: 8,
    title: "Settings",
    combination: ["Cmd", "Shift", ","],
  },
  {
    key: 9,
    title: "Help",
    combination: ["Cmd", "Shift", "H"],
  },
  {
    key: 10,
    title: "Shortcuts",
    combination: ["Cmd", "Shift", "/"],
  },
  {
    key: 11,
    title: "Search in chat",
    combination: ["Cmd", "F"],
  },
  {
    key: 12,
    title: "Previous chat",
    combination: ["Cmd", "["],
  },
  {
    key: 13,
    title: "Next chat",
    combination: ["Cmd", "]"],
  },
  {
    key: 14,
    title: "Go to first chat",
    combination: ["Cmd", "Shift", "["],
  },
  {
    key: 15,
    title: "Go to last chat",
    combination: ["Cmd", "Shift", "]"],
  },
  {
    key: 16,
    title: "New chat",
    combination: ["Cmd", "N"],
  },
  {
    key: 17,
    title: "Search",
    combination: ["Cmd", "F"],
  },
  {
    key: 18,
    title: "Previous chat",
    combination: ["Cmd", "Up"],
  },
  {
    key: 19,
    title: "Next chat",
    combination: ["Cmd", "Down"],
  },
  {
    key: 20,
    title: "Go to first chat",
    combination: ["Cmd", "Shift", "Up"],
  },
  {
    key: 21,
    title: "Go to last chat",
    combination: ["Cmd", "Shift", "Down"],
  },
];

const Shortcuts = ({ open, handleClose }) => {
  return (
    <>
      <Dialog
        fullWidth
        maxWidth="md"
        open={open}
        onClose={handleClose}
        sx={{ p: 4 }}
        keepMounted
        TransitionComponent={Transition}
      >
        <DialogTitle>Keyboard Shortcuts</DialogTitle>
        <DialogContent sx={{ mt: 4 }}>
          <Grid container spacing={3}>
            {list.map(({ key, title, combination }) => (
              <Grid key={key} item xs={6}>
                <Stack
                  sx={{ width: "100%" }}
                  justifyContent={"space-between"}
                  spacing={3}
                  direction={"row"}
                  alignItems={"center"}
                >
                  <Typography variant="caption" sx={{ fontSize: 14 }}>
                    {title}
                  </Typography>
                  <Stack spacing={2} direction={"row"}>
                    {combination.map((el) => {
                      return (
                        <Button
                          disabled
                          variant="contained"
                          sx={{ color: "#212121" }}
                        >
                          {el}
                        </Button>
                      );
                    })}
                  </Stack>
                </Stack>
              </Grid>
            ))}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleClose}>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Shortcuts;
