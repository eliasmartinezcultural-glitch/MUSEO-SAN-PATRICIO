import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const read = p => JSON.parse(fs.readFileSync(path.join(root, p), "utf8"));
const fail = [];
const warn = [];

const territory = read("data/territory-depth.json");
const collections = read("data/collections.json").collections ?? [];
const multimedia = read("data/multimedia.json").media ?? [];
const relationsFile = read("data/relations.json");
const expansion = read("data/source-expansion-2026-09.json");

const relations = relationsFile.relations ?? [];

const allowedStatuses = new Set([
  "EVIDENCIA_LOCAL",
  "CONTEXTO_REGIONAL",
  "FUENTE_HISTORICA",
  "FUENTE_INSTITUCIONAL",
  "MEMORIA_ORAL",
  "EN_INVESTIGACION"
]);

const allowedRelationTypes = new Set(relationsFile.relationTypes ?? []);
const records = territory.records ?? [];
const sources = territory.sources ?? [];
const pieces = territory.pieces ?? [];
const questions = territory.questions ?? [];
const layers = territory.layers ?? [];
const expansionSources = expansion.sources ?? [];
const expansionMedia = expansion.media ?? [];


function unique(items, label) {
  const seen = new Set();
  for (const id of items) {
    if (seen.has(id)) fail.push(`Duplicado ${label}: ${id}`);
    seen.add(id);
  }
  return seen;
}

const recordIds = unique(records.map(x => x.id), "record");
const sourceIds = unique(sources.map(x => x.id), "source");
const pieceIds = unique(pieces.map(x => x.id), "piece");
const layerKeys = unique(layers.map(x => x.key), "layer");

for (const r of records) {
  if (!r.id || !r.title) fail.push(`Registro incompleto: ${r.id ?? "(sin id)"}`);
  if (!allowedStatuses.has(r.status)) fail.push(`Estado documental no controlado en ${r.id}: ${r.status}`);
  if (!layerKeys.has(r.layer)) fail.push(`Capa inexistente en ${r.id}: ${r.layer}`);
  for (const sid of r.sourceIds ?? []) {
    if (!sourceIds.has(sid)) fail.push(`Fuente inexistente ${sid} referida por ${r.id}`);
  }
}

for (const p of pieces) {
  if (!recordIds.has(p.recordId)) fail.push(`Pieza ${p.id} apunta a registro inexistente: ${p.recordId}`);
}

for (const c of collections) {
  if (!c.id || !c.title) fail.push("Colección sin id o título");
  for (const rid of c.recordIds ?? []) {
    if (!recordIds.has(rid)) fail.push(`Colección ${c.id} apunta a registro inexistente: ${rid}`);
  }
}

for (const m of multimedia) {
  for (const rid of m.recordIds ?? []) {
    if (!recordIds.has(rid)) fail.push(`Multimedia ${m.id} apunta a registro inexistente: ${rid}`);
  }
  if (m.sourceId && !sourceIds.has(m.sourceId)) fail.push(`Multimedia ${m.id} apunta a fuente inexistente: ${m.sourceId}`);
  if (m.status === "FUENTE_EXTERNA" && !m.sourceUrl && !m.sourceId) {
    fail.push(`Material externo sin procedencia: ${m.id}`);
  }
}

for (const rel of relations) {
  if (!recordIds.has(rel.from)) fail.push(`Relación con origen inexistente: ${rel.from}`);
  if (!recordIds.has(rel.to)) fail.push(`Relación con destino inexistente: ${rel.to}`);
  if (!allowedRelationTypes.has(rel.type)) fail.push(`Tipo de relación no controlado: ${rel.type}`);
  if (!rel.basis) fail.push(`Relación sin fundamento: ${rel.from} -> ${rel.to}`);
}

for (const q of questions) {
  if (q.recordId && !recordIds.has(q.recordId)) fail.push(`Pregunta ${q.id} apunta a registro inexistente: ${q.recordId}`);
}

for (const s of [...sources, ...expansionSources]) {
  if (!s.id || !s.title || !s.type) fail.push(`Fuente incompleta: ${s.id ?? "(sin id)"}`);
}
for (const m of expansionMedia) {
  for (const rid of m.recordIds ?? []) {
    if (!recordIds.has(rid)) fail.push(`Multimedia PL2 ${m.id} apunta a registro inexistente: ${rid}`);
  }
  if (m.sourceId && !new Set(expansionSources.map(x=>x.id)).has(m.sourceId) && !sourceIds.has(m.sourceId)) fail.push(`Multimedia PL2 ${m.id} apunta a fuente inexistente: ${m.sourceId}`);
}
for (const s of [...sources, ...expansionSources]) {
  if (s.url && !/^https?:\/\//i.test(s.url)) warn.push(`URL no HTTP(S) en ${s.id}: ${s.url}`);
}

if (!territory.schemaVersion) warn.push("territory-depth.json no declara schemaVersion.");
if (!relationsFile.version) warn.push("relations.json no declara version.");

console.log(`Museo 3.20 — validación: ${records.length} registros, ${pieces.length} piezas, ${sources.length + expansionSources.length} fuentes internas, ${collections.length} colecciones, ${relations.length} relaciones, ${multimedia.length + expansionMedia.length} objetos multimedia.`);

if (warn.length) {
  console.log("\nADVERTENCIAS:");
  for (const x of warn) console.log("- " + x);
}

if (fail.length) {
  console.error("\nERRORES:");
  for (const x of fail) console.error("- " + x);
  process.exit(1);
}

console.log("\nOK — integridad estructural PL1 verificada.");
