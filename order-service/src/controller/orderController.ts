// src/controllers/orderController.ts
import { Request, Response } from 'express';
import Order from '../models/Order';
import { getCustomerByShortId } from '../service/customerServiceClient'; // Import the updated customer service client
import axios from 'axios';

// Create an order
export const createOrder = async (req: Request, res: Response): Promise<void> => {
    try {
        const { customerEmail, ...orderDetails } = req.body;

        // Fetch customer details using customerShortId
        const customerResponse = await axios.get(`http://localhost:5005/api/customers/checkCustomer?customerEmail=${customerEmail}`);

        if (customerResponse.status === 200 && customerResponse.data) {
          const customer = customerResponse.data;

          const newOrder = new Order ({
            ...orderDetails,
            customerShortId: customer.customerShortId,
            branchShortId: customer.branchShortId
          });

          await newOrder.save();
          res.status(201).json(newOrder);
          }
          else {
            res.redirect(307, `http://localhost:5005/api/customers/addCustomer?customerEmail=${customerEmail}`);
          }
            // res.redirect(307, `http://localhost:5004/api/orders/addCustomer/customerShortId/${customerShortId}`);
            // //res.status(404).json({ message: 'Customer not found' });
            // return;
    }

        // Proceed to create order
     catch (error:any) {
      const { customerEmail, ...orderDetails } = req.body;
        console.error("Order creation error:", error);
        if(error.response && error.response.status === 404) {
          res.redirect(307, `http://localhost:5005/api/customers/addCustomer?customerEmail=${customerEmail}`);
        } else {
          res.status(500).json({ message: 'Error creating order', error});
        }
    }
};



// Get all orders
export const getAllOrders = async (req: Request, res: Response): Promise<void> => {
    try {
        const orders = await Order.find();
        res.json(orders);
    } catch (error) {
        console.error("Error fetching all orders:", error);
        res.status(500).json({ message: 'Error fetching all orders', error });
    }
};

// Get a specific order by ID
export const getOrderById = async (req: Request, res: Response): Promise<void> => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      res.status(404).json({ message: 'Order not found' });
      return;
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching order', error });
  }
};

// Get all orders by customerShortId
export const getOrdersByCustomerShortId = async (req: Request, res: Response): Promise<void> => {
    try {
        const { customerShortId } = req.params;
        const orders = await Order.find({ customerShortId: customerShortId });  // assuming customerId field holds shortId
        res.json(orders);
    } catch (error) {
        console.error("Error fetching orders by customerShortId:", error);
        res.status(500).json({ message: 'Error fetching orders by customerShortId', error });
    }
};

// Update order status
export const updateOrderStatus = async (req: Request, res: Response): Promise<void> => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { transactionStatus: status, updatedAt: new Date() },
      { new: true }
    );
    if (!order) {
      res.status(404).json({ message: 'Order not found' });
      return;
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Error updating order status', error });
  }
};

// Delete an order by ID
export const deleteOrder = async (req: Request, res: Response): Promise<void> => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) {
      res.status(404).json({ message: 'Order not found' });
      return;
    }
    res.json({ message: 'Order deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting order', error });
  }
};

// Get an order by orderShortID
export const getOrderByShortId = async (req: Request, res: Response): Promise<void> => {
    try {
        const { shortId } = req.params;
        const order = await Order.findOne({ orderShortID: shortId });
        if (!order) {
            res.status(404).json({ message: 'Order not found' });
            return;
        }
        res.json(order);
    } catch (error) {
        console.error("Error fetching order by shortId:", error);
        res.status(500).json({ message: 'Error fetching order', error });
    }
};

// Update an order by orderShortID
export const updateOrderByShortId = async (req: Request, res: Response): Promise<void> => {
    try {
        const { shortId } = req.params;
        const updateData = req.body;

        const order = await Order.findOneAndUpdate(
            { orderShortID: shortId },
            { ...updateData, updatedAt: new Date() },
            { new: true }
        );

        if (!order) {
            res.status(404).json({ message: 'Order not found' });
            return;
        }
        res.json(order);
    } catch (error) {
        console.error("Error updating order by shortId:", error);
        res.status(500).json({ message: 'Error updating order', error });
    }
};

// Delete an order by orderShortID
export const deleteOrderByShortId = async (req: Request, res: Response): Promise<void> => {
    try {
        const { shortId } = req.params;
        const order = await Order.findOneAndDelete({ orderShortID: shortId });

        if (!order) {
            res.status(404).json({ message: 'Order not found' });
            return;
        }
        res.json({ message: 'Order deleted successfully' });
    } catch (error) {
        console.error("Error deleting order by shortId:", error);
        res.status(500).json({ message: 'Error deleting order', error });
    }
};

export const addCustomerAndCreateOrder = async (req: Request, res: Response): Promise<void> => {
  try {
      const { customerShortId } = req.params;
      const { orderDetails, ...newCustomerData } = req.body;

      if (!newCustomerData) {
          res.status(400).json({ message: 'newCustomerData is required to create a new customer.' });
          return;
      }

      // Call Customer Service to create a new customer
      try {
          const customerResponse = await axios.post(`http://localhost:5005/api/customers/`, {
              customerShortId: customerShortId,
              ...newCustomerData
          });
          const customer = customerResponse.data;

          console.log("New customer created:", customer);

          // After creating the customer, proceed to create the order
          const newOrder = new Order({
              ...orderDetails,
              customerShortId: customer.customerShortId,
              branchShortId: customer.branchShortId,
          });
          await newOrder.save();

          res.status(201).json(newOrder);
      } catch (error) {
          console.error("Customer creation error:", error);
          res.status(500).json({ message: 'Error creating customer', error });
      }
  } catch (error) {
      console.error("Error in addCustomerAndCreateOrder:", error);
      res.status(500).json({ message: 'Error processing request', error });
  }
};