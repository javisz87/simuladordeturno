// Declarar el arreglo de turnos como una variable global
let turnos = [];

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
    const fechaFormateada = moment(turno.fecha).format('DD/MM/YYYY');
    turnoHTML.textContent = `Turno ${numeroTurno}: ${turno.nombre} ${turno.apellido} - ${turno.medico} - ${fechaFormateada} - ${turno.horario}`;
    // Agregar botón de cancelar turno
    const cancelarBtn = document.createElement("button");
    cancelarBtn.textContent = "Cancelar";
    cancelarBtn.addEventListener("click", function() {
      cancelarTurno(index);
    });
    turnoHTML.appendChild(cancelarBtn);
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
  const horario = document.getElementById("horario").value;

  if (nombre && apellido && medico && fecha && horario) {
    const fechaActual = moment();
    const fechaTurno = moment(fecha, 'YYYY-MM-DD');

    if (fechaTurno.isBefore(fechaActual, 'day')) {
      // La fecha del turno es anterior a la fecha actual
      alert('No puedes sacar un turno para una fecha pasada.');
    } else {
      const turnoExistente = turnos.find(turno => turno.fecha === fecha && turno.horario === horario);

      if (turnoExistente) {
        alert("Ya existe un turno para esta fecha y horario. Por favor, elige otra fecha y horario.");
      } else {
        const numeroTurno = turnos.length + 1;
        turnos.push({ nombre, apellido, medico, fecha, horario });
        mostrarTurnos();
        guardarTurnos();
        // Mostrar mensaje de confirmación
        alert("El turno se ha guardado correctamente.");
        // Realizar solicitud POST para guardar el turno en el servidor
        fetch("https://api.example.com/turnos", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ nombre, apellido, medico, fecha, horario }),
        })
          .then(response => response.json())
          .then(data => {
            // Hacer algo con la respuesta del servidor
            console.log(data);
          })
          .catch(error => {
            // Manejar el error en caso de fallo en la petición
            console.error(error);
          });
      }
    }
  } else {
    alert("Por favor, completa todos los campos.");
  }
}

// Función para cancelar un turno
function cancelarTurno(index) {
  turnos.splice(index, 1);
  mostrarTurnos();
  guardarTurnos();
}

const sacarTurnoBtn = document.getElementById("sacarTurnoBtn");
sacarTurnoBtn.addEventListener("click", sacarTurno);