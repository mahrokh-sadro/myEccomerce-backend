const express = require("express");

const router = express.Router();
const { isAuth, isAdmin } = require("../services/AuthService.js");

const {
  userById,
  read,
  update,
  purchaseHistory,
} = require("../services/CustomerService.js");

//

router.get("/secret/:userId", isAuth, isAdmin, (req, res) => {
  res.json({
    user: req.profile,
  });
});

router.get("/customers/:userId", isAuth, read);
router.put("/customers/:userId", isAuth, update);

router.param("userId", userById);

module.exports = router;
