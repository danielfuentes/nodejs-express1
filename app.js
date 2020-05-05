//Debo requerir el Framework de desarrollo.
const express = require('express');
const fs = require('fs');
const app = express();

//Variable guardar el archivo JSON pero como array
let heroes = JSON.parse(fs.readFileSync('./data/heroes.json', 'utf-8'))
//console.log(heroes);
//Crear nuestras rutas
//Consigna 1
app.get('/',(req,res)=>{
    let resultado = '​Ni Superman, Iron  Man o La Mujer Maravilla son tan importantes cómo las y los Heroes de carne y hueso que encontrarás en este sitio. Esperamos que ellas y ellos te sirvan como inspiración para poder cumplir tus objetivos. Recuerda: ¡nunca pares de creer en ti!.'
    res.send(resultado);
});
//Consigna 2
app.get('/heroes', (req, res) => {
    res.send(heroes);
});
//Consigna 3
//Solución de Lucia 
/*app.get ('/heroes/detalle/:id', function (req, res){
    heroes.forEach (element => {
        if (element.id == req.params.id){
            res.send(element); 
        }
    
    })
    })*/
//Solución de Nico
app.get('/heroes/detalle/:id?', (req, res) => {

    heroes.forEach(element => {
        if (element.id == req.params.id) {
            res.send('Hola, mi nombre es ' + element.nombre + ' y soy ' + element.profesion);
        } 
    });
     res.send('Este ID no coincide con ningún heroe')
    
});

//Esta es mi propuesta de solución - Es otra forma de hacer lo mismo - Es sólo para que lo tengan popr allí y mas nada. 
// Ruta /heroes/detalle/id ➝ se envía el nombre y profesión del héroe que pida el usuario
app.get('/heroes/detalleDaniel/:id', (req, res) => {
	let elHeroe = heroes.find(heroe => heroe.id == req.params.id);
	
	if(elHeroe) {
        //Aquí uso los  literal string
		res.send(`Hola, mi nombre es ${theHeroe.nombre} y mi profesión es ${theHeroe.profesion}.`);
	} else {
		res.send('No hay heroe con ese id.');
	}
});


//Consigna 3
// Ruta /heroes/n/bio/ok?   Este signo de interrogación significa que el parámetro el opcional a ser enviado por el usuario ➝ se envía la bio del héroe solicitado
app.get('/heroes/bio/:id/:ok?', (req, res) => {
	let elHeroe = heroes.find(heroe => heroe.id == req.params.id);

	if (!elHeroe) {
		res.send('No encontramos un héroe para mostrarte su biografía');
	} else {
		if (req.params.ok != undefined && req.params.ok == 'ok') {
            //Aqui uso literal string
			res.send(`Hola, mi nombre es ${elHeroe.nombre} y mi reseña es. ${elHeroe.resenia}`);
		} else {
			res.send(`Hola, mi nombre es ${elHeroe.nombre}. Lamento que no desees saber más de mi :(`);
		}
	}
});
//Consigna 4
// Ruta Créditos 
app.get('/creditos', (req, res) => {
	res.send('Programa desarrollado por el: MSc. Ángel Daniel Fuentes');
});
//Consigna 5
//Si por causalidad el usuario especifica una ruta que no existe, entonces le devolvemos el error 404   - Algo así como La ruta específicada no existe.
// Ruta 404 ¿?
app.get('*', (req, res) => {
	res.status(404).send('Error  404: Ppágina especificada no existe..!');
});

//Como levarntar o activar un servidor en express
//app.listen(3000, ()=>console.log('Sevidor corriendo en el puerto 3000'));

app.listen(3000,function(){
    console.log('Sevidor corriendo en el puerto 3000');
    
});





