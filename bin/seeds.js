const mongoose = require("mongoose");
const poi = require('../models/PlaceOfInterest');
const route = require('../models/Routes');

mongoose.connect('mongodb://localhost/turisteo', {useNewUrlParser: true})
.then(x => {
  console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`);
})
.catch(err => {
  console.error('Error connecting to mongo', err);
});

places = [
  {
    name: 'Puerta del Sol',
    description: 'Plaza con una estatua ecuestre del rey Carlos III y kilómetro 0 de las carreteras radiales españolas.',
    location: {type: 'Point', coordinates: [40.4171525,-3.7070937]},
    photo: '../public/images/puerta-del-sol-madrid.jpg'
  },
  {
    name: 'Plaza de España',
    description: 'Plaza arbolada rodeada de construcciones imponentes, con una estatua ecuestre de Cervantes de piedra y bronce.',
    location: {type: 'Point', coordinates: [40.421988,-3.7110311]},
    photo: '../public/images/plaza-de-espana-madrid.jpg'
  },
  {
    name: 'Templo de Debod',
    description: 'Antiguo templo egipcio traído de Asuán reconstruido, con museo y vistas al atardecer desde un parque.',
    location: {type: 'Point', coordinates: [40.4240216,-3.7199582]},
    photo: '../public/images/templo-de-debod-madrid.jpg'
  },
  {
    name: 'Plaza Mayor',
    description: 'La Plaza Mayor de Madrid es uno de los lugares más representativos y emblemáticos de la capital y donde uno puede encontrarse todo tipo de eventos.',
    location: {type: 'Point', coordinates: [40.4153754,-3.7093746]},
    photo: '../public/images/plaza-mayor-madrid.jpg'
  },
  {
    name: 'Plaza de la Villa',
    description: 'Plaza de la Villa es una pequeña plaza ubicada junto a la calle Mayor, rodeada por edificios de variados estilos arquitectónicos, entre los que predomina el barroco. Se destacan la Torre de los Lujanes, la Casa de la Villa (fue sede del ayuntameinto) y la Casa del Cardenal Cisneros entre otras importantes construcciones.',
    location: {type: 'Point', coordinates: [40.4152466,-3.7124183]},
    photo: '../public/images/Plaza-De-La-Villa-madrid.jpg'
  },
  {
    name: 'Plaza de Oriente',
    description: 'La Plaza de Oriente fue proyectada por José Bonaparte, pero se terminó su construcción en 1844. Esta plaza se encuentra frente al Palacio Real, los Jardines de Sabatini y el Teatro Real. Esta plaza destaca por los jardines histórico-artísticos, tiene una riquísima y preciosa colección de esculturas en los laterales del mismo.',
    location: {type: 'Point', coordinates: [40.4183493,-3.7145888]},
    photo: '../public/images/plaza-oriente-madrid.jpg'
  },
  {
    name: 'Teatro Real de la Ópera',
    description:'El Teatro Real de la Ópera es considerado como uno de los más valiosos y hermosos de Europa. Su construcción de estilo clásico fue impulsada por la reina Isabel II y se inauguró en 1850. En el interior del edificio trabajaron grandes artistas y decoradores de la época.',
    location: {type: 'Point', coordinates: [40.4183493,-3.7145888]},
    photo: '../public/images/teatro-real-madrid.jpg'
  },
  {
    name: 'Catedral de la Almudena',
    description: 'Es el edificio religioso más importante de la capital. En el interior de la misma se combinan distintos estilos arquitectónicos: neogótico en el interior, neoclásico en el exterior y neorrománico en la cripta.',
    location: {type: 'Point', coordinates: [40.4169131,-3.7143259]},
    photo: '../public/images/catedral-almudena-madrid.jpg'
  },
  {
    name: 'Palacio Real',
    description: 'El Palacio Real de Madrid, o Palacio de Oriente, es probablemente el mayor atractivo del patrimonio de Madrid. Es la residencia oficial de los Reyes de España, y está considerado el mayor palacio real de toda Europa Occidental por su extensión.',
    location: {type: 'Point', coordinates: [40.4177381,-3.7142616]},
    photo: '../public/images/palacio-real-madrid.jpg'
  },
  {
    name: 'Jardines de Sabatini',
    description: 'Su ubicación junto al Palacio Real hace que sea uno de los jardines más visitados, perfecto para disfrutar de un atardecer. Con pequeños laberintos, estatuas junto al estanque, bancos de madera o de piedra… ',
    location: {type: 'Point', coordinates:[40.4184651,-3.7142508]},
    photo: '../public/images/jardines-sabatini-madrid.jpg'
  },
  {
    name: 'Museo del Prado',
    description: 'Es probablemente la mayor atracción turística de Madrid y una de los museos de pintura más importantes del mundo. Se destaca el Prado por las obras de los grandes maestros europeos (siglos XVI al XIX), como: Velázquez, Tiziano, Goya, y Rubens.',
    location: {type: 'Point', coordinates: [40.4137818,-3.6943158]},
    photo: '../public/images/museo-prado-madrid.jpg'
  },
  {
    name: 'Museo Nacional Centro de Arte Reina Sofía',
    description: 'El Museo Nacional Centro de Arte Reina Sofía es el complemento perfecto al Museo del Prado, ya que aquí se exponen pinturas modernas y contemporáneas: como las de los geniales Salvador Dalí y Joan Miró. La obra más destacada es el impactante Guernica de Pablo Picasso.',
    location: {type: 'Point', coordinates:[40.4101894,-3.6941902]},
    photo: '../public/images/museo-reina-sofia-madrid.jpg'
  },
  {
    name: 'Museo Thyssen-Bornemisza',
    description: 'Desde 1992, el Palacio de Villahermosa remodelado y rebautizado como el Museo Thyssen-Bornemisza abrió sus puertas para ofrecer a los visitantes de Madrid una visita a la colección privada de arte en pintura más grande de Europa que actualmente cuenta con más de 200 obras y fue adquirida por el Estado Español, para beneplácito de sus visitantes.',
    location: {type: 'Point', coordinates: [40.4143487,-3.6939588]},
    photo: '../public/images/museo-thyssen-madrid.jpg'
  },
  {
    name: 'Círculo de Bellas Artes',
    description: 'El círculo de Bellas Artes de Madrid es un centro cultural privado en el que se pueden encontrar diversas exposiciones en las más variadas formas de arte.',
    location: {type: 'Point', coordinates:[40.4183042,-3.698722]},
    photo: '../public/images/circulo-bellas-artes-madrid.jpg'
  },
  {
    name: 'Museo Cerralbo',
    description: 'Uno de los museos más importantes de España, ubicado en la zona céntrica de Madrid, es el Museo Cerralbo. Adicional a su colección de más de 50,000 obras, el palacete en el que se encuentra ubicado es un atractivo por sí mismo.',
    location: {type: 'Point', coordinates: [40.423764,-3.7167297]},
    photo: '../public/images/museo-cerralbo-madrid.jpg'
  },
  {
    name: 'Puerta de Alcalá',
    description: 'Fue construida en 1778 en honor a Carlos III de Borbón, y es –en realidad- un arco del triunfo. Está compuesta por tres arcos, y en cada extremo una abertura cuadrangular. La ornamentan bellas estatuas de ángeles y trofeos romanos.',
    location: {type: 'Point', coordinates: [40.419992,-3.6909257]},
    photo: '../public/images/puerta-alcala-madrid.jpg'
  },
  {
    name: 'Monumento a Alfonso XII',
    description: 'Se encuentra junto al estanque del Parque del Buen Retiro. Consiste en una estatua pedestre del Rey, acompañada de largas galerias de columnas jónicos. Una imponente escalera desciende hasta las aguas del lago, que reflejan esta bellísima construcción.',
    location: {type: 'Point', coordinates: [40.4172049,-3.6827965]},
    photo: '../public/images/monumento-alfonso-madrid.jpg'
  },
  {
    name: 'Parque del Buen Retiro',
    description: 'Es el mayor espacio verde de la zona, resabio del Palacio del Retiro, destruido por el ejército francés durante la invasión napoleónica. Algunas de sus partes más bellas para no dejar de ver son: el Paseo de las Estatuas, la Rosaleda, la Puerta de España y el Palacio de Cristal.',
    location: {type: 'Point', coordinates:[40.4152606,-3.6866882]},
    photo: '../public/images/parque-retiro-madrid.jpg'
  },
  {
    name: 'Palacio de Cristal',
    description: 'Visitar el Palacio de Cristal es una actividad imperdible en Madrid. Representante fiel de la arquitectura del hierro, es una obra de esqueleto metálico y fachada de cristal, que adorna imponente el parque del Retiro de Madrid, donde se exponen diversas obras de arte y cuya entrada es gratuita.',
    location: {type: 'Point', coordinates:[40.4142067,-3.6828159]},
    photo: '../public/images/palacio-cristal-madrid.jpg'
  },
  {
    name: 'Edificio Metrópolis',
    description: 'Icono de Madrid y protagonista de las postales más clásicas de la ciudad, este edificio es considerado el edificio más elegante de la capital española y en su arquitectura se pueden admirar hasta once obras de arte esculpidas que representan figuras celestiales así como las cuatro actividades económicas que sustentaban la economía madrileña.',
    location: {type: 'Point', coordinates: [40.418889,-3.6994107]},
    photo: '../public/images/edificio-metropolis-madrid.jpg'
  },
  {
    name: 'Palacio de las Cortes',
    description: 'El Palacio de las Cortes es el edificio donde sesiona el Congreso de los Diputados. Es uno de los edificios más emblemáticos de la ciudad de Madrid. Su construcción es del siglo XIX, realizada en estilo neoclásico. Se destacan en su facha el pórtico de estilo corintio con enormes columnas y las esculturas de bronce de dos leones.',
    location: {type: 'Point', coordinates:[40.416667,-3.7019107]},
    photo: '../public/images/cortes-madrid.jpg'
  },
  {
    name: '',
    description: '',
    location: {type: 'Point', coordinates:},
    photo: '../public/images/'
  },
  {
    name: '',
    description: '',
    location: {type: 'Point', coordinates:},
    photo: '../public/images/'
  }
];

poi.deleteMany()
.then(() => poi.create(places))


routes = [
  {
    name: 'Most iconic places in Madrid',
    duration: '1:30h',
  }
];

route.deleteMany()
.then(() => poi.find())
.then(places => {
  routes[0].places = places
  return route.create(routes);
})
.then(() => {
  // Close properly the connection to Mongoose
  mongoose.disconnect()
})
.catch(err => {
  mongoose.disconnect()
  throw err
});