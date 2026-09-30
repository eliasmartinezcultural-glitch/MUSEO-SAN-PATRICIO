/* Museo San Patricio · Pro layer 1.5 — catálogo, evidencia, búsqueda y enlaces */
(function(){
'use strict';
const $=s=>document.querySelector(s), esc=s=>String(s??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]));
let D=null,C=null,M=null,T=null;
const statusLabel=s=>String(s||'').replaceAll('_',' ');
function jumpRecord(id){
 const el=document.querySelector('[data-record="'+CSS.escape(id)+'"]');
 if(el){el.scrollIntoView({behavior:'smooth',block:'center'});setTimeout(()=>el.click(),350);return}
 const result=document.querySelector('.pro-catalog-item[data-record="'+CSS.escape(id)+'"]');
 if(result){result.click()}
}
function injectBar(){
 const hero=$('#inicio');if(!hero||document.querySelector('.museum-probar'))return;
 const sec=document.createElement('section');sec.className='museum-probar';sec.setAttribute('aria-label','Control documental');
 sec.innerHTML='<div class="probar-inner"><div><div class="probar-kicker">MODO MUSEO · CATÁLOGO VIVO</div><div class="probar-title">Elegí cuánto querés saber.</div><p class="probar-copy">La interfaz pública es simple; detrás hay estados de evidencia, procedencia, relaciones y preguntas abiertas. Filtrá el catálogo sin perder el recorrido.</p></div><div class="probar-controls" role="group" aria-label="Filtrar catálogo"><button class="pro-filter active" data-filter="all">Todo</button><button class="pro-filter" data-filter="LOCAL">Local</button><button class="pro-filter" data-filter="FUENTE">Documentado</button><button class="pro-filter" data-filter="CONTEXTO">Contexto</button><button class="pro-filter" data-filter="INVESTIGACION">Investigación</button></div></div>';
 hero.after(sec);
 sec.querySelectorAll('.pro-filter').forEach(b=>b.onclick=()=>filterCatalog(b.dataset.filter,b));
}
function filterCatalog(filter,button){
 document.querySelectorAll('.pro-filter').forEach(x=>x.classList.remove('active'));button.classList.add('active');
 document.querySelectorAll('.pro-catalog-item').forEach(el=>{
  const s=el.dataset.status||'';
  const show=filter==='all'||(filter==='LOCAL'&&s.includes('LOCAL'))||(filter==='FUENTE'&&s.includes('FUENTE'))||(filter==='CONTEXTO'&&s.includes('CONTEXTO'))||(filter==='INVESTIGACION'&&s.includes('INVESTIGACION'));
  el.classList.toggle('pro-filtered',!show);
 });
}
function injectDashboard(){
 const anchor=$('#explorar');if(!anchor||document.querySelector('.pro-dashboard'))return;
 const local=D.records.filter(r=>String(r.relation).includes('LOCAL')).length;
 const sourced=D.records.filter(r=>(r.sourceIds||[]).length).length;
 const context=D.records.filter(r=>String(r.status).includes('CONTEXTO')).length;
 const open=D.records.filter(r=>String(r.status).includes('INVESTIGACION')).length;
 const sec=document.createElement('section');sec.className='pro-dashboard';
 sec.innerHTML='<div class="pro-dashboard-inner"><div class="pro-dashboard-head"><div><div class="probar-kicker">ESTADO DEL CATÁLOGO</div><h2>Un museo que también muestra cómo sabe.</h2></div><p>Los números no miden “calidad”: muestran el estado actual del trabajo documental. A medida que aparezcan fuentes, fotografías y testimonios, el catálogo puede cambiar.</p></div><div class="pro-metrics"><div class="pro-metric"><b>'+D.records.length+'</b><span>registros</span></div><div class="pro-metric"><b>'+local+'</b><span>con relación local</span></div><div class="pro-metric"><b>'+sourced+'</b><span>con fuente asociada</span></div><div class="pro-metric"><b>'+open+'</b><span>en investigación</span></div></div><div class="pro-status-note"><strong>Lectura responsable:</strong> “contexto regional” no equivale a “evidencia local”. El museo conserva esa diferencia visible en cada ficha.</div></div>';
 anchor.before(sec);
}
function injectCatalog(){
 const anchor=$('#featured')||$('.featured');if(!anchor||document.querySelector('.pro-catalog'))return;
 const sec=document.createElement('section');sec.className='pro-catalog';sec.id='catalogo';
 const items=D.records.map(r=>'<button class="pro-catalog-item" data-record="'+esc(r.id)+'" data-status="'+esc(r.status)+'"><small>'+esc(r.id)+' · '+esc(statusLabel(r.status))+'</small><b>'+esc(r.title)+'</b><span>'+esc(r.period||'Período en investigación')+'</span><em>'+esc(r.relation||'SIN CLASIFICAR').replaceAll('_',' ')+'</em></button>').join('');
 sec.innerHTML='<div class="pro-catalog-inner"><div class="pro-catalog-head"><div><div class="probar-kicker">CATÁLOGO COMPLETO</div><h2>Las piezas, sin esconder las que faltan.</h2></div><p>Esta es la capa de consulta. Las piezas con evidencia, contexto o investigación pendiente conviven, pero no se confunden.</p></div><div class="pro-catalog-grid">'+items+'</div><div class="pro-evidence"><article><h3>¿Por qué aparece una pieza “en investigación”?</h3><p>Porque el museo prefiere dejar una pregunta abierta antes que completar un vacío con una afirmación no comprobada.</p></article><article><h3>¿Qué significa “fuente asociada”?</h3><p>Que existe al menos una referencia documental vinculada al registro. La fuente puede ser institucional, legislativa, periodística o de una entidad custodiante.</p></article></div></div>';
 anchor.after(sec);
 sec.querySelectorAll('.pro-catalog-item').forEach(b=>b.onclick=()=>jumpRecord(b.dataset.record));
}
function enhanceSearch(){
 const input=$('#searchInput'), results=$('#searchResults');if(!input||!results)return;
 input.oninput=function(){
  const q=this.value.trim().toLowerCase();
  if(!q){results.innerHTML='<p style="color:#777;margin-top:30px">Probá con “río”, “riego”, “fósil”, “1973”, “pelón” o “Tratayen”.</p>';return}
  const rows=[];
  D.records.forEach(r=>{const hay=[r.id,r.title,r.evidence,r.notes,r.layer,r.period,r.status,r.relation].join(' ').toLowerCase();if(hay.includes(q))rows.push({kind:'PIEZA',id:r.id,title:r.title,text:r.evidence,status:r.status})});
  D.layers.forEach(l=>{if([l.title,...l.focus].join(' ').toLowerCase().includes(q))rows.push({kind:'CAPA',id:l.key,title:l.title,text:l.focus.join(' · '),status:'MAPA'});});
  (D.sources||[]).forEach(s=>{if([s.id,s.title,s.type].join(' ').toLowerCase().includes(q))rows.push({kind:'FUENTE',id:s.id,title:s.title,text:s.type,status:'DOCUMENTACIÓN'});});
  (T?.threads||[]).forEach(t=>{if([t.title,...t.needs].join(' ').toLowerCase().includes(q))rows.push({kind:'INVESTIGACIÓN',id:t.id,title:t.title,text:t.needs.join(' · '),status:'ABIERTA'});});
  results.innerHTML=rows.slice(0,30).map(x=>'<div class="result v15-result" data-pro-id="'+esc(x.id)+'" data-pro-kind="'+esc(x.kind)+'"><small>'+esc(x.kind)+' · '+esc(statusLabel(x.status))+'</small><b>'+esc(x.title)+'</b><span>'+esc(String(x.text||'').slice(0,180))+'</span></div>').join('')||'<p style="color:#777;margin-top:30px">No hay coincidencias en el catálogo actual. Esa ausencia también puede convertirse en una pregunta de investigación.</p>';
  results.querySelectorAll('.v15-result').forEach(el=>el.onclick=()=>{const id=el.dataset.proId;if(el.dataset.proKind==='PIEZA')jumpRecord(id);else{const p=document.querySelector('.pro-catalog');p?.scrollIntoView({behavior:'smooth'});}});
 };
}
function addShare(){
 const modal=$('#detailModal');if(!modal||modal.querySelector('.pro-copy-btn'))return;
 const row=document.createElement('div');row.innerHTML='<button class="pro-copy-btn" id="copyPieceLink">Copiar enlace de esta pieza</button>';modal.querySelector('.modal-card')?.appendChild(row);
 row.querySelector('button').onclick=async()=>{
  const title=$('#modalTitle')?.textContent||'Pieza del Museo San Patricio del Chañar';
  const url=location.href.split('#')[0]+'#pieza='+encodeURIComponent((D.records.find(r=>r.title===title)||{}).id||'');
  try{await navigator.clipboard.writeText(url);if(window.toast)window.toast('Enlace copiado');else alert('Enlace copiado');}catch(e){window.prompt('Copiá este enlace',url)}
 };
}
function deepLink(){
 const m=location.hash.match(/^#pieza=([^&]+)/);if(m)setTimeout(()=>jumpRecord(decodeURIComponent(m[1])),1200);
}
async function boot(){
 try{
  [D,C,M,T]=await Promise.all([
   fetch('data/territory-depth.json',{cache:'no-cache'}).then(r=>r.json()),
   fetch('data/collections.json',{cache:'no-cache'}).then(r=>r.json()),
   fetch('data/multimedia.json',{cache:'no-cache'}).then(r=>r.json()),
   fetch('data/research-threads.json',{cache:'no-cache'}).then(r=>r.json())
  ]);
  injectBar();injectDashboard();injectCatalog();enhanceSearch();addShare();deepLink();
  window.addEventListener('hashchange',deepLink);
 }catch(e){console.error('[Museo Pro]',e)}
}
boot();
})();