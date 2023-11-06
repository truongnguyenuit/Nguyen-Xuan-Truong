import express from 'express';
import resourceController from '../controllers/resource.controller';
import { resourceValidate } from '../middlewares/resource.validate';

const ResourceRouter = express.Router();

ResourceRouter.post('/', resourceValidate, resourceController.createResource);
ResourceRouter.get('/', resourceController.getResources);
ResourceRouter.get('/category/:category', resourceController.getResourcesWithCategory);
ResourceRouter.get('/:id', resourceController.getResource);
ResourceRouter.put('/:id', resourceValidate, resourceController.updateResource);
ResourceRouter.delete('/:id', resourceController.deleteResource);

export default ResourceRouter;
