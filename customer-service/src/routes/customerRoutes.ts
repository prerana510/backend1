import { Router } from 'express';
import {
    createCustomer,
    getCustomerByShortId,
    getCustomerById,
    getAllCustomers,
    updateCustomerByShortId,
    deleteCustomerByShortId,
   getCustomerOrders
} from '../controller/customerController'; // Adjust the import according to your folder structure

const customerRouter = Router();

customerRouter.post('/', createCustomer); // Create a new customer
customerRouter.get('/:shortId', getCustomerByShortId); // Get a customer by customerShortId
customerRouter.get('/id/:id', getCustomerById); // Get a customer by MongoDB ObjectId
customerRouter.get('/', getAllCustomers); // Get all customers
customerRouter.put('/:shortId', updateCustomerByShortId); // Update a customer by customerShortId
customerRouter.delete('/:shortId', deleteCustomerByShortId); // Delete a customer by customerShortId
//customerRouter.get('/:shortId/with-orders', getCustomerWithOrders); // Get customer details with orders

// New route to get orders for a customer
customerRouter.get('/:shortId/orders', getCustomerOrders);

export default customerRouter;
