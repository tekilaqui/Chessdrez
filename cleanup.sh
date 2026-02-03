#!/bin/bash

# CLEANUP SCRIPT - Eliminar carpetas redundantes y archivos temporales
# Esto debe ejecutarse con: bash cleanup.sh

echo "🧹 Chess Tricks - Limpieza de archivos redundantes"
echo "=================================================="

# Archivos/carpetas a eliminar
DIRS_TO_REMOVE=(
  "version anterior"
  "cambios movil"
)

FILES_TO_REMOVE=(
  "count_braces.py"
  "counter_css.py"
  "counter.py"
  "find_ends.py"
  "find_starts.py"
  "fix_sync.py"
  "rebalance_widgets.py"
  "restructure_widgets.py"
  "clean_css.py"
  "trace_braces.py"
  "trace_output.txt"
  "trace_output_2.txt"
  "error.txt"
  "syntax_error.txt"
  "README.md.txt"
  "Solucion_1_Copy_Paste.md"
  "ChessDrez - Solución #1 Optimizada.html"
  "kids_chess_revamp.html"
  "chess_hero_preview.png"
  "chess_pro_lite.zip"
  "chesstricks-main (1).zip"
  "client_optimized.js"
  "auth_fixed.js"
  "mobile_info_modal.html"
)

# Eliminar carpetas
for dir in "${DIRS_TO_REMOVE[@]}"; do
  if [ -d "$dir" ]; then
    echo "❌ Eliminando carpeta: $dir"
    rm -rf "$dir"
  fi
done

# Eliminar archivos
for file in "${FILES_TO_REMOVE[@]}"; do
  if [ -f "$file" ]; then
    echo "❌ Eliminando archivo: $file"
    rm -f "$file"
  fi
done

echo ""
echo "✅ Limpieza completada"
echo ""
echo "📝 Próximos pasos:"
echo "  1. git add -A"
echo "  2. git commit -m 'chore: cleanup redundant files and folders'"
echo "  3. git push"
