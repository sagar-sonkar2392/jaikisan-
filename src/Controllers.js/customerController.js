const customerModel = require("../models/customerModel");
const validator = require("validator");

const isValid = function(value){
    if(typeof value === "undefined" || value ===null)return false;
    if(typeof value ==="string" && value.trim().length===0)return false;
    return true;
}

const Customer = async function(req,res){
    try{
        const data = req.body;

        if(Object.keys(data).length==0){
            return res.status(400).send({status:false, message:"please provide required field"})
        }

        let {firstName, lastName, mobileNumber, DOB, emailId,address }=data
          
        if(isValid(firstName)==false){
            return res.status(400).send({status:false, message:"first name is required"});
        }
        if(isValid(lastName)==false){
            return res.status(400).send({status:false, message:"last name is required"});
        }

    


    }catch(error){
        return res.status(500).send({status:false, message :error.message});
    }
}