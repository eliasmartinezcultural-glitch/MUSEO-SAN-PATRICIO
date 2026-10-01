# PL2 — Registro de fuentes y protocolo de incorporación

**Estado:** ADITIVO — PL1 NO TOCADO  
**Revisión curatorial:** 2026-09-30

## Regla
Las fuentes de esta capa son insumos de investigación. Una fuente no convierte automáticamente un dato en hecho definitivo. La integración a una pieza requiere correspondencia entre afirmación, fuente, alcance territorial, fecha, procedencia y derechos.

## Nuevos bloques de investigación

### Estadística y población
- SRC-030 — Dirección Provincial de Estadística y Censos de Neuquén, Censo 2010 por área geográfica.
- SRC-031 — INDEC, Censo 2022 y cuadros estadísticos.
- SRC-035 — Ministerio de Economía, Producción e Industria de Neuquén, informes municipales 2024–2026.

### Historia y memoria
- SRC-032 — CEHEPyC/UNCo, reseña histórica reproducida desde una publicación periodística de 1994.
- Prioridad siguiente: localizar el ejemplar original del periódico y documentos primarios de 1973–1975.

### Trabajo rural y transformaciones sociales
- SRC-033 — UNCo, experiencias colectivas y luchas de mujeres rurales.
- SRC-034 — UNCo/CONICET, transformaciones socioespaciales de la Patagonia norte.

## Próximas familias de fuentes a buscar
1. Archivo Histórico Provincial de Neuquén.
2. Archivo General de la Nación.
3. Biblioteca Nacional Mariano Moreno.
4. Instituto Geográfico Nacional: cartografía histórica y actual.
5. SEGEMAR: hojas geológicas y documentación técnica.
6. CONICET, UNCo y Museo Provincial Carlos Ameghino: paleontología y arqueología.
7. Archivos escolares locales.
8. Archivos parroquiales y comunitarios, cuando exista autorización.
9. Colecciones familiares con consentimiento de los titulares.
10. Prensa histórica local/regional.
11. Planos, mensuras, catastros y documentación de riego.
12. Fotografías, afiches y programas de la Fiesta Provincial del Pelón.
13. Registros de clubes, instituciones culturales y organizaciones sociales.
14. Testimonios orales con consentimiento y ficha de procedencia.

## Multimedia: regla de entrada
Cada objeto debe tener, como mínimo:
- identificador;
- tipo;
- título;
- fecha o rango;
- pieza/registro relacionado;
- fuente o procedencia;
- URL o ubicación;
- condición de derechos/uso;
- descripción breve;
- estado documental.

No se incorporan fotografías históricas, audios, videos, mapas escaneados ni documentos solo porque sean atractivos. Primero se verifica procedencia y derecho de uso.

## Software y recursos técnicos previstos
El museo seguirá siendo estático y portable. Las herramientas se incorporan solo cuando resuelven una necesidad documental concreta:

- **IIIF:** interoperabilidad de imágenes/documentos y visualización profunda cuando exista una colección digital suficientemente estable. La especificación Presentation API 3.0 permite describir objetos compuestos y asociar imágenes, audio y video.
- **OCR/Tesseract:** extracción de texto de documentos escaneados; siempre conservar la imagen original y marcar el texto como transcripción automática hasta revisión humana.
- **Whisper/local transcription:** apoyo para transcripción de entrevistas; la grabación original permanece como referencia y la transcripción requiere revisión.
- **ExifTool:** lectura y preservación de metadatos técnicos de fotografías y audio.
- **FFmpeg:** normalización técnica de audio/video para copias derivadas, sin reemplazar el archivo maestro.
- **ImageMagick:** generación de derivados web a partir de originales preservados.
- **GitHub Actions:** validación automática de JSON, enlaces internos, IDs y relaciones.
- **JSON/JSON-LD:** estructura portable para que la colección pueda evolucionar hacia interoperabilidad sin imponer una base de datos.

## Criterio mundial de referencia
La arquitectura documental se alinea como orientación con la definición de museo de ICOM 2022, la recomendación UNESCO sobre protección y promoción de museos y colecciones, WCAG 2.2 para accesibilidad e IIIF para interoperabilidad de objetos digitales. Esto no constituye acreditación ni afiliación institucional.

## Prohibiciones
- No modificar la arquitectura congelada de PL1 para introducir una fuente.
- No presentar contexto regional como evidencia local.
- No presentar memoria oral como hecho histórico sin marcar su naturaleza.
- No publicar reconstrucciones como documentos originales.
- No copiar documentos externos extensamente.
- No eliminar una fuente anterior para hacer lugar a una nueva.
- No agregar software por prestigio técnico.
