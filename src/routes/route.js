const express = require("express");
const router = express.Router();
const customerController = require("../Controllers/customerController");
const cardController = require("../Controllers/cardControllers")



router.post("/register", customerController.Customer);
router.get("/get",customerController.getCustomer);
router.delete("/customer/:customerId",customerController.deleteCustomer);

router.post("/card",cardController.createCard);
router.get("/allCards",cardController.getCards)



router.all("*", function (req, res) {
    res.status(404).send({
        status: false,
        message: "Invalid Url"
    })
})

module.exports = router;
