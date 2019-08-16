/**
 * Carga de imagenes
 */
var assetLoader = (function() {
  // diccionario de imagenes
  this.imgs        = {
    'bg'            : 'imgs/bg.png',
    'sky'           : 'imgs/sky.png',
    'backdrop'      : 'imgs/fondos/para7.jpg', //fondo de pantalla
    'grass'         : 'imgs/grass2.png', //pasto
    'avatar_normal' : 'imgs/personajes/personajeWoody.png', //avatar
    'grass1'        : 'imgs/grassMid1-1.png', //pasto
    'grass2'        : 'imgs/grassMid1-1.png', //pasto
    'bridge'        : 'imgs/bridge.png', //puente
    'plant'         : 'imgs/ball.png', //pelota toy story
    'cliff'         : 'imgs/grassCliffRight2.png',
    'spikes'        : 'imgs/spikes.png', //obstaculo
    'box'           : 'imgs/boxCoin.png', //cajas
    'obstaculo'     : 'imgs/extra.png', //obstaculo
    'bitcoin'       : 'imgs/bitcoin.png', //bitcoins
    'plus'          : 'imgs/plus.png', //power up doble salto
    'caja'          : 'imgs/Caja.png', //caja pregunta
    'caja2'         : 'imgs/Caja2.png', //caja pregunta sin el signo
    'plane'         : 'imgs/plane.png' //power up volador
  };

  //#region diccionario de sonidos
  this.sounds      = {
    'inicio'        : 'sounds/toystory1.mp3',
    'bg'            : 'sounds/toystory2.mp3',
    'jump'          : 'sounds/jump.mp3',
    'gameOver'      : 'sounds/gameOver.mp3',
    'Tictac'        : 'sounds/Tictac.mp3'
  };
  //#endregion

  //#region Codigo

  var assetsLoaded = 0;                                // how many assets have been loaded
  var numImgs      = Object.keys(this.imgs).length;    // total number of image assets
  var numSounds    = Object.keys(this.sounds).length;  // total number of sound assets
  this.totalAssest = numImgs;                          // total number of assets


  /**
   * Asegura que estan seteados todos los assets
   * @param {number} dic  - Dictionary name ('imgs', 'sounds', 'fonts')
   * @param {number} name - Asset name in the dictionary
   */
  function assetLoaded(dic, name) {
    // no cuenta los assets cargados
    if (this[dic][name].status !== 'loading') {
      return;
    }

    this[dic][name].status = 'loaded';
    assetsLoaded++;

    // progress callback
    if (typeof this.progress === 'function') {
      this.progress(assetsLoaded, this.totalAssest);
    }

    // callback de finalización
    if (assetsLoaded === this.totalAssest && typeof this.finished === 'function') {
      this.finished();
    }
  }

  /**
   * Chequea el estado del audio
   * @param {object} sound - Nombre del archivo de audio
   */
  function _checkAudioState(sound) {
    if (this.sounds[sound].status === 'loading' && this.sounds[sound].readyState === 4) {
      assetLoaded.call(this, 'sounds', sound);
    }
  }

  /**
   * Crea los assets
   */
  this.downloadAll = function() {
    var _this = this;
    var src;

    // Carga las imagenes
    for (var img in this.imgs) {
      if (this.imgs.hasOwnProperty(img)) {
        src = this.imgs[img];

        (function(_this, img) {
          _this.imgs[img] = new Image();
          _this.imgs[img].status = 'loading';
          _this.imgs[img].name = img;
          _this.imgs[img].onload = function() { assetLoaded.call(_this, 'imgs', img) };
          _this.imgs[img].src = src;
        })(_this, img);
      }
    }

    // Carga sonidos
    for (var sound in this.sounds) {
      if (this.sounds.hasOwnProperty(sound)) {
        src = this.sounds[sound];

        (function(_this, sound) {
          _this.sounds[sound] = new Audio();
          _this.sounds[sound].status = 'loading';
          _this.sounds[sound].name = sound;
          _this.sounds[sound].addEventListener('canplay', function() {
            _checkAudioState.call(_this, sound);
          });
          _this.sounds[sound].src = src;
          _this.sounds[sound].preload = 'auto';
          _this.sounds[sound].load();
        })(_this, sound);
      }
    }
  }

  return {
    imgs: this.imgs,
    sounds: this.sounds,
    totalAssest: this.totalAssest,
    downloadAll: this.downloadAll
  };
})

//#endregion
();
