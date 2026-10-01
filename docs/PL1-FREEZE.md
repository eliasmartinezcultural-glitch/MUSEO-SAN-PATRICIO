# PL1 — Núcleo congelado del Museo Digital de San Patricio del Chañar

**Estado:** BLOQUEADO / BASE OPERATIVA  
**Regla:** desde este punto, PL1 no se modifica para incorporar contenido, estética o funcionalidades. Las siguientes capas solo pueden **sumar** recursos sin alterar el contrato troncal.

## Qué queda congelado

PL1 fija:

- la arquitectura de experiencia;
- la navegación principal;
- el motor documental;
- el modelo pieza → registro → fuente → relación;
- los estados documentales existentes;
- el catálogo;
- las colecciones;
- el archivo;
- las cuatro puertas de descubrimiento;
- el sistema de overlays/drawer;
- las rutas hash;
- la accesibilidad base;
- la PWA y resiliencia offline;
- la identidad visual actualmente publicada.

## Artefactos de referencia

- `index.html` — ecd983ca1280c51e9aafd236c4b35ae77fb45fa3
- `assets/css/museum-core.css` — b733274e0a0f4ced0320d2b762ff0d6b51f0c2a8
- `assets/js/museum-core.js` — 9c833cef14316953b82167a597306321dd2cfc45
- `data/collections.json` — 34ddab5c7766bdec783e4ca3c5f85163120a03b2
- `data/multimedia.json` — 3af2919b73f80c4ba8248ceb48504b7d676eee23
- `data/relations.json` — fdd9ef569239dc0bc8f09d0d7445a40647bc9250
- `sw.js` — 81c605491307fd5543c64c84bed379d612daf974
- `manifest.webmanifest` — b79c2abf82f0088d5b685389b6f73c2e4be62f8c
- `data/museum-system.json` — contrato del sistema 2.0

## Regla de no regresión

Una futura incorporación no puede:

1. romper una ruta existente;
2. cambiar el significado de un estado documental sin migración explícita;
3. presentar una investigación como hecho;
4. presentar contexto regional como evidencia local;
5. incorporar multimedia sin procedencia/condición de uso documentada;
6. agregar una interacción solo por ser técnicamente posible;
7. convertir el museo en portal turístico, agenda, blog, diario o catálogo comercial;
8. sacrificar accesibilidad, rendimiento o trazabilidad por decoración.

## Qué sí puede entrar en PL2+

- nuevas fuentes;
- nuevas piezas;
- nuevas fotografías, audios, videos y documentos con procedencia;
- testimonios con consentimiento y ficha documental;
- metadatos de derechos y licencias;
- relaciones nuevas justificadas;
- materiales educativos;
- capas de investigación;
- recursos visuales auténticos;
- compatibilidad progresiva con estándares culturales como IIIF;
- automatizaciones de control de calidad;
- mejoras de interacción que respeten el recorrido PL1.

**Principio:** PL1 es el esqueleto. PL2+ agrega patrimonio, evidencia y profundidad; no rediseña el museo cada vez que aparece una idea nueva.
