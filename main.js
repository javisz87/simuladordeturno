// Declarar el arreglo de turnos como una variable global
const turnos = [];
 // Cargar datos almacenados en localStorage al cargar la página
window.addEventListener("load", function() {
  const turnosGuardados = localStorage.getItem("turnos");
  if (turnosGuardados) {
    turnos = JSON.parse(turnosGuardados);
    mostrarTurnos();
  }
});
 // Función para mostrar los turnos en el DOM
function mostrarTurnos() {
  const resultado = document.getElementById("resultado");
  resultado.innerHTML = "";
  turnos.forEach(function(turno, index) {
    const numeroTurno = index + 1;
    const turnoHTML = document.createElement("p");
    turnoHTML.textContent = `Turno ${numeroTurno}: ${turno.nombre} ${turno.apellido} - ${turno.medico} - ${turno.fecha}`;
    resultado.appendChild(turnoHTML);
  });
}
 // Función para guardar los turnos en localStorage
function guardarTurnos() {
  localStorage.setItem("turnos", JSON.stringify(turnos));
}
 // Función para sacar un turno
function sacarTurno(event) {
  event.preventDefault();
  const nombre = document.getElementById("nombre").value;
  const apellido = document.getElementById("apellido").value;
  const medicoSelect = document.getElementById("medico");
  const medico = medicoSelect.options[medicoSelect.selectedIndex].text;
  const fecha = document.getElementById("fecha").value;
   if (nombre && apellido && medico && fecha) {
    const numeroTurno = turnos.length + 1;
    turnos.push({ nombre, apellido, medico, fecha });
    mostrarTurnos();
    guardarTurnos();
  } else {
    alert("Por favor, completa todos los campos.");
  }
}
 const sacarTurnoBtn = document.getElementById("sacarTurnoBtn");
sacarTurnoBtn.addEventListener("click", sacarTurno);