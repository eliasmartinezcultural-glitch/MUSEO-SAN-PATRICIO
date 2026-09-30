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
 $('#visibleCount').textContent=d.layers.length;
 $('#pieceStat').textContent=(d.pieces||[]).length;
 $('#depthMap').innerHTML=d.layers.map((l,i)=>'<article class="depth-node" data-layer="'+esc(l.key)+'"><div class="node-dot">'+String(i+1).padStart(2,'0')+'</div><div class="node-card"><div><h3>'+esc(l.title)+'</h3><p>'+esc(l.focus.join(' · '))+'</p></div><span class="node-arrow">↗</span></div></article>').join('');
 $('#chapterGrid').innerHTML=d.layers.map((l,i)=>{const rec=d.records.find(r=>r.layer===l.key);return '<article class="chapter" data-layer="'+esc(l.key)+'"><div><span class="chapter-index">CAPA '+String(i+1).padStart(2,'0')+'</span><h3>'+esc(l.title)+'</h3><p>'+esc(rec?.evidence||l.focus.join(' · '))+'</p></div><span class="open">Abrir investigación →</span></article>'}).join('');
 const featured=(d.pieces||[]).slice(0,9);
 $('#pieceGrid').innerHTML=featured.map(p=>{const r=recordById(p.recordId);return '<article class="piece" data-record="'+esc(p.recordId)+'">'+visual(p.visual,p.label)+'<div class="piece-body"><span class="piece-label">'+esc(p.label)+'</span><h3>'+esc(p.title)+'</h3><p>'+esc(r?.evidence||'')+'</p><span class="piece-more">Abrir pieza →</span></div></article>'}).join('');
 const timelineIds=['TD-001','TD-002','TD-003','TD-006','TD-007','TD-008','TD-009','TD-010','TD-011','TD-012','TD-013','TD-018'];
 $('#timeline').innerHTML=timelineIds.map(id=>{const r=recordById(id);return '<article class="time-item" data-record="'+esc(id)+'"><div class="time-dot"></div><span class="time-year">'+esc(r?.period||'—')+'</span><h3>'+esc(r?.title||'')+'</h3><p>'+esc(r?.status?.replaceAll('_',' ')||'')+'</p></article>'}).join('');
 $('#placeGrid').innerHTML=(d.places||[]).map(p=>'<article class="place" data-record="'+esc(p.recordId)+'"><div class="place-visual visual-'+esc(p.visual)+'"></div><div class="place-content"><span class="place-kind">'+esc(p.kind.toUpperCase())+'</span><h3>'+esc(p.title)+'</h3><p>'+esc(p.text)+'</p></div></article>').join('');
 $('#evidenceBoard').innerHTML=(d.questions||[]).map(q=>'<article class="question" data-record="'+esc(q.recordId)+'"><span>'+esc(q.status.replaceAll('_',' '))+'</span><b>'+esc(q.title)+'</b></article>').join('');
 $('#sourceList').innerHTML=(d.sources||[]).map((s,i)=>'<article class="source"><span class="source-num">'+String(i+1).padStart(2,'0')+'</span><div><b>'+esc(s.title)+'</b><small>'+esc(s.type.replaceAll('_',' '))+'</small></div><button class="inside-source" data-source-id="'+esc(s.id)+'">Leer dentro del museo →</button></article>').join('');
 renderCollections();
 renderMultimedia();
 renderThreads();
}
function renderCollections(){
 const cs=state.collections?.collections||[];
 $('#collectionGrid').innerHTML=cs.map((c,i)=>'<article class="collection-card"><div><span class="collection-number">COLECCIÓN '+String(i+1).padStart(2,'0')+' · '+esc(c.kind)+'</span><h3>'+esc(c.title)+'</h3><p>'+esc(c.description)+'</p></div><div class="collection-meta"><span>'+esc(c.subtitle)+'</span><span>'+c.recordIds.length+' piezas vinculadas</span></div></article>').join('');
}
function mediaIcon(type){const m={'pagina-con-audio':'◉','documento-pdf':'▤','pagina-historica':'◌','pagina-paleontologia':'✦','archivo-fotografico-pendiente':'▧','archivo-oral-pendiente':'◉','archivo-afiches-pendiente':'▤','cartografia-pendiente':'⌖'};return m[type]||'□'}
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
   const close=e.target.closest('[data-close]');if(close){close.closest('.modal')?.classList.remove('open');return}
   const source=e.target.closest('[data-source-id]');if(source){openSource(source.dataset.sourceId);return} if(e.target.closest('[data-source-open]')){openSource(state.currentSources[0]?.id);return} const rec=e.target.closest('[data-record]');if(rec){openRecord(rec.dataset.record);return}
   const layer=e.target.closest('[data-layer]');if(layer){const r=state.data.records.find(x=>x.layer===layer.dataset.layer);if(r)openRecordData(r);return}
   const mode=e.target.closest('[data-mode]');if(mode){const map={curioso:'pieceGrid',tiempo:'tiempo',territorio:'territorio',investigar:'evidenceBoard'};document.getElementById(map[mode.dataset.mode]).scrollIntoView({behavior:'smooth'});toast('Recorrido: '+mode.querySelector('b').textContent);return}
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
async function boot(){try{const [d,c,m,t]=await Promise.all([fetch('data/territory-depth.json').then(r=>r.json()),fetch('data/collections.json').then(r=>r.json()),fetch('data/multimedia.json').then(r=>r.json()),fetch('data/research-threads.json').then(r=>r.json())]);state.data=d;state.collections=c;state.multimedia=m;state.threads=t;render();bind()}catch(e){console.error(e);toast('No se pudo cargar uno de los archivos del museo.');}}
boot();
/* 0.8 — experiencia multidispositivo */
function initExperience(){const root=document.documentElement, body=document.body, start=$('#experienceStart'); const saved=localStorage.getItem('museum-experience-started'); if(saved==='1'){start.classList.add('hidden');start.setAttribute('aria-hidden','true');body.classList.add('experience-active')} $('#startExperience').onclick=()=>{start.classList.add('hidden');start.setAttribute('aria-hidden','true');body.classList.add('experience-active');localStorage.setItem('museum-experience-started','1');document.querySelector('#descubrir')?.scrollIntoView({behavior:'smooth'});}; $('#dockHome').onclick=()=>{window.scrollTo({top:0,behavior:'smooth'});toast('Volviste al inicio del museo')}; $('#dockExit').onclick=()=>{window.scrollTo({top:0,behavior:'smooth'});start.classList.remove('hidden');start.setAttribute('aria-hidden','false');body.classList.remove('experience-active');localStorage.removeItem('museum-experience-started');}; $('#dockFullscreen').onclick=async()=>{try{if(!document.fullscreenElement)await document.documentElement.requestFullscreen();else await document.exitFullscreen()}catch(e){toast('La pantalla completa no está disponible en este dispositivo')}}; $('#dockAdjust').onclick=()=>{$('#adjustPanel').classList.add('open');$('#adjustPanel').setAttribute('aria-hidden','false')}; $('#closeAdjust').onclick=()=>{$('#adjustPanel').classList.remove('open');$('#adjustPanel').setAttribute('aria-hidden','true')}; document.querySelectorAll('[data-font]').forEach(b=>b.onclick=()=>{const v=b.dataset.font; if(v==='0')root.style.removeProperty('--reading-scale'); else root.style.setProperty('--reading-scale',v==='1'?'1.12':'.94');localStorage.setItem('museum-font',v)}); $('#toggleMotion').onclick=()=>{body.classList.toggle('reduce-motion');localStorage.setItem('museum-motion',body.classList.contains('reduce-motion')?'1':'0')}; $('#toggleContrast').onclick=()=>{body.classList.toggle('high-contrast');localStorage.setItem('museum-contrast',body.classList.contains('high-contrast')?'1':'0')}; $('#toggleReading').onclick=()=>{body.classList.toggle('reading-mode');localStorage.setItem('museum-reading',body.classList.contains('reading-mode')?'1':'0')}; $('#resetExperience').onclick=()=>{localStorage.removeItem('museum-font');localStorage.removeItem('museum-motion');localStorage.removeItem('museum-contrast');localStorage.removeItem('museum-reading');root.style.removeProperty('--reading-scale');body.classList.remove('reduce-motion','high-contrast','reading-mode');toast('Ajustes restablecidos')}; const font=localStorage.getItem('museum-font');if(font==='1')root.style.setProperty('--reading-scale','1.12');if(font==='-1')root.style.setProperty('--reading-scale','.94');if(localStorage.getItem('museum-motion')==='1')body.classList.add('reduce-motion');if(localStorage.getItem('museum-contrast')==='1')body.classList.add('high-contrast');if(localStorage.getItem('museum-reading')==='1')body.classList.add('reading-mode'); const bar=$('#experienceProgressBar');let ticking=false; const update=()=>{const max=document.documentElement.scrollHeight-innerHeight;bar.style.width=(max>0?(scrollY/max)*100:0)+'%';ticking=false};window.addEventListener('scroll',()=>{if(!ticking){requestAnimationFrame(update);ticking=true}},{passive:true});update();}
initExperience();
