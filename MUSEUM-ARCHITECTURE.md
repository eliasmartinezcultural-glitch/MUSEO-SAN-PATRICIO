# Museo San Patricio del Chañar — Arquitectura bloqueada 0.0.1

## Propósito

Este repositorio no se construye como una página informativa común. Es un museo digital del territorio de San Patricio del Chañar y su entorno histórico, con profundidad de investigación y una experiencia pública simple.

Regla central: MUCHA PROFUNDIDAD DE FONDO → POCA FRICCIÓN EN LA EXPERIENCIA.

## Arquitectura conceptual bloqueada

CONTENIDO → DATOS → MOTOR → EXPERIENCIA

1. Contenido: evidencia, fotografías, documentos, objetos, mapas, testimonios, personas, lugares, acontecimientos y colecciones.
2. Datos: registros estructurados y relaciones entre entidades.
3. Motor: búsqueda, filtros, navegación, fichas, recorridos, conexiones, estados de evidencia y carga de contenidos.
4. Experiencia: interfaz visual, narrativa, interacción y aprendizaje.

Nunca invertir este orden para rellenar la interfaz con información inventada.

## Profundidad histórica

El museo no comienza en 1973.

1. Tiempo profundo
2. Paleontología
3. Primeras presencias humanas
4. Pueblos originarios
5. Territorio histórico
6. Transformaciones productivas e irrigación
7. Nacimiento de la localidad
8. Historia viva y memoria

La relación geográfica debe quedar explícita. El contexto regional no se presenta como evidencia local.

## Unidad de conocimiento

La unidad fundamental es la PIEZA. Puede ser fotografía, documento, objeto, mapa, persona, lugar, edificio, institución, acontecimiento, testimonio, audio, video, publicación o colección.

Cada pieza deberá poder crecer posteriormente sin romper el motor.

## Evidencia

Estados permitidos: EVIDENCIA_LOCAL, CONTEXTO_REGIONAL, FUENTE_HISTORICA, MEMORIA_ORAL, EN_INVESTIGACION, IDENTIFICACION_PENDIENTE.

La memoria oral y la investigación abierta son parte del museo, pero no deben confundirse con hechos documentados.

## Experiencia pública

Priorizar descubrir antes que leer grandes bloques; imágenes y objetos antes que párrafos; una decisión por pantalla; fichas progresivas; recorridos cortos; conexiones visibles; búsqueda sencilla; aprendizaje por capas; acceso fácil desde celular.

La profundidad se guarda en las fichas, relaciones, fuentes y capas secundarias; no se obliga al visitante a verla toda de entrada.

## Regla de evolución

NO rehacer el motor por cada nuevo diseño. NO duplicar datos dentro de HTML. NO inventar fotografías, documentos o patrimonio. NO convertir contexto regional en evidencia local. NO llenar pantallas con texto para aparentar profundidad.

SÍ agregar entidades y relaciones, fuentes, piezas visuales reales, componentes reutilizables, recorridos, accesibilidad y navegación, conservando compatibilidad.

## Hoja de ruta

0.0.1 Fundación: territorio profundo + primera experiencia visual.
0.1 Motor de piezas: fichas museológicas, entidades y relaciones.
0.2 Colecciones: agrupaciones temáticas y recorridos.
0.3 Tiempo: línea temporal navegable y escalas históricas.
0.4 Territorio: mapa narrativo y lugares.
0.5 Personas e instituciones.
0.6 Memorias: testimonios y memoria oral diferenciada.
0.7 Archivo visual: fotografías, documentos, mapas y objetos.
0.8 Conexiones: grafo narrativo entre piezas.
0.9 Investigación: fuentes, preguntas abiertas y herramientas para profundizar.
1.0 Museo: sistema integrado y estable.

## Criterio de diseño

La interfaz puede ser sencilla. El sistema no.

El objetivo es que una persona pueda usar el museo sin instrucciones, mientras que detrás exista una arquitectura capaz de sostener cientos o miles de piezas sin rehacer la experiencia.

## Estado

Esta arquitectura queda bloqueada como base de evolución. Los cambios futuros deben ampliar o mejorar esta estructura; no reemplazarla silenciosamente.
