export const museum = {
  meta: {
    id: "museo-san-patricio-del-chanar",
    name: "Museo Virtual de San Patricio del Chañar",
    version: "0.4.0",
    status: "active-foundation",
    rule: "simple-public-interface-deep-internal-architecture",
    editorial: "Las afirmaciones históricas se mantienen vinculadas a fuentes. Los recuerdos y testimonios se distinguen de los hechos documentados."
  },

  doors: [
    { id:"conocer", label:"Conocer", kind:"history", description:"Una línea del tiempo para entender cómo se fue construyendo la localidad." },
    { id:"descubrir", label:"Descubrir", kind:"people-places", description:"Personas, familias, instituciones y lugares que forman parte de la historia local." },
    { id:"explorar", label:"Explorar", kind:"collections", description:"Piezas, documentos y registros que permiten mirar la historia desde cerca." }
  ],

  periods: [
    { id:"p1", title:"Antes de la ciudad", shortDescription:"El territorio, los nombres y las primeras referencias al paraje.", dateLabel:"Antes de 1973", type:"period" },
    { id:"p2", title:"Nacimiento institucional", shortDescription:"La creación de la Comisión de Fomento y la organización de la localidad.", dateLabel:"1973–1974", type:"period" },
    { id:"p3", title:"Chacras y comunidad", shortDescription:"Riego, producción, escuelas, clubes y vida comunitaria.", dateLabel:"1975–1989", type:"period" },
    { id:"p4", title:"Una ciudad que crece", shortDescription:"Nuevas categorías institucionales y transformación productiva.", dateLabel:"1990–2009", type:"period" },
    { id:"p5", title:"Patrimonio y presente", shortDescription:"Cultura, turismo, producción y memoria en una localidad contemporánea.", dateLabel:"2010–presente", type:"period" }
  ],

  events: [
    { id:"e1973", title:"Fundación de San Patricio del Chañar", shortDescription:"La Carta Orgánica Municipal reconoce el 21 de mayo de 1973 como fecha de fundación.", dateLabel:"21 de mayo de 1973", type:"event", periodId:"p2", sourceIds:["s-carta","s-provincia"] },
    { id:"e1974", title:"Comienza a funcionar la Comisión de Fomento", shortDescription:"Las autoridades de la nueva Comisión de Fomento comienzan a funcionar y se inaugura la comisaría.", dateLabel:"8 de abril de 1974", type:"event", periodId:"p2", sourceIds:["s-neuquen-informa"] },
    { id:"e1975", title:"Primeras cantidades industriales de fruta", shortDescription:"Una referencia histórica provincial señala que al año siguiente de la puesta en funciones se produjeron las primeras cantidades industriales de fruta.", dateLabel:"1975", type:"event", periodId:"p3", sourceIds:["s-neuquen-informa"] },
    { id:"e1975club", title:"Nace el Club Atlético San Patricio", shortDescription:"La misma reseña histórica ubica en 1975 la fundación del Club Atlético San Patricio.", dateLabel:"1975", type:"event", periodId:"p3", sourceIds:["s-neuquen-informa"] },
    { id:"e1978", title:"Municipalidad de tercera categoría", shortDescription:"La Ley provincial Nº 1.106 establece el paso a municipalidad de tercera categoría.", dateLabel:"1978", type:"event", periodId:"p3", sourceIds:["s-neuquen-informa"] },
    { id:"e1985", title:"Primera Fiesta Provincial del Pelón", shortDescription:"El municipio señala que la fiesta fue inaugurada en 1985 como homenaje a uno de los frutos emblemáticos de la localidad.", dateLabel:"1985", type:"event", periodId:"p3", sourceIds:["s-municipio"] },
    { id:"e1987", title:"Municipio de segunda categoría", shortDescription:"La Ley Nº 1.700 eleva la categoría municipal.", dateLabel:"1987", type:"event", periodId:"p3", sourceIds:["s-neuquen-informa"] },
    { id:"e2003", title:"Municipio de primera categoría", shortDescription:"La Ley Nº 2.435 reconoce a San Patricio del Chañar su jerarquía actual de municipio de primera categoría.", dateLabel:"31 de julio de 2003", type:"event", periodId:"p4", sourceIds:["s-neuquen-informa","s-carta"] },
    { id:"e2003stadium", title:"Segunda inauguración del Estadio Municipal", shortDescription:"El municipio registra una segunda inauguración del Estadio Municipal Juan Bautista Jara con la visita del arquero Sergio Goycochea.", dateLabel:"27 de septiembre de 2003", type:"event", periodId:"p4", sourceIds:["s-municipio"] }
  ],

  people: [
    { id:"person-gasparri", title:"Roberto Gasparri", shortDescription:"Ingeniero vinculado al proceso de desarrollo de las tierras que luego darían lugar a la localidad.", type:"person", sourceIds:["s-neuquen-informa","s-legislatura"] }
  ],

  places: [
    { id:"place-rio-neuquen", title:"Río Neuquén", shortDescription:"El río es parte del territorio y de la historia del desarrollo productivo local.", type:"place", sourceIds:["s-municipio"] },
    { id:"place-mirador", title:"Mirador La Virgen", shortDescription:"Punto desde el que se observa el valle productivo y la transformación del paisaje.", type:"place", sourceIds:["s-municipio"] },
    { id:"place-centro-cultural", title:"Centro Cultural Erika Barión de Werro", shortDescription:"Espacio cultural inaugurado en 2013 para actividades y espectáculos de la comunidad.", type:"place", sourceIds:["s-municipio"] },
    { id:"place-estadio", title:"Estadio Municipal Juan Bautista Jara", shortDescription:"Espacio deportivo y lugar de construcción de identidad comunitaria.", type:"place", sourceIds:["s-municipio"] }
  ],

  institutions: [
    { id:"inst-municipio", title:"Municipalidad de San Patricio del Chañar", shortDescription:"Institución municipal y fuente de información contemporánea sobre la ciudad.", type:"institution", sourceIds:["s-municipio"] },
    { id:"inst-club", title:"Club Atlético San Patricio", shortDescription:"Institución deportiva cuya historia local se remonta a 1975 según una reseña provincial.", type:"institution", sourceIds:["s-neuquen-informa"] }
  ],

  objects: [
    { id:"obj-escudo", title:"Escudo de la ciudad", shortDescription:"Símbolo oficial de San Patricio del Chañar reconocido por su Carta Orgánica.", type:"object", dateLabel:"Carta Orgánica Municipal", sourceIds:["s-carta"] }
  ],

  documents: [
    { id:"doc-carta", title:"Carta Orgánica Municipal", shortDescription:"Documento jurídico que fija, entre otros aspectos, el nombre oficial y la fecha de fundación reconocida por la ciudad.", type:"document", dateLabel:"2004", sourceIds:["s-carta"] }
  ],

  photographs: [],
  audios: [],
  videos: [],
  testimonies: [],

  journeys: [
    {
      id:"journey-origen",
      title:"De paraje a ciudad",
      description:"Un recorrido breve por algunos hitos documentados para entender cómo se construyó San Patricio del Chañar.",
      eventIds:["e1973","e1974","e1975","e1978","e1985","e1987","e2003"]
    },
    {
      id:"journey-lugares",
      title:"Lugares que cuentan",
      description:"Una primera mirada a espacios que ayudan a reconocer la identidad local.",
      placeIds:["place-rio-neuquen","place-mirador","place-centro-cultural","place-estadio"]
    }
  ],

  relations: [
    { id:"r1", fromId:"e1973", toId:"person-gasparri", type:"context", label:"Contexto histórico", description:"Las fuentes históricas vinculan el nombre y el proceso de poblamiento con la familia Gasparri.", sourceIds:["s-neuquen-informa"] },
    { id:"r2", fromId:"e1975club", toId:"inst-club", type:"institution", label:"Institución", description:"La reseña provincial ubica al Club Atlético San Patricio en 1975.", sourceIds:["s-neuquen-informa"] },
    { id:"r3", fromId:"doc-carta", toId:"obj-escudo", type:"document", label:"Documento / símbolo", description:"La Carta Orgánica reconoce el escudo de la ciudad como símbolo oficial.", sourceIds:["s-carta"] },
    { id:"r4", fromId:"e2003", toId:"doc-carta", type:"context", label:"Marco institucional", description:"La historia institucional de la localidad queda reflejada en normas y documentos oficiales.", sourceIds:["s-carta"] }
  ],

  sources: [
    { id:"s-carta", title:"Carta Orgánica Municipal de San Patricio del Chañar", author:"Municipalidad / Provincia del Neuquén", publisher:"Boletín Oficial de la Provincia del Neuquén", date:"2004", url:"https://infoleg.neuquen.gob.ar/Boletines/bo06092903001a.pdf", type:"documento oficial", citation:"Carta Orgánica Municipal, arts. 1–3 y disposiciones sobre patrimonio." },
    { id:"s-neuquen-informa", title:"Reseña histórica de San Patricio del Chañar", author:"Gobierno de la Provincia del Neuquén", publisher:"Neuquén Informa", date:"2014", url:"https://www.neuqueninforma.gob.ar/noticias/2014/05/22/48785-jorge-sapag-asistira-al-41-aniversario-de-san-patricio-del-chanar", type:"fuente provincial", citation:"Reseña histórica publicada con motivo del aniversario de la localidad." },
    { id:"s-provincia", title:"Historia de San Patricio del Chañar", author:"Gobierno de la Provincia del Neuquén", publisher:"Neuquén Informa", date:"2013", url:"https://www.neuqueninforma.gob.ar/noticias/2013/05/17/29151-ana-pechen-preside-la-ceremonia-aniversario-de-san-patricio-del-chanar", type:"fuente provincial", citation:"Historia y desarrollo productivo e institucional de la localidad." },
    { id:"s-municipio", title:"Nuestra ciudad / Qué hacer", author:"Municipalidad de San Patricio del Chañar", publisher:"Municipalidad de San Patricio del Chañar", date:"actual", url:"https://sanpatricio.gob.ar/nuestra", type:"fuente municipal", citation:"Información institucional y patrimonial contemporánea." },
    { id:"s-legislatura", title:"51º aniversario de San Patricio del Chañar", author:"Honorable Legislatura del Neuquén", publisher:"Legislatura del Neuquén", date:"2024", url:"https://www.legislaturaneuquen.gob.ar/SVRFILES/Neuleg/DiariosSesion/DS_Anexo_P_63_R2365_87265.pdf", type:"fuente legislativa", citation:"Reseña presentada ante la Legislatura Provincial." }
  ]
};

export const pieceSchema = {
  id:"string-unico", type:"piece-type", title:"", shortDescription:"", description:"",
  date:{label:"",start:null,end:null,precision:"unknown"}, placeIds:[], personIds:[],
  institutionIds:[], eventIds:[], periodIds:[], media:[], sourceIds:[], relationIds:[],
  provenance:"", rights:"", verification:"unverified", status:"draft", tags:[]
};

export function getDoor(id){ return museum.doors.find(door=>door.id===id) ?? null; }

const groups=["periods","events","people","places","institutions","objects","documents","photographs","audios","videos","testimonies"];
export function allPieces(){ return groups.flatMap(type=>(museum[type]||[]).map(piece=>({...piece,type}))); }
export function findPiece(id){ return allPieces().find(piece=>piece.id===id) ?? null; }
export function relatedTo(id){ return museum.relations.filter(r=>r.fromId===id||r.toId===id); }
export function getSource(id){ return museum.sources.find(s=>s.id===id) ?? null; }
export function sourcesFor(piece){ return (piece?.sourceIds||[]).map(getSource).filter(Boolean); }
