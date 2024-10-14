const Order = require("../models/orderModel");
const OrderItem = require("../models/orderItemModel");
const asyncHandler = require("express-async-handler");

//Get All Order
const getOrders = asyncHandler(async (req, res) => {
    let orders;
    if (!req.user.isAdmin) {
        orders = await Order.find({ user: req.user.userId })
            .populate("user", "name email")
            .sort("dateOrdered");
    } else {
        orders = await Order.find()
            .populate("user", "name email")
            .sort("dateOrdered");
    }

    if (!orders) return res.status(400).json({ message: "No order found" });

    res.send(orders);
});

//Get All Order
const getOrdersById = asyncHandler(async (req, res) => {
    console.log("Logged In User:", req.user.userId);
    let orders;
    if (!req.user.isAdmin) {
        orders = await Order.find({ user: req.user.userId, _id: req.params.id })
            .populate("user", "name email")
            .populate({
                path: "orderItems",
                populate: {
                    path: "product",
                    populate: "category",
                },
            });
    } else {
        orders = await Order.find()
            .populate("user", "name email")
            .populate({
                path: "orderItems",
                populate: {
                    path: "product",
                    populate: "category",
                },
            });
    }

    if (!orders) return res.status(400).json({ message: "No order found" });

    res.send(orders);
});

//Create Order
const createOrder = asyncHandler(async (req, res) => {
    const userId = req.user.userId;
    const orderItemsIds = Promise.all(
        req.body.orderItems.map(async (orderItem) => {
            let newOrderItem = new OrderItem({
                quantity: orderItem.quantity,
                product: orderItem.product,
            });

            newOrderItem = await newOrderItem.save();

            return newOrderItem._id;
        }),
    );
    const orderItemsIdsResolved = await orderItemsIds;

    const totalPrices = await Promise.all(
        orderItemsIdsResolved.map(async (orderItemId) => {
            const orderItem = await OrderItem.findById(orderItemId).populate(
                "product",
                "price",
            );
            const totalPrice = orderItem.product.price * orderItem.quantity;
            return totalPrice;
        }),
    );

    const _totalPrice = totalPrices.reduce((a, b) => a + b, 0);

    const {
        orderItems,
        shippingAddress1,
        shippingAddress2,
        city,
        zip,
        country,
        phone,
        status,
        totalPrice,
        user,
    } = req.body;

    const order = await Order.create({
        orderItems: orderItemsIdsResolved,
        shippingAddress1,
        shippingAddress2,
        city,
        zip,
        country,
        phone,
        status,
        totalPrice: _totalPrice,
        user: userId,
    });

    if (!order)
        return res.status(400).json({
            message: "Oops! something went wrong, please check administrator",
        });

    res.send(order);
});

//Update order status
const updateOrderStatus = asyncHandler(async (req, res) => {
    if (!req.user.isAdmin) {
        return res.status(400).json({ message: "Unauthorized access" });
    } else {
        const order = await Order.findByIdAndUpdate(
            req.params.id,
            {
                status: req.body.status,
            },
            { new: true },
        ).then((order) => {
            if (!order)
                return res.status(400).json({ message: "No record found" });
            return res.send({ order, message: "Record updated" });
        }).catch((err)=>{
            res.status(500).json({success: false})
        });

        console.log(order.status);
    }
});

//Update order status
const deleteOrder = asyncHandler(async (req, res) => {
    if (!req.user.isAdmin) {
        return res.status(400).json({ message: "Unauthorized access" });
    } else {
        const order = await Order.findByIdAndRemove(req.params.id).then((order) => {
            if (!order)
                return res.status(400).json({ message: "No record found" });
            return res.send({ message: "Record deleted" });
        }).catch((err)=>{
            res.status(500).json({success: false})
        });

        console.log(order.status);
    }
});
//Total Sale
const getTotalSales = asyncHandler(async (req, res)=>{
    const totalSales = await Order.aggregate([{
        $group:{ _id:null, totalsales: { $sum : '$totalPrice'}}
    }]);

    if (!totalSales)
    return res.status(400).json({message: 'The order sales cannot be generated'});

    res.send({totalSales: totalSales});
})
module.exports = { getOrders, getOrdersById, createOrder, updateOrderStatus, deleteOrder, getTotalSales };
