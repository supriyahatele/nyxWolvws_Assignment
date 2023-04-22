import React from 'react'
import  { useState } from 'react';
import { FormGroup, FormControl, InputLabel, Input, Button, styled, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { addEmployee } from '../APIS/api';

const initialValue = {
    FirstName: '',
    LastName: '',
    Email: '',
    Phone: '',
    Age:'',
    Address:'',
    Files:''
}

const Container = styled(FormGroup)`
    width: 35%;
    margin: 11% 0 0 25%;
    & > div {
        margin-top: 20px;
`;

const AddEmployee = () => {
    const [user, setUser] = useState(initialValue);
    const { FirstName,LastName, Email, Phone ,Age,Address} = user;
    
    let navigate = useNavigate();

    const onValueChange = (e) => {
        setUser({...user, [e.target.name]: e.target.value})
    }

    const addUserDetails = async() => {
        await addEmployee(user);
        navigate('/allEmployee');
    }
//  const postMultipleFile=(fileList)=>{
//     const formData=new FormData()
//     for(let i=0;i<fileList.length;i++){
//         const file=fileList[index]
//         formData.append("files",file)
//     }
//  }
    return (
        <Container>
            <Typography variant="h4">Add User</Typography>
            <FormControl>
                <InputLabel htmlFor="my-input">FirstName</InputLabel>
                <Input onChange={(e) => onValueChange(e)} name='FirstName' value={FirstName} id="my-input" />
            </FormControl>
            <FormControl>
                <InputLabel htmlFor="my-input">LastName</InputLabel>
                <Input onChange={(e) => onValueChange(e)} name='LastName' value={LastName} id="my-input" />
            </FormControl>
            <FormControl>
                <InputLabel htmlFor="my-input">Email</InputLabel>
                <Input onChange={(e) => onValueChange(e)} name='Email' value={Email} id="my-input"/>
            </FormControl>
            <FormControl>
                <InputLabel htmlFor="my-input">Phone</InputLabel>
                <Input onChange={(e) => onValueChange(e)} name='Phone' value={Phone} id="my-input" />
            </FormControl>
            <FormControl>
                <InputLabel htmlFor="my-input">Age</InputLabel>
                <Input onChange={(e) => onValueChange(e)} name='Age' value={Age} id="my-input" />
            </FormControl>
            <FormControl>
                <InputLabel htmlFor="my-input">Address</InputLabel>
                <Input onChange={(e) => onValueChange(e)} name='Address' value={Address} id="my-input" />
            </FormControl>
            
            <FormControl>
                <Button variant="contained" color="primary" onClick={() => addUserDetails()}>Add User</Button>
            </FormControl>
        </Container>
    )
}

export default AddEmployee;