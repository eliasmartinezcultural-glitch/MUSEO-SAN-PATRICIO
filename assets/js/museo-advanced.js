/* 1.2 — visual Chañar + school gateway + connected search enhancement */
(function(){
 const load=(src)=>new Promise((ok,fail)=>{const s=document.createElement('script');s.src=src;s.onload=ok;s.onerror=fail;document.head.appendChild(s)});
 const link=document.createElement('link');link.rel='stylesheet';link.href='assets/css/visual-chanar.css';document.head.appendChild(link);

 async function loadSchool(){
   try{const data=await fetch('data/school-gateway.json').then(r=>r.json()); renderSchool(data)}catch(e){console.warn('school-gateway',e)}
 }
 function renderSchool(d){
   const main=document.querySelector('main'); if(!main)return;
   const sec=document.createElement('section');sec.className='museum-school';sec.id='escuelas';
   sec.innerHTML='<div class="school-shell">'+
    '<div class="school-head"><div><span class="school-badge">PUERTA EDUCATIVA · MUSEO SAN PATRICIO DEL CHAÑAR</span><h2>Un museo que también puede entrar al aula.</h2><p>La experiencia pública empieza simple: mirar, preguntar, ubicar, conectar e investigar. Detrás de esa sencillez funciona un archivo con fuentes, estados de evidencia, relaciones y preguntas abiertas.</p></div><div><p class="eyebrow">PENSADO PARA</p><p><strong>Niñas y niños · familias · docentes · investigadores</strong></p><p>La misma plataforma cambia de profundidad sin cambiar de lenguaje visual.</p></div></div>'+
    '<div class="school-audience-grid">'+d.audiences.map((a,i)=>'<article class="school-audience"><div><span class="num">'+String(i+1).padStart(2,'0')+'</span><h3>'+esc(a.title)+'</h3><p><b>'+esc(a.subtitle)+'</b><br>'+esc(a.description)+'</p></div><button data-school-entry="'+esc(a.entry)+'">Entrar por aquí →</button></article>').join('')+'</div>'+
    '<div class="school-route">'+d.route.map(x=>'<div class="school-step"><span>'+esc(x.step)+'</span><b>'+esc(x.title)+'</b><small>'+esc(x.text)+'</small></div>').join('')+'</div>'+
    '<div class="school-kit"><div><p class="eyebrow">BASE DE PRESENTACIÓN</p><h3>'+esc(d.teacherKit.title)+'</h3><p>Una primera arquitectura para presentar el museo ante escuelas sin convertirlo todavía en un manual cerrado. El contenido pedagógico se amplía con docentes y fuentes.</p></div><ul>'+d.teacherKit.items.map(x=>'<li>'+esc(x)+'</li>').join('')+'</ul></div>'+
    '<div class="school-status">'+esc(d.publicationStatus)+'</div></div>';
   const closing=document.querySelector('.closing');main.insertBefore(sec,closing||null);
   const sig=document.createElement('section');sig.className='chanar-signature';sig.innerHTML='<div class="signature-inner"><h2>SAN PATRICIO<br>DEL CHAÑAR.</h2><p>RÍO · BARDA · AGUA · CHACRA · ALAMEDA · PUEBLO · MEMORIA<br><br>Una identidad visual común para que el museo pueda crecer sin perder el territorio.</p></div>';main.insertBefore(sig,closing||null);
   sec.querySelectorAll('[data-school-entry]').forEach(b=>b.addEventListener('click',()=>{const id=b.dataset.schoolEntry;const target=id==='curioso'?'pieceGrid':id==='territorio'?'territorio':'explorar';document.getElementById(target)?.scrollIntoView({behavior:'smooth'});toast('Ruta educativa: '+b.closest('.school-audience').querySelector('h3').textContent)}));
 }
 async function enhance(){
   if(document.querySelector('#searchInput')?.dataset.v12)return;
   const oldInput=document.querySelector('#searchInput'); if(!oldInput)return;
   oldInput.dataset.v12='1';
   try{
     const [d,c,m,t]=await Promise.all([
       fetch('data/territory-depth.json').then(r=>r.json()),
       fetch('data/collections.json').then(r=>r.json()),
       fetch('data/multimedia.json').then(r=>r.json()),
       fetch('data/research-threads.json').then(r=>r.json())
     ]);
     const src=d.sources||[];
     window.__museumUnifiedData={records:d.records||[],collections:c.collections||[],multimedia:m.media||[],threads:t.threads||[],sources:src};
     buildUnifiedIndex(window.__museumUnifiedData);
     oldInput.addEventListener('input',()=>unifiedSearch(oldInput.value),true);
   }catch(e){console.warn('unified-index',e)}
 }
 let index=[];
 function buildUnifiedIndex(d){
   index=[];
   const add=(type,id,title,text,action)=>index.push({type,id,title,text:String(text||''),action});
   (d.records||[]).forEach(r=>add('PIEZA',r.id,r.title,[r.evidence,r.notes,r.period,r.status,r.layer].join(' '),()=>window.openRecord?.(r.id)));
   (d.collections||[]).forEach(c=>add('COLECCIÓN',c.id,c.title,[c.subtitle,c.description,c.kind].join(' '),()=>document.getElementById('colecciones')?.scrollIntoView({behavior:'smooth'})));
   (d.multimedia||[]).forEach(m=>add('ARCHIVO',m.id,m.title,[m.description,m.date,m.type].join(' '),()=>document.getElementById('archivo')?.scrollIntoView({behavior:'smooth'})));
   (d.threads||[]).forEach(t=>add('INVESTIGACIÓN',t.id,t.title,[t.title,(t.needs||[]).join(' ')].join(' '),()=>document.querySelector('.research-threads')?.scrollIntoView({behavior:'smooth'})));
   (d.sources||[]).forEach(s=>add('FUENTE',s.id,s.title,[s.description,s.type,s.scope].join(' '),()=>window.openSource?.(s.id)));
   window.__museumUnifiedIndex=index;
 }
 function unifiedSearch(q){
   const out=document.querySelector('#searchResults');if(!out)return;
   const term=(q||'').trim().toLowerCase();
   if(!term){out.innerHTML='<p style="color:#777;margin-top:30px">Probá con “río”, “riego”, “chacras”, “1973”, “pelón”, “familias” o “Tratayen”.</p>';return}
   const tokens=term.split(/\s+/).filter(Boolean);
   const hits=index.filter(x=>tokens.every(t=>(x.title+' '+x.text).toLowerCase().includes(t))).slice(0,14);
   out.innerHTML=hits.length?hits.map((x,i)=>'<button class="result v12-result" data-v12-result="'+i+'"><small>'+esc(x.type)+' · '+esc(x.id)+'</small><b>'+esc(x.title)+'</b><span>'+esc(x.text.slice(0,170))+'…</span></button>').join(''):'<p style="color:#777;margin-top:30px">No encontramos una coincidencia todavía. Probá otra palabra o convertí la ausencia en una pregunta de investigación.</p>';
   out.querySelectorAll('[data-v12-result]').forEach(b=>b.onclick=()=>index[Number(b.dataset.v12Result)]?.action());
 }
 loadSchool();
 enhance();
})();