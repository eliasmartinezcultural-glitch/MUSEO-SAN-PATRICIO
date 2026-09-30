const state={data:null};
const $=s=>document.querySelector(s);
const esc=s=>String(s??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]));
async function boot(){
 try{state.data=await fetch('data/territory-depth.json').then(r=>r.json());render();}
 catch(e){console.error(e);}
}
function render(){
 const {layers,records}=state.data;
 $('#visibleCount').textContent=layers.length;
 $('#depthMap').innerHTML=layers.map((l,i)=>{const rec=records.find(r=>r.layer===l.key);return `<article class="depth-node" data-layer="${esc(l.key)}"><div class="node-dot">${String(i+1).padStart(2,'0')}</div><div class="node-card"><div><h3>${esc(l.title)}</h3><p>${esc(l.focus.join(' · '))}</p></div><span class="node-arrow">↗</span></div></article>`}).join('');
 $('#chapterGrid').innerHTML=layers.map((l,i)=>{const rec=records.find(r=>r.layer===l.key);return `<article class="chapter" data-layer="${esc(l.key)}"><div><span class="chapter-index">CAPA ${String(i+1).padStart(2,'0')}</span><h3>${esc(l.title)}</h3><p>${esc(rec?.evidence||l.focus.join(' · '))}</p></div><span class="open">Abrir investigación →</span></article>`}).join('');
 document.querySelectorAll('[data-layer]').forEach(el=>el.addEventListener('click',()=>openLayer(el.dataset.layer)));
}
function openLayer(key){
 const l=state.data.layers.find(x=>x.key===key), r=state.data.records.find(x=>x.layer===key); if(!l)return;
 $('#modalKicker').textContent=`CAPA ${String(l.order).padStart(2,'0')} · ${l.focus.join(' · ')}`;
 $('#modalTitle').textContent=l.title;
 $('#modalPeriod').textContent=r?.period?.replaceAll('_',' · ')||'Período en investigación';
 $('#modalEvidence').textContent=r?.evidence||'Esta capa está preparada para recibir nuevas evidencias.';
 $('#modalStatus').textContent=r?.status?.replaceAll('_',' ');
 $('#modalRelation').textContent=r?.relation?.replaceAll('_',' ');
 $('#modalNotes').textContent=r?.notes||'Todavía no hay una nota de investigación.';
 $('#detailModal').classList.add('open'); $('#detailModal').setAttribute('aria-hidden','false');
}
document.addEventListener('click',e=>{
 if(e.target.matches('[data-close]')){e.target.closest('.modal').classList.remove('open');}
 if(e.target===$('#detailModal'))$('#detailModal').classList.remove('open');
 if(e.target===$('#openIntro'))$('#introModal').classList.add('open');
});
$('#openSearch').addEventListener('click',()=>{$('#searchPanel').classList.add('open');$('#searchPanel').setAttribute('aria-hidden','false');setTimeout(()=>$('#searchInput').focus(),100)});
$('#closeSearch').addEventListener('click',()=>$('#searchPanel').classList.remove('open'));
$('#searchInput').addEventListener('input',e=>{
 const q=e.target.value.trim().toLowerCase(); const records=state.data?.records||[];
 const matches=q?records.filter(r=>(r.title+' '+r.evidence+' '+r.notes+' '+r.layer).toLowerCase().includes(q)):[];
 $('#searchResults').innerHTML=matches.map(r=>`<div class="result" data-layer="${esc(r.layer)}"><small>${esc(r.status)}</small><b>${esc(r.title)}</b><span>${esc(r.evidence.slice(0,130))}…</span></div>`).join('')|| (q?'<p style="color:#777;margin-top:30px">No encontramos todavía esa evidencia. Puede convertirse en una pregunta de investigación.</p>':'<p style="color:#777;margin-top:30px">Probá con “río”, “paleontología”, “mapuche” o “riego”.</p>');
 document.querySelectorAll('#searchResults .result').forEach(x=>x.onclick=()=>{openLayer(x.dataset.layer);$('#searchPanel').classList.remove('open')});
});
document.addEventListener('keydown',e=>{if(e.key==='Escape'){document.querySelectorAll('.modal.open').forEach(x=>x.classList.remove('open'));$('#searchPanel').classList.remove('open')}});
boot();