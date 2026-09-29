import {museumData} from "./data.js";

const $=s=>document.querySelector(s);
const rooms=museumData.rooms;
const pieceTypes={photo:"Fotografías",document:"Documentos",object:"Objetos",audio:"Audios"};

$("#roomGrid").innerHTML=rooms.map(r=>`<article class="room-card" tabindex="0" data-room="${r.id}"><span class="number">${r.number}</span><h3>${r.title}</h3><p>${r.intro}</p><span class="room-arrow">Explorar →</span></article>`).join("");

const journey=[["01","DESCUBRIR","Entrar sin necesitar saber nada."],["02","EXPLORAR","Elegir una puerta y seguir una curiosidad."],["03","INTERACTUAR","Tocar, comparar, escuchar, encontrar."],["04","APRENDER","Comprender el contexto detrás de cada pieza."],["05","RECORDAR","Relacionar lo visto con una historia propia."]];
$("#timeline").innerHTML=journey.map(x=>`<div class="timeline-item"><small>${x[0]}</small><strong>${x[1]}</strong><small>${x[2]}</small></div>`).join("");

function renderCollections(filter="all"){
 const pieces=museumData.pieces.filter(p=>filter==="all"||p.type===filter);
 $("#collectionGrid").innerHTML=pieces.length?pieces.map(pieceCard).join(""):`<div class="collection-empty"><span>◇</span><strong>La colección está abierta.</strong><p>Todavía no hay piezas publicadas. Cuando incorporemos la primera, aparecerá aquí automáticamente.</p></div>`;
}
function pieceCard(p){return `<article class="piece-card"><div class="piece-placeholder">${pieceTypes[p.type]||"Pieza"}</div><div class="piece-body"><small>${p.status||"Pendiente de catalogación"}</small><h3>${p.title}</h3><p>${p.description||""}</p><button class="text-link" data-piece="${p.id}">Abrir ficha →</button></div></article>`}

renderCollections();
document.querySelectorAll(".filter").forEach(b=>b.addEventListener("click",()=>{document.querySelectorAll(".filter").forEach(x=>x.classList.remove("active"));b.classList.add("active");renderCollections(b.dataset.filter)}));

const stage=$("#pieceStage");
function openRoom(id){
 const r=rooms.find(x=>x.id===id);if(!r)return;
 stage.innerHTML=`<div class="empty-piece"><span class="piece-icon">◇</span><p class="eyebrow">SALA ${r.number}</p><h2>${r.title}</h2><p>${r.intro}</p><p>La sala está conectada al motor de contenidos. Aquí se cargarán piezas reales, fuentes, lugares, acontecimientos y experiencias relacionadas.</p><a class="button primary" href="#colecciones">Ver colección →</a></div>`;
 stage.scrollIntoView({behavior:"smooth",block:"center"});
}
$("#roomGrid").addEventListener("click",e=>{const c=e.target.closest("[data-room]");if(c)openRoom(c.dataset.room)});
$("#roomGrid").addEventListener("keydown",e=>{if((e.key==="Enter"||e.key===" ")&&e.target.closest("[data-room]")){e.preventDefault();openRoom(e.target.closest("[data-room]").dataset.room)}});

const menu=$("#menuButton"),nav=$("#mainNav");
menu.addEventListener("click",()=>{const open=nav.classList.toggle("open");menu.setAttribute("aria-expanded",String(open))});
nav.addEventListener("click",e=>{if(e.target.matches("a")){nav.classList.remove("open");menu.setAttribute("aria-expanded","false")}});

const modal=$("#contributeModal");
function closeModal(){modal.hidden=true}
$("#contributeButton").addEventListener("click",()=>modal.hidden=false);
modal.addEventListener("click",e=>{if(e.target.hasAttribute("data-close"))closeModal()});
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeModal()});

document.addEventListener("click",e=>{
 const b=e.target.closest("[data-piece]");
 if(!b)return;
 const p=museumData.pieces.find(x=>x.id===b.dataset.piece);
 if(!p)return;
 stage.innerHTML=`<div class="empty-piece"><span class="piece-icon">◇</span><p class="eyebrow">${pieceTypes[p.type]||"PIEZA"}</p><h2>${p.title}</h2><p>${p.description||""}</p><p><strong>Estado:</strong> ${p.status||"pendiente"}<br><strong>Fuente:</strong> ${p.source||"pendiente de documentación"}</p></div>`;
 stage.scrollIntoView({behavior:"smooth",block:"center"});
});