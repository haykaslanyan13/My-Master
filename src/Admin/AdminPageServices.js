import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, TextareaAutosize, TextField, Typography } from "@mui/material";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore/lite";
import { db } from "../Firebase/FirebaseUser";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import { useDispatch, useSelector } from "react-redux";
import { uptadeServiceList } from "../Redux/UserSlice";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

function AddService() {
  const serviceList = useSelector((state) => state.user.serviceList);
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);

  const handleSubmit = async (event) => {
    debugger;
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const [serviceName, description] = [
      data.get("serviceName"),
      data.get("description"),
    ];
    try {
      await addDoc(collection(db, "services"), {
        name: serviceName,
        description: description,
      });
    } catch {}
    const servicesCol = collection(db, "services");
    const serviceSnapshot = await getDocs(servicesCol);
    dispatch(uptadeServiceList(serviceSnapshot.docs));
    setOpen(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="contained" onClick={handleClickOpen}>
        Add Service
      </Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}>
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}>
          Add Service
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Box
            onSubmit={handleSubmit}
            component="form"
            sx={{
              width: 500,
              maxWidth: "100%",
            }}>
            <TextField
              fullWidth
              label="Service name"
              id="fullWidth"
              name="serviceName"
              margin="normal"
            />
            <TextField
              fullWidth
              label="Description"
              id="fullWidth"
              name="description"
              margin="normal"
            />
            <DialogActions>
              <Button
                onClick={handleClose}
                style={{
                  cursor: "pointer",
                  align: "left",
                  justifyContent: "start",
                  position: "relative",
                }}
                margin="normal"
                edge="start"
                autoFocus>
                Cancel
              </Button>
              <Button
                variant="contained"
                style={{ cursor: "pointer" }}
                type="submit"
                autoFocus>
                Add
              </Button>
            </DialogActions>
          </Box>
        </DialogContent>
      </BootstrapDialog>
    </div>
  );
}

function UpdateService({ document }) {
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const [defaultName, setDefaultName] = useState(document.data().name);
  const [defaultDescription, setDefaultDescription] = useState(
    document.data().description
  );

  const nameChange = (e) => {
    setDefaultName(e.target.value);
  };

  const descriptionChange = (e) => {
    setDefaultDescription(e.target.value);
  };

  const handleSubmit = async (event) => {
    debugger;
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const [serviceName, description] = [
      data.get("serviceName"),
      data.get("description"),
    ];
    try {
      await updateDoc(doc(db, "services", document.id), {
        description: description ? description : document.data().description,
        name: serviceName ? serviceName : document.data().name,
      });
    } catch {}
    const servicesCol = collection(db, "services");
    const serviceSnapshot = await getDocs(servicesCol);
    dispatch(uptadeServiceList(serviceSnapshot.docs));
    setOpen(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Edit
      </Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}>
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}>
          Edit Service
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Box
            onSubmit={handleSubmit}
            component="form"
            sx={{
              width: 500,
              maxWidth: "100%",
            }}>
            <TextField
              fullWidth
              onChange={(e) => nameChange(e)}
              value={defaultName}
              label="Service name"
              id="fullWidth"
              name="serviceName"
              margin="normal"
            />
            <TextField
              fullWidth
              value={defaultDescription}
              onChange={(e) => descriptionChange(e)}
              label="Description"
              id="fullWidth"
              name="description"
              margin="normal"
            />
            <DialogActions>
              <Button
                onClick={handleClose}
                style={{
                  cursor: "pointer",
                  align: "left",
                  justifyContent: "start",
                  position: "relative",
                }}
                margin="normal"
                edge="start"
                autoFocus>
                Cancel
              </Button>
              <Button
                variant="contained"
                style={{ cursor: "pointer" }}
                type="submit"
                autoFocus>
                Save
              </Button>
            </DialogActions>
          </Box>
        </DialogContent>
      </BootstrapDialog>
    </div>
  );
}

function DeleteService({ document }) {
  console.log(document.id);
  const serviceList = useSelector((state) => state.user.serviceList);
  const dispatch = useDispatch();

  const [open, setOpen] = React.useState(false);

  async function getUsers(db) {
    const servicesCol = collection(db, "services");
    const serviceSnapshot = await getDocs(servicesCol);
    dispatch(uptadeServiceList(serviceSnapshot.docs));
  }
  const deleteService = async (docId) => {
    await deleteDoc(doc(db, "services", docId));
    getUsers(db);
  };
  const handleSubmit = async (event) => {
    debugger;
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const [serviceName, description] = [
      data.get("serviceName"),
      data.get("description"),
    ];
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" color="error" onClick={handleClickOpen}>
        Delete
      </Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}>
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}>
          Confirm delete
        </BootstrapDialogTitle>

        <Box
          onSubmit={handleSubmit}
          component="form"
          sx={{
            width: 500,
            maxWidth: "100%",
          }}>
          <DialogContent dividers>
            <Typography>
              Are you sure you want to delete{" "}
              <span style={{ fontWeight: "bolder" }}>
                {document.data().name}:
              </span>
            </Typography>
          </DialogContent>
          <DialogActions style={{ position: "relative" }}>
            <Button
              onClick={handleClose}
              style={{
                cursor: "pointer",
                align: "left",
                justifyContent: "start",
                position: "relative",
              }}
              margin="normal"
              edge="start"
              autoFocus>
              Cancel
            </Button>
            <Button
              onClick={() => deleteService(document.id)}
              color="error"
              style={{ cursor: "pointer" }}
              margin="normal"
              autoFocus>
              Delete
            </Button>
          </DialogActions>
        </Box>
      </BootstrapDialog>
    </div>
  );
}

function AdminPageServices() {
  const serviceList = useSelector((state) => state.user.serviceList);
  const dispatch = useDispatch();
  let serviceSnapshot;

  async function getUsers(db) {
    const servicesCol = collection(db, "services");
    serviceSnapshot = await getDocs(servicesCol);
    dispatch(uptadeServiceList(serviceSnapshot.docs));
  }

  useEffect(() => {
    getUsers(db);
  }, []);

  return (
    <TableContainer
      style={{
        height: "calc(100vh - 80px)",
        overflowY: "scroll",
        width: "calc(100vw - 13vw)",
      }}
      component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell
              style={{ fontWeight: "bolder", fontSize: 18 }}
              align="left">
              Service
            </TableCell>
            <TableCell
              style={{ fontWeight: "bolder", fontSize: 18 }}
              align="left">
              Description
            </TableCell>
            <TableCell align="right"></TableCell>
            <TableCell align="right">
              <AddService />
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {serviceList.map((doc) => {
            let service = doc.data();
            return (
              <TableRow
                key={service?.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell component="th" scope="row">
                  {service?.name}
                </TableCell>
                <TableCell component="th" scope="row">
                  <TextareaAutosize
                    maxRows={3}
                    aria-label="maximum height"
                    placeholder="Maximum 4 rows"
                    value={service.description}
                    style={{ width: 300 }}
                  />
                </TableCell>
                <TableCell align="right">
                  <UpdateService document={doc} />
                </TableCell>
                <TableCell align="right">
                  <DeleteService document={doc} />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default AdminPageServices;
