import * as licenceService from './../services/licence_service.js';

export const createLicence = async (req, res) => {
    try {
        const licenceData = req.body;
        const newUser = await licenceService.createLicence(licenceData);
        res.status(201).json(newUser);
    } catch (err) {
        console.error('Error en createLicence del controller:', err);
        if (err.message === 'Ya existe una licencia con ese nombre.') return res.status(409).json({ error: err.message });
        res.status(500).json({ error: 'No se pudo crear la Licencia.' });
    }
};

export const getAllLicences = async (req, res) => {
    try {
        const licences = await licenceService.getAllLicences();
        res.json(licences);
    } catch (err) {
        console.error('Error en getAllLicences del controller:', err);
        res.status(500).json({ error: 'Error al obtener Licencias.' });
    }
};

export const getLicenceById = async (req, res) => {
    try {
        const { licence_id } = req.params;
        const licence = await licenceService.getLicenceById(licence_id.trim());
        if (!licence) return res.status(404).json({ error: 'Licencia no encontrada.' });
        res.json(licence);
    } catch (err) {
        console.error('Error en getLicenciaById del controller:', err);
        res.status(500).json({ error: 'Error al obtener la Licencia.' });
    }
};

export const updateLicenceById = async (req, res) => {
    try {
        const { licence_id } = req.params;
        const updateData = req.body;
        const updatedLicencia = await licenceService.updateLicenceById(licence_id, updateData);
        res.status(200).json(updatedLicencia);
    } catch (err) {
        console.error('Error en updateLicence del Controller:', err);
        if (err.message === 'Licencia no encontrada.') return res.status(404).json({ error: err.message });
        res.status(500).json({ error: 'No se pudo actualizar la Licencia.' });
    }
};

export const deleteLicenceById = async (req, res) => {
    try {
        const { licence_id } = req.params;
        const response = await licenceService.deleteLicenceById(licence_id);
        res.status(200).json({ message: response.message });
    } catch (err) {
        console.error('Error en deleteLicenciaById del Controller:', err);
        if (
            err.message === 'Licencia no encontrada.' ||
            err.message === 'Licencia en uso.'
        ) return res.status(404).json({ error: err.message });
        res.status(500).json({ error: 'No se pudo eliminar la Licencia.' });
    }
};