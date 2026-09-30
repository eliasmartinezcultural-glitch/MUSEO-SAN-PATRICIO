const state={data:null};
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
 $('#modalSource').innerHTML=sources.length?'Fuente: '+sources.map(s=>'<a href="'+esc(s.url)+'" target="_blank" rel="noopener">'+esc(s.title)+'</a>').join(' · '):'Fuente específica pendiente de incorporación.';
 const related=state.data.records.filter(x=>x.id!==r.id&&(x.layer===r.layer||(r.sourceIds||[]).some(id=>(x.sourceIds||[]).includes(id)))).slice(0,4);
 $('#modalRelated').innerHTML=related.length?'También podés explorar: '+related.map(x=>'<button class="related-btn" data-record="'+esc(x.id)+'">'+esc(x.title)+'</button>').join(' '):'';
 $('#detailModal').classList.add('open');$('#detailModal').setAttribute('aria-hidden','false');
}
function render(){
 const d=state.data;
 $('#visibleCount').textContent=d.layers.length;
 $('#depthMap').innerHTML=d.layers.map((l,i)=>'<article class="depth-node" data-layer="'+esc(l.key)+'"><div class="node-dot">'+String(i+1).padStart(2,'0')+'</div><div class="node-card"><div><h3>'+esc(l.title)+'</h3><p>'+esc(l.focus.join(' · '))+'</p></div><span class="node-arrow">↗</span></div></article>').join('');
 $('#chapterGrid').innerHTML=d.layers.map((l,i)=>{const rec=d.records.find(r=>r.layer===l.key);return '<article class="chapter" data-layer="'+esc(l.key)+'"><div><span class="chapter-index">CAPA '+String(i+1).padStart(2,'0')+'</span><h3>'+esc(l.title)+'</h3><p>'+esc(rec?.evidence||l.focus.join(' · '))+'</p></div><span class="open">Abrir investigación →</span></article>'}).join('');
 const featured=(d.pieces||[]).slice(0,9);
 $('#pieceGrid').innerHTML=featured.map(p=>{const r=recordById(p.recordId);return '<article class="piece" data-record="'+esc(p.recordId)+'">'+visual(p.visual,p.label)+'<div class="piece-body"><span class="piece-label">'+esc(p.label)+'</span><h3>'+esc(p.title)+'</h3><p>'+esc(r?.evidence||'')+'</p><span class="piece-more">Abrir pieza →</span></div></article>'}).join('');
 const timelineIds=['TD-001','TD-002','TD-003','TD-006','TD-007','TD-008','TD-009','TD-010','TD-011','TD-012','TD-013','TD-018'];
 $('#timeline').innerHTML=timelineIds.map(id=>{const r=recordById(id);return '<article class="time-item" data-record="'+esc(id)+'"><div class="time-dot"></div><span class="time-year">'+esc(r?.period||'—')+'</span><h3>'+esc(r?.title||'')+'</h3><p>'+esc(r?.status?.replaceAll('_',' ')||'')+'</p></article>'}).join('');
 $('#placeGrid').innerHTML=(d.places||[]).map(p=>'<article class="place" data-record="'+esc(p.recordId)+'"><div class="place-visual visual-'+esc(p.visual)+'"></div><div class="place-content"><span class="place-kind">'+esc(p.kind.toUpperCase())+'</span><h3>'+esc(p.title)+'</h3><p>'+esc(p.text)+'</p></div></article>').join('');
 $('#evidenceBoard').innerHTML=(d.questions||[]).map(q=>'<article class="question" data-record="'+esc(q.recordId)+'"><span>'+esc(q.status.replaceAll('_',' '))+'</span><b>'+esc(q.title)+'</b></article>').join('');
 $('#sourceList').innerHTML=(d.sources||[]).map((s,i)=>'<article class="source"><span class="source-num">'+String(i+1).padStart(2,'0')+'</span><div><b>'+esc(s.title)+'</b><small>'+esc(s.type.replaceAll('_',' '))+'</small></div><a href="'+esc(s.url)+'" target="_blank" rel="noopener">Abrir fuente ↗</a></article>').join('');
}
function bind(){
 document.addEventListener('click',e=>{
   const close=e.target.closest('[data-close]');if(close){close.closest('.modal')?.classList.remove('open');return}
   const rec=e.target.closest('[data-record]');if(rec){openRecord(rec.dataset.record);return}
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
function toast(msg){const t=$('#toast');t.textContent=msg;t.classList.add('show');clearTimeout(window.__toast);window.__toast=setTimeout(()=>t.classList.remove('show'),1800)}
async function boot(){try{state.data=await fetch('data/territory-depth.json').then(r=>r.json());render();bind()}catch(e){console.error(e);toast('No se pudo cargar el archivo del museo.');}}
boot();