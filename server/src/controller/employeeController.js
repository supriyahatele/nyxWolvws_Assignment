const employeeModel = require("../model/employeeModel");
const mongoose = require('mongoose');



//=============================================================================
const validPhoneNumber = /^[0]?[6789]\d{9}$/;
let NameRegex = /^[a-zA-Z]+$/
const emailValidator = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/;

const valid = function (value) {
    if (typeof value === 'undefined' || value === null) return false
    if (typeof value != 'string') return false
    if (typeof value === 'string' && value.trim().length === 0) return false
    return true
}

const isValidObjectId = function (ObjectId) {
    return mongoose.Types.ObjectId.isValid(ObjectId)
}

//----------------------------------------------------------------------------
const createEmployee = async function (req, res) {

    try {

        let employeeData = req.body;
    
        if (Object.keys(employeeData).length == 0) { return res.status(400).send({ status: false, msg: "Please enter details in the request Body " }) }

        let { FirstName, LastName, Phone, Email, Age, Address } = employeeData;
        if (!valid(FirstName)) {
            return res.status(400).send({ status: false, message: "firstName is  Mandatory" })
        }
        if (!NameRegex.test(FirstName)) {
            return res.status(400).send({ status: false, message: "firstName cant be number" })
        }
        if (!valid(LastName)) {
            return res.status(400).send({ status: false, message: "LastName is  Mandatory" })
        }
        if (!NameRegex.test(LastName)) {
            return res.status(400).send({ status: false, message: "LastName cant be number" })
        }

        if (!Phone) {
            return res.status(400).send({ status: false, message: "phoneNumber is  Mandatory" })
        }
        if (!validPhoneNumber.test(Phone)) {
            return res.status(400).send({ status: false, message: "phoneNumber is incorrect" })
        }
        if (!Email) {
            return res.status(400).send({ status: false, message: "Email is  Mandatory" })
        }
        if (!emailValidator.test(Email)) {
            return res.status(400).send({ status: false, message: "Provide Email in correct format  " })
        }
        let uniqueEmail = await employeeModel.findOne({ Email: Email })
        if (uniqueEmail) {
            return res.status(400).send({ status: false, message: "Email already exist" })
        }
        let uniquePhone = await employeeModel.findOne({ Phone: Phone })
        if (uniquePhone) {
            return res.status(400).send({ status: false, message: "Phone Number already exist" })
        }
        if (!Age) {
            return res.status(400).send({ status: false, message: "Age is  Mandatory" })
        }
        if (!Address) {
            return res.status(400).send({ status: false, message: "Address is  Mandatory" })
        }
        //  if (!Files || Files.length == 0) return res.status(400).send({ status: false, message: "Please provide  files!!" })

        let data1 = {
            FirstName: FirstName,
            LastName: LastName,
            Phone: Phone,
            Email: Email,
            Age: Age,
            Address: Address,
           
        }

        let newEmployee = await employeeModel.create(data1);
        res.status(201).send({ status: true, message: 'Success', data: newEmployee })
    }
    catch (err) {
        res.status(500).send({ error: err.message })
        console.log("err=", err.stack)
    }
}
//---------------------------------------------------------------------------------------
const getAllEmployee = async function (req, res) {
    try {

        let findAllEmployee = await employeeModel.find()
        if (!findAllEmployee) return res.status(404).send({ status: false, message: " employee not found" })

        return res.status(200).send({ status: true, message: "Success", data: findAllEmployee })


    } catch (err) {
        console.log(err)
        res.status(500).send({ status: false, message: err.message })
    }

}
//---------------------------------------------------------------------------------------------
const getEmployeeById = async function (req, res) {
    try {
        let employeeId = req.params.employeeId
        if (!employeeId) return res.status(400).send({ status: false, msg: "plz provide employeeId" })

        if (!isValidObjectId(employeeId)) return res.status(400).send({ status: false, message: " enter a valid employeeId " });

        let findEmployee = await employeeModel.findOne({ _id: employeeId, isDeleted: false })
        if (!findEmployee) return res.status(404).send({ status: false, message: " employee not found" })

        return res.status(200).send({ status: true, message: "Success", data: findEmployee })


    } catch (err) {
        console.log(err)
        res.status(500).send({ status: false, message: err.message })
    }

}
//-------------------------------------------------------------------------------------------

const updateEmployee = async function (req, res) {
    try {
        let employeeId = req.params.employeeId

        let files = req.files

        if (Object.keys(req.body).length == 0) { return res.status(400).send({ status: false, msg: "Please enter details in the request Body " }) }

        if (!isValidObjectId(employeeId)) return res.status(400).send({ status: false, msg: "not a correct id" })

        const validEmployee = await employeeModel.findById({ _id: employeeId })
        if (!validEmployee) return res.status(404).send({ status: false, msg: "user not found" })

        //<=====Validating fields to update======>
        let { FirstName, LastName, Email, Address, Phone, file } = req.body

        if (FirstName) {
            FirstName = FirstName.trim()
            if (!NameRegex.test(FirstName)) return res.status(400).send({ status: false, message: "Please enter valid FirstName" })
        }

        if (LastName) {
            LastName = LastName.trim()
            if (!NameRegex.test(LastName)) return res.status(400).send({ status: false, message: "Please enter valid last name" })
        }
        if (Email) {
            Email = Email.trim()
            if (!emailValidator.test(Email)) return res.status(400).send({ status: false, message: "Invalid Email" })
            const findEmail = await employeeModel.findOne({ Email: Email })
            if (findEmail) return res.status(400).send({ status: false, msg: "Email Already exist!!!" })

        }

        if (Phone) {
            Phone = Phone.trim()
            if (!validPhoneNumber.test(Phone)) return res.status(400).send({ status: false, message: "Invalid Number" })
            const existingMobile = await employeeModel.findOne({ Phone: Phone })
            if (existingMobile) return res.status(400).send({ status: false, message: "Mobile number is already exists" })
        }
        if (file) {
            return res.status(400).send({ status: false, message: "file format invalid!!" })
        }

        if (Address) {
            Address = Address.trim()
            if (typeof Address !== 'string') return res.status(400).send({ status: false, message: "provide a valid Address" })

        }


        // if(files.length > 0){
        //     let uploadedFileURL = await uploadFile(files[0])
        //     validEmployee.file = uploadedFileURL
        // }

        //<==========Updating document==============>
        let update = await employeeModel.findOneAndUpdate({ _id: employeeId }, { $set: req.body }, { new: true })
        res.status(200).send({ status: true, message: "Success", data: update })
    } catch (err) {
        console.log(err)
        res.status(500).send({ status: false, message: err.message })
    }
}

//----------------------------------------------------------------------------------------
const deleteEmployeeById = async function (req, res) {
    try {
        let employeeId = req.params.employeeId
        employeeId = employeeId.trim()
        // if (!employeeId) return res.status(400).send({ status: false, msg: "plz provide employeeId" })

        if (!isValidObjectId(employeeId)) return res.status(400).send({ status: false, message: " enter a valid employeeId " });

        await employeeModel.deleteOne({ _id: employeeId });
        res.status(201).json("User deleted Successfully");


        // let findEmployee = await employeeModel.findById({ _id: employeeId })
        // if (!findEmployee) return res.status(404).send({ status: false, message: " employee not found" })

        // if (findEmployee.isDeleted === true) return res.status(404).send({ status: false, message: " already deleted" })

        //   await employeeModel.findOneAndUpdate({ _id: employeeId }, { $set: { isDeleted: true }}, { new: true })
        // res.status(200).send({ status: true, message: "deleted" })

    } catch (err) {
        console.log(err)
        res.status(500).send({ status: false, message: err.message })
    }

}


module.exports = { createEmployee, getAllEmployee, getEmployeeById, updateEmployee, deleteEmployeeById }