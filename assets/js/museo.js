import {museumData} from "./data.js";

const $=s=>document.querySelector(s);
const rooms=museumData.rooms;
const byId=(arr,id)=>arr.find(x=>x.id===id);
const pieceTypes={photo:"Fotografías",document:"Documentos",object:"Objetos",audio:"Audios"};

const stage=$("#pieceStage");
const breadcrumb=$("#pieceBreadcrumb");
const search=$("#museumSearch");
const searchCount=$("#searchCount");

function normalize(value=""){
 return value.toLocaleLowerCase("es").normalize("NFD").replace(/[\\u0300-\\u036f]/g,"");
}

function roomMatches(room,q){
 const hay=normalize([room.title,room.intro,...(room.keywords||[])].join(" "));
 return !q||hay.includes(normalize(q));
}

function renderRooms(query=""){
 const matches=rooms.filter(r=>roomMatches(r,query));
 $("#roomGrid").innerHTML=matches.map(r=>`<article class="room-card" tabindex="0" data-room="${r.id}">
 <span class="number">${r.number}</span><h3>${r.title}</h3><p>${r.intro}</p><span class="room-arrow">Explorar →</span></article>`).join("")||
 `<div class="room-empty"><strong>No encontramos esa puerta.</strong><span>Probá con otra palabra.</span></div>`;
 searchCount.textContent=query?`${matches.length} sala${matches.length===1?"":"s"} encontrada${matches.length===1?"":"s"}`:"";
}

const journey=[
 ["01","DESCUBRIR","Entrar sin necesitar saber nada."],
 ["02","EXPLORAR","Elegir una puerta y seguir una curiosidad."],
 ["03","INTERACTUAR","Tocar, comparar, escuchar, encontrar."],
 ["04","APRENDER","Comprender el contexto detrás de cada pieza."],
 ["05","RECORDAR","Relacionar lo visto con una historia propia."]
];
$("#timeline").innerHTML=journey.map(x=>`<div class="timeline-item"><small>${x[0]}</small><strong>${x[1]}</strong><small>${x[2]}</small></div>`).join("");

function renderCatalogStatus(){
 const stats=[
  ["Salas",rooms.length],
  ["Piezas",museumData.pieces.length],
  ["Lugares",museumData.places.length],
  ["Fuentes",museumData.sources.length]
 ];
 $("#catalogStatus").innerHTML=`<div><span>ESTADO DEL CATÁLOGO</span><strong>Motor ${museumData.meta.version}</strong></div>${stats.map(s=>`<div><small>${s[0]}</small><b>${s[1]}</b></div>`).join("")}`;
}

function renderMap(){const el=$("#mapEngine");if(!museumData.places.length){$("#mapEmpty").style.display="block";return;}$("#mapEmpty").style.display="none";museumData.places.forEach((p,i)=>{const a=i/museumData.places.length*Math.PI*2;const x=50+Math.cos(a)*32,y=50+Math.sin(a)*32;el.insertAdjacentHTML("beforeend","<button class=\"map-place\" style=\"left:"+x+"%;top:"+y+"%\" data-place=\""+p.id+"\"><span>"+p.title+"</span></button>");});}
function renderRelations(entity){const out=[];for(const rel of museumData.relations.filter(r=>r.from===entity.id||r.to===entity.id)){const otherId=rel.from===entity.id?rel.to:rel.from;const other=[...museumData.pieces,...museumData.people,...museumData.places,...museumData.events,...museumData.collections].find(x=>x.id===otherId);if(other)out.push("<span>"+(rel.label||"Relacionado")+" · "+(other.title||other.name)+"</span>");}return out.length?out:["<span>Sin relaciones documentadas todavía</span>"];}
renderMap();
function renderCollections(filter="all"){
 const pieces=museumData.pieces.filter(p=>filter==="all"||p.type===filter);
 $("#collectionGrid").innerHTML=pieces.length?pieces.map(pieceCard).join(""):`<div class="collection-empty"><span>◇</span><strong>La colección está abierta.</strong><p>Todavía no hay piezas publicadas. El motor ya está preparado para recibir materiales documentados sin rehacer la interfaz.</p></div>`;
}

function pieceCard(p){
 return `<article class="piece-card"><div class="piece-placeholder">${pieceTypes[p.type]||"Pieza"}</div><div class="piece-body"><small>${p.status||"Pendiente de catalogación"}</small><h3>${p.title}</h3><p>${p.description||""}</p><button class="text-link" data-piece="${p.id}">Abrir ficha →</button></div></article>`;
}

function showStage(title,intro,meta=""){
 breadcrumb.textContent=`Museo / ${title}`;
 stage.querySelector(".empty-piece")?.remove();
 const old=stage.querySelector(".dynamic-stage"); if(old)old.remove();
 stage.insertAdjacentHTML("beforeend",`<div class="empty-piece dynamic-stage"><span class="piece-icon">◇</span>${meta}<h2>${title}</h2><p>${intro}</p></div>`);
 stage.scrollIntoView({behavior:"smooth",block:"center"});
}

function openRoom(id){
 const r=rooms.find(x=>x.id===id);if(!r)return;
 showStage(r.title,r.intro,`<p class="eyebrow">SALA ${r.number}</p>`);
 history.replaceState(null,"",`#sala-${r.id}`);
}

renderRooms();
renderCatalogStatus();
renderCollections();

$(".collection-tools")?.addEventListener("click",e=>{
 const b=e.target.closest(".filter");if(!b)return;
 document.querySelectorAll(".filter").forEach(x=>x.classList.remove("active"));
 b.classList.add("active");renderCollections(b.dataset.filter);
});

$("#roomGrid").addEventListener("click",e=>{const c=e.target.closest("[data-room]");if(c)openRoom(c.dataset.room)});
$("#roomGrid").addEventListener("keydown",e=>{if((e.key==="Enter"||e.key===" ")&&e.target.closest("[data-room]")){e.preventDefault();openRoom(e.target.closest("[data-room]").dataset.room)}});

search.addEventListener("input",e=>renderRooms(e.target.value.trim()));

const menu=$("#menuButton"),nav=$("#mainNav");
menu.addEventListener("click",()=>{const open=nav.classList.toggle("open");menu.setAttribute("aria-expanded",String(open))});
nav.addEventListener("click",e=>{if(e.target.matches("a")){nav.classList.remove("open");menu.setAttribute("aria-expanded","false")}});

const modal=$("#contributeModal");
function closeModal(){modal.hidden=true}
$("#contributeButton").addEventListener("click",()=>modal.hidden=false);
modal.addEventListener("click",e=>{if(e.target.hasAttribute("data-close"))closeModal()});
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeModal()});

document.addEventListener("click",e=>{
 const b=e.target.closest("[data-piece]");if(!b)return;
 const p=museumData.pieces.find(x=>x.id===b.dataset.piece);if(!p)return;
 showStage(p.title,p.description||"",`<p class="eyebrow">${pieceTypes[p.type]||"PIEZA"}</p><div class="record-meta"><span>Estado: ${p.status||"pendiente"}</span><span>Fuente: ${p.source||"pendiente de documentación"}</span></div>`);
});

function routeFromHash(){
 const hash=location.hash.replace("#","");
 if(hash.startsWith("sala-"))openRoom(hash.slice(5));
}
window.addEventListener("hashchange",routeFromHash);
routeFromHash();