const express = require("express");
const router = express.Router();
const customerController = require("../Controllers/customerController")


router.post("/register", customerController.Customer);
router.get("/get",customerController.getCustomer);
router.delete("/customer/:customerId",customerController.deleteCustomer);



router.all("*", function (req, res) {
    res.status(404).send({
        status: false,
        message: "Invalid Url"
    })
})

module.exports = router;
