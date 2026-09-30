# Estándar profesional del Museo Virtual de San Patricio del Chañar

## Estado
LOCKED · 0.3.0 · 30/09/2026

Este documento congela la arquitectura conceptual, documental y funcional del museo. Las futuras versiones pueden agregar contenido y capacidades, pero no romper estas reglas sin una nueva revisión arquitectónica.

## Principio rector
El museo no es una página histórica. Es un sistema público de documentación, investigación, interpretación y acceso al patrimonio material e inmaterial del territorio.

La estructura se apoya en buenas prácticas museológicas: documentación como recurso vivo, procedencia, evidencia, investigación, conservación digital, interpretación, accesibilidad y participación comunitaria. ICOM considera la documentación una actividad estratégica que conecta investigación, colecciones, interpretación, educación, conservación, acceso y gestión. cite-source:ICOM-DOCUMENTATION

## Arquitectura congelada
CONTENIDO → DATOS → DOCUMENTACIÓN → RELACIONES → MOTOR → EXPERIENCIA

Nunca: HTML → texto suelto → diseño.

## Entidades nucleares
- PIEZA: unidad principal de conocimiento.
- OBJETO: cosa física o digital documentada.
- DOCUMENTO: fuente escrita, administrativa, cartográfica o impresa.
- IMAGEN: fotografía, escaneo, mapa, ilustración o reproducción autorizada.
- AUDIO: entrevista, ambiente, registro oral o documento sonoro.
- VIDEO: registro audiovisual.
- PERSONA: individuo documentado.
- FAMILIA: grupo familiar cuando sea pertinente y ético.
- LUGAR: sitio, paraje, edificio, infraestructura, paisaje o área.
- INSTITUCIÓN: organismo, escuela, club, empresa, asociación, comunidad, etc.
- EVENTO: acontecimiento fechado o acotado.
- COLECCIÓN: agrupación curatorial.
- FUENTE: origen de la información.
- TESTIMONIO: memoria oral identificada y contextualizada.
- INVESTIGACIÓN: pregunta abierta, hipótesis o expediente de trabajo.
- RELACIÓN: vínculo explícito entre entidades.
- VERSIÓN: historial de cambios de un registro.

## Estados de evidencia
EVIDENCIA_LOCAL · FUENTE_HISTORICA · CONTEXTO_REGIONAL · MEMORIA_ORAL · FUENTE_INSTITUCIONAL · EN_INVESTIGACION · IDENTIFICACION_PENDIENTE · DISPUTADO · NO_VERIFICADO

Nunca convertir CONTEXTO_REGIONAL en EVIDENCIA_LOCAL.

## Ciclo de una pieza
1. Descubierta.
2. Registrada.
3. Identificada.
4. Verificada.
5. Contextualizada.
6. Relacionada.
7. Interpretada.
8. Publicada.
9. Revisada.
10. Conservada digitalmente.

## Ficha mínima obligatoria
ID · título · tipo · descripción · fecha/período · lugar · procedencia · autor/creador si aplica · fuente · estado de evidencia · derechos · relaciones · colección · estado editorial · última revisión.

## Multimedia obligatorio
Cada archivo debe poder registrar: ID · tipo · título · creador · fecha · lugar · descripción · procedencia · archivo/origen · calidad · derechos/licencia · crédito · pieza vinculada · checksum cuando exista · fecha de incorporación.

No se publica una imagen ajena simplemente porque esté disponible en Internet. La existencia de un objeto en una colección tampoco implica automáticamente propiedad del copyright. cite-source:Europeana-Copyright

## Derechos
Estados previstos: DERECHOS_RESERVADOS · DOMINIO_PUBLICO · CC0 · CC_BY · CC_BY_SA · USO_AUTORIZADO · SOLO_ENLACE · DERECHOS_DESCONOCIDOS · NO_PUBLICAR.

## Fuentes
Toda afirmación histórica importante debe poder rastrearse a una fuente o quedar marcada como memoria, contexto o investigación pendiente.

## Experiencias públicas congeladas
DESCUBRIR · TIEMPO · TERRITORIO · COLECCIONES · ARCHIVO · PERSONAS · LUGARES · INVESTIGAR.

## Reglas UX
- Una pieza se entiende antes de pedirle trabajo al visitante.
- La profundidad aparece progresivamente.
- Nunca saturar la pantalla inicial.
- Toda pieza puede responder: qué es, cuándo, dónde, por qué importa y de dónde sale.
- El visitante puede seguir conexiones sin perder su posición.
- Mobile-first.
- Accesible por teclado.
- Contraste suficiente.
- Texto alternativo para imágenes.
- Audio/video con información equivalente cuando sea posible.

## Qué queda prohibido
- Fotografías históricas inventadas.
- Coordenadas inventadas.
- Testimonios inventados.
- Citas inventadas.
- Fechas rellenadas por intuición.
- Confundir tradición oral con hecho probado.
- Presentar una fuente secundaria como evidencia primaria.
- Sobrecargar la interfaz para demostrar complejidad.

## Evolución
La complejidad se agrega detrás del museo; la experiencia pública se mantiene clara.

## Referencias metodológicas
ICOM: normas y directrices profesionales. ICOM define el museo como institución que investiga, conserva, interpreta y exhibe patrimonio material e inmaterial con participación comunitaria. cite-source:ICOM-Standards
Europeana Publishing Framework: calidad de contenido, metadatos, enlaces y derechos como dimensiones de publicación digital cultural. cite-source:Europeana-Publishing-Framework
