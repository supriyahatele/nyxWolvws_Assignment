import React, { useEffect, useState } from "react";

import {
  Table,
  TableHead,
  TableCell,
  Paper,
  TableRow,
  TableBody,
  Button,
  styled,
} from "@mui/material";
import { Link } from "react-router-dom";
import { deleteEmployee, getAllEmployeeData } from "../APIS/api";

const StyledTable = styled(Table)`
  width: 90%;
  margin: 100px auto auto auto;
`;

const THead = styled(TableRow)`
  & > th {
    font-size: 20px;
    background: #000000;
    color: #ffffff;
  }
`;

const TRow = styled(TableRow)`
  & > td {
    font-size: 18px;
  }
`;

const AllEmployee = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getAllUsers();
  }, []);

  const deleteUserData = async (employeeId) => {
    await deleteEmployee(employeeId);
    getAllUsers();
  };

  const getAllUsers = async () => {
    let response = await getAllEmployeeData();
    setUsers(response.data.data);
    console.log(response);
  };

  return (
    <StyledTable>
      <TableHead>
        <THead>
          {/* <TableCell>Id</TableCell> */}
          <TableCell>FirstName</TableCell>
          <TableCell>LastName</TableCell>
          <TableCell>Email</TableCell>
          <TableCell>Phone</TableCell>
          <TableCell>Age</TableCell>
          <TableCell>Address</TableCell>
        </THead>
      </TableHead>

      <TableBody>
        {Array.isArray(users) &&
          users.length > 0 &&
          users.map((user) => (
            <TRow key={user.id}>
              {/* <TableCell>{user._id}</TableCell> */}
              <TableCell>{user.FirstName}</TableCell>
              <TableCell>{user.LastName}</TableCell>
              <TableCell>{user.Email}</TableCell>
              <TableCell>{user.Phone}</TableCell>
              <TableCell>{user.Age}</TableCell>
              <TableCell>{user.Address}</TableCell>
              <TableCell>
                <Button
                  color="primary"
                  variant="contained"
                  style={{ marginRight: 10 }}
                  component={Link}
                  to={`/edit/${user._id}`}
                >
                  Edit
                </Button>
                <Button
                  color="secondary"
                  variant="contained"
                  onClick={() => deleteUserData(user._id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TRow>
          ))}
      </TableBody>
    </StyledTable>
  );
};

export default AllEmployee;
