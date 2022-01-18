import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  Button,
  TextareaAutosize,
  TextField,
  Typography,
} from "@mui/material";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore/lite";
import { db, storage } from "../Firebase/FirebaseUser";
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
import { useCallback } from "react";
import ImageNotSupportedIcon from "@mui/icons-material/ImageNotSupported";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

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
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const [imgSrc, setImgSrc] = useState("");

  const handleSubmit = async (event) => {
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
        image: imgSrc,
      });
    } catch {}
    const servicesCol = collection(db, "services");
    const serviceSnapshot = await getDocs(servicesCol);
    const serviceList = serviceSnapshot.docs.map((doc) => {
      return {
        ...doc.data(),
        id: doc.id,
      };
    });
    dispatch(uptadeServiceList(serviceList));
    setOpen(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setImgSrc("");
  };

  const Input = styled("input")({
    display: "none",
  });

  const metadata = {
    contentType: "image/jpeg",
  };

  const uploadImage = async (e) => {
    const imgData = e.target.files[0];
    if (imgData) {
      const storageRef = ref(storage, `services-images/${imgData.name}`);
      try {
        await uploadBytes(storageRef, imgData, metadata);
        const url = await getDownloadURL(
          ref(storage, `services-images/${imgData.name}`)
        );
        setImgSrc(url);
      } catch {}
    }
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
            <div style={{ display: "flex", alignItems: "center" }}>
              {imgSrc ? (
                <img alt="" src={imgSrc} style={{ height: 100, width: 100 }} />
              ) : (
                <ImageNotSupportedIcon style={{ height: 100, width: 100 }} />
              )}

              <label htmlFor="contained-button-file"></label>
              <label htmlFor="icon-button-file">
                <Input
                  accept="image/*"
                  id="icon-button-file"
                  type="file"
                  onChange={async (e) => {
                    uploadImage(e);
                  }}
                />
                <Button
                  style={{ marginLeft: 10 }}
                  variant="contained"
                  component="span">
                  Upload
                </Button>
              </label>
            </div>
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

function UpdateService({ service }) {
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const [defaultName, setDefaultName] = useState(service.name);
  const [imgSrc, setImgSrc] = useState(service.image);
  const [defaultDescription, setDefaultDescription] = useState(
    service.description
  );

  const nameChange = (e) => {
    setDefaultName(e.target.value);
  };

  const descriptionChange = (e) => {
    setDefaultDescription(e.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const [serviceName, description] = [
      data.get("serviceName"),
      data.get("description"),
    ];
    try {
      await updateDoc(doc(db, "services", service.id), {
        description: description ? description : service.description,
        name: serviceName ? serviceName : service.name,
        image: imgSrc,
      });
    } catch {}
    const servicesCol = collection(db, "services");
    const serviceSnapshot = await getDocs(servicesCol);
    const serviceList = serviceSnapshot.docs.map((doc) => {
      return {
        ...doc.data(),
        id: doc.id,
      };
    });
    dispatch(uptadeServiceList(serviceList));
    setOpen(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setDefaultName(service.name);
    setDefaultDescription(service.description);
    setOpen(false);
    setImgSrc(service.image);
  };

  const Input = styled("input")({
    display: "none",
  });

  const metadata = {
    contentType: "image/jpeg",
  };

  const uploadImage = async (e) => {
    const imgData = e.target.files[0];
    if (imgData) {
      const storageRef = ref(storage, `services-images/${imgData.name}`);
      try {
        await uploadBytes(storageRef, imgData, metadata);
        const url = await getDownloadURL(
          ref(storage, `services-images/${imgData.name}`)
        );
        setImgSrc(url);
      } catch {}
    }
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
            <div style={{ display: "flex", alignItems: "center" }}>
              {imgSrc ? (
                <img alt="" src={imgSrc} style={{ height: 100, width: 100 }} />
              ) : (
                <ImageNotSupportedIcon style={{ height: 100, width: 100 }} />
              )}
              <div style={{ display: "block" }}>
                <label htmlFor="contained-button-file"></label>
                <label htmlFor="icon-button-file">
                  <Input
                    accept="image/*"
                    id="icon-button-file"
                    type="file"
                    onChange={async (e) => {
                      uploadImage(e);
                    }}
                  />
                  <Button
                    style={{ marginLeft: 10 }}
                    variant="contained"
                    component="span">
                    Upload
                  </Button>
                </label>
                <br />
                {imgSrc ? (
                  <Button
                    size="small"
                    style={{ marginLeft: 10, marginTop: 5 }}
                    variant="contained"
                    color="error"
                    component="span"
                    onClick={() => setImgSrc("")}>
                    Delete
                  </Button>
                ) : null}
              </div>
            </div>
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

function DeleteService({ service }) {
  const dispatch = useDispatch();

  const [open, setOpen] = React.useState(false);

  async function getUsers(db) {
    const servicesCol = collection(db, "services");
    const serviceSnapshot = await getDocs(servicesCol);
    const serviceList = serviceSnapshot.docs.map((doc) => {
      return {
        ...doc.data(),
        id: doc.id,
      };
    });
    dispatch(uptadeServiceList(serviceList));
  }
  const deleteService = async (docId) => {
    await deleteDoc(doc(db, "services", docId));
    getUsers(db);
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
          // onSubmit={handleSubmit}
          component="form"
          sx={{
            width: 500,
            maxWidth: "100%",
          }}>
          <DialogContent dividers>
            <Typography>
              Are you sure you want to delete{" "}
              <span style={{ fontWeight: "bolder" }}>{service.name}:</span>
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
              onClick={() => deleteService(service.id)}
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

  const getData = useCallback(
    async (db) => {
      const servicesCol = collection(db, "services");
      const serviceSnapshot = await getDocs(servicesCol);
      const serviceList = serviceSnapshot.docs.map((doc) => {
        return {
          ...doc.data(),
          id: doc.id,
        };
      });
      dispatch(uptadeServiceList(serviceList));
    },
    [dispatch]
  );

  useEffect(() => {
    getData(db);
  }, [getData]);

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
            <TableCell align="left"></TableCell>
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
          {serviceList.map((service) => {
            return (
              <TableRow
                key={service?.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell component="th" scope="row">
                  {service.image ? (
                    <img
                      style={{ width: 50, height: 50 }}
                      alt=""
                      src={service.image}
                    />
                  ) : (
                    <ImageNotSupportedIcon style={{ width: 50, height: 50 }} />
                  )}
                </TableCell>
                <TableCell component="th" scope="row">
                  {service?.name}
                </TableCell>
                <TableCell component="th" scope="row">
                  <TextareaAutosize
                    maxRows={3}
                    aria-label="maximum height"
                    placeholder="Maximum 4 rows"
                    value={service?.description}
                    style={{ width: 300 }}
                  />
                </TableCell>
                <TableCell align="right">
                  <UpdateService service={service} />
                </TableCell>
                <TableCell align="right">
                  <DeleteService service={service} />
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
