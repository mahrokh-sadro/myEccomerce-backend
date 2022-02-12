const { Order, CartItem } = require("../models/OrderModel");
const { errorHandler } = require("../helpers/dbErrorHandler");

exports.create = (req, res) => {
  //   console.log("create", req.body);
  req.body.order.user = req.body;
  const order = new Order(req.body.order);

  order.save((error, data) => {
    if (error) {
      return res.status(400).json({
        error: errorHandler(error),
      });
    }

    const emailData = {
      to: "costansa5@gmail.com",
      from: "noreply@ecommerce.com",
      subject: `A new order is received`,
      html: `
        <p>Customer name:</p>
        <p>Total products: ${order.products.length}</p>
        <p>Total cost: ${order.amount}</p>
        <p>Login to dashboard to the order in detail.</p>
    `,
    };
    sgMail.send(emailData);
    res.json(data);
  });
};
