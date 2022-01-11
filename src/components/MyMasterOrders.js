import {
  Avatar,
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

function MyMasterOrders() {
  const [client, setClient] = useState({});
  const [ordersList, setOrdersList] = useState([]);
  const master = useSelector((state) => state.user.user);

  async function getUsers(db) {
    const ordersRef = collection(db, "orders");
    const ordersSnapshot = await getDocs(ordersRef);
    const ordersList = ordersSnapshot.docs.map((doc) => doc.data());
    const masterCol = collection(db, "users");
    const q = query(masterCol, where("email", "==", master.email));
    const masterSnapshot = await getDocs(q);
    const masterRef = masterSnapshot.docs[0].ref;

    const orders = ordersList.filter(
      (order) => JSON.stringify(order.master) === JSON.stringify(masterRef)
    );
    let clientsRef = [];
    orders.forEach((order) => clientsRef.push(order.client));
    const a = clientsRef.map((client) => getDoc(client));
    const aa = await Promise.all(a);
    setClient(aa);
    setOrdersList(orders);
  }
  useEffect(() => {
    getUsers(db);
  }, []);

  return (
    <TableContainer
      style={{
        // overflowX: "hidden",
        margin: 20,
      }}
      component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell
              align="right"
              style={{
                fontWeight: "bolder",
                fontSize: 25,
                color: "blue",
              }}>
              Masters Table
            </TableCell>
            <TableCell></TableCell>
          </TableRow>
          <TableRow>
            <TableCell
              align="left"
              style={{ fontWeight: "bolder", fontSize: 18, maxWidth: 55 }}>
              ClientName
            </TableCell>
            <TableCell
              align="left"
              style={{ fontWeight: "bolder", fontSize: 18, maxWidth: 70 }}>
              PhoneNumber
            </TableCell>
            <TableCell
              align="left"
              style={{ fontWeight: "bolder", fontSize: 18, maxWidth: 50 }}>
              Address
            </TableCell>
            <TableCell
              align="left"
              style={{
                fontWeight: "bolder",
                fontSize: 18,
              }}>
              OrderDate
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {ordersList.map((order, i) => {
            const asd = async () => {
              const a = await getDoc(order.client);
              setClient({ ...client, [a.data().email]: { ...a.data() } });
            };
            const date = `${order?.date.toDate().toDateString()} ${order?.date
              .toDate()
              .getHours()}: ${order?.date.toDate().getMinutes()}`;
            return (
              <TableRow
                key={uuidv4()}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell component="th" scope="row">
                  {client[i].data().firstName} {client[i].data().lastName}
                </TableCell>
                <TableCell align="left">
                  {client[i].data().phoneNumber}
                </TableCell>
                <TableCell align="left">{order.adress}</TableCell>
                <TableCell align="left">{date}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default MyMasterOrders;
