# Museo San Patricio del Chañar — Quality Gate 1.3

Antes de considerar una versión publicable, el proyecto debe superar cinco puertas.

## 1. Contenido
- Toda afirmación histórica importante tiene fuente o estado explícito.
- Las piezas distinguen evidencia local, contexto, memoria e investigación.
- Las contradicciones se conservan.
- No hay contenido de relleno presentado como patrimonio.

## 2. Datos
- IDs únicos.
- Relaciones trazables.
- Fuentes separadas de piezas.
- Derechos separados de descripción histórica.
- Versionado de estructura.
- No duplicar datos críticos en HTML y JSON cuando puedan derivarse.

## 3. Motor
- Fallos de red controlados.
- JSON inválido no rompe silenciosamente toda la experiencia.
- Selectores opcionales no producen excepciones.
- Búsqueda funciona aunque una colección secundaria no cargue.
- No hay listeners duplicados.
- Modales tienen cierre por botón, fondo y Escape.
- El foco vuelve al elemento que abrió el modal.
- El scroll del documento se bloquea mientras un modal está abierto.
- No se crean bucles de navegación sin salida.
- Los enlaces internos no requieren servicios externos.

## 4. Experiencia
- Entrada directa al museo.
- Una acción principal por bloque.
- Navegación coherente en móvil.
- Texto legible sin zoom horizontal.
- Controles táctiles suficientemente grandes.
- Progreso visible pero no invasivo.
- Respeto por reducción de movimiento.
- Alto contraste y modo lectura no destruyen la navegación.
- Todas las funciones críticas tienen equivalente sin hover.

## 5. Publicación
- GitHub Pages carga todos los recursos con rutas relativas.
- No se depende de backend.
- Fuentes externas son opcionales.
- Cambios llegan mediante rama → PR → main.
- La versión publicada coincide con data/museum-version.json.
- Cada release deja registro de cambios.

## Criterio de salida

FUNCIONA → SE ENTIENDE → SE PUEDE VERIFICAR → SE PUEDE MANTENER → SE PUEDE ENSEÑAR.
