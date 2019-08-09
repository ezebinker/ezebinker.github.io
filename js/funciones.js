/**
 * Obtiene un numero random
 * @param {integer}
 * @param {integer}
 */
function rand(low, high) {
  return Math.floor( Math.random() * (high - low + 1) + low );
}

/**
 * Obtiene un numero ligado
 * @param {integer} num - Number to bound
 * @param {integer}
 * @param {integer}
 */
function bound(num, low, high) {
  return Math.max( Math.min(num, high), low);
}


/**
 * Crea un spritesheet
 * @param {string} - Path de la imagen.
 * @param {number} - Ancho en px
 * @param {number} - Alto en px
 */
function SpriteSheet(path, frameWidth, frameHeight) {
  this.image = new Image();
  this.frameWidth = frameWidth;
  this.frameHeight = frameHeight;

  // calcula el numero de frames
  var self = this;
  this.image.onload = function() {
    self.framesPerRow = Math.floor(self.image.width / self.frameWidth);
  };

  this.image.src = path;
}
