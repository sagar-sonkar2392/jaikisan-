const cardModel = require("../models/cardModel");
const customerModel=require("../models/customerModel");

const createCard = async function(req,res){
    try{
        let cardData = req.body
        let autoInc = await cardModel.find().count()
        autoInc.cardNumber = autoInc + 1
        let typeOfCard = ['REGULAR','SPECIAL'];
        if(!typeOfCard.includes(cardData.cardType)){
            return res.status(400).send({status:false, message:"card type must be REGULAR/SPECIAL"})
        }
        let cardStatus = ["ACTIVE","INACTIVE"]
        if(!cardStatus.includes(cardData.status)){
            return res.status(400).send({status:false, message:"status must be ACTIVE/INACTIVE"})
        }
        if(cardData.customerId){
            return res.status(400).send({status:false,message:"please enter customerId"})
        }
        const getCustomerName = await customerModel.findById(cardData.customerID)
        if(getCustomerName.isDeleted==true)return res.status(404).send({status:false,message:"customer not found"})
        cardData.customerName = getCustomerName.firstName + " " + getCustomerName.lastName;

        const data = await cardModel.create(cardData)
        return res.status(200).send({status:true, message:"data created successfully",data:data})

    }catch(error){
        return res.status(500).send({status:false, message:error.message})
    }
};

const getCards = async function(req,res){
    try{
        const data = await cardModel.find()
        return res.status(200).send({status:false, message:"Successfully fetch card data", data:data}) 

    }catch(err){
        return res.status(500).send({status:false, message:err.message})
    }
}

module.exports = {createCard, getCards};

