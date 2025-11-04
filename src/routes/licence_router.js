import { Router } from 'express';
import * as licenceController from './../controllers/licence_controller.js';

export const licenceRouter = Router();

licenceRouter.post('/', licenceController.createLicence);
licenceRouter.get('/', licenceController.getAllLicences);
licenceRouter.get('/:licence_id', licenceController.getLicenceById);
licenceRouter.put('/:licence_id', licenceController.updateLicenceById);
licenceRouter.delete('/:licence_id', licenceController.deleteLicenceById);