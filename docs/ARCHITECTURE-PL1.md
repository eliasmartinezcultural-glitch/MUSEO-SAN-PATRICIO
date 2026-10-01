# Arquitectura PL1 — Museo Digital de San Patricio del Chañar

## Principio

**Interfaz simple / sistema profundo.**

El visitante debe tomar pocas decisiones. El sistema interno sostiene datos estructurados, estados documentales, relaciones, fuentes, colecciones y resiliencia.

## Capas

### A. Presentación

HTML semántico + CSS responsive + JavaScript modular.

### B. Experiencia

Puertas de descubrimiento:

- pieza sorpresa;
- evidencia local;
- viaje temporal;
- investigación.

### C. Fondo documental

`territory-depth.json` concentra registros, capas, fuentes, piezas, lugares y preguntas.

### D. Relaciones

`relations.json` mantiene vínculos explícitos y su fundamento.

### E. Colecciones

`collections.json` agrupa registros sin duplicar la fuente de verdad.

### F. Multimedia

`multimedia.json` separa material externo disponible de búsquedas abiertas.

### G. Resiliencia

PWA + Service Worker.

### H. Control de calidad

PL2 incorpora validación automática de integridad sin alterar el funcionamiento público.

## Estándares de referencia

La arquitectura se orienta por la definición de museo de ICOM 2022, las recomendaciones UNESCO sobre museos, colecciones, accesibilidad, investigación y tecnologías, WCAG 2.2 y, progresivamente, estándares de interoperabilidad cultural como IIIF.

Estas referencias orientan el diseño; el proyecto no debe presentarse como acreditado por ninguna de esas organizaciones.

## Regla de interoperabilidad

No se incorpora una tecnología cultural solo por prestigio. Se adopta cuando resuelve una necesidad real de preservación, metadatos, intercambio, consulta o investigación.

## Regla multidispositivo

El contenido debe seguir siendo comprensible:

- con pantalla pequeña;
- con pantalla grande;
- con teclado;
- con movimiento reducido;
- con conectividad irregular;
- sin depender de una animación para transmitir significado.

## Regla de fallo

Cuando un dato no puede cargarse, el sistema debe comunicar el problema sin inventar contenido.

## Regla de conservación digital

El sitio público es una capa de acceso. No debe confundirse con el único respaldo del patrimonio. Los originales, permisos y metadatos de procedencia deben conservarse fuera de la interfaz pública con una estrategia de respaldo independiente.
