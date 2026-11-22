import ExcelJS from 'exceljs';

/**
 * Servicio Orientado a Objetos para exportar información a Excel (.xlsx)
 */
class ExcelService {
  async exportSugerencias(sugerencias, res) {
    const workbook = new ExcelJS.Workbook();
    workbook.creator = 'Parnet Ingeniería Web System';
    workbook.created = new Date();

    const worksheet = workbook.addWorksheet('Sugerencias');

    worksheet.columns = [
      { header: 'ID', key: 'id', width: 10 },
      { header: 'Remitente', key: 'nombre', width: 28 },
      { header: 'Correo Electrónico', key: 'email', width: 32 },
      { header: 'Mensaje / Sugerencia', key: 'mensaje', width: 60 },
      { header: 'Fecha de Registro', key: 'fecha', width: 20 }
    ];

    // Estilo al encabezado
    worksheet.getRow(1).eachCell((cell) => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FF002B49' }
      };
      cell.font = {
        color: { argb: 'FFFFFFFF' },
        bold: true
      };
      cell.alignment = { vertical: 'middle', horizontal: 'center' };
    });

    sugerencias.forEach((item) => {
      worksheet.addRow({
        id: item.id,
        nombre: item.nombre,
        email: item.email,
        mensaje: item.mensaje,
        fecha: new Date(item.created_at || Date.now()).toLocaleString('es-MX')
      });
    });

    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    );
    res.setHeader('Content-Disposition', 'attachment; filename="Sugerencias_Parnet.xlsx"');

    await workbook.xlsx.write(res);
    res.end();
  }
}

const excelService = new ExcelService();
export default excelService;

