import { Sugerencia } from '../models/index.js';
import captchaService from '../services/CaptchaService.js';
import excelService from '../services/ExcelService.js';
import pdfService from '../services/PdfService.js';

export const createSugerencia = async (req, res) => {
  try {
    const { nombre, email, mensaje, captcha, captchaId } = req.body;

    if (!nombre || !email || !mensaje) {
      return res.status(400).json({ message: 'Nombre, correo y mensaje son obligatorios.' });
    }

    if (!captchaService.verify(captchaId, captcha)) {
      return res.status(400).json({ message: 'Control CAPTCHA inválido o expirado.' });
    }

    const nueva = await Sugerencia.create({
      nombre,
      email,
      mensaje
    });

    return res.status(201).json({
      success: true,
      message: 'Sugerencia enviada correctamente a la base de datos de Parnet.',
      data: nueva
    });
  } catch (error) {
    console.error('Error al guardar sugerencia:', error);
    return res.status(500).json({ message: 'Error al registrar sugerencia.' });
  }
};

export const getSugerencias = async (req, res) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const offset = (page - 1) * limit;

    const { count, rows } = await Sugerencia.findAndCountAll({
      limit,
      offset,
      order: [['created_at', 'DESC']]
    });

    return res.json({
      total: count,
      page,
      totalPages: Math.ceil(count / limit) || 1,
      data: rows
    });
  } catch (error) {
    return res.status(500).json({ message: 'Error al consultar sugerencias.' });
  }
};

export const exportExcel = async (req, res) => {
  try {
    const sugerencias = await Sugerencia.findAll({ order: [['created_at', 'DESC']] });
    return await excelService.exportSugerencias(sugerencias, res);
  } catch (error) {
    console.error('Error al exportar sugerencias a Excel:', error);
    return res.status(500).json({ message: 'Error al generar archivo Excel.' });
  }
};

export const exportPdf = async (req, res) => {
  try {
    const sugerencias = await Sugerencia.findAll({ order: [['created_at', 'DESC']] });
    return pdfService.generateSugerenciasPdf(sugerencias, res);
  } catch (error) {
    console.error('Error al exportar sugerencias a PDF:', error);
    return res.status(500).json({ message: 'Error al generar reporte PDF.' });
  }
};

