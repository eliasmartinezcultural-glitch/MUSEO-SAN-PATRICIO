const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const state={collections:[],records:[],mode:"",active:0};
const modes={
 agua:{tag:"AGUA · RÍO · RIEGO",title:"Agua",text:"El agua permite leer el territorio desde el río Neuquén, el riego, el paisaje y las formas de vida que se desarrollaron alrededor de ellos.",visual:"linear-gradient(145deg,#3e7e87 0%,#163d3b 62%,#b6a66d 100%)",items:[
  ["Río Neuquén","El curso de agua como referencia territorial.","agua"],
  ["Riego","Canales, obras y transformación del paisaje.","agua"],
  ["Paisaje","El encuentro entre agua, tierra y producción.","agua"],
  ["Fuentes","Documentos, mapas y evidencia disponible.","fuentes"]
 ]},
 tierra:{tag:"TIERRA · CHACRAS · NATURALEZA",title:"Tierra",text:"Chacras, bardas, caminos, cultivos y naturaleza forman una trama visible. Cada imagen puede abrir una historia más extensa.",visual:"linear-gradient(145deg,#b78e58 0%,#5d4931 62%,#d8c18c 100%)",items:[
  ["Chacras","El paisaje agrario y sus transformaciones.","chacras"],
  ["Bardas","El límite entre valle, meseta y paisaje.","bardas"],
  ["Fauna y flora","Lo vivo que comparte este territorio.","naturaleza"],
  ["Tiempo profundo","Geología, fósiles y paleontología.","tiempo"]
 ]},
 memoria:{tag:"PERSONAS · OBJETOS · VOCES",title:"Memoria",text:"El museo crece con fotografías familiares, documentos, objetos y testimonios. Recuerdo y evidencia se presentan como cosas distintas.",visual:"linear-gradient(145deg,#936e5d 0%,#3d302c 62%,#cdb08d 100%)",items:[
  ["Personas","Historias de quienes hicieron y hacen el lugar.","personas"],
  ["Fotografías","Imágenes fechadas, atribuidas y contextualizadas.","fotografias"],
  ["Documentos","Mensuras, mapas y registros para investigar.","documentos"],
  ["Voces","Testimonios identificados como testimonios.","testimonios"]
 ]},
 presente:{tag:"PUEBLO · VIDA · PRESENTE",title:"Hoy",text:"El museo también observa el presente: calles, espacios comunes, arquitectura, naturaleza y vida cotidiana. Lo actual también será memoria.",visual:"linear-gradient(145deg,#6c9892 0%,#1c3835 62%,#c7b477 100%)",items:[
  ["Pueblo","Calles, barrios y espacios compartidos.","pueblo"],
  ["Lugares","Puntos que ayudan a orientarse en el territorio.","lugares"],
  ["Naturaleza","Río, aves, vegetación y paisajes actuales.","naturaleza"],
  ["Mapa","El territorio como forma de comprender.","mapa"]
 ]}
};
const detail={
"Río Neuquén":["Una entrada para entender agua, paisaje y vida.","La profundidad documental se construye con fotografías, mapas y fuentes verificables."],
"Riego":["El paisaje productivo no aparece separado del agua.","La investigación puede conectar obras, canales, parcelas y transformaciones sin llenar la portada de texto."],
"Chacras":["Las parcelas, caminos y alamedas forman una estructura reconocible del paisaje agrario.","Las fuentes ambientales y territoriales permiten ampliar esta mirada."],
"Fauna y flora":["La naturaleza se presenta con identificación, fotografía y contexto.","No se incorporan especies ni afirmaciones sin fuente."],
"Tiempo profundo":["La geología y la paleontología permiten mirar mucho más atrás que la historia reciente.","Panamericansaurus schroederi es una de las piezas documentales que puede abrir esta línea."],
"Personas":["Una historia personal puede ser una puerta, no una tarjeta más.","Cada registro debe distinguir fuente, fecha, autoría y tipo de testimonio."],
"Fotografías":["La fotografía funciona como documento cuando se conoce su procedencia y contexto.","Autoría, fecha y permisos forman parte de la pieza."],
"Documentos":["Mapas, mensuras y registros ayudan a reconstruir cambios territoriales.","La fuente queda visible cuando se profundiza."],
"Voces":["El testimonio tiene valor como memoria y debe presentarse como testimonio.","No se transforma una versión personal en hecho histórico sin evidencia independiente."],
"Pueblo":["El presente se observa desde lugares concretos y experiencias cotidianas.","La portada muestra poco; la puerta permite investigar mucho."],
"Lugares":["Un punto del mapa puede reunir fotografías, documentos, historias y cambios en el tiempo.","La navegación mantiene el territorio como hilo conductor."],
"Naturaleza":["Río, aves, vegetación y paisaje forman parte del presente local.","La información sensible o incierta se marca como tal."],
"Mapa":["El mapa no es decoración: organiza relaciones entre lugares, caminos, agua y memoria.","La profundidad puede sumar capas sin complicar la entrada."]
};
function openMode(mode){
 const d=modes[mode]; if(!d)return;
 state.mode=mode; state.active=0;
 $("#drawerKicker").textContent=d.tag;$("#drawerTitle").textContent=d.title;$("#drawerText").textContent=d.text;
 $("#drawerVisual").style.background=d.visual;
 $("#drawerList").innerHTML=d.items.map((x,i)=>'<button data-depth="'+i+'" class="'+(i===0?"active":"")+'"><b>'+x[0]+'</b><small>'+x[1]+'</small></button>').join("");
 renderDepth();
 $("#drawer").classList.add("open");$("#drawer").setAttribute("aria-hidden","false");
}
function renderDepth(){
 const item=modes[state.mode].items[state.active], title=item[0], d=detail[title]||["Esta línea queda abierta para investigación y documentación.","La experiencia pública prioriza claridad; la profundidad conserva el material."];
 $("#depthPanel").innerHTML='<h3>'+title+'</h3><p>'+d[0]+'</p><p>'+d[1]+'</p><div class="source"><b>CAPA PROFUNDA</b><br>Fuentes, imágenes, documentos y relaciones aparecen aquí, no en la portada.</div>';
 $$("[data-depth]").forEach((b,i)=>b.classList.toggle("active",i===state.active));
}
$$("[data-mode]").forEach(b=>b.addEventListener("click",()=>openMode(b.dataset.mode)));
$("#enter").addEventListener("click",()=>$("#explorar").scrollIntoView({behavior:"smooth"}));
$("#closeDrawer").addEventListener("click",()=>{$("#drawer").classList.remove("open");$("#drawer").setAttribute("aria-hidden","true")});
$("#drawer").addEventListener("click",e=>{const b=e.target.closest("[data-depth]");if(b){state.active=+b.dataset.depth;renderDepth()}});
const panel=$("#searchPanel");
$("#openSearch").addEventListener("click",()=>{panel.classList.add("open");setTimeout(()=>$("#searchInput").focus(),80)});
$("#closeSearch").addEventListener("click",()=>panel.classList.remove("open"));
async function loadData(){
 try{const[c,t]=await Promise.all([fetch("data/collections.json").then(r=>r.json()),fetch("data/territory-depth.json").then(r=>r.json())]);state.collections=c.collections||[];state.records=t.records||[]}catch(e){console.warn("Datos profundos no disponibles",e)}
}
loadData();
$("#searchInput").addEventListener("input",e=>{
 const q=e.target.value.trim().toLowerCase();
 if(!q){$("#searchResults").innerHTML="";return}
 const all=[...state.records.map(r=>({t:r.title||"",d:r.period||r.layer||""})),...state.collections.map(c=>({t:c.title||"",d:c.subtitle||""}))];
 const found=all.filter(x=>(x.t+" "+x.d).toLowerCase().includes(q)).slice(0,8);
 $("#searchResults").innerHTML=found.length?found.map(x=>'<div class="result"><b>'+x.t+'</b><small>'+x.d+'</small></div>').join(""):"<p>No encontramos esa palabra todavía. Probá otra puerta.</p>";
});
document.addEventListener("keydown",e=>{if(e.key==="Escape"){$("#drawer").classList.remove("open");panel.classList.remove("open")}});
