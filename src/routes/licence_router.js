import { Router } from 'express';
import * as licenceController from './../controllers/licence_controller.js';
import { authentication } from './../middlewares/authentication.js';

export const licenceRouter = Router();

licenceRouter.post('/', authentication, licenceController.createLicence);
licenceRouter.get('/', licenceController.getAllLicences);
licenceRouter.get('/:licence_id', licenceController.getLicenceById);
licenceRouter.put('/:licence_id', authentication, licenceController.updateLicenceById);
licenceRouter.delete('/:licence_id', authentication, licenceController.deleteLicenceById);