import axios from 'axios';

// const usersUrl = 'http://localhost:3003/users';
const Url = 'http://localhost:4000/api/v1';

export const getEmployee = async (employeeId) => {
    return await axios.get(`${Url}/${employeeId}`);
}
export const getAllEmployeeData = async () => {
    // return await axios.get(`${Url}/allEmployee`);
    return await axios.get('http://localhost:4000/api/v1/allEmployee')
}

export const addEmployee = async (user) => {
    return await axios.post(`${Url}/add`, user);
}

export const  deleteEmployee = async (employeeId) => {
    return await axios.delete(`${Url}/${employeeId}`);
}

export const updateEmployee = async (employeeId, user) => {
    return await axios.put(`${Url}/${employeeId}`, user)
}