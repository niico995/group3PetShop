const $botton = document.getElementById('botton_enviar')

function enviarFormulario() {
    
    let $nombre = document.getElementById('nombre');
    let $apellido = document.getElementById('apellido');
    let $telefono = document.getElementById('telefono');
    let $mascota = document.getElementById('mascota');
    let $comentarios = document.getElementById('comentarios');

    alert('¡Comentario o consulta enviado con éxito!');

    $nombre.value = '';
    $apellido.value = '';
    $telefono.value = '';
    $mascota.value = 'gato';
    $comentarios.value = '';
}

$botton.addEventListener('click', enviarFormulario)
