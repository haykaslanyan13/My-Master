import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Avatar, Rating } from "@mui/material";
import { getAuth } from "firebase/auth";
import {
  collection,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore/lite";
import { db } from "../Firebase/FirebaseUser";

function AllUsersTable() {
  const [users, setUsers] = React.useState([]);

  const getUsers = React.useCallback(async (db) => {
    let i = -1;
    const average = (valueArr) => {
      return valueArr.reduce((a, b) => a + b, 0) / valueArr.length;
    };
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("userType", "==", "master"));
    const mastersSnapshot = await getDocs(q);
    const servicesPromises = mastersSnapshot.docs.map((doc) =>
      getDoc(doc.data().service)
    );
    const services = (await Promise.all(servicesPromises)).map((service) =>
      service.data()
    );
    const usersSnapshot = await getDocs(usersRef);
    const usersList = usersSnapshot.docs.map((doc) => {
      if (doc.data().service !== null) {
        const valueArr = doc
          .data()
          .rating.reduce(function (previousValue, currentValue) {
            previousValue.push(currentValue.value);
            return previousValue;
          }, []);
        i++;
        return {
          ...doc.data(),
          service: services[i].name,
          rating: average(valueArr),
        };
      } else {
        return doc.data();
      }
    });

    setUsers(usersList);
  }, []);

  React.useEffect(() => {
    getUsers(db);
  }, [getUsers]);

  return (
    <TableContainer
      // style={{
      //   width: "calc(100vw - 13vw)",
      //   height: "calc(100vh - 160px)",
      // }}
      component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>

            <TableCell></TableCell>
            <TableCell
              align="left"
              style={{
                fontWeight: "bolder",
                fontSize: 25,
                color: "blue",
              }}>
              All Users Table
            </TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
          </TableRow>
          <TableRow>
            <TableCell
              align="left"
              style={{ fontWeight: "bolder", fontSize: 18 }}>
              Avatar
            </TableCell>
            <TableCell
              align="left"
              style={{ fontWeight: "bolder", fontSize: 18 }}>
              Fullname
            </TableCell>
            <TableCell
              align="left"
              style={{ fontWeight: "bolder", fontSize: 18 }}>
              userType
            </TableCell>
            <TableCell
              align="right"
              style={{ fontWeight: "bolder", fontSize: 18 }}>
              Service
            </TableCell>
            <TableCell
              align="right"
              style={{ fontWeight: "bolder", fontSize: 18 }}>
              {" "}
              Rating
            </TableCell>
            <TableCell
              align="right"
              style={{ fontWeight: "bolder", fontSize: 18 }}>
              Email
            </TableCell>
            <TableCell
              align="right"
              style={{ fontWeight: "bolder", fontSize: 18 }}>
              PhoneNuber
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow
              key={user?.email}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
              <TableCell component="th" scope="row">
                <Avatar alt="Remy Sharp" src={user?.img} />
              </TableCell>
              <TableCell align="left">
                {user?.firstName} {user?.lastName}
              </TableCell>
              <TableCell align="left">{user?.userType}</TableCell>
              <TableCell align="right">
                {user?.userType === "client" ? "-" : user.service}
              </TableCell>
              <TableCell align="right">
                {user?.userType === "client" ? (
                  "-"
                ) : (
                  <Rating name="read-only" value={user.rating} readOnly />
                )}
              </TableCell>
              <TableCell align="right">{user?.email}</TableCell>
              <TableCell align="right">{user?.phoneNumber}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

function MasterTable() {
  const [masters, setMasters] = React.useState([]);
  const average = (valueArr) => {
    return valueArr.reduce((a, b) => a + b, 0) / valueArr.length;
  };
  const getMasters = React.useCallback(async (db) => {
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("userType", "==", "master"));
    const mastersSnapshot = await getDocs(q);
    const mockMastersList = mastersSnapshot.docs.map((doc) => doc.data());
    const servicesPromises = mockMastersList.map((master) =>
      getDoc(master.service)
    );
    const services = (await Promise.all(servicesPromises)).map((service) =>
      service.data()
    );
    const mastersList = mockMastersList.map((master, i) => {
      const valueArr = master.rating.reduce(function (
        previousValue,
        currentValue
      ) {
        previousValue.push(currentValue.value);
        return previousValue;
      },
      []);
      return {
        ...master,
        service: services[i].name,
        rating: average(valueArr),
      };
    });
    setMasters(mastersList);
  }, []);

  React.useEffect(() => {
    getMasters(db);
  }, [getMasters]);

  return (
    <TableContainer
      // style={{
      //   width: "calc(100vw - 13vw)",
      //   height: "calc(100vh - 160px)",
      // }}
      component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell
              align="center"
              style={{
                fontWeight: "bolder",
                fontSize: 25,
                color: "blue",
              }}>
              Masters Table
            </TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
          </TableRow>
          <TableRow>
            <TableCell
              align="left"
              style={{ fontWeight: "bolder", fontSize: 18 }}>
              Avatar
            </TableCell>
            <TableCell style={{ fontWeight: "bolder", fontSize: 18 }}>
              Fullname
            </TableCell>
            <TableCell
              align="right"
              style={{ fontWeight: "bolder", fontSize: 18 }}>
              Service
            </TableCell>
            <TableCell
              align="right"
              style={{ fontWeight: "bolder", fontSize: 18 }}>
              {" "}
              Rating
            </TableCell>
            <TableCell
              align="right"
              style={{ fontWeight: "bolder", fontSize: 18 }}>
              Email
            </TableCell>
            <TableCell
              align="right"
              style={{ fontWeight: "bolder", fontSize: 18 }}>
              PhoneNuber
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {masters.map((master) => {
            return (
              <TableRow
                key={master.email}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell component="th" scope="row">
                  <Avatar alt="Remy Sharp" src={master.img} />
                </TableCell>
                <TableCell align="left">
                  {master.firstName} {master.lastName}
                </TableCell>
                <TableCell align="right">{master.service}</TableCell>
                <TableCell align="right">
                  {<Rating name="read-only" value={master.rating} readOnly />}
                </TableCell>
                <TableCell align="right">{master.email}</TableCell>
                <TableCell align="right">{master.phoneNumber}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

function ClientTable() {
  const [clients, setClients] = React.useState([]);
  const getClients = React.useCallback(async (db) => {
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("userType", "==", "client"));
    const clientsSnapshot = await getDocs(q);
    const userList = clientsSnapshot.docs.map((doc) => doc.data());
    setClients(userList);
  }, []);

  React.useEffect(() => {
    getClients(db);
  }, [getClients]);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell
              align="left"
              style={{
                fontWeight: "bolder",
                fontSize: 25,
                color: "blue",
                paddingLeft: 65,
              }}>
              Clients Table
            </TableCell>
            <TableCell></TableCell>
          </TableRow>
          <TableRow>
            <TableCell
              align="left"
              style={{ fontWeight: "bolder", fontSize: 18 }}>
              Avatar
            </TableCell>
            <TableCell
              align="right"
              style={{ fontWeight: "bolder", fontSize: 18 }}>
              Fullname
            </TableCell>
            <TableCell
              align="right"
              style={{ fontWeight: "bolder", fontSize: 18 }}>
              Email
            </TableCell>
            <TableCell
              align="right"
              style={{ fontWeight: "bolder", fontSize: 18 }}>
              PhoneNuber
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {clients.map((client) => {
            return (
              <TableRow
                key={client.email}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell component="th" scope="row">
                  <Avatar alt="Remy Sharp" src={client.img} />
                </TableCell>
                <TableCell align="right">
                  {client.firstName} {client.lastName}
                </TableCell>
                <TableCell align="right">{client.email}</TableCell>
                <TableCell align="right">{client.phoneNumber}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

function AdminPageUsers() {
  const [userType, setUserType] = React.useState("All");
  const userTypeChange = (event) => {
    setUserType(event.target.value);
  };
  return (
    <div
      style={{
        height: "calc(100vh - 80px)",
        overflowY: "scroll",
        width: "calc(100vw - 13vw)",
      }}>
      <FormControl
        style={{
          marginLeft: "calc(100vw - 65vw)",
          marginTop: 15,
          marginBottom: 15,
        }}>
        <InputLabel id="demo-simple-select-label">userType</InputLabel>
        <Select
          style={{ height: 50, width: 300 }}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={userType}
          label="userType"
          onChange={userTypeChange}>
          <MenuItem value="All">All</MenuItem>
          <MenuItem value="Master">Master</MenuItem>
          <MenuItem value="Client">Client</MenuItem>
        </Select>
      </FormControl>
      {userType === "Client" ? <ClientTable /> : null}
      {userType === "Master" ? <MasterTable /> : null}
      {userType === "All" ? <AllUsersTable /> : null}
    </div>
  );
}

export default AdminPageUsers;
