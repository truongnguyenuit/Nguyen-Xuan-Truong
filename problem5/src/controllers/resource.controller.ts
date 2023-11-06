import { Request, Response } from 'express';
import { Resource } from '../entities/resource.entity';
import { myDataSource } from '../helpers/database.pg';

const resourceRepo = myDataSource.getRepository(Resource);

// @route: POST http://localhost:3000/resource
// @desc: create resource

const createResource = async (req: Request, res: Response): Promise<Response> => {
  try {
    const newResource = await resourceRepo.save(req.body);
    return res.status(200).send({
      success: true,
      message: 'Create resource successful',
      resource: newResource,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

// @route: GET http://localhost:3000/resource/
// @desc: get all resources

const getResources = async (req: Request, res: Response): Promise<Response> => {
  try {
    const resources = await resourceRepo.find();
    return res.status(200).json({
      success: true,
      message: 'Get resources successful',
      resources: resources,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

// @route: GET http://localhost:3000/resource/category/:category
// @desc: get resource match with category in param

const getResourcesWithCategory = async (req: Request, res: Response): Promise<Response> => {
  try {
    const resources = await resourceRepo.find({
      where: { category: req.params.category },
    });
    return res.status(200).json({
      success: true,
      message: 'Get resources base on category successful',
      resources: resources,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

// @route: GET http://localhost:3000/resource/:id
// @desc: create detail one resource

const getResource = async (req: Request, res: Response): Promise<Response> => {
  try {
    const id = Number(req.params.id);
    const resource = await resourceRepo
      .createQueryBuilder('resource')
      .select([
        'resource.id',
        'resource.name',
        'resource.category',
        'resource.description',
      ])
      .where('resource.id = :id', { id: id })
      .getOne();

    return res.status(200).json({
      success: true,
      message: 'Get resource detail successful',
      resource: resource,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

// @route: UPDATE http://localhost:3000/resource/:id
// @desc: update resource match with param id

const updateResource = async (req: Request, res: Response): Promise<Response> => {
  try {
    const id = Number(req.params.id);
    const resource = await resourceRepo.findOne({
      where: { id: id },
    });
    if (!resource) {
      return res.status(404).json({
        success: false,
        message: 'Resource not found',
      });
    }
    const updatedResource = await resourceRepo.save({ ...resource, ...req.body });
    return res.status(200).json({
      success: true,
      message: 'update resources successful',
      resource: updatedResource,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

// @route: DELETE http://localhost:3000/resource/:id
// @desc: delete resource match with param id

const deleteResource = async (req: Request, res: Response): Promise<Response> => {
  const id = Number(req.params.id);
  const resource = await resourceRepo.findOne({
    where: { id: id },
  });
  if (!resource) {
    return res.status(404).json({
      success: false,
      message: 'Resource not found',
    });
  }
  await resourceRepo.remove(resource);
  return res.status(200).json({
    success: true,
    message: 'delete resources successful',
  });
};

export default {
  createResource,
  getResource,
  getResourcesWithCategory,
  getResources,
  updateResource,
  deleteResource,
};
