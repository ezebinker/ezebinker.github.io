
/**
 * Envia puntaje
 */
function enviarPuntaje(score, preguntascorrectas)
{
  var name=document.getElementById('myForm-Name').value;

  var xhr = new XMLHttpRequest();
          xhr.open('POST', 'http://10.128.20.20/inforunner/insertar.php?name='+name+'&score='+score+'&pc='+preguntascorrectas, true);
          xhr.withCredentials = true;
          xhr.onreadystatechange = function() {
            if (xhr.readyState === 2) {
              console.log(name + " , partida guardada con "+score + " puntos!");
            }
          }
          xhr.setRequestHeader('Content-Type', 'application/text');
          xhr.send(name);

  $('#myForm').hide();
  $('.enviar').hide();
  document.getElementById('myForm-Name').value="";
}
