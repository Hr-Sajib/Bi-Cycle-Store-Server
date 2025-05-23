import { Request, Response } from "express";
import mongoose from "mongoose";
import httpStatus from "http-status";
import catchAsync from "../../../utils/catchAsync";
import sendResponse from "../../../utils/sendResponse";
import { OrderServices } from "./order.service";
import SSLCommerzPayment from "sslcommerz-lts";

const createOrder = catchAsync(async (req: Request, res: Response) => {
  const order = req.body;

  // payment 
  const store_id = 'test67f513f2c14ae';
  const store_passwd = 'test67f513f2c14ae@ssl';
  const is_live = false;

// Generate dynamic transaction ID
const transactionId = `TRANS_${Date.now()}_${Math.floor(1000 + Math.random() * 9000)}`;

const data = {
    total_amount: order.totalPrice,
    currency: 'BDT',
    tran_id: transactionId,
    success_url: `https://bi-cycle-store-server-nu.vercel.app/api/orders/payment-success/${transactionId}`,
    fail_url: `https://bi-cycle-store-server-nu.vercel.app/api/orders/payment-failed/${transactionId}`,
    cancel_url: `https://bi-cycle-store-server-nu.vercel.app/api/orders/payment-cancel/orders/${transactionId}`,
    ipn_url: 'https://bi-cycle-store-server-nu.vercel.app/api/orders/ipn',
    shipping_method: 'Courier',
    product_name: "baler product",
    product_category: 'Electronic',
    product_profile: 'general',
    cus_name: 'Customer Name',
    cus_email: 'hrsajib001@gmail.com',
    cus_add1: 'Dhaka',
    cus_add2: 'Dhaka',
    cus_city: 'Dhaka',
    cus_state: 'Dhaka',
    cus_postcode: '1000',
    cus_country: 'Bangladesh',
    cus_phone: order.contactNumber,
    cus_fax: '01711111111',
    ship_name: 'Customer Name',
    ship_add1: 'Dhaka',
    ship_add2: 'Dhaka',
    ship_city: 'Dhaka',
    ship_state: 'Dhaka',
    ship_postcode: 1000,
    ship_country: 'Bangladesh',
  };

  const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);

  const apiResponse = await sslcz.init(data); // 🔥 Await here
  // console.log("📦 Full SSLCommerz API GatewayPageURL:", apiResponse.GatewayPageURL);

  let GatewayPageURL = apiResponse?.GatewayPageURL;

  if (!GatewayPageURL) {
    console.log("❌ No GatewayPageURL returned");
    throw new Error("Failed to generate payment URL");
  }


  

  const result = await OrderServices.createOrderIntoDB({...order,transactionId});


  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Order placed successfully.",
    data: result,
  },
  GatewayPageURL
  );
});








const getAllOrders = catchAsync(async (req: Request, res: Response) => {
  const result = await OrderServices.getAllOrdersFromDB(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Orders retrieved successfully.",
    data: result,
  });
});





const getSingleOrder = catchAsync(async (req: Request, res: Response) => {
  const { orderId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(orderId)) {
    throw new Error("Invalid order ID format");
  }

  const result = await OrderServices.getSingleOrderFromDB(orderId);
  if (!result) {
    throw new Error(`No order found with ID: ${orderId}`);
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Order retrieved successfully.",
    data: result,
  });
});

const updateOrder = catchAsync(async (req: Request, res: Response) => {
  const { orderId } = req.params;
  const updatedData = req.body;

  if (!mongoose.Types.ObjectId.isValid(orderId)) {
    throw new Error("Invalid order ID format");
  }

  const result = await OrderServices.updateOrderInDB(orderId, updatedData);
  if (!result) {
    throw new Error("Order not found");
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Order updated successfully.",
    data: result,
  });
});

const deleteOrder = catchAsync(async (req: Request, res: Response) => {
  const { orderId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(orderId)) {
    throw new Error("Invalid order ID format");
  }

  const result = await OrderServices.deleteOrderFromDB(orderId);
  if (!result) {
    throw new Error("Order not found");
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Order deleted successfully.",
    data: null,
  });
});

// const getRevenue = catchAsync(async (req: Request, res: Response) => {
//   const totalRevenue = await OrderServices.calculateRevenue();

//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: "Revenue calculated successfully.",
//     data: { totalRevenue },
//   });
// });

export const OrderController = {
  createOrder,
  getAllOrders,
  getSingleOrder,
  updateOrder,
  deleteOrder,
  // getRevenue,
};
