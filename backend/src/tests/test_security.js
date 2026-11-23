import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import databaseConnection from '../config/Database.js';
import { Usuario } from '../models/index.js';

async function ejecutarPruebasSeguridad() {
  console.log('===============================================================');
  console.log('🔒 [PARNET BACKEND] Iniciando Suite de Pruebas de Seguridad');
  console.log('===============================================================');

  await databaseConnection.testConnection();

  // 1. Probar existencia y hash seguro de contraseña de administrador
  console.log('\n📌 1. Verificando Seguridad de Contraseñas (Bcrypt):');
  const admin = await Usuario.findOne({ where: { username: 'admin' } });
  if (!admin) throw new Error('Usuario administrador no encontrado');

  const passwordValida = await bcrypt.compare('AdminParnet2026!', admin.password);
  if (!passwordValida) throw new Error('Contraseña de administrador no coincide con el hash');
  console.log('   - Hash bcrypt verificado para usuario admin.');

  const passwordInvalida = await bcrypt.compare('PasswordErroneo123', admin.password);
  if (passwordInvalida) throw new Error('Seguridad vulnerada: se aceptó contraseña incorrecta');
  console.log('   - Validación de contraseña incorrecta rechazada correctamente.');
  console.log('   ✅ Seguridad de contraseñas Bcrypt validada.');

  // 2. Probar generación y validación de tokens JWT
  console.log('\n📌 2. Verificando Tokens de Autenticación (JWT):');
  const secret = process.env.JWT_SECRET || 'ParnetIngenieriaSecret2026!';
  const token = jwt.sign(
    { id: admin.id, username: admin.username, rol: admin.rol },
    secret,
    { expiresIn: '1h' }
  );
  console.log(`   - Token generado: ${token.substring(0, 32)}...`);

  const decoded = jwt.verify(token, secret);
  if (decoded.username !== 'admin' || decoded.rol !== 'ADMIN') {
    throw new Error('Fallo al decodificar claims del token JWT');
  }
  console.log('   - Token verificado y decodificado exitosamente.');

  // 3. Probar rechazo de token adulterado
  let tokenInvalidoRechazado = false;
  try {
    jwt.verify(token + 'alterado', secret);
  } catch (err) {
    tokenInvalidoRechazado = true;
  }
  if (!tokenInvalidoRechazado) throw new Error('Fallo: el token alterado fue aceptado');
  console.log('   - Token alterado rechazado correctamente por firma criptográfica.');
  console.log('   ✅ Firma y validación de JWT verificadas.');

  console.log('\n✨ [PARNET TEST] ¡TODAS LAS PRUEBAS DE SEGURIDAD PASARON CON ÉXITO!');
  process.exit(0);
}

ejecutarPruebasSeguridad().catch((err) => {
  console.error('\n❌ [PARNET TEST ERROR]:', err);
  process.exit(1);
});
