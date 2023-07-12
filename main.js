const turnos = [];
 function sacarTurno() {
  let deseaSacarTurno = true;
  while (deseaSacarTurno) {
    const numeroTurno = turnos.length + 1;
    turnos.push(numeroTurno);
    const resultado = document.getElementById("resultado");
    resultado.innerHTML = "Tu turno es el número " + numeroTurno + ".<br>Tienes " + (numeroTurno - 1) + " personas adelante.";
    console.log("Tu turno es el número " + numeroTurno + ".\nTienes " + (numeroTurno - 1) + " personas adelante.");
    deseaSacarTurno = confirm("¿Deseas sacar otro turno?");
  }
   if (turnos.length === 0) {
    const resultado = document.getElementById("resultado");
    resultado.innerHTML = "No se sacaron turnos.";
    console.log("No se sacaron turnos.");
  } else if (turnos.length === 1) {
    console.log("Se sacó 1 turno.");
  } else {
    console.log("Se sacaron " + turnos.length + " turnos.");
  }
}
 const sacarTurnoBtn = document.getElementById("sacarTurnoBtn");
sacarTurnoBtn.addEventListener("click", sacarTurno);
 window.addEventListener("resize", function() {
  const resultado = document.getElementById("resultado");
  resultado.innerHTML = "";
});