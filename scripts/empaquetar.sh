#!/bin/bash
# Script de empaquetado para entrega final de Parnet Ingeniería
# Genera un archivo ZIP limpio sin node_modules, dist ni secretos.

echo "📦 Empaquetando Parnet Ingeniería para entrega final..."
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
OUTPUT_ZIP="Parnet_Ingenieria_EntregaFinal_${TIMESTAMP}.zip"

# Moverse a la raíz del repositorio
ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

zip -r "$OUTPUT_ZIP" . \
  -x "*/node_modules/*" \
  -x "node_modules/*" \
  -x "*/dist/*" \
  -x "dist/*" \
  -x "*.zip" \
  -x "*.git*" \
  -x "*.env" \
  -x "*.sqlite" \
  -x "*.sqlite-journal" \
  -x "*.DS_Store" \
  -x "Thumbs.db"

echo "✅ Empaquetado completado exitosamente: $OUTPUT_ZIP"
echo "ℹ️ Recuerde que quien ejecute el proyecto debe instalar dependencias con 'npm install' en backend y frontend."

