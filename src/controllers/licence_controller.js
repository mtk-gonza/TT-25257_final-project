import * as licenceService from './../services/licence_service.js';

export const createLicence = async (req, res) => {
    try {
        const licenceData = req.body;
        const newLicence = await licenceService.createLicence(licenceData);
        res.status(201).json({
            success: true,
            message: 'Licencia creada exitosamente.',
            data: newLicence
        });
    } catch (err) {
        console.error('Error en createLicence del controller:', err);
        if (err.message === 'Ya existe una licencia con ese nombre.') {
            return res.status(409).json({
                success: false, 
                message: err.message 
            })
        };
        res.status(500).json({
            success: false, 
            message: 'No se pudo crear la Licencia.' 
        });
    }
};

export const getAllLicences = async (req, res) => {
    try {
        const licences = await licenceService.getAllLicences();
        res.json({
            success: true,
            data: licences
        });
    } catch (err) {
        console.error('Error en getAllLicences del controller:', err);
        res.status(500).json({ 
            success: false,
            message: 'Error al obtener Licencias.' 
        });
    }
};

export const getLicenceById = async (req, res) => {
    try {
        const { licence_id } = req.params;
        const licence = await licenceService.getLicenceById(licence_id.trim());
        if (!licence) {
            return res.status(404).json({ 
                success: false,
                message: 'Licencia no encontrada.' 
            })
        };
        res.json({
            success: true,
            data: licence
        });
    } catch (err) {
        console.error('Error en getLicenciaById del controller:', err);
        res.status(500).json({ 
            success: false,
            message: 'Error al obtener la Licencia.' 
        });
    }
};

export const updateLicenceById = async (req, res) => {
    try {
        const { licence_id } = req.params;
        const updateData = req.body;
        const updatedLicencia = await licenceService.updateLicenceById(licence_id, updateData);
        res.status(200).json({
            success: true,
            message: 'Licencia actualizada exitosamente.',
            data: updatedLicencia
        });
    } catch (err) {
        console.error('Error en updateLicence del Controller:', err);
        if (err.message === 'Licencia no encontrada.') {
            return res.status(404).json({
                success: false, 
                message: err.message 
            })
        };
        res.status(500).json({ 
            success: false,
            message: 'No se pudo actualizar la Licencia.' 
        });
    }
};

export const deleteLicenceById = async (req, res) => {
    try {
        const { licence_id } = req.params;
        const response = await licenceService.deleteLicenceById(licence_id);
        res.status(200).json({ 
            success: true,
            message: response.message 
        });
    } catch (err) {
        console.error('Error en deleteLicenciaById del Controller:', err);
        if (
            err.message === 'Licencia no encontrada.' ||
            err.message === 'Licencia en uso.'
        ) {
            return res.status(404).json({ 
                success: false,
                message: err.message 
            })
        };
        res.status(500).json({ 
            success: false,
            message: 'No se pudo eliminar la Licencia.' 
        });
    }
};