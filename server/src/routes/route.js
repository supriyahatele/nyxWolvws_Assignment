const express=require("express");
const { createEmployee, getAllEmployee, getEmployeeById, updateEmployee, deleteEmployeeById } = require("../controller/employeeController");


const router=express.Router()



router.get('/allEmployee', getAllEmployee);
router.post('/add', createEmployee);
router.get('/:employeeId', getEmployeeById);
router.put('/:employeeId', updateEmployee);
router.delete('/:employeeId', deleteEmployeeById);


module.exports=router

