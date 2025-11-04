import * as licenceService from './../services/licence_service.js';

export const createLicence = async (req, res) => {
    try {
        const licenceData = req.body;
        if (!licenceData.name || !licenceData.description ) {
            return res.status(400).json({ error: 'Faltan campos: name, description' });
        }
        const newUser = await licenceService.createLicence(licenceData);
        res.status(201).json(newUser);
    } catch (error) {
        console.error('Error en createLicence del controller:', error);
        res.status(500).json({ error: 'No se pudo crear la licencia' });
    }
};

export const getAllLicences = async (req, res) => {
    try {
        const licences = await licenceService.getAllLicences();
        res.json(licences);
    } catch (error) {
        console.error('Error en getAllLicences del controller:', error);
        res.status(500).json({ error: 'Error al obtener licencias' });
    }
};

export const getLicenceById = async (req, res) => {
    try {
        const { licence_id } = req.params;
        const licence = await licenceService.getLicenceById(licence_id.trim());
        if (!licence) {
            return res.status(404).json({ error: 'licencia no encontrado' });
        }
        res.json(licence);
    } catch (error) {
        console.error('Error en getLicenciaById del controller:', error);
        res.status(500).json({ error: 'Error al obtener la licencia' });
    }
};

export const updateLicenceById = async (req, res) => {
    try {
        const { licence_id } = req.params;
        const updateData = req.body;

        const updatedLicencia = await licenceService.updateLicenceById(licence_id, updateData);
        res.status(200).json(updatedLicencia);
    } catch (error) {
        if (error.message === 'licencia no encontrado') {
            return res.status(404).json({ error: error.message });
        }
        if (error.message.includes('campos')) {
            return res.status(400).json({ error: error.message });
        }
        console.error('Error en updateLicence del Controller:', error);
        res.status(500).json({ error: 'No se pudo actualizar la licencia' });
    }
};

export const deleteLicenceById = async (req, res) => {
    try {
        const { licence_id } = req.params;
        await licenceService.deleteLicenceById(licence_id);
        res.status(200).json({ message: 'licencia eliminada correctamente' });
    } catch (error) {
        if (error.message === 'licencia no encontrada') {
            return res.status(404).json({ error: error.message });
        }
        console.error('Error en deleteLicenciaById del Controller:', error);
        res.status(500).json({ error: 'No se pudo eliminar la licencia' });
    }
};