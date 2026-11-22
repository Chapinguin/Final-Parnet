import { Noticia } from '../models/index.js';

export const getNoticias = async (req, res) => {
  try {
    const noticias = await Noticia.findAll({
      where: { activo: true },
      order: [['created_at', 'DESC']]
    });
    return res.json(noticias);
  } catch (error) {
    return res.status(500).json({ message: 'Error al consultar noticias.' });
  }
};

export const createNoticia = async (req, res) => {
  try {
    const { titulo, contenido, categoria, imagen_url } = req.body;
    const noticia = await Noticia.create({
      titulo,
      contenido,
      categoria: categoria || 'General',
      imagen_url: imagen_url || '/placeholder_news.jpg',
      activo: true
    });
    return res.status(201).json({ success: true, data: noticia });
  } catch (error) {
    return res.status(500).json({ message: 'Error al publicar noticia.' });
  }
};

