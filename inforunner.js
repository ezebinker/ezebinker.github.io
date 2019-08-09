(function ($) {
// define variables
var canvas = document.getElementById('canvas');

// Add event listener for `click` events.
canvas.addEventListener('click', function(event) {
  // Evento de salto si no está saltando, cayendo, o hay un bonus de vuelo activo
  if (player.dy === 0 && player.y>=platformHeight && cont<posiblessaltos && tiempovuela==300) {
    player.isJumping = true;
    player.dy = player.jumpDy-5;
    jumpCounter = 12;
    assetLoader.sounds.jump.play();
    cont++;
  }

  if(!player.isJumping){
    cont=0;
  }


  jumpCounter = Math.max(jumpCounter-1, 0);
  this.advance();

  // Agrega gravedad
  if (player.isFalling || player.isJumping) {
    player.dy += player.gravity;
  }

  // Cambia la animación si está cayendo
  if (player.dy > 0) {
    player.anim = player.fallAnim;
  }
  // Cambia la animación si está saltando
  else if (player.dy < 0) {
    player.anim = player.jumpAnim;
  }
  else {
    player.anim = player.walkAnim;
  }
  player.anim.update();

}, false);

var ctx = canvas.getContext('2d'); //esta es la variable que permite manipular el canvas
var pregunta=false, vuela=false;
var player, score, preguntascorrectas=0, idpreguntaactual=0, velocidadanterior, textopregunta,opciona,opcionb,opcionc, stop, ticker, posiblessaltos=1, bonussaltos=100, tiempovuela=300;
var ground = [], water = [], enemies = [], environment = [], bitcoins = [], plus=[], caja =[], plane=[];
var listaPreguntas=[];

// variables de plataforma
var platformHeight, platformLength, gapLength;
var platformWidth = 32;
var platformBase = canvas.height - platformWidth;  // setea el bottom de la plataforma
var platformSpacer = 64;

var canUseLocalStorage = 'localStorage' in window && window.localStorage !== null;
var playSound;

// setea las preferencias de sonido
if (canUseLocalStorage) {
  playSound = (localStorage.getItem('inforunner.playSound') === "true")

  if (playSound) {
    $('.sound').addClass('sound-on').removeClass('sound-off');
  }
  else {
    $('.sound').addClass('sound-off').removeClass('sound-on');
  }
}

/**
 * Asset de cargando
 * @param {integer} progress - Numero de assets cargados hasta el momento
 * @param {integer} total - Assets cargados
 */
assetLoader.progress = function(progress, total) {
  var pBar = document.getElementById('progress-bar');
  pBar.value = progress / total;
  document.getElementById('p').innerHTML = Math.round(pBar.value * 100) + "%";
}

/**
 * Carga el menú principal
 */
assetLoader.finished = function() {
  mainMenu();
}

/**
 * Crea una animación
 * @param {SpriteSheet}
 * @param {number}
 * @param {array}
 * @param {boolean}
 */
function Animation(spritesheet, frameSpeed, startFrame, endFrame) {

  var animationSequence = [];  // Secuencia de la animación
  var currentFrame = 0;        // El actual frame de la animación
  var counter = 0;

  for (var frameNumber = startFrame; frameNumber <= endFrame; frameNumber++)
    animationSequence.push(frameNumber);

  /**
   * Actualiza la animación
   */
  this.update = function() {

    // Actualiza el frame si es el momento
    if (counter == (frameSpeed - 1))
      currentFrame = (currentFrame + 1) % animationSequence.length;

    // Actualiza el contador
    counter = (counter + 1) % frameSpeed;
  };

  /**
   * Dibuja el frame correspondiente
   * @param {integer} x - Posicion X
   * @param {integer} y - Posicion Y
   */
  this.draw = function(x, y) {
    // Obtiene fila y columna de la animación en frame actual
    var row = Math.floor(animationSequence[currentFrame] / spritesheet.framesPerRow);
    var col = Math.floor(animationSequence[currentFrame] % spritesheet.framesPerRow);

    ctx.drawImage(
      spritesheet.image,
      col * spritesheet.frameWidth, row * spritesheet.frameHeight,
      spritesheet.frameWidth, spritesheet.frameHeight,
      x, y,
      spritesheet.frameWidth, spritesheet.frameHeight);
  };
}

/**
 * Crea el efecto parallax en el background
 */
var background = (function() {
  var sky   = {};
  var backdrop = {};
  //var backdrop2 = {};

  /**
   * Dibuja el parallax
   */
  this.draw = function() {
    ctx.drawImage(assetLoader.imgs.bg, 0, 0);

    // Pan background
    sky.x -= sky.speed;
    backdrop.x -= backdrop.speed;

    // Dibuja las imagenes para generar el loop
    ctx.drawImage(assetLoader.imgs.sky, sky.x, sky.y);
    ctx.drawImage(assetLoader.imgs.sky, sky.x + canvas.width, sky.y);

    ctx.drawImage(assetLoader.imgs.backdrop, backdrop.x, backdrop.y);
    ctx.drawImage(assetLoader.imgs.backdrop, backdrop.x + canvas.width, backdrop.y);

    // Si la imagen paso el width, resetea
    if (sky.x + assetLoader.imgs.sky.width <= 0)
      sky.x = 0;
    if (backdrop.x + assetLoader.imgs.backdrop.width <= 0)
      backdrop.x = 0;
  };

  /**
   * Resetea el background a cero
   */
  this.reset = function()  {
    sky.x = 0;
    sky.y = 0;
    sky.speed = 0.2;

    backdrop.x = 0;
    backdrop.y = 0;
    backdrop.speed = 0.4;
  }

  return {
    draw: this.draw,
    reset: this.reset
  };
})();

/**
 * A vector for 2d space.
 * @param {integer} x - Center x coordinate.
 * @param {integer} y - Center y coordinate.
 * @param {integer} dx - Change in x.
 * @param {integer} dy - Change in y.
 */
function Vector(x, y, dx, dy) {
  // Posicion
  this.x = x || 0;
  this.y = y || 0;
  // Dirección
  this.dx = dx || 0;
  this.dy = dy || 0;
}

Vector.prototype.advance = function() {
  this.x += this.dx;
  this.y += this.dy;
};

/**
 *
 * @param {Vector}
 * @return minDist
 */
Vector.prototype.minDist = function(vec) {
  var minDist = Infinity;
  var max     = Math.max( Math.abs(this.dx), Math.abs(this.dy),
                          Math.abs(vec.dx ), Math.abs(vec.dy ) );
  var slice   = 1 / max;

  var x, y, distSquared;

  var vec1 = {}, vec2 = {};
  vec1.x = this.x + this.width/2;
  vec1.y = this.y + this.height/2;
  vec2.x = vec.x + vec.width/2;
  vec2.y = vec.y + vec.height/2;
  for (var percent = 0; percent < 1; percent += slice) {
    x = (vec1.x + this.dx * percent) - (vec2.x + vec.dx * percent);
    y = (vec1.y + this.dy * percent) - (vec2.y + vec.dy * percent);
    distSquared = x * x + y * y;

    minDist = Math.min(minDist, distSquared);
  }

  return Math.sqrt(minDist);
};

/**
 * Objeto player
 */
var player = (function(player) {
  if(this.imgs['avatar_normal']=='imgs/personajes/personajeMonstr.png'){
  player.width     = 70;
  player.height    = 70;
  player.speed     = 6;

  player.gravity   = 1;
  player.dy        = 0;
  player.jumpDy    = -12;
  player.isFalling = false;
  player.isJumping = false;

  player.sheet     = new SpriteSheet('imgs/personajes/personajeMonstr.png', player.width, player.height);
  player.walkAnim  = new Animation(player.sheet, 3, 0, 14);
  player.jumpAnim  = new Animation(player.sheet, 4, 14, 14);
  player.fallAnim  = new Animation(player.sheet, 4, 11, 11);
  player.anim      = player.walkAnim;
}else {
  player.width     = 60;
  player.height    = 96;
  player.speed     = 6;

  player.gravity   = 1;
  player.dy        = 0;
  player.jumpDy    = -12;
  player.isFalling = false;
  player.isJumping = false;

  player.sheet     = new SpriteSheet(this.imgs['avatar_normal'], player.width, player.height);
  player.walkAnim  = new Animation(player.sheet, 4, 0, 15);
  player.jumpAnim  = new Animation(player.sheet, 4, 15, 15);
  player.fallAnim  = new Animation(player.sheet, 4, 11, 11);
  player.anim      = player.walkAnim;
}

  Vector.call(player, 0, 0, 0, player.dy);

  var jumpCounter = 0;  // Cuanto tiempo se puede mantener apretado para saltar

  /**
   * Actualiza la posición del jugador y la posición
   */
  player.update = function() {

      for (var i = 0; i < caja.length; i++) {
            if(caja[i].type!='caja2' && player.x>= caja[i].x-caja[i].width/2 && player.x<= caja[i].x+caja[i].width/2 && player.y>=caja[i].y-caja[i].height+1 && player.y<=caja[i].y - caja[i].height/2){
              caja[i].type='caja2';
                  stop = true;
                  assetLoader.sounds.bg.pause();
                  assetLoader.sounds.Tictac.currentTime=0;
                  assetLoader.sounds.Tictac.play();
                  pregunta=true;
                  window.setTimeout(continuarEjecucion, 5000);
                  if(Object.keys(listaPreguntas).length != 0){
                      textopregunta=listaPreguntas[idpreguntaactual].prompt;
                      opciona=listaPreguntas[idpreguntaactual].opciona;
                      opcionb=listaPreguntas[idpreguntaactual].opcionb;
                      opcionc=listaPreguntas[idpreguntaactual].opcionc;
                      $('#preguntaactiva').show();
                      $('#textopregunta').html(textopregunta);
                      $('#opciona').html(opciona);
                      $('#opcionb').html(opcionb);
                      $('#opcionc').html(opcionc);
                  }
            }
        }

    // Evento de salto si no está saltando, cayendo, o hay un bonus de vuelo activo
    if (KEY_STATUS.space && player.dy === 0 && player.y>=platformHeight && cont<posiblessaltos && tiempovuela==300) {
      player.isJumping = true;
      player.dy = player.jumpDy;
      jumpCounter = 12;
      assetLoader.sounds.jump.play();
      cont++;
    }

    if(!player.isJumping){
      cont=0;
    }

    // Salta más alto si está presionada la tecla space
    if (KEY_STATUS.space && jumpCounter) {
      player.dy = player.jumpDy;
    }

    jumpCounter = Math.max(jumpCounter-1, 0);
    this.advance();

    // Agrega gravedad
    if (player.isFalling || player.isJumping) {
      player.dy += player.gravity;
    }

    // Cambia la animación si está cayendo
    if (player.dy > 0) {
      player.anim = player.fallAnim;
    }
    // Cambia la animación si está saltando
    else if (player.dy < 0) {
      player.anim = player.jumpAnim;
    }
    else {
      player.anim = player.walkAnim;
    }
    player.anim.update();
  };

  /**
   * Dibuja al player en la posición correspondiente
   */
  player.draw = function() {
    player.anim.draw(player.x, player.y);
  };

  /**
   * Resetea la posición del player
   */
  player.reset = function() {
    player.x = 64;
    player.y = 250;
  };

  return player;
})(Object.create(Vector.prototype));

/**
 * @param {integer} x - Posición x de inicio del player
 * @param {integer} y - Posición y de inicio del player
 * @param {string} type - Tipo de sprite
 */
function Sprite(x, y, type) {
  this.x      = x;
  this.y      = y;
  this.width  = platformWidth;
  this.height = platformWidth;
  this.type   = type;
  Vector.call(this, x, y, 0, 0);

  /**
   * Actualiza la posición del sprite con la velocidad del player
   */
  this.update = function() {
    this.dx = -player.speed;
    this.advance();
  };

  /**
   * Dibuja el sprite en la posición correspondiente
   */
  this.draw = function() {
    ctx.save();
    ctx.translate(0.5,0.5);
    ctx.drawImage(assetLoader.imgs[this.type], this.x, this.y);
    ctx.restore();
  };
}

function limitText(limitField, limitCount, limitNum) {
	if (limitField.value.length > limitNum) {
		limitField.value = limitField.value.substring(0, limitNum);
	} else {
		limitCount.value = limitNum - limitField.value.length;
	}
}

function continuarEjecucion(){
          verificapregunta("",listaPreguntas[idpreguntaactual].answer);
          $('#preguntaactiva').hide();
          assetLoader.sounds.Tictac.pause();
          assetLoader.sounds.bg.play();
          stop=false;
          pregunta=false;
          console.log(Object.keys(listaPreguntas).length);
	        animate();
          listaPreguntas.splice(idpreguntaactual,1);
          console.log(listaPreguntas);
          console.log(Object.keys(listaPreguntas).length);
          idpreguntaactual= randomPreguntas();
          if(Object.keys(listaPreguntas).length === 0){
            listaPreguntas=questions;
          }
}
Sprite
Sprite.prototype = Object.create(Vector.prototype);

/**
 * @return Type of platform
 */

function getType() {
  var type;
  switch (platformHeight) {
    case 0:
    case 1:
      type = Math.random() > 0.5 ? 'grass1' : 'grass2';
      break;
    case 2:
      type = 'grass';
      break;
    case 3:
      type = 'bridge';
      break;
    case 4:
      type = 'box';
      break;
  }
  if (platformLength === 1 && platformHeight < 3 && rand(0, 3) === 0) {
    type = 'cliff';
  }

  return type;
}

/**
 * Actualiza la posición del suelo y la dibuja. Chequea colisión con el player
 */
function updateGround() {
  // Anima el piso
  player.isFalling = true;
  for (var i = 0; i < ground.length; i++) {
    ground[i].update();
    ground[i].draw();

    // Frena el salto del jugador cuando encuentra el piso
    var angle;
    if (player.minDist(ground[i]) <= player.height/2 + platformWidth/2 &&
        (angle = Math.atan2(player.y - ground[i].y, player.x - ground[i].x) * 180/Math.PI) > -130 &&
        angle < -50) {
      player.isJumping = false;
      player.isFalling = false;
      player.y = ground[i].y - player.height + 5;
      player.dy = 0;
    }
  }

  // Borra el piso que se encuentra fuera de la pantalla
  if (ground[0] && ground[0].x < -platformWidth) {
    ground.splice(0, 1);
  }
}

/**
 * Actualiza la posición del agua
 */
function updateWater() {
  // Anima al agua
  for (var i = 0; i < water.length; i++) {
    water[i].update();
    water[i].draw();
  }

  // Borra el agua que se encuentra fuera de la pantalla
  if (water[0] && water[0].x < -platformWidth) {
    var w = water.splice(0, 1)[0];
    w.x = water[water.length-1].x + platformWidth;
    water.push(w);
  }
}

/**
 * Actualiza la posición del ambiente
 */
function updateEnvironment() {
  // Anima el ambiente
  for (var i = 0; i < environment.length; i++) {
    environment[i].update();
    environment[i].draw();
  }

  // Borra el ambiente que se encuentra fuera de la pantalla
  if (environment[0] && environment[0].x < -platformWidth) {
    environment.splice(0, 1);
  }
}

/**
 * Actualiza la posición de los enemigos y los dibuja. Chequea colisión con el player
 */
function updateEnemies() {
  // Anima a los enemigos
  for (var i = 0; i < enemies.length; i++) {
    enemies[i].update();
    enemies[i].draw();

    // Player choca a un enemigo
    if (player.minDist(enemies[i]) <= player.width - platformWidth/2) {
      gameOver();
    }
  }

  // Borra los enemigos que se encuentran fuera de la pantalla
  if (enemies[0] && enemies[0].x < -platformWidth) {
    enemies.splice(0, 1);
  }
}

/**
 * Actualiza la posición de los bitcoins y los dibuja. Chequea colisión con el player
 */
function updateBitcoins() {
  // Anima a los bitcoins
  for (var i = 0; i < bitcoins.length; i++) {
    bitcoins[i].update();
    bitcoins[i].draw();

    // Player choca a un bitcoin
    if (player.minDist(bitcoins[i]) <= player.width - platformWidth/2) {
      bitcoins.splice(i,1);
      sumoPuntos();
    }
  }

  // Borra los bitcoins que se encuentran fuera de la pantalla
  if (bitcoins[0] && bitcoins[0].x < -platformWidth) {
    bitcoins.splice(0, 1);
  }
}

function updateCaja() {
  // Anima a los caja
  for (var i = 0; i < caja.length; i++) {
    caja[i].update();
    caja[i].draw();
  }

  // Borra los caja que se encuentran fuera de la pantalla
  if (caja[0] && caja[0].x < -platformWidth) {
    caja.splice(0, 1);
  }
}

/**
 * Actualiza la posición de los signos mas y los dibuja. Chequea colisión con el player
 */
function updatePlus() {
  // Anima a los simbolos
  for (var i = 0; i < plus.length; i++) {
    plus[i].update();
    plus[i].draw();

    // Player choca a un +
    if (player.minDist(plus[i]) <= player.width - platformWidth/2) {
      plus.splice(i,1);
      cambioSaltos();
    }
  }

  // Borra los + que se encuentran fuera de la pantalla
  if (plus[0] && plus[0].x < -platformWidth) {
    plus.splice(0, 1);
  }
}

/**
 * Actualiza la posición de los aviones mas y los dibuja. Chequea colisión con el player
 */
function updatePlane() {
  // Anima a los simbolos
  for (var i = 0; i < plane.length; i++) {
    plane[i].update();
    plane[i].draw();

    // Player choca a un +
    if (player.minDist(plane[i]) <= player.width - platformWidth/2) {
      plane.splice(i,1);
      velocidadanterior=ticker;
      ticker=500;
      vuela=true;
    }
  }

  // Borra los + que se encuentran fuera de la pantalla
  if (plane[0] && plane[0].x < -platformWidth) {
    plane.splice(0, 1);
  }
}

function sumoPuntos(){
    score+=65;
    preguntascorrectas++;
}

function restoPuntos(){
    if(score-50>=0){
      score-=25;
    }
    else{
        score=0;
    }
}

function cambioSaltos(){
  posiblessaltos=2;
}

/**
 * Actualiza la posición del player y lo dibuja
 */
function updatePlayer() {
  player.update();
  player.draw();
  // GAME OVER
  if (player.y + player.height >= canvas.height) {
    gameOver();
  }
}

function spawnSprites() {
  // incrementa puntos
  score++;
  if(posiblessaltos==2)
  {
    bonussaltos--;
  }else{
    bonussaltos=100;
  }

  if(bonussaltos==0){
    bonussaltos=100;
    posiblessaltos=1;

  }

  // primero crea un gap
  if (gapLength > 0) {
    gapLength--;
  }
  // crea el piso
  else if (platformLength > 0) {
    var type = getType();

    ground.push(new Sprite(
      canvas.width + platformWidth % player.speed,
      platformBase - platformHeight * platformSpacer,
      type
    ));
    platformLength--;

    // agrega sprites de ambiente random
    spawnEnvironmentSprites();

    // agrega enemigos random
    spawnEnemySprites();

    // agrega bitcoins random
    spawnBitcoinsSprites();

      // agrega cajas random
    spawnCajaSprites();

    if(bonussaltos==100 && tiempovuela==300){ // si no hay algun bonus activo dibuja los power up
        //agrega signos mas random
        spawnPlusSprites();

        //agrega aviones random
        spawnPlaneSprites();
    }
  }
  // comienza de nuevo
  else {
    // incrementa el espacio entre el piso
    gapLength = rand(player.speed - 2, player.speed);

    platformHeight = bound(rand(0, platformHeight + rand(0, 2)), 0, 4);
    platformLength = rand(Math.floor(player.speed/2), player.speed * 4);
  }
}

function spawnEnvironmentSprites() {
  if (score > 40 && rand(0, 20) === 0 && platformHeight < 3) {
    if (Math.random() > 0.5) {
      environment.push(new Sprite(
        canvas.width + platformWidth % player.speed,
        platformBase - platformHeight * platformSpacer - platformWidth,
        'plant'
      ));
    }
    else if (platformLength > 2) {
      environment.push(new Sprite(
        canvas.width + platformWidth % player.speed,
        platformBase - platformHeight * platformSpacer - platformWidth,
        'bush1'
      ));
      environment.push(new Sprite(
        canvas.width + platformWidth % player.speed + platformWidth,
        platformBase - platformHeight * platformSpacer - platformWidth,
        'bush2'
      ));
    }
  }
}

function spawnEnemySprites() {
  if (score > 100 && Math.random() > 0.96 && enemies.length < 3 && platformLength > 5 &&
      (enemies.length ? canvas.width - enemies[enemies.length-1].x >= platformWidth * 3 ||
       canvas.width - enemies[enemies.length-1].x < platformWidth : true)) {
    enemies.push(new Sprite(
      canvas.width + platformWidth % player.speed,
      platformBase - platformHeight * platformSpacer - platformWidth,
      Math.random() > 0.5 ? 'spikes' : 'obstaculo'
    ));
  }
}

function spawnBitcoinsSprites() {
  if (score > 100 && Math.random() > 0.96 && bitcoins.length < 3 && platformLength > 5 &&
      (bitcoins.length ? canvas.width - bitcoins[bitcoins.length-1].x >= platformWidth * 3 ||
       canvas.width - bitcoins[bitcoins.length-1].x < platformWidth : true)) {
    bitcoins.push(new Sprite(
      canvas.width + platformWidth % player.speed,
      platformBase - platformHeight * platformSpacer - platformWidth,
      'bitcoin'
    ));
  }
}

function spawnCajaSprites() {
  if (score > 10 && Math.random() > 0.96 && caja.length < 3 && platformLength > 5 &&
      (caja.length ? canvas.width - caja[caja.length-1].x >= platformWidth * 3 ||
       canvas.width - caja[caja.length-1].x < platformWidth : true)) {
      caja.push(new Sprite(
      canvas.width + platformWidth % player.speed,
      platformBase  -125 - platformHeight  * platformSpacer  - platformWidth,
      'caja'
    ));
  }
}

function spawnPlusSprites() {
  if (score > 100 && Math.random() > 0.96 && plus.length < 3 && platformLength > 5 &&
      (plus.length ? canvas.width - plus[plus.length-1].x >= platformWidth * 3 ||
       canvas.width - plus[plus.length-1].x < platformWidth : true)) {
     plus.push(new Sprite(
      canvas.width + platformWidth % player.speed,
      platformBase - platformHeight * platformSpacer - platformWidth,
      'plus'
    ));
  }
}

function spawnPlaneSprites() {
  if (score > 100 && Math.random() > 0.96 && plane.length < 3 && platformLength > 5 &&
      (plane.length ? canvas.width - plane[plus.length-1].x >= platformWidth * 3 ||
       canvas.width - plane[plane.length-1].x < platformWidth : true)) {
     plane.push(new Sprite(
      canvas.width + platformWidth % player.speed,
      platformBase - platformHeight * platformSpacer - platformWidth - 20,
      'plane'
    ));
  }
}

/**
 * LOOP DEL JUEGO
 */
function animate() {

    if (!stop) {
      $('#correcta').hide();
      $('#wrapper').removeClass('correcta');
      document.getElementById("canvas").style.opacity = "1";

    requestAnimFrame( animate );
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    background.draw();

    // Actualiza entidades
    updateWater();
    updateEnvironment();
    updatePlayer();
    updateGround();
    updateEnemies();
    updateBitcoins();
    updateCaja();
    updatePlus();
    updatePlane();

    // Dibuja el puntaje
    ctx.font = 'bolder 25px Audiowide';
    ctx.fillStyle='white';
    ctx.strokeStyle = 'black';
    ctx.strokeText('Puntaje: ' + score, canvas.width - 190, 30);

    ctx.fillText('Puntaje: ' + score, canvas.width - 190, 30);

    if(posiblessaltos==2){
      ctx.fillStyle='black';
      ctx.fillText('BONUS SALTO ACTIVO! ' + bonussaltos, canvas.width - 380, 60);

    }

    if(vuela && tiempovuela>0){
      ctx.fillStyle='black';
      ctx.fillText('Bonus Volador Activo ' + tiempovuela, canvas.width - 380, 85);
      if(player.y>=20){
        player.y-=10;
      }

      player.dy=0;
      tiempovuela--;

    }

    if(tiempovuela==0 ){
      vuela=false;
      player.isFalling=true;
      tiempovuela=300;
      ticker=velocidadanterior;

    }

    // Dibuja un nuevo sprite
    if (ticker % Math.floor(platformWidth / player.speed) === 0) {
      spawnSprites();
    }

    // Incrementa la velocidad solo cuando está el player saltando
    if (ticker > (Math.floor(platformWidth / player.speed) * player.speed * 20) && player.dy !== 0) {
      player.speed = bound(++player.speed, 0, 15);
      player.walkAnim.frameSpeed = Math.floor(platformWidth / player.speed) - 1;

      // Resetea el ticker
      ticker = 0;

      if (gapLength === 0) {
        var type = getType();
        ground.push(new Sprite(
          canvas.width + platformWidth % player.speed,
          platformBase - platformHeight * platformSpacer,
          type
        ));
        platformLength--;
      }
    }
    ticker++;
  }
  else { //todo lo que sucede cuando el juego está pausado, sea por pregunta o por gameover
    document.getElementById("canvas").style.opacity = "0.5";
  }
}

/**
 * Eventos del teclado
 */
var KEY_CODES = {
  32: 'space'
};
var KEY_STATUS = {};
for (var code in KEY_CODES) {
  if (KEY_CODES.hasOwnProperty(code)) {
     KEY_STATUS[KEY_CODES[code]] = false;
  }
}
document.onkeydown = function(e) {
  var keyCode = (e.keyCode) ? e.keyCode : e.charCode;
  if (KEY_CODES[keyCode]) {
    e.preventDefault();
    KEY_STATUS[KEY_CODES[keyCode]] = true;
  }
};
document.onkeyup = function(e) {
  var keyCode = (e.keyCode) ? e.keyCode : e.charCode;
  if (KEY_CODES[keyCode]) {
    e.preventDefault();
    KEY_STATUS[KEY_CODES[keyCode]] = false;
  }
};

var requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          window.oRequestAnimationFrame      ||
          window.msRequestAnimationFrame     ||
          function(callback, element){
            window.setTimeout(callback, 1000 / 60);
          };
})();

/**
 * Muestra el menú principal después de cargar todos los assets
 */
function mainMenu() {
  for (var sound in assetLoader.sounds) {
    if (assetLoader.sounds.hasOwnProperty(sound)) {
      assetLoader.sounds[sound].muted = !playSound;
    }
  }

  $('#progress').hide();
  $('#main').show();
  $('#menu').addClass('main');
  $('.sound').show();
}

/**
 * Comienza el juego, resetea variables, etc.
 */
function startGame() {
  document.getElementById('game-over').style.display = 'none';
  document.getElementById("canvas").style.opacity = "1";
  listaPreguntas = questions.slice();
  console.log(listaPreguntas);
  player.speed = 6;
  ground = [];
  water = [];
  environment = [];
  enemies = [];
  bitcoins=[];
  caja = [];
  plus=[];
  plane=[];
  posiblessaltos=1;
  preguntascorrectas=0;
  player.reset();
  ticker = 0;
  stop = false;
  score = 0;
  platformHeight = 2;
  platformLength = 15;
  gapLength = 0;
  idpreguntaactual=randomPreguntas();
  bonussaltos=100;
  tiempovuela=300;
  vuela=false;



  //ctx.font = '16px arial, sans-serif';

  for (var i = 0; i < 30; i++) {
    ground.push(new Sprite(i * (platformWidth-3), platformBase - platformHeight * platformSpacer, 'grass'));
  }

  for (i = 0; i < canvas.width / 32 + 2; i++) {
    water.push(new Sprite(i * platformWidth, platformBase, 'water'));
  }

  background.reset();
  animate();

  assetLoader.sounds.gameOver.pause();
  assetLoader.sounds.bg.currentTime = 0;
  assetLoader.sounds.bg.loop = true;
  assetLoader.sounds.bg.play();
}


//funcion random para agarrar un valor de pregunta
  function randomPreguntas(){

    return Math.floor(Math.random() * Object.keys(listaPreguntas).length);
  }

/**
 * Finaliza el juego y lo resetea
 */
function gameOver() {
  posiblessaltos=1;
  vuela=false;
  stop = true;
  $('#score').html(score);
  $('#correcta').hide();
  $('#game-over').show();
  $('#myForm').show();
  assetLoader.sounds.bg.pause();
  assetLoader.sounds.gameOver.currentTime = 0;
  assetLoader.sounds.gameOver.play();
}

function verificapregunta(opcion, correcta){
    $('#correcta').show();
    if(opcion == correcta){
         sumoPuntos();
        document.getElementById('laimagen').src='imgs/correcto.png';
     }else{
       document.getElementById('laimagen').src='imgs/incorrecto.png';
         restoPuntos();
     }
}

/**
 * Handlers de los eventos click
 */
$('.credits').click(function() {
  $('#main').hide();
  $('#credits').show();
  $('#menu').addClass('credits');
});
$('.back').click(function() {
  $('#credits').hide();
  $('#main').show();
  $('#menu').removeClass('credits');
});
$('.sound').click(function() {
  var $this = $(this);
  // sonido off
  if ($this.hasClass('sound-on')) {
    $this.removeClass('sound-on').addClass('sound-off');
    playSound = false;
  }
  // sonido on
  else {
    $this.removeClass('sound-off').addClass('sound-on');
    playSound = true;
  }

  if (canUseLocalStorage) {
    localStorage.setItem('inforunner.playSound', playSound);
  }

  // Silencia o Activa los sonidos
  for (var sound in assetLoader.sounds) {
    if (assetLoader.sounds.hasOwnProperty(sound)) {
      assetLoader.sounds[sound].muted = !playSound;
    }
  }
});

$('.play').click(function() {
  $('#menu').hide();
  startGame();
});
$('.restart').click(function() {
  $('#game-over').hide();
  startGame();
});
$('.enviar').click(function() {
  var name=document.getElementById('myForm-Name').value;
  if(name!="")
  enviarPuntaje(score, preguntascorrectas);
  else {
    alert("Completa el nombre para enviar puntaje!");
  }
});
$('.almenu').click(function() {
  $('#game-over').hide();
  document.getElementById('game-over').style.display = 'none';
  $('#credits').hide();
  $('#menu').show();
  $('#main').show();
  $('#menu').removeClass('credits');
});

$('.opciona').click(function() {
  $('#preguntaactiva').hide();
  document.getElementById('preguntaactiva').style.display = 'none';
  verificapregunta(opciona,listaPreguntas[idpreguntaactual].answer);
  window.clearTimeout();
    animate();
});

$('.opcionb').click(function() {
  $('#preguntaactiva').hide();
  document.getElementById('preguntaactiva').style.display = 'none';
  verificapregunta(opcionb,listaPreguntas[idpreguntaactual].answer);
  window.clearTimeout();
    animate();
});

$('.opcionc').click(function() {
  $('#preguntaactiva').hide();
  document.getElementById('preguntaactiva').style.display = 'none';
  verificapregunta(opcionc,listaPreguntas[idpreguntaactual].answer);
  window.clearTimeout();
    animate();
});

assetLoader.downloadAll();
})(jQuery);
