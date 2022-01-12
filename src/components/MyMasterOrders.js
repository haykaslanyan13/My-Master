import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore/lite";
import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { db } from "../Firebase/FirebaseUser";
import { v4 as uuidv4 } from "uuid";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function MyMasterOrders() {
  const [open, setOpen] = React.useState(false);
  const [status, setStatus] = useState({});
  const [clientsList, setClientsList] = useState([]);
  const [ordersList, setOrdersList] = useState([]);
  const user = useSelector((state) => state.user.user);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const accept = async (id) => {
    const mockStatus = { ...status };
    mockStatus[id] = "accepted";
    const orderRef = doc(db, "orders", id);
    await updateDoc(orderRef, {
      status: "accepted",
    });
    setStatus(mockStatus);
  };

  const decline = async (id) => {
    const mockStatus = { ...status };
    mockStatus[id] = "declined";
    const orderRef = doc(db, "orders", id);
    await updateDoc(orderRef, {
      status: "declined",
    });
    setStatus(mockStatus);
  };

  const getData = useCallback(
    async (db) => {
      const usersCol = collection(db, "users");
      const q = query(usersCol, where("email", "==", user.email));
      const masterSnapshot = await getDocs(q);
      const masterRef = masterSnapshot.docs[0].ref;
      const ordersCol = collection(db, "orders");
      const qq = query(ordersCol, where("master", "==", masterRef));
      const ordersSnapshot = await getDocs(qq);
      const ordersList = ordersSnapshot.docs.map((doc) => {
        return {
          ...doc.data(),
          id: doc.id,
        };
      });
      const ordersStatus = {};
      ordersList.forEach((order) => (ordersStatus[order.id] = order.status));
      setStatus(ordersStatus);
      const clientsRefs = ordersList.map((order) => order.client);
      const clientsSnapshot = await Promise.all(
        clientsRefs.map((client) => getDoc(client))
      );
      const clientsList = clientsSnapshot.map((client) => client.data());
      setClientsList(clientsList);
      setOrdersList(ordersList);
    },
    [user]
  );

  useEffect(() => {
    if (user) {
      getData(db);
    }
  }, [getData, user]);

  return (
    <div>
      <Button
        onClick={handleClickOpen}
        style={{ width: 350, marginTop: 70 }}
        variant="contained"
        href="#contained-buttons">
        My Orders
      </Button>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}>
        <AppBar sx={{ position: "relative", backgroundColor: "#007f8b" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              My Orders
            </Typography>
          </Toolbar>
        </AppBar>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell
                  align="left"
                  style={{ fontWeight: "bolder", fontSize: 18, maxWidth: 55 }}>
                  Client Name
                </TableCell>
                <TableCell
                  align="left"
                  style={{ fontWeight: "bolder", fontSize: 18, maxWidth: 70 }}>
                  Phone Number
                </TableCell>
                <TableCell
                  align="right"
                  style={{ fontWeight: "bolder", fontSize: 18, maxWidth: 50 }}>
                  Address
                </TableCell>
                <TableCell
                  align="right"
                  style={{
                    fontWeight: "bolder",
                    fontSize: 18,
                  }}>
                  Order Date
                </TableCell>
                <TableCell
                  align="right"
                  style={{ fontWeight: "bolder", fontSize: 18, maxWidth: 50 }}>
                  Status
                </TableCell>
                <TableCell align="left"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {ordersList.map((order, i) => {
                const date = `${order?.date
                  .toDate()
                  .toDateString()} ${order?.date
                  .toDate()
                  .getHours()}: ${order?.date.toDate().getMinutes()}`;
                return (
                  <TableRow
                    key={uuidv4()}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                    <TableCell component="th" scope="row">
                      {clientsList[i]?.firstName} {clientsList[i]?.lastName}
                    </TableCell>
                    <TableCell align="left">
                      {clientsList[i]?.phoneNumber}
                    </TableCell>
                    <TableCell align="right">{order.adress}</TableCell>
                    <TableCell align="right">{date}</TableCell>
                    <TableCell align="right">
                      {status[order.id] === "pending" ? (
                        <Button
                          onClick={() => accept(order.id)}
                          size="small"
                          variant="contained"
                          color="success">
                          Accept
                        </Button>
                      ) : null}
                      {status[order.id] === "declined" ? "Declined" : null}
                      {status[order.id] === "accepted" ? "Accepted" : null}
                      {status[order.id] === "declinedByClient"
                        ? "Declined By Client"
                        : null}
                    </TableCell>
                    <TableCell align="left">
                      {status[order.id] === "pending" ? (
                        <Button
                          onClick={() => decline(order.id)}
                          size="small"
                          variant="outlined"
                          color="error">
                          Decline
                        </Button>
                      ) : null}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Dialog>
    </div>
  );
}

export default MyMasterOrders;
