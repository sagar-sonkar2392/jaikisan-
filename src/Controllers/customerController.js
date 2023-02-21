const customerModel = require("../models/customerModel");
const validator = require("validator");
const mongoose = require("mongoose");

const isValid = function (value) {
    if (typeof value === "undefined" || value === null) return false;
    if (typeof value === "string" && value.trim().length === 0) return false;
    return true;
}

const isValidObjectId = function(ObjectId){
    return mongoose.Types.ObjectId.isValid(ObjectId)

}

const Customer = async function (req, res) {
    try {
        const data = req.body;
        // console.log(data)

        if (Object.keys(data).length == 0) {
            return res.status(400).send({ status: false, message: "please provide required field" })
        }

        let { firstName, lastName, mobileNumber, DOB, emailID, address } = data

        if (isValid(firstName) == false) {
            return res.status(400).send({ status: false, message: "first name is required" });
        }
        if (isValid(lastName) == false) {
            return res.status(400).send({ status: false, message: "last name is required" });
        }
        if (!emailID) {
            return res.status(400).send({ status: false, message: "E-mail is mandatory !!" });
        }
        //================================== to check the email format ===================================
        let emailValid = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(emailID);
        if (!emailValid) {
            return res.status(400).send({ status: false, message: `${emailID} is not a valid E-mail !!` });
        }
        //================================ duplicate email =====================================================
        let checkEmail = await customerModel.findOne({ emailID: emailID });
        if (checkEmail) {
            return res.status(400).send({ status: false, message: `${emailID} already exists !!` });
        }
        //   ===============================duplicate mobile number===============================================
        if (!mobileNumber) {
            return res.status(400).send({ status: false, message: "mobile number is mandatory !!" });
        }
        //================================== to check the mobile format ========================================
        let validPhone = /^[6-9]\d{9}$/.test(mobileNumber);
        if (!validPhone) {
            return res.status(400).send({ status: false, message: `${mobileNumber} is not a valid mobile number !!` });
        }
        //================================ duplicate mobile number ===============================================
        let checkPhone = await customerModel.findOne({ mobileNumber: mobileNumber });
        if (checkPhone) {
            return res.status(400).send({ status: false, message: `${mobileNumber} is already exists !!` });
        }

        const customerData = await customerModel.create(data);
        // console.log(customerData)
        return res.status(201).send({ status: true, message: "successfully saved custromer data", data: customerData });


    } catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
};

const getCustomer = async function(req,res){
    try{
        let filters = req.query;
        let customerId = filters.customerId

        if(customerId){
            if(!isValidObjectId(customerId)){
                return res.status(400).send({status:false, message:"plz enter valid customerId"})
            }
        }
        const getData = await customerModel.find({status:"Active", _id:customerId})
        // console.log(getData)
        if (Object.keys(getData).length == 0) {
            return res.status(404).send({status:false, msg: "customer not found" })
        }

        return res.status(200).send({ status: true, message: "successfully fetch custromer data", data: getData });
    }catch(err){
        return res.status(500).send({status:false, message:err.message})
    }
};

const deleteCustomer = async function(req,res){
    try{
        let Id = req.params.customerId;
       const data= await customerModel.findByIdAndUpdate(Id, { $set: {isDeleted:true}})
       if(data.isDeleted==true){
        return res.status(404).send({status:false,message:"customer not found"})
       }
        return res.status(200).send({status:true,message:"customer deleted successfully"})
    }catch(error){
        return res.status(500).send({status:false, message:error.message})
    }
};



module.exports.Customer = Customer;
module.exports.getCustomer = getCustomer;
module.exports.deleteCustomer=deleteCustomer;