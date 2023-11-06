import express, { Application } from 'express';
import ResourceRouter from './routers/resource.router';
import { myDataSource } from './helpers/database.pg';

myDataSource
    .initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization:", err)
    })

const app: Application = express();

const PORT = 3000;

app.use(express.json());
app.use("/resource", ResourceRouter)

try {
  app.listen(PORT, (): void => {
    console.log(`Connected successfully on port ${PORT}`);
  });
} catch (error: any) {
  console.error(`Error occurred: ${error.message}`);
}
