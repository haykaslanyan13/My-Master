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
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore/lite";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { db } from "../Firebase/FirebaseUser";
import { v4 as uuidv4 } from "uuid";

function ClientOrderHistory() {
  const [master, setMaster] = useState({});
  const [ordersList, setOrdersList] = useState([]);
  const client = useSelector((state) => state.user.user);
  async function getUsers(db) {
    const ordersRef = collection(db, "orders");
    const ordersSnapshot = await getDocs(ordersRef);
    const ordersList = ordersSnapshot.docs.map((doc) => doc.data());
    const clientCol = collection(db, "users");
    const q = query(clientCol, where("email", "==", client.email));
    const clientSnapshot = await getDocs(q);
    const clientRef = clientSnapshot.docs[0].ref;

    const orders = ordersList.filter(
      (order) => JSON.stringify(order.client) === JSON.stringify(clientRef)
    );
    let mastersRef = [];
    orders.forEach((order) => mastersRef.push(order.master));
    const a = mastersRef.map((master) => getDoc(master));
    const aa = await Promise.all(a);
    setMaster(aa);

    setOrdersList(orders);
  }
  useEffect(() => {
    getUsers(db);
  }, []);

  return (
   
    <TableContainer
      style={{
        overflowX: "hidden",
      }}
      component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell
              align="center"
              style={{
                fontWeight: "bolder",
                fontSize: 25,
                color: "blue",
              }}>
              My Order History
            </TableCell>
            <TableCell></TableCell>
          </TableRow>
          <TableRow>
            <TableCell
              align="left"
              style={{ fontWeight: "bolder", fontSize: 18 }}>
              MasterName
            </TableCell>
            <TableCell
              align="left"
              style={{ fontWeight: "bolder", fontSize: 18 }}>
              PhoneNumber
            </TableCell>
            <TableCell
              align="justify"
              style={{ fontWeight: "bolder", fontSize: 18 }}>
              OrderDate
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {ordersList.map((order, i) => {
            const date = `${order?.date.toDate().toDateString()} ${order?.date
              .toDate()
              .getHours()}: ${order?.date.toDate().getMinutes()}`;
            return (
              <TableRow
                key={uuidv4()}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell component="th" scope="row">
                  {master[i].data()?.firstName} {master[i].data()?.lastName}
                </TableCell>
                <TableCell align="left">
                  {master[i].data()?.phoneNumber}
                </TableCell>
                <TableCell align="left">{date}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ClientOrderHistory;
