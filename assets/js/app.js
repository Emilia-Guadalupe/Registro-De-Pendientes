//Variables: 
const listaPendientes = document.getElementById("lista-tweets");



//Event Listeners

eventListeners();

function eventListeners(){
    //Cuando se envía el formulario
    document.querySelector("#formulario").addEventListener('submit', agregarPendiente /*Función que se ejecuta al hacer click*/);

    //Borrar tweets

    listaPendientes.addEventListener('click', borrarPendiente);

    //Contenido Cargado
    document.addEventListener('DOMContentLoaded', localStorageListo);
}


//Funciones
//Añadir Pendiente

function agregarPendiente(e){
    e.preventDefault();
    //Leer el valor de Text Area

    const recuadro = document.getElementById('tweet').value;

    //Crear botón de borrar 
    const botonBorrar = document.createElement('button');
    botonBorrar.classList = 'boton-borrar';
    botonBorrar.innerHTML = 'X';

    //Agregar elementos a la lista con los contenidos del recuadro
    const lista = document.createElement('li');
    lista.innerText = recuadro;
    listaPendientes.appendChild(lista);
    lista.appendChild(botonBorrar);

    //Agregar al Local Storage
    agregarPendienteLocalStorage(recuadro);

}

function borrarPendiente(e){
    e.preventDefault();
    if(e.target.className === 'boton-borrar'){
        e.target.parentElement.remove();
        borrarPendienteLocalStorage(e.target.parentElement.textContent);
    } 
    
}

//Mostrar datos del Local Storage

function localStorageListo(){
    let texts;

    texts = obtenerPendientesLocalStorage();

    texts.forEach(function(recuadro){
        const botonBorrar = document.createElement('button');
        botonBorrar.classList = 'boton-borrar';
        botonBorrar.innerHTML = 'X';
    
        //Agregar elementos a la lista con los contenidos del recuadro
        const lista = document.createElement('li');
        lista.innerText = recuadro;
        listaPendientes.appendChild(lista);
        lista.appendChild(botonBorrar);
    })
}  

//Agregar Pendiente al Storage

function agregarPendienteLocalStorage(recuadro){
    let texts;
    texts = obtenerPendientesLocalStorage();

    //Añadir el nuevo pendiente
    texts.push(recuadro);

    //Convertir de String a Array
    localStorage.setItem('texts', JSON.stringify(texts));

}

function obtenerPendientesLocalStorage(){
    let texts;

    //Revisar valores de Storage
    if(localStorage.getItem('texts') === null){
        texts = [];
    } else {
        texts = JSON.parse(localStorage.getItem('texts') );
    }

    return texts;
}

//Eliminar pendiente del local Storage

function borrarPendienteLocalStorage(recuadro){
    let texts; 
    let pendienteBorrar;

    //Elimina la X del texto 

    pendienteBorrar = recuadro.substring(0, recuadro.length -1);

    texts = obtenerPendientesLocalStorage();

    texts.forEach(function(recuadro, index){
        if(pendienteBorrar === recuadro){
            texts.splice(index, 1);
        }
    })

    localStorage.setItem('texts', JSON.stringify(texts) );
}
