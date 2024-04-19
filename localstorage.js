//  //declaracion de variables
// let datos = [{
//     nombre: "juan esteban",
//     profecieno: "estudiente",
//     salarario: 60000
// },
// {
//     nombre: "sindi garcia",
//     profecieno: "doctora",
//     salarario: 455556456
// },
// {
//     nombre: "felipe ruiz",
//     profecieno: "soporteIT",
//     salarario: 60000
// }];

// // localstorage
// localStorage.setItem("info", JSON.stringify(datos));
// alert("datos guardeadoes con exito =)") 

// let informacion = JSON.parse(localStorage.getItem("info"));
// let info = []
// if (informacion != null) {
//   info= informacion
// }
// info.forEach((d, i)=> {
//   document.write(`
//   Id: ${i}
//   nombre: ${d.nombre}<br>
//   profecion: ${d.porfesion}<br>
//   salario: ${d.salario} <hr>
//   `);
// });
  


// variables glovales 
const d = document;
let tabla = d.querySelector(".table > tbody")
let clienInput = d.querySelector(".cliente");
let productoInput = d.querySelector(".Produncto");
let presioInput = d.querySelector(".presio");
let imagenInput = d.querySelector(".imagen");
let descripcionInput = d.querySelector(".descripcion");
let btnGuardarInput = d.querySelector(".btn-guardar");

// agregar evento click al boton del formulario 
// el addEventListener es un escuchador de eventos 
// el cual permite hacer la escucha sin modificar el HTML
btnGuardarInput.addEventListener("click", () =>{
  let datos = validarFormulario();
  if (datos != null) {
    guardarDaots(datos);
  }
  borrarTabla();
  mostrarDatos();
})

// funcion para validar los campos del formulario 
function validarFormulario() {
  let datosForm;
  if (clienInput.value == "" || productoInput.value == "" || presioInput.value == "" || imagenInput == "") {
    alert("todos los campos son obligatorios")
  } else{
    datosForm = {
      cliente : clienInput.value,
      producto : productoInput.value,
      presio : presioInput.value,
      imagen : imagenInput.value,
      descripcion : descripcionInput.value
    }
  
  console.log(datosForm)
  
  clienInput.value = "";
  productoInput.value = "";
  presioInput.value = "";
  imagenInput.value = "";
  descripcionInput.value = "";
  
  return datosForm;
  }
}


const listadoPedidos = "pedidos";
// funcion de guardados de datos en el localstorange
function guardarDaots(datos) {
  let pedidos = [];
  // extraer datos guardos en el localstorange
  // el getItem esto va a traer los datos 
  // se agrega el principi del localstorage el JSON.parce para que este 
  // debulva el opceto que esta en protocolo JSON a su estasdo original 
  let pedidosPrebios = JSON.parse(localStorage.getItem(listadoPedidos))
  // validar datos guardados en el localstorange
  if (pedidosPrebios != null) {
    pedidos = pedidosPrebios; 
  }
  // agergat el pedido nuevo en el array
  // el .push lo que hace es guardar los datos de un arry al final de este 
  pedidos.push(datos);

  // garde en el localstorange
  // para que los daotas sean guardados con exito debemos
  // pasar el parametro datos por portocolo JSON, el setItem espara  capturar datos 
  localStorage.setItem(listadoPedidos, JSON.stringify(pedidos));
  // validar que los datos estan guardados 
  alert("se guardo con exito ")
}

// funcion para extraer datos del localstorange
function mostrarDatos() {
  let pedidos = [];
  let pedidosPrebios = JSON.parse(localStorage.getItem(listadoPedidos));
  if (pedidosPrebios !== null) {
    pedidos = pedidosPrebios;

    //console.log(pedidos);
    // mostrae los datos en la tabal 
    pedidos.forEach((p,i) => {
      let fila = d.createElement("tr")
      fila.innerHTML = `
      <td> ${i+1} </td>
      <td class="lista list-group-item"> ${p.cliente} </td>
      <td> ${p.producto} </td>
      <td> ${p.presio} </td>
      <td> ${p.imagen} </td>
      <td> ${p.descripcion} </td>
      <td> 
        <span onclick="editarPedido(${i})" class= "btn-editar btn btn-warning">📑 </span>
        <span onclick="eleminarPedidos(${i})" class= "btn-eleminar btn btn-danger">❌ </span>
      </td>
      `;
      tabla.appendChild(fila)
      
    });
  }
  else{alert("falta datos")}
}
// quitar los datos de las tablas 
function borrarTabla() {
  let filas = d.querySelectorAll(".table > tbody > tr")
  //console.log(filas)
  filas.forEach((f)=>{
    f.remove();
  })
}

// eliminsr dato de la tabla 
function eleminarPedidos(pos) {
  let pedidos = [];
  let pedidosPrebios = JSON.parse(localStorage.getItem(listadoPedidos));
  if (pedidosPrebios !== null) {
    pedidos = pedidosPrebios
  }
  // confimar pedido eliminado 
  let comfirmar = confirm(`¿Deseas eliminar el pedido del ceinte ${pedidos[pos].cliente}?`);
  if (comfirmar) {
    // el splice borra datos del array 
    let p = pedidos.splice(pos,1); 
    alert(`el pedido del cliente ${p.cliente} eliminado con exito`);
    // guardar los datos eliminados 
    localStorage.setItem(listadoPedidos,JSON.stringify(pedidos));
    borrarTabla();
    mostrarDatos();
  }
}
// editar pedido
function editarPedido(pos) {
  let pedidos = [];
  let pedidosPrebios = JSON.parse(localStorage.getItem(listadoPedidos));
  if (pedidosPrebios != null) {
    pedidos = pedidosPrebios;
  }
// pasar los datos al formilario
  clienInput.value = pedidos[pos].cliente;
  productoInput.value = pedidos[pos].producto;
  presioInput.value = pedidos[pos].presio;
  descripcionInput.value = pedidos[pos].descripcion;

  // seleccionar el boton actualizar 
  let btnAcutalizarImput = d.querySelector(".btn-actualizar");
  btnAcutalizarImput.classList.toggle("d-none");
  btnGuardarInput.classList.toggle("d-none");
  btnAcutalizarImput.addEventListener("click", () => {
    pedidos[pos].cliente  = clienInput.value;
    pedidos[pos].producto  = productoInput.value;
    pedidos[pos].presio  = presioInput.value;
    pedidos[pos].descripcion  = descripcionInput.value;
    // gardar datos editados
    localStorage.setItem(listadoPedidos, JSON.stringify(pedidos));
    alert("el dato fue actualizado con exito!!")
    clienInput.value = "";
    productoInput.value = "";
    presioInput.value = "";
    descripcionInput.value = "";
    btnAcutalizarImput.classList.toggle("d-none");
    btnGuardarInput.classList.toggle("d-none");
    borrarTabla();
    mostrarDatos();
  })
}

function buscador() {
  let pedidos = [];
  let pedidosPrebios = JSON.parse(localStorage.getItem(listadoPedidos));
  if (pedidosPrebios !== null) {
    pedidos = pedidosPrebios;
  }

  d.addEventListener("keyup", (e) => {
    if (e.target.matches(".buscador")) {
      d.querySelectorAll(".lista").forEach((pedido) => {
        if (pedido.textContent.toLowerCase().includes(e.target.value.toLowerCase())) {
          pedido.classList.remove("pedidos");
        } else {
          pedido.classList.add("pedidos");
        }
      });
    }
  });
}

// Llama a la función buscador para activar el filtro de búsqueda
buscador();




//mostras los datos de localstorange al recargar
d.addEventListener("DOMContentLoaded", ()=>{
  borrarTabla();
  mostrarDatos();
})

