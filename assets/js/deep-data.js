export const deepData = {
  galleries:[
    {id:"g-origen-territorio",title:"Antes de la ciudad",kicker:"1966–1972",intro:"Antes de la fundación institucional existía un territorio de riego, tierras productivas y un paraje conocido como El Chañar.",color:"earth",
      chapters:[
        {year:"1966",title:"La concesión de riego",text:"Una reseña legislativa ubica en 1966 la concesión de riego del campo El Chañar. Es uno de los antecedentes que permite mirar la historia local como un proceso anterior a 1973.",sourceIds:["s-legislatura-2019"]},
        {year:"1968",title:"La llegada de Gasparri",text:"Fuentes legislativas sitúan en 1968 la toma de posesión de tierras por la firma Gasparri y el inicio de relevamientos de suelo. Otra reseña provincial identifica a Roberto Gasparri como figura pionera.",sourceIds:["s-legislatura-2019","s-legislatura-2024"]},
        {year:"1969–1971",title:"El agua transforma el paisaje",text:"Las fuentes consultadas señalan la concreción del proyecto de riego en 1969 y el comienzo de obras de riego a mayor escala en 1971. El agua es, por eso, una de las claves narrativas del nacimiento productivo del Chañar.",sourceIds:["s-legislatura-2019","s-legislatura-2024"]}
      ]},
    {id:"g-nacimiento",title:"Nace una localidad",kicker:"1973–1978",intro:"Fundación, autoridades, comisaría, riego y primeras instituciones.",color:"institution",
      chapters:[
        {year:"1973",title:"21 de mayo",text:"La fecha reconocida institucionalmente como fundación de San Patricio del Chañar.",sourceIds:["s-carta","s-neuquen-2014"]},
        {year:"1974",title:"La primera estructura comunitaria",text:"El 8 de abril de 1974 comenzaron a funcionar las autoridades de la Comisión de Fomento; durante la ceremonia se inauguró la comisaría y luego se creó el consorcio de riego.",sourceIds:["s-neuquen-2014"]},
        {year:"1975",title:"Producción y comunidad",text:"Una reseña provincial registra las primeras cantidades industriales de fruta y la fundación del Club Atlético San Patricio en 1975.",sourceIds:["s-neuquen-2014"]},
        {year:"1978",title:"Municipalidad",text:"La Ley provincial 1.106 llevó a San Patricio del Chañar a la categoría de municipalidad de tercera categoría.",sourceIds:["s-neuquen-2013"]}
      ]},
    {id:"g-comunidad",title:"Chacras, instituciones y vida cotidiana",kicker:"1975–1989",intro:"La historia de un pueblo también se construye en escuelas, clubes, riego, calles, fiestas y encuentros.",color:"community",
      chapters:[
        {year:"1975",title:"El club como lugar de encuentro",text:"La fundación del Club Atlético San Patricio aparece en fuentes provinciales como uno de los primeros hitos comunitarios de la localidad.",sourceIds:["s-neuquen-2014"]},
        {year:"1985",title:"Fiesta Provincial del Pelón",text:"La Municipalidad ubica en 1985 la inauguración de la Fiesta Provincial del Pelón, vinculada a uno de los frutos emblemáticos de la localidad.",sourceIds:["s-municipio"]},
        {year:"1987",title:"Segunda categoría",text:"La Ley provincial 1.700 elevó la categoría municipal.",sourceIds:["s-neuquen-2013"]}
      ]},
    {id:"g-ciudad",title:"De pueblo productivo a ciudad",kicker:"1990–2009",intro:"Cambian la escala urbana, las instituciones y la identidad productiva.",color:"growth",
      chapters:[
        {year:"2000",title:"Primer partido oficial en el Estadio",text:"La Municipalidad registra el 24 de septiembre de 2000 como fecha del primer partido oficial del actual Estadio Municipal Juan Bautista Jara.",sourceIds:["s-municipio"]},
        {year:"2003",title:"Primera categoría",text:"El 31 de julio de 2003 la Ley 2.435 reconoció a San Patricio del Chañar como municipio de primera categoría.",sourceIds:["s-neuquen-2013"]},
        {year:"2003",title:"Segunda inauguración del Estadio",text:"El 27 de septiembre de 2003 se realizó una segunda inauguración del Estadio Municipal Juan Bautista Jara con la visita del arquero Sergio Goycochea.",sourceIds:["s-municipio"]},
        {year:"2004",title:"Carta Orgánica",text:"La Carta Orgánica se convierte en una pieza fundamental para estudiar la organización institucional y el patrimonio de la ciudad.",sourceIds:["s-carta"]}
      ]},
    {id:"g-presente",title:"Patrimonio, cultura y presente",kicker:"2010–hoy",intro:"El museo no termina en la fundación: también debe documentar la ciudad que sus vecinos están construyendo.",color:"present",
      chapters:[
        {year:"2013",title:"Centro Cultural Erika Barión de Werro",text:"La Municipalidad registra la inauguración del Centro Cultural en 2013 como espacio para actividades culturales y espectáculos.",sourceIds:["s-municipio"]},
        {year:"2022",title:"Plaza de las Infancias",text:"La Plaza de las Infancias fue restaurada en 2022 como espacio urbano y lúdico.",sourceIds:["s-municipio"]},
        {year:"2023",title:"Campus tecnológico",text:"El antiguo predio proyectado para un frigorífico fue reconvertido para albergar un campus educativo tecnológico, según información provincial.",sourceIds:["s-neuquen-campus"]}
      ]}
  ],
  lenses:[
    {id:"l-agua",title:"El agua",text:"Una mirada transversal: concesión de riego, obras, consorcio y transformación de un paisaje árido en territorio productivo.",eventIds:["e1974","e1975"]},
    {id:"l-comunidad",title:"La comunidad",text:"Clubes, escuelas, fiestas, cultura y espacios deportivos muestran que una ciudad no se explica solamente por su producción.",eventIds:["e1975club","e1985","e2003stadium"]},
    {id:"l-instituciones",title:"Las instituciones",text:"Fundación, Comisión de Fomento, categorías municipales y Carta Orgánica permiten seguir el crecimiento institucional.",eventIds:["e1973","e1974","e1978","e1987","e2003"]},
    {id:"l-paisaje",title:"El paisaje",text:"Río, bardas, chacras, caminos y espacios urbanos permiten contar la transformación territorial.",placeIds:["place-rio-neuquen","place-mirador"]}
  ],
  sourceAdditions:[
    {id:"s-legislatura-2019",title:"46.º aniversario de San Patricio del Chañar",author:"Honorable Legislatura del Neuquén",publisher:"Legislatura del Neuquén",date:"2019",url:"https://www.legislaturaneuquen.gob.ar/SVRFILES/hln/documentos/DiaSesio/XLVIII/DXLVIII_08.pdf",type:"fuente legislativa",citation:"Reseña histórica presentada en la Legislatura Provincial."},
    {id:"s-legislatura-2024",title:"51º aniversario de San Patricio del Chañar",author:"Honorable Legislatura del Neuquén",publisher:"Legislatura del Neuquén",date:"2024",url:"https://www.legislaturaneuquen.gob.ar/SVRFILES/Neuleg/DiariosSesion/DS_Anexo_P_63_R2365_87265.pdf",type:"fuente legislativa",citation:"Reseña histórica presentada en 2024."},
    {id:"s-neuquen-campus",title:"Campus tecnológico para el desarrollo de la economía del conocimiento",author:"Gobierno de la Provincia del Neuquén",publisher:"Neuquén Informa",date:"2023",url:"https://www.neuqueninforma.gob.ar/noticias/2023/11/14/224205-inauguraron-campus-tecnologico-para-el-desarrollo-de-la-economia-del-conocimiento",type:"fuente provincial",citation:"Información sobre la reconversión del ex frigorífico municipal y el campus tecnológico."}
  ]
};