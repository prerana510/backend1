import express, { Application } from 'express';
import * as dotenv from 'dotenv';
import userRoute from './routes/user';

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());

// User Service routes
app.use('/api/users', userRoute);

// Other service routes would go here, similar to userRoute
// e.g., app.use('/api/inventory', inventoryRoute);

app.listen(PORT, () => {
  console.log(`API Gateway running on port ${PORT}`);
});
