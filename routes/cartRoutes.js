const express = require("express");
const router = express.Router();
const { authenticateToken } = require("../middleware/authentication");
const CartControl = require("../controllers/cartController");


router.get("/", authenticateToken, CartControl.getCart);

router.post("/:type/:itemId", authenticateToken, CartControl.addToCart);

router.delete("/:type/:itemId", authenticateToken, CartControl.deleteFromCart);

router.delete("/", authenticateToken, CartControl.clearCart);

router.post('/checkout', authenticateToken, CartControl.checkout);

router.post('/confirmOrder', authenticateToken, CartControl.confirmOrder);


module.exports = router;
