import React from 'react'
import {AppBar, Toolbar,styled} from  '@mui/material'
import { NavLink } from 'react-router-dom';
const Tabs = styled(NavLink)`
    color: #FFFFFF;
    margin-right: 20px;
    text-decoration: none;
    font-size: 20px;
`;

export  default function NavBar() {
  return (
    <AppBar>
       <Toolbar>
                <Tabs to="allEmployee"exact>EMPLOYEE DATA</Tabs>
                <Tabs to="allEmployee" exact>All Employees</Tabs>
                <Tabs  to="add" exact>Add Employee</Tabs>
            </Toolbar>
    </AppBar>
  )
}

