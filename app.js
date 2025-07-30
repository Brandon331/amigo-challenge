function añadirElementoALista() {
  // Capturar el valor del campo de entrada
  let campoTexto = document.getElementById('itemInput');
  let textoIngresado = campoTexto.value;

  if (textoIngresado === "") {
    alert('Por favor, escribe algo para añadir a la lista.');
    return;
  }
  
  crearElementoDeLista(textoIngresado);
}

function crearElementoDeLista(contenido) {
  // Guardar el contenido en una lista
  let contenedorDeLista = document.getElementById('miListaDinamica');
  let nuevoItemDeLista = document.createElement('li');
  nuevoItemDeLista.textContent = contenido;
  contenedorDeLista.appendChild(nuevoItemDeLista);

  // Limpiar el campo de entrada
  document.getElementById('itemInput').value = "";
}

function elegirElementoAleatorio() {
  let contenedorDeLista = document.getElementById('miListaDinamica');
  let items = contenedorDeLista.getElementsByTagName('li');
  let valoresDeItems = [];

  if (items.length === 0) {
    alert('La lista está vacía. ¡Añade algunos elementos primero!');
    return;
  }

  for (let i = 0; i < items.length; i++) {
    valoresDeItems.push(items[i].textContent);
  }

  let indiceAleatorio = Math.floor(Math.random() * items.length);
  alert(`¡El elemento seleccionado al azar es: ${valoresDeItems[indiceAleatorio]}!`);
}
