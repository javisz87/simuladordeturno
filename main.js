const turnos = [];
 function sacarTurno(event) {
  event.preventDefault(); // Evita que se recargue la página al enviar el formulario
   const nombre = document.getElementById("nombre").value;
  const apellido = document.getElementById("apellido").value;
  const medicoSelect = document.getElementById("medico");
  const medico = medicoSelect.options[medicoSelect.selectedIndex].text;
  const fecha = document.getElementById("fecha").value;
   if (nombre && apellido && medico && fecha) {
    const numeroTurno = turnos.length + 1;
    turnos.push({ nombre, apellido, medico, fecha });
     const resultado = document.getElementById("resultado");
    resultado.innerHTML = `Turno ${numeroTurno}: ${nombre} ${apellido} - ${medico} - ${fecha}`;
  } else {
    alert("Por favor, completa todos los campos.");
  }
}
 const sacarTurnoBtn = document.getElementById("sacarTurnoBtn");
sacarTurnoBtn.addEventListener("click", sacarTurno);