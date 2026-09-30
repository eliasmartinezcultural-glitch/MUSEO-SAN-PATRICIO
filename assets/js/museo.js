/* Museo Virtual · motor unificado 0.6.0
   0.4 fichas + búsqueda + relaciones
   0.5 exposiciones + capas narrativas + fuentes
   0.6 integra todo como una sola experiencia
*/
import {museum,getDoor,allPieces,findPiece,relatedTo,sourcesFor,getSource} from "./data.js";
import {deepData} from "./deep-data.js";

museum.meta.version="0.6.0";
museum.meta.status="active-museum";
museum.sources=[...(museum.sources||[])];
for(const source of deepData.sourceAdditions||[]){
  if(!museum.sources.some(s=>s.id===source.id)) museum.sources.push(source);
}
museum.galleries=deepData.galleries||[];
museum.lenses=deepData.lenses||[];

const state={view:"home",door:null,piece:null,gallery:0,lens:null,history:[],query:""};
const app=document.querySelector("#app");

const esc=v=>String(v??"").replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const typeLabel=t=>({event:"Acontecimiento",person:"Persona",place:"Lugar",institution:"Institución",object:"Objeto",document:"Documento",photograph:"Fotografía",audio:"Audio",video:"Video",testimony:"Testimonio",period:"Período"}[t]||t||"Registro");
const sourceById=id=>museum.sources.find(s=>s.id===id)||null;
const peopleFor=p=>(p.personIds||[]).map(findPiece).filter(Boolean);
const placesFor=p=>(p.placeIds||[]).map(findPiece).filter(Boolean);
const institutionsFor=p=>(p.institutionIds||[]).map(findPiece).filter(Boolean);
const statusLabel=p=>p.verification==="verified"?"Verificado":p.verification==="partial"?"En revisión":p.verification==="testimony"?"Testimonio":"Documentado";

function shell(content){
 return '<div class="shell"><header class="top"><a class="brand" href="#" data-action="home"><span class="brand-mark">✦</span><span><small>MUSEO VIRTUAL · 0.6</small><strong>San Patricio del Chañar</strong></span></a><nav class="top-nav"><button class="top-link" data-action="gallery">Exposiciones</button><button class="top-link" data-action="search">Buscar</button><button class="top-link" data-action="journey">Recorridos</button></nav></header><main>'+content+'</main><footer class="footer"><strong>Museo Virtual de San Patricio del Chañar</strong><br>Construcción de Elías Martínez / Ocarina Producciones · '+esc(museum.meta.version)+'<span class="footer-note">Patrimonio documentado, memoria y territorio.</span></footer></div>';
}
function imageBox(label){
 return '<div class="piece-placeholder"><span>✦</span><small>'+esc(label||"REGISTRO")+'</small><em>IMAGEN / OBJETO</em></div>';
}
function pieceCard(p){
 return '<button class="piece-card" data-action="piece" data-id="'+esc(p.id)+'">'+imageBox(typeLabel(p.type))+'<div class="piece-card-copy"><span class="piece-type">'+esc(typeLabel(p.type))+'</span><h3>'+esc(p.title)+'</h3><p>'+esc(p.shortDescription)+'</p>'+(p.dateLabel?'<span class="card-date">'+esc(p.dateLabel)+'</span>':"")+'</div><span class="piece-arrow">↗</span></button>';
}
function navBack(label="Volver"){return '<button class="back" data-action="back">← '+label+'</button>';}

function renderHome(){
 const events=museum.events.slice(0,4);
 const galleries=museum.galleries.slice(0,3);
 app.innerHTML=shell(
 '<section class="hero"><div class="hero-inner"><p class="eyebrow">TERRITORIO · HISTORIA · PERSONAS · MEMORIA</p><h1>San Patricio del Chañar, <em>pieza por pieza.</em></h1><p class="hero-lead">Un museo digital para recorrer la historia local a través de documentos, lugares, personas, objetos y memorias. La colección crece sin perder de vista de dónde sale cada dato.</p><div class="hero-actions"><a class="btn" href="#puertas" data-action="scroll">Entrar al museo →</a><button class="text-btn" data-action="gallery">Abrir exposiciones</button><button class="text-btn" data-action="journey">Hacer un recorrido</button></div><div class="museum-stats"><div><strong>'+allPieces().length+'</strong><span>registros</span></div><div><strong>'+museum.sources.length+'</strong><span>fuentes</span></div><div><strong>'+museum.galleries.length+'</strong><span>exposiciones</span></div><div><strong>'+museum.journeys.length+'</strong><span>recorridos</span></div></div></div></section>'+
 '<section class="section" id="puertas"><div class="section-head"><div><p class="eyebrow">EXPLORAR</p><h2>Elegí una puerta.</h2></div><p>La misma colección puede recorrerse por tiempo, personas y lugares, o piezas y documentos.</p></div><div class="doors">'+museum.doors.map((d,i)=>'<button class="door" data-action="door" data-id="'+d.id+'"><span class="door-number">0'+(i+1)+'</span><span><h3>'+esc(d.label)+'</h3><p>'+esc(d.description)+'</p></span><span class="door-arrow">↗</span></button>').join("")+'</div></section>'+
 '<section class="section feature-section"><div class="section-head"><div><p class="eyebrow">EXPOSICIONES</p><h2>Historias para entrar.</h2></div><p>Salas narrativas construidas con fuentes identificadas. No son una cronología cerrada: son puntos de entrada.</p></div><div class="exhibition-preview">'+galleries.map((g,i)=>'<button class="exhibition-card" data-action="gallery" data-gallery="'+i+'"><span>'+esc(g.kicker)+'</span><h3>'+esc(g.title)+'</h3><p>'+esc(g.intro)+'</p><b>Entrar a la sala →</b></button>').join("")+'</div></section>'+
 '<section class="section feature-section"><div class="section-head"><div><p class="eyebrow">LÍNEA DE TIEMPO</p><h2>Algunos hitos.</h2></div><p>Una selección inicial para abrir la colección.</p></div><div class="timeline-strip">'+events.map(p=>'<button data-action="piece" data-id="'+p.id+'" class="timeline-card"><span>'+esc(p.dateLabel)+'</span><strong>'+esc(p.title)+'</strong><small>Ver ficha →</small></button>').join("")+'</div></section>'+
 '<section class="section principles"><div class="principle"><span>01</span><h3>Fuente antes que apariencia</h3><p>Cada afirmación relevante queda vinculada a una fuente identificada.</p></div><div class="principle"><span>02</span><h3>Dato, memoria y contexto</h3><p>Los testimonios y recuerdos tendrán tratamiento propio, sin mezclarlos silenciosamente con documentación.</p></div><div class="principle"><span>03</span><h3>Todo se conecta</h3><p>Fechas, personas, lugares, documentos y objetos forman una red navegable.</p></div></section>'
 );
}

function renderDoor(){
 const d=getDoor(state.door);
 let a=d&&d.kind==="history"?museum.periods.concat(museum.events):d&&d.kind==="people-places"?museum.people.concat(museum.places,museum.institutions):museum.objects.concat(museum.documents,museum.photographs,museum.audios,museum.videos,museum.testimonies);
 app.innerHTML=shell('<section class="section inner-view">'+navBack()+'<p class="eyebrow">PUERTA · '+esc(d?d.label:"MUSEO")+'</p><h1 class="page-title">'+esc(d?d.label:"Museo")+'</h1><p class="hero-lead">'+esc(d?d.description:"")+'</p><div class="door-tools"><span class="collection-count">'+a.length+' registros en esta puerta</span><button class="filter" data-action="search">Buscar en el museo</button></div><div class="piece-grid">'+(a.length?a.map(pieceCard).join(""):'<div class="empty-state"><h2>Esta sala todavía está reuniendo piezas.</h2><p>Cuando llegue patrimonio real, cada registro podrá entrar aquí con contexto y fuente.</p></div>')+'</div></section>');
}

function renderPiece(){
 const p=findPiece(state.piece); if(!p){renderHome();return;}
 const s=sourcesFor(p), rels=relatedTo(p.id), r=rels.map(x=>findPiece(x.fromId===p.id?x.toId:x.fromId)).filter(Boolean);
 const places=placesFor(p), people=peopleFor(p), inst=institutionsFor(p);
 const sources=s.map(x=>'<a class="source" href="'+esc(x.url)+'" target="_blank" rel="noopener"><span>'+esc(x.type||"FUENTE")+'</span><div><strong>'+esc(x.title)+'</strong><small>'+esc(x.author||"Autor no consignado")+' · '+esc(x.date||"s/f")+'</small><p>'+esc(x.citation||"Fuente identificada para este registro.")+'</p></div><b>Consultar ↗</b></a>').join("");
 const where=places.length?places.map(x=>esc(x.title)).join(" · "):"Aún no documentado";
 const who=[...people,...inst].map(x=>esc(x.title)).join(" · ")||"Aún no documentado";
 app.innerHTML=shell('<section class="section piece-view">'+navBack()+'<div class="piece-layout"><div>'+imageBox(typeLabel(p.type).toUpperCase())+'<div class="record-status"><span class="status-dot"></span>'+esc(statusLabel(p))+'</div></div><article class="piece-main"><p class="eyebrow">FICHA MUSEOLÓGICA · '+esc(typeLabel(p.type))+'</p><h1 class="piece-title">'+esc(p.title)+'</h1><p class="piece-lead">'+esc(p.shortDescription)+'</p><div class="piece-meta"><div><span>CUÁNDO</span><strong>'+esc(p.dateLabel||p.date?.label||"Sin fecha establecida")+'</strong></div><div><span>DÓNDE</span><strong>'+where+'</strong></div><div><span>QUIÉNES</span><strong>'+who+'</strong></div></div><section class="piece-section"><h2>La historia</h2><p>'+esc(p.description||p.shortDescription)+'</p></section>'+(sources?'<section class="piece-section"><h2>Fuentes</h2><div class="sources">'+sources+'</div></section>':'<section class="piece-section"><h2>Fuentes</h2><div class="empty-state compact"><p>Este registro todavía necesita documentación vinculada.</p></div></section>')+(r.length?'<section class="piece-section"><h2>Relacionado</h2><div class="related-list">'+r.map(pieceCard).join("")+'</div></section>':'')+'</article></div></section>');
}

function renderSearch(){
 const q=state.query.trim().toLowerCase();
 const a=allPieces().filter(p=>!q||[p.title,p.shortDescription,p.description,p.type,p.dateLabel,...(p.tags||[])].join(" ").toLowerCase().includes(q));
 app.innerHTML=shell('<section class="section inner-view">'+navBack()+'<p class="eyebrow">EXPLORADOR</p><h1 class="page-title">Buscar.</h1><div class="search-box"><input id="searchInput" value="'+esc(state.query)+'" placeholder="1973, río, club, documento..."><span>'+a.length+' registros</span></div><div class="piece-grid">'+(a.map(pieceCard).join("")||'<div class="empty-state"><h2>No encontramos ese registro.</h2><p>Probá con otra palabra, una institución o un año.</p></div>')+'</div></section>');
 setTimeout(()=>{const i=document.querySelector("#searchInput");if(i){i.focus();i.setSelectionRange(i.value.length,i.value.length);i.addEventListener("input",e=>{state.query=e.target.value;renderSearch()})}},0);
}

function renderJourney(){
 const j=museum.journeys[0]||{title:"Recorrido",description:"",eventIds:[]};
 const e=(j.eventIds||[]).map(findPiece).filter(Boolean);
 app.innerHTML=shell('<section class="section inner-view">'+navBack()+'<p class="eyebrow">RECORRIDO · '+esc(j.id)+'</p><h1 class="page-title">'+esc(j.title)+'</h1><p class="hero-lead">'+esc(j.description)+'</p><div class="journey-line">'+e.map((p,i)=>'<button class="journey-step" data-action="piece" data-id="'+p.id+'"><span>0'+(i+1)+'</span><div><small>'+esc(p.dateLabel)+'</small><h2>'+esc(p.title)+'</h2><p>'+esc(p.shortDescription)+'</p></div><b>→</b></button>').join("")+'</div></section>');
}

function renderGallery(){
 if(!museum.galleries.length){renderHome();return;}
 const g=museum.galleries[state.gallery]||museum.galleries[0];
 const prev=(state.gallery-1+museum.galleries.length)%museum.galleries.length;
 const next=(state.gallery+1)%museum.galleries.length;
 const chapter=c=>'<button class="chapter" data-action="source" data-sourceids="'+esc((c.sourceIds||[]).join(","))+'"><span>'+esc(c.year)+'</span><div><small>CAPÍTULO</small><h2>'+esc(c.title)+'</h2><p>'+esc(c.text)+'</p><div class="chapter-source">'+(c.sourceIds||[]).map(id=>{const s=sourceById(id);return s?'<span>Fuente: '+esc(s.title)+'</span>':''}).join("")+'</div></div><b>Consultar ↗</b></button>';
 const index='<div class="gallery-index">'+museum.galleries.map((x,i)=>'<button class="'+(i===state.gallery?"active":"")+'" data-action="gallery" data-gallery="'+i+'"><span>0'+(i+1)+'</span><strong>'+esc(x.title)+'</strong><small>'+esc(x.kicker)+'</small></button>').join("")+'</div>';
 const lenses=museum.lenses.map(l=>'<button class="lens '+(state.lens===l.id?"active":"")+'" data-action="lens" data-lens="'+esc(l.id)+'"><span>✦</span><h3>'+esc(l.title)+'</h3><p>'+esc(l.text)+'</p></button>').join("");
 app.innerHTML=shell('<section class="section inner-view gallery-view">'+navBack()+'<div class="gallery-head"><div><p class="eyebrow">EXPOSICIÓN '+(state.gallery+1)+' / '+museum.galleries.length+' · '+esc(g.kicker)+'</p><h1 class="page-title">'+esc(g.title)+'</h1><p class="hero-lead">'+esc(g.intro)+'</p></div><div class="gallery-nav"><button data-action="gallery" data-gallery="'+prev+'">← Anterior</button><button data-action="gallery" data-gallery="'+next+'">Siguiente →</button></div></div>'+index+'<div class="gallery-chapters">'+g.chapters.map(chapter).join("")+'</div><div class="gallery-next"><p class="eyebrow">OTRAS MIRADAS</p><div class="lens-grid">'+lenses+'</div></div></section>');
}

function renderLens(){
 const l=museum.lenses.find(x=>x.id===state.lens); if(!l){state.view="gallery";renderGallery();return;}
 let pieces=(l.eventIds||[]).map(findPiece).filter(Boolean);
 pieces=pieces.concat((l.placeIds||[]).map(findPiece).filter(Boolean));
 app.innerHTML=shell('<section class="section inner-view">'+navBack()+'<p class="eyebrow">LENTE NARRATIVA</p><h1 class="page-title">'+esc(l.title)+'</h1><p class="hero-lead">'+esc(l.text)+'</p><div class="piece-grid">'+(pieces.length?pieces.map(pieceCard).join(""):'<div class="empty-state"><p>Esta mirada todavía está reuniendo registros.</p></div>')+'</div></section>');
}

function renderAbout(){
 app.innerHTML=shell('<section class="section inner-view about-view">'+navBack()+'<p class="eyebrow">SOBRE EL MUSEO</p><h1 class="page-title">Una colección viva.</h1><div class="about-grid"><div><p class="hero-lead">El museo separa colección, fuentes y experiencia para poder crecer sin perder trazabilidad.</p><p>Cada pieza puede incorporar fecha, lugar, personas, instituciones, medios, derechos, procedencia, estado de verificación y relaciones. La interfaz pública sigue siendo simple; la estructura interna es la que sostiene el crecimiento.</p></div><div class="about-facts"><strong>'+allPieces().length+'</strong><span>registros</span><strong>'+museum.sources.length+'</strong><span>fuentes identificadas</span><strong>'+museum.galleries.length+'</strong><span>exposiciones</span><strong>'+museum.journeys.length+'</strong><span>recorridos</span></div></div></section>');
}

function render(){if(state.view==="home")renderHome();else if(state.view==="door")renderDoor();else if(state.view==="piece")renderPiece();else if(state.view==="search")renderSearch();else if(state.view==="journey")renderJourney();else if(state.view==="gallery")renderGallery();else if(state.view==="lens")renderLens();else renderAbout();scrollTo(0,0);}

document.addEventListener("click",e=>{
 const t=e.target.closest("[data-action]"); if(!t)return;
 const a=t.dataset.action;
 if(a==="home"){state.history=[];state.view="home";render();}
 else if(a==="door"){state.history.push(state.view);state.door=t.dataset.id;state.view="door";render();}
 else if(a==="piece"){state.history.push(state.view);state.piece=t.dataset.id;state.view="piece";render();}
 else if(a==="back"){state.view=state.history.pop()||"home";render();}
 else if(a==="search"){state.history.push(state.view);state.view="search";render();}
 else if(a==="journey"){state.history.push(state.view);state.view="journey";render();}
 else if(a==="gallery"){state.history.push(state.view);if(t.dataset.gallery!==undefined)state.gallery=Number(t.dataset.gallery);state.view="gallery";render();}
 else if(a==="lens"){state.history.push(state.view);state.lens=t.dataset.lens;state.view="lens";render();}
 else if(a==="source"){const id=(t.dataset.sourceids||"").split(",").find(Boolean);const s=sourceById(id);if(s?.url)window.open(s.url,"_blank","noopener");}
 else if(a==="about"){state.history.push(state.view);state.view="about";render();}
 else if(a==="scroll"){setTimeout(()=>document.querySelector("#puertas")?.scrollIntoView({behavior:"smooth"}),0);}
});
render();
