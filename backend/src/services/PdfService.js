import PDFDocument from 'pdfkit';

/**
 * Servicio Orientado a Objetos para generación de documentos PDF
 * Genera la Ficha Técnica oficial del producto para Parnet Ingeniería.
 */
class PdfService {
  /**
   * Genera el PDF de la Ficha Técnica de un producto y lo escribe en el stream de respuesta.
   */
  generateFichaTecnica(producto, res) {
    const doc = new PDFDocument({ margin: 45, size: 'LETTER' });

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader(
      'Content-Disposition',
      `attachment; filename="FichaTecnica_${producto.codigo || producto.id}.pdf"`
    );

    doc.pipe(res);

    // Encabezado institucional
    doc
      .rect(45, 45, 522, 60)
      .fill('#002b49');

    doc
      .fillColor('#FFFFFF')
      .fontSize(20)
      .text('PARNET INGENIERÍA', 60, 58, { bold: true });

    doc
      .fontSize(10)
      .text('Soluciones Integrales en Telecomunicaciones | Ficha Técnica Oficial', 60, 84);

    // Contenedor principal
    doc
      .rect(45, 120, 522, 28)
      .fill('#f1f5f9');

    doc
      .fillColor('#002b49')
      .fontSize(13)
      .text(`PRODUCTO: ${producto.nombre.toUpperCase()}`, 55, 128, { bold: true });

    doc.moveDown(2);

    // Tabla de metadatos
    const startY = 165;
    const metadata = [
      ['Código de Catálogo:', producto.codigo],
      ['Categoría Tecnológica:', producto.categoria],
      ['Estatus de Inventario:', producto.estatus],
      ['Precio Unitario (MXN):', `$${Number(producto.precio).toFixed(2)} + IVA`],
      ['Fecha de Emisión:', new Date().toLocaleDateString('es-MX', { year: 'numeric', month: 'long', day: 'numeric' })]
    ];

    let currentY = startY;
    metadata.forEach(([label, value]) => {
      doc
        .fontSize(10)
        .fillColor('#475569')
        .text(label, 55, currentY, { width: 160, bold: true })
        .fillColor('#0f172a')
        .text(String(value), 220, currentY, { width: 340 });

      doc
        .moveTo(55, currentY + 16)
        .lineTo(557, currentY + 16)
        .strokeColor('#e2e8f0')
        .stroke();

      currentY += 24;
    });

    currentY += 15;

    // Sección: Descripción
    doc
      .rect(45, currentY, 522, 22)
      .fill('#e2e8f0');

    doc
      .fillColor('#002b49')
      .fontSize(11)
      .text('DESCRIPCIÓN GENERAL', 55, currentY + 6, { bold: true });

    currentY += 30;

    doc
      .fillColor('#334155')
      .fontSize(10)
      .text(producto.descripcion || 'Sin descripción detallada.', 55, currentY, {
        width: 502,
        align: 'justify',
        lineGap: 4
      });

    currentY = doc.y + 20;

    // Sección: Especificaciones Técnicas
    doc
      .rect(45, currentY, 522, 22)
      .fill('#e2e8f0');

    doc
      .fillColor('#002b49')
      .fontSize(11)
      .text('ESPECIFICACIONES TÉCNICAS Y CERTIFICACIONES', 55, currentY + 6, { bold: true });

    currentY += 30;

    doc
      .fillColor('#334155')
      .fontSize(10)
      .text(producto.especificaciones || 'Cumple con estándares internacionales de telecomunicaciones EIA/TIA y normativas NOM.', 55, currentY, {
        width: 502,
        align: 'justify',
        lineGap: 4
      });

    // Pie de página
    doc
      .fontSize(8)
      .fillColor('#94a3b8')
      .text(
        'Parnet Ingeniería · Redes y Telecomunicaciones · Saltillo, Coahuila · www.parnet.com.mx · Documento generado automáticamente por el sistema web.',
        45,
        730,
        { align: 'center', width: 522 }
      );

    doc.end();
  }

  /**
   * Genera reporte PDF de sugerencias recibidas.
   */
  generateSugerenciasPdf(sugerencias, res) {
    const doc = new PDFDocument({ margin: 40, size: 'LETTER', layout: 'landscape' });

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="Reporte_Sugerencias_Parnet.pdf"');

    doc.pipe(res);

    doc.rect(40, 30, 712, 45).fill('#002b49');
    doc.fillColor('#FFFFFF').fontSize(16).text('PARNET INGENIERÍA — REPORTE DE SUGERENCIAS INTERNAS', 55, 45, { bold: true });

    let currentY = 95;

    // Encabezados tabla
    doc.rect(40, currentY, 712, 22).fill('#e2e8f0');
    doc.fillColor('#002b49').fontSize(9).text('ID', 45, currentY + 6, { bold: true });
    doc.text('REMITENTE', 80, currentY + 6, { bold: true });
    doc.text('CORREO', 220, currentY + 6, { bold: true });
    doc.text('FECHA', 380, currentY + 6, { bold: true });
    doc.text('MENSAJE', 480, currentY + 6, { bold: true });

    currentY += 26;

    sugerencias.forEach((item) => {
      if (currentY > 540) {
        doc.addPage({ margin: 40, size: 'LETTER', layout: 'landscape' });
        currentY = 40;
      }

      doc.fillColor('#1e293b').fontSize(8);
      doc.text(String(item.id), 45, currentY);
      doc.text(String(item.nombre).substring(0, 25), 80, currentY);
      doc.text(String(item.email).substring(0, 30), 220, currentY);
      doc.text(new Date(item.created_at || Date.now()).toLocaleDateString('es-MX'), 380, currentY);
      doc.text(String(item.mensaje).substring(0, 55) + '...', 480, currentY);

      doc.moveTo(40, currentY + 14).lineTo(752, currentY + 14).strokeColor('#f1f5f9').stroke();
      currentY += 20;
    });

    doc.end();
  }
}

const pdfService = new PdfService();
export default pdfService;

