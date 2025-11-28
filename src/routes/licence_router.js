import { Router } from 'express';
import * as licenceController from './../controllers/licence_controller.js';
import { authentication } from './../middlewares/authentication.js';
import { validateBody } from './../middlewares/validation.js';
import { createLicenceSchema, updateLicenceSchema } from './../schemas/licence_schema.js';

export const licenceRouter = Router();

licenceRouter.post('/', authentication, validateBody(createLicenceSchema), licenceController.createLicence);
licenceRouter.get('/', licenceController.getAllLicences);
licenceRouter.get('/:licence_id', licenceController.getLicenceById);
licenceRouter.put('/:licence_id', authentication, validateBody(updateLicenceSchema), licenceController.updateLicenceById);
licenceRouter.delete('/:licence_id', authentication, licenceController.deleteLicenceById);