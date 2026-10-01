const state={data:null,collections:null,multimedia:null,threads:null,currentSources:[]};
const $=s=>document.querySelector(s);
const esc=s=>String(s??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]));
const visual=(kind,label='ARCHIVO')=>'<div class="piece-visual visual-'+esc(kind||'archive')+'"><span class="visual-label">'+esc(label)+'</span></div>';
const recordById=id=>state.data?.records?.find(r=>r.id===id);
function openRecord(id){const r=recordById(id);if(r)openRecordData(r)}
function openRecordData(r){
 const l=state.data.layers.find(x=>x.key===r.layer);
 $('#modalVisual').className='modal-visual visual-'+esc(r.visual||'archive');
 $('#modalVisual').innerHTML='<span class="visual-label">'+esc(l?.title||'PIEZA')+'</span>';
 $('#modalKicker').textContent=(l?('CAPA '+String(l.order).padStart(2,'0')+' · '):'')+r.status.replaceAll('_',' ');
 $('#modalTitle').textContent=r.title;
 $('#modalPeriod').textContent=r.period||'Período en investigación';
 $('#modalEvidence').textContent=r.evidence||'Sin descripción breve.';
 $('#modalStatus').textContent=r.status.replaceAll('_',' ');
 $('#modalRelation').textContent=r.relation.replaceAll('_',' ');
 $('#modalNotes').textContent=r.notes||'Sin nota adicional.';
 const sources=(r.sourceIds||[]).map(id=>state.data.sources?.find(s=>s.id===id)).filter(Boolean);
 $('#modalSource').innerHTML=sources.length?'<b>Documentación</b><div class="source-chips">'+sources.map(s=>'<button class="source-chip" data-source-id="'+esc(s.id)+'">'+esc(s.title)+'</button>').join('')+'</div>':'Fuente específica pendiente de incorporación.';
 state.currentSources=sources;
 const related=state.data.records.filter(x=>x.id!==r.id&&(x.layer===r.layer||(r.sourceIds||[]).some(id=>(x.sourceIds||[]).includes(id)))).slice(0,4);
 $('#modalRelated').innerHTML=related.length?'También podés explorar: '+related.map(x=>'<button class="related-btn" data-record="'+esc(x.id)+'">'+esc(x.title)+'</button>').join(' '):'';
 $('#detailModal').classList.add('open');$('#detailModal').setAttribute('aria-hidden','false');
}
function render(){
 const d=state.data;
 const pieces=d.pieces||[];
 const records=d.records||[];
 const ps=document.querySelector('#pieceGrid');
 if(ps){
  ps.innerHTML=pieces.map(p=>{
   const r=recordById(p.recordId);
   return '<article class="piece" data-record="'+esc(p.recordId)+'">'+visual(p.visual,p.label)+'<div class="piece-body"><span class="piece-label">'+esc(p.label||'PIEZA')+'</span><h3>'+esc(p.title||r?.title||'Sin título')+'</h3><p>'+esc(r?.evidence||'')+'</p><div class="piece-meta"><span>'+esc(String(r?.status||'').replaceAll('_',' '))+'</span><span>'+esc(String(r?.relation||'').replaceAll('_',' '))+'</span></div><span class="piece-more">Abrir pieza →</span></div></article>';
  }).join('');
 }
 const stat=document.querySelector('#pieceStat'); if(stat)stat.textContent=pieces.length||records.length;
 const cs=document.querySelector('#collectionStat'); if(cs)cs.textContent=(state.collections?.collections||[]).length;
 const ms=document.querySelector('#mediaStat'); if(ms)ms.textContent=(state.multimedia?.media||[]).length;
 renderCollections();
 renderMultimedia();
}

function renderCollections(){
 const cs=state.collections?.collections||[];
 $('#collectionGrid').innerHTML=cs.map((c,i)=>'<button class="collection-card" data-collection="'+esc(c.id)+'"><div><span class="collection-number">COLECCIÓN '+String(i+1).padStart(2,'0')+' · '+esc(c.kind)+'</span><h3>'+esc(c.title)+'</h3><p>'+esc(c.description)+'</p></div><div class="collection-meta"><span>'+esc(c.subtitle)+'</span><span>'+c.recordIds.length+' piezas vinculadas</span></div></button>').join('');
}
function mediaIcon(type){const m={'pagina-con-audio':'◉','documento-pdf':'▤','pagina-historica':'◌','pagina-paleontologia':'✦','archivo-fotografico-pendiente':'▧','archivo-oral-pendiente':'◉','archivo-afiches-pendiente':'▤','cartografia-pendiente':'⌖'};return m[type]||'□'}
function filterCollection(id){
 const c=(state.collections?.collections||[]).find(x=>x.id===id); if(!c)return;
 const ids=new Set(c.recordIds||[]);
 const ps=state.data.pieces||[];
 const subset=ps.filter(p=>ids.has(p.recordId));
 const grid=$('#pieceGrid'); if(!grid)return;
 grid.innerHTML=subset.map(p=>{const r=recordById(p.recordId);return '<article class="piece" data-record="'+esc(p.recordId)+'">'+visual(p.visual,p.label)+'<div class="piece-body"><span class="piece-label">'+esc(p.label||'PIEZA')+'</span><h3>'+esc(p.title||r?.title||'Sin título')+'</h3><p>'+esc(r?.evidence||'')+'</p><div class="piece-meta"><span>'+esc(String(r?.status||'').replaceAll('_',' '))+'</span><span>'+esc(String(r?.relation||'').replaceAll('_',' '))+'</span></div><span class="piece-more">Abrir pieza →</span></div></article>'}).join('');
 $('#catalogTitle').textContent=c.title;
 $('#catalogStatus').textContent=c.description+' · '+subset.length+' piezas vinculadas.';
 $('#piezas')?.scrollIntoView({behavior:'smooth'});
}
function renderMultimedia(){
 const ms=state.multimedia?.media||[];
 $('#mediaGrid').innerHTML=ms.map(m=>'<article class="media-card"><div><div class="media-icon">'+mediaIcon(m.type)+'</div><span class="media-type">'+esc(m.type.replaceAll('-',' '))+'</span><h3>'+esc(m.title)+'</h3><p>'+esc(m.description)+'</p></div><div><div class="media-status">'+esc(m.status.replaceAll('_',' '))+(m.date?' · '+esc(m.date):'')+'</div>'+(m.sourceUrl?'<a href="'+esc(m.sourceUrl)+'" target="_blank" rel="noopener">Abrir material / fuente ↗</a>':'<span class="media-status">Material pendiente de localizar</span>')+'</div></article>').join('');
}
function renderThreads(){
 const ts=state.threads?.threads||[];
 $('#threadGrid').innerHTML=ts.map(t=>'<article class="thread-card"><div><span class="thread-priority">PRIORIDAD '+esc(t.priority)+'</span><h3>'+esc(t.title)+'</h3><p>Registros vinculados: '+esc(t.recordIds.join(', '))+'</p><div class="thread-needs">'+t.needs.map(n=>'<span>'+esc(n)+'</span>').join('')+'</div></div></article>').join('');
}
function bind(){
 document.addEventListener('click',e=>{
   const close=e.target.closest('[data-close]');if(close){close.closest('.modal')?.classList.remove('open');document.body.classList.remove('modal-open');return}
   const col=e.target.closest('[data-collection]');if(col){filterCollection(col.dataset.collection);return}
   const source=e.target.closest('[data-source-id]');if(source){openSource(source.dataset.sourceId);return} if(e.target.closest('[data-source-open]')){openSource(state.currentSources[0]?.id);return} const rec=e.target.closest('[data-record]');if(rec){openRecord(rec.dataset.record);return}
   const layer=e.target.closest('[data-layer]');if(layer){const r=state.data.records.find(x=>x.layer===layer.dataset.layer);if(r)openRecordData(r);return}
   const mode=e.target.closest('[data-mode]');if(mode){document.querySelector('#pieceGrid')?.scrollIntoView({behavior:'smooth'});toast('Recorrido: '+mode.querySelector('b').textContent);return}
   if(e.target===$('#detailModal'))$('#detailModal').classList.remove('open');
   if(e.target===$('#introModal'))$('#introModal').classList.remove('open');
   if(e.target.closest('#openIntro'))$('#introModal').classList.add('open');
   if(e.target.closest('#showAllPieces'))document.querySelector('.featured').scrollIntoView({behavior:'smooth'});
 });
 $('#openSearch').onclick=()=>{$('#searchPanel').classList.add('open');$('#searchPanel').setAttribute('aria-hidden','false');setTimeout(()=>$('#searchInput').focus(),100)};
 $('#closeSearch').onclick=()=>$('#searchPanel').classList.remove('open');
 $('#searchInput').oninput=e=>{
   const q=e.target.value.trim().toLowerCase(),records=state.data.records||[];
   const matches=q?records.filter(r=>(r.title+' '+r.evidence+' '+r.notes+' '+r.layer+' '+r.period+' '+r.status).toLowerCase().includes(q)):[];
   $('#searchResults').innerHTML=matches.map(r=>'<div class="result" data-record="'+esc(r.id)+'"><small>'+esc(r.status)+'</small><b>'+esc(r.title)+'</b><span>'+esc(r.evidence.slice(0,145))+'…</span></div>').join('')||(q?'<p style="color:#777;margin-top:30px">Todavía no hay una pieza con esa palabra. Puede convertirse en una pregunta de investigación.</p>':'<p style="color:#777;margin-top:30px">Probá con “río”, “riego”, “fósil”, “1973”, “pelón” o “Tratayen”.</p>');
 };
 document.addEventListener('keydown',e=>{if(e.key==='Escape'){document.querySelectorAll('.modal.open').forEach(x=>x.classList.remove('open'));$('#searchPanel').classList.remove('open')}});
}
function openSource(id){const s=(state.data.sources||[]).find(x=>x.id===id);if(!s)return;$('#sourceReaderTitle').textContent=s.title;$('#sourceReaderType').textContent=(s.type||'FUENTE').replaceAll('_',' ');$('#sourceReaderMeta').textContent=(s.organization||'Archivo del museo')+' · '+(s.date||'Registro documental');$('#sourceReaderText').textContent=(s.description||'Esta fuente forma parte de la documentación que sustenta una o más piezas del museo.')+' El museo conserva aquí su función documental y deja el original externo como consulta opcional.';$('#sourceModal').classList.add('open');$('#sourceModal').setAttribute('aria-hidden','false');$('#sourceModal').querySelector('[data-source-original]').onclick=()=>window.open(s.url,'_blank','noopener');}
function toast(msg){const t=$('#toast');t.textContent=msg;t.classList.add('show');clearTimeout(window.__toast);window.__toast=setTimeout(()=>t.classList.remove('show'),1800)}
async function loadJson(path){
 const res=await fetch(path,{cache:'no-cache'});
 if(!res.ok)throw new Error(path+' · HTTP '+res.status);
 const data=await res.json();
 return data;
}
async function boot(){
 try{
  const [d,c,m,t,r]=await Promise.all([
   loadJson('data/territory-depth.json'),
   loadJson('data/collections.json'),
   loadJson('data/multimedia.json'),
   loadJson('data/research-threads.json'),
   loadJson('data/relations.json')
  ]);
  if(!d||!Array.isArray(d.records)||!Array.isArray(d.layers))throw new Error('territory-depth.json: estructura inválida');
  state.data=d;state.collections=c;state.multimedia=m;state.threads=t;state.relations=r;render();bind();
 }catch(e){
  console.error('[Museo] boot error',e);
  const grid=$('#pieceGrid');
  if(grid)grid.innerHTML='<article class="museum-error"><b>EL MUSEO SIGUE ABIERTO</b><h3>Una capa de datos no pudo cargarse.</h3><p>La interfaz está disponible. Volvé a intentar o revisá la conexión.</p><button class="primary" onclick="location.reload()">Reintentar</button></article>';
  toast('Una capa documental no pudo cargarse.');
 }
}
boot();
/* 0.8 — experiencia multidispositivo */
function initExperience(){const root=document.documentElement, body=document.body; body.classList.add('experience-active'); $('#dockHome').onclick=()=>{window.scrollTo({top:0,behavior:'smooth'});toast('Volviste al inicio del museo')}; $('#dockExit').onclick=()=>{window.scrollTo({top:0,behavior:'smooth'});toast('El museo permanece abierto')}; $('#dockFullscreen').onclick=async()=>{try{if(!document.fullscreenElement)await document.documentElement.requestFullscreen();else await document.exitFullscreen()}catch(e){toast('La pantalla completa no está disponible en este dispositivo')}}; $('#dockAdjust').onclick=()=>{$('#adjustPanel').classList.add('open');$('#adjustPanel').setAttribute('aria-hidden','false')}; $('#closeAdjust').onclick=()=>{$('#adjustPanel').classList.remove('open');$('#adjustPanel').setAttribute('aria-hidden','true')}; document.querySelectorAll('[data-font]').forEach(b=>b.onclick=()=>{const v=b.dataset.font; if(v==='0')root.style.removeProperty('--reading-scale'); else root.style.setProperty('--reading-scale',v==='1'?'1.12':'.94');localStorage.setItem('museum-font',v)}); $('#toggleMotion').onclick=()=>{body.classList.toggle('reduce-motion');localStorage.setItem('museum-motion',body.classList.contains('reduce-motion')?'1':'0')}; $('#toggleContrast').onclick=()=>{body.classList.toggle('high-contrast');localStorage.setItem('museum-contrast',body.classList.contains('high-contrast')?'1':'0')}; $('#toggleReading').onclick=()=>{body.classList.toggle('reading-mode');localStorage.setItem('museum-reading',body.classList.contains('reading-mode')?'1':'0')}; $('#resetExperience').onclick=()=>{localStorage.removeItem('museum-font');localStorage.removeItem('museum-motion');localStorage.removeItem('museum-contrast');localStorage.removeItem('museum-reading');root.style.removeProperty('--reading-scale');body.classList.remove('reduce-motion','high-contrast','reading-mode');toast('Ajustes restablecidos')}; const font=localStorage.getItem('museum-font');if(font==='1')root.style.setProperty('--reading-scale','1.12');if(font==='-1')root.style.setProperty('--reading-scale','.94');if(localStorage.getItem('museum-motion')==='1')body.classList.add('reduce-motion');if(localStorage.getItem('museum-contrast')==='1')body.classList.add('high-contrast');if(localStorage.getItem('museum-reading')==='1')body.classList.add('reading-mode'); const bar=$('#experienceProgressBar');let ticking=false; const update=()=>{const max=document.documentElement.scrollHeight-innerHeight;bar.style.width=(max>0?(scrollY/max)*100:0)+'%';ticking=false};window.addEventListener('scroll',()=>{if(!ticking){requestAnimationFrame(update);ticking=true}},{passive:true});update();}
initExperience();

/* 1.0 — atlas territorial */
function initAtlas(){
 document.querySelectorAll('.atlas-key').forEach(btn=>btn.addEventListener('click',()=>{
   document.querySelectorAll('.atlas-key').forEach(x=>x.classList.remove('active'));btn.classList.add('active');
   const key=btn.dataset.atlas;const map=document.querySelector('.atlas-map');if(!map)return;
   map.dataset.focus=key;
   const labels={agua:'El agua organiza el territorio y permite leer la relación entre río, canales y producción.',barda:'La barda marca visualmente el borde del valle y ayuda a entender la forma del paisaje.',chacra:'La matriz parcelaria, los caminos y las cortinas forestales construyen el paisaje agrario.',pueblo:'La localidad aparece como una capa construida dentro de esa matriz territorial.'};
   toast(labels[key]||'Capa territorial');
 });
}
initAtlas();

/* 1.1 — navegación semántica */
function museumSearch(query){
 const q=(query||'').trim();if(!q)return;
 const panel=$('#searchPanel');const input=$('#searchInput');panel.classList.add('open');panel.setAttribute('aria-hidden','false');input.value=q;input.dispatchEvent(new Event('input'));setTimeout(()=>input.focus(),60);
}
document.addEventListener('click',e=>{
 const q=e.target.closest('[data-query]');if(q){museumSearch(q.dataset.query);return}
 if(e.target.closest('#commandSearch')){museumSearch('');return}
});


/* 1.3 — relation engine + interaction hardening */
function museumRelationsFor(id){
 const rel=state.relations?.relations||[];
 return rel.flatMap(x=>{
   if(x.from===id)return [{id:x.to,type:x.type,basis:x.basis,direction:'→'}];
   if(x.to===id)return [{id:x.from,type:x.type,basis:x.basis,direction:'←'}];
   return [];
 }).filter(x=>recordById(x.id));
}
function openRecordData(r){
 const l=state.data?.layers?.find(x=>x.key===r.layer);
 const safeStatus=String(r.status||'EN_INVESTIGACION').replaceAll('_',' ');
 $('#modalVisual').className='modal-visual visual-'+esc(r.visual||'archive');
 $('#modalVisual').innerHTML='<span class="visual-label">'+esc(l?.title||'PIEZA')+'</span>';
 $('#modalKicker').textContent=(l?('CAPA '+String(l.order).padStart(2,'0')+' · '):'')+safeStatus;
 $('#modalTitle').textContent=r.title||'Sin título';
 $('#modalPeriod').textContent=r.period||'Período en investigación';
 $('#modalEvidence').textContent=r.evidence||'Sin descripción breve.';
 $('#modalStatus').textContent=safeStatus;
 $('#modalRelation').textContent=String(r.relation||'RELACIÓN PENDIENTE').replaceAll('_',' ');
 $('#modalNotes').textContent=r.notes||'Sin nota adicional.';
 const sources=(r.sourceIds||[]).map(id=>state.data?.sources?.find(s=>s.id===id)).filter(Boolean);
 $('#modalSource').innerHTML=sources.length?'<b>Documentación</b><div class="source-chips">'+sources.map(s=>'<button class="source-chip" data-source-id="'+esc(s.id)+'">'+esc(s.title)+'</button>').join('')+'</div>':'Fuente específica pendiente de incorporación.';
 state.currentSources=sources;
 const explicit=museumRelationsFor(r.id);
 const legacy=state.data.records.filter(x=>x.id!==r.id&&(x.layer===r.layer||(r.sourceIds||[]).some(id=>(x.sourceIds||[]).includes(id)))).filter(x=>!explicit.some(e=>e.id===x.id)).slice(0,4).map(x=>({id:x.id,type:'RELACIONADO',basis:'Coincidencia temática o documental.',direction:'↔'}));
 const all=[...explicit,...legacy].slice(0,6);
 $('#modalRelated').innerHTML=all.length?'<div class="relation-title">SEGUIR EL HILO</div>'+all.map(x=>{const rr=recordById(x.id);return '<button class="related-btn relation-item" data-record="'+esc(x.id)+'"><span>'+esc(x.direction)+' '+esc(x.type.replaceAll('_',' '))+'</span><b>'+esc(rr.title)+'</b><small>'+esc(x.basis||'')+'</small></button>'}).join(''):'';
 $('#detailModal').classList.add('open');$('#detailModal').setAttribute('aria-hidden','false');
 window.__museumLastFocus=document.activeElement;
 document.body.classList.add('modal-open');
 setTimeout(()=>$('#detailModal .close')?.focus(),0);
}
(function hardenInteractions(){
 const modalIds=['detailModal','sourceModal','introModal'];
 const closeModal=(modal)=>{
   if(!modal)return;
   modal.classList.remove('open');modal.setAttribute('aria-hidden','true');
   document.body.classList.remove('modal-open');
   if(window.__museumLastFocus&&typeof window.__museumLastFocus.focus==='function'){try{window.__museumLastFocus.focus()}catch(e){}}
 };
 document.addEventListener('click',e=>{
   const modal=e.target.closest('.modal');
   if(modal&&e.target===modal)closeModal(modal);
   if(e.target.closest('[data-close]'))closeModal(e.target.closest('.modal'));
 });
 document.addEventListener('keydown',e=>{
   if(e.key!=='Escape')return;
   const open=document.querySelector('.modal.open');
   if(open){closeModal(open);return}
   const search=$('#searchPanel');
   if(search?.classList.contains('open')){search.classList.remove('open');search.setAttribute('aria-hidden','true');return}
   const adjust=$('#adjustPanel');
   if(adjust?.classList.contains('open')){adjust.classList.remove('open');adjust.setAttribute('aria-hidden','true')}
 });
 document.addEventListener('click',e=>{
   const result=e.target.closest('.v12-result');
   if(result){setTimeout(()=>document.querySelector('.search-panel')?.setAttribute('aria-hidden','true'),80)}
 });
})();

// Estatuto rector 1.0
