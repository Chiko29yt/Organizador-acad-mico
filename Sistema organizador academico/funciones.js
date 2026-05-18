let actividades = [];

function agregarActividad(){

    const materia = document.getElementById("materia").value;
    const actividad = document.getElementById("actividad").value;
    const tipo = document.getElementById("tipo").value;
    const fecha = document.getElementById("fecha").value;

    const alerta = document.getElementById("alerta");

    if(
        materia === "" ||
        actividad === "" ||
        fecha === ""
    ){
        alerta.style.display = "block";

        setTimeout(()=>{
            alerta.style.display = "none";
        },2000);

        return;
    }

    const nuevaActividad = {
        materia,
        actividad,
        tipo,
        fecha
    };

    actividades.push(nuevaActividad);

    mostrarActividades();

    limpiarCampos();
}

function mostrarActividades(){

    const lista = document.getElementById("listaActividades");

    lista.innerHTML = "";

    actividades.forEach((act,index)=>{

        lista.innerHTML += `

        <div class="item">

            <h3>${act.actividad}</h3>

            <p> Materia: ${act.materia}</p>

            <p> Tipo: ${act.tipo}</p>

            <p class="fecha"> Fecha: ${act.fecha}</p>

            <button onclick="eliminarActividad(${index})">
                Eliminar
            </button>

        </div>

        `;

    });

    actualizarContador();

    verificarRecordatorios();
}

function eliminarActividad(index){

    actividades.splice(index,1);

    mostrarActividades();
}

function actualizarContador(){

    document.getElementById("contador").innerHTML =
        "Actividades pendientes: " + actividades.length;
}

function limpiarCampos(){

    document.getElementById("materia").value = "";
    document.getElementById("actividad").value = "";
    document.getElementById("fecha").value = "";
}

function verificarRecordatorios(){

    const hoy = new Date();

    actividades.forEach(act=>{

        const fechaEntrega = new Date(act.fecha);

        const diferencia =
            (fechaEntrega - hoy) / (1000 * 60 * 60 * 24);

        if(diferencia <= 2 && diferencia >= 0){

            alert(
                "⏰ Recordatorio:\n\n" +
                act.actividad +
                " de " +
                act.materia +
                " vence pronto."
            );

        }

    });

}