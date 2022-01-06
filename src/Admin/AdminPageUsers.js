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
import { Avatar } from "@mui/material";
import { getAuth } from "firebase/auth";

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

function MasterTable() {
  const auth = getAuth();

  // const block = () => {
  //   auth
  //     .updateUser(uid, {
  //       email: "modifiedUser@example.com",
  //       phoneNumber: "+11234567890",
  //       emailVerified: true,
  //       password: "newPassword",
  //       displayName: "Jane Doe",
  //       photoURL: "http://www.example.com/12345678/photo.png",
  //       disabled: true,
  //     })
  //     .then((userRecord) => {
  //       // See the UserRecord reference doc for the contents of userRecord.
  //       console.log("Successfully updated user", userRecord.toJSON());
  //     })
  //     .catch((error) => {
  //       console.log("Error updating user:", error);
  //     });
  // };
  return (
    <TableContainer
      fullWidth
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
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
              <TableCell component="th" scope="row">
                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
              </TableCell>
              <TableCell align="left">{row.name}</TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell
                style={{ cursor: "pointer" }}
                align="right"
                // onClick={block}
              >
                {row.protein}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

function ClientTable() {
  return (
    <TableContainer
      fullWidth
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
            <TableCell
              align="right"
              style={{
                fontWeight: "bolder",
                fontSize: 25,
                color: "blue",
              }}>
              Clients Table
            </TableCell>
            <TableCell></TableCell>
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
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
              <TableCell component="th" scope="row">
                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
              </TableCell>
              <TableCell align="left">{row.name}</TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell>
            </TableRow>
          ))}
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
      {userType === "All" ? (
        <>
          <ClientTable />
          <MasterTable />
        </>
      ) : null}
    </div>
  );
}

export default AdminPageUsers;
