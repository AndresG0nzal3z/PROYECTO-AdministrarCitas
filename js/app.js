// seleccionar elementos
const MascotaInput = document.querySelector('#mascota');
const DuenioInput = document.querySelector('#propietario');
const NumeroTelefonoInput = document.querySelector('#telefono');
const FechaInput = document.querySelector('#fecha');
const HoraInput = document.querySelector('#hora');
const SintomasInput = document.querySelector('#sintomas');

const Formulario = document.querySelector('#nueva-cita');
const ContenedorCitas = document.querySelector('#citas');

// objeto principal
const citaObj = {
    mascota: '',
    propietario: '',
    telefono: '',
    fecha: '',
    hora: '',
    sintomas: ''
}
// clases
class Citas{
    constructor(){
        this.citas = [];
    }
    setCita(cita){
        this.citas = [...this.citas, cita];
    }
}
class UserInterfaces{
    MostrarAlerta(mensaje, tipo){
        // crando la alerta y agregandole clases
        const alerta = document.createElement('div');
        alerta.classList.add('text-center', 'alert', 'd-block', 'col-12');

        if(tipo === 'error'){ // verifica que tipo de alerta es
            alerta.classList.add('alert-danger');
        }else{
            alerta.classList.add('alert-succes');
        }
        
        alerta.textContent = mensaje; // agrega el mensaje a la alerta
        document.querySelector('#contenido').insertBefore(alerta, document.querySelector('.agregar-cita')); // agrega la alerta al DOM
        setTimeout(() => { // despues de 2 segundos la alerta deja de existir
            alerta.remove();
        }, 2000);
    }
    mostarCitas({citas}){
        this.limpiarHTML();
        citas.forEach(cita => {
            const { mascota, propietario, telefono, fecha, hora, sintomas, id } = cita; // extrae informacion (Destructuring) de cada objeto del arreglo

            const div = document.createElement('div');
            div.classList.add('cita', 'p-3');
            div.dataset.id = id;

            const mascotaParrafo = document.createElement('h2');
            mascotaParrafo.classList.add('card-title', 'font-weight-bolder');
            mascotaParrafo.innerHTML = `${mascota}`;

            const propietarioParrafo = document.createElement('p');
            propietarioParrafo.innerHTML = `<span class="font-weight-bolder">Propietario: </span> ${propietario}`;

            const telefonoParrafo = document.createElement('p');
            telefonoParrafo.innerHTML = `<span class="font-weight-bolder">Teléfono: </span> ${telefono}`;

            const fechaParrafo = document.createElement('p');
            fechaParrafo.innerHTML = `<span class="font-weight-bolder">Fecha: </span> ${fecha}`;

            const horaParrafo = document.createElement('p');
            horaParrafo.innerHTML = `<span class="font-weight-bolder">Hora: </span> ${hora}`;

            const sintomasParrafo = document.createElement('p');
            sintomasParrafo.innerHTML = `<span class="font-weight-bolder">Síntomas: </span> ${sintomas}`;

            // Agregar un botón de eliminar...
            const btnEliminar = document.createElement('button');
            btnEliminar.onclick = () => eliminarCita(id); // añade la opción de eliminar
            btnEliminar.classList.add('btn', 'btn-danger', 'mr-2');
            btnEliminar.innerHTML = 'Eliminar <svg fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>'

            // Añade un botón de editar...
            const btnEditar = document.createElement('button');
            btnEditar.onclick = () => cargarEdicion(cita);

            btnEditar.classList.add('btn', 'btn-info');
            btnEditar.innerHTML = 'Editar <svg fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>'

            div.appendChild(mascotaParrafo);
            div.appendChild(propietarioParrafo);
            div.appendChild(telefonoParrafo);
            div.appendChild(fechaParrafo);
            div.appendChild(horaParrafo);
            div.appendChild(sintomasParrafo);
            div.appendChild(btnEliminar)
            div.appendChild(btnEditar);

            ContenedorCitas.appendChild(div);
        });
    }
    limpiarHTML(){
        while(ContenedorCitas.firstChild){
            ContenedorCitas.firstChild.remove();
        }
    }
}
// instanciar
const UI = new UserInterfaces();
const adminCita = new Citas();

// eventos
eventListeners();
function eventListeners(){
    MascotaInput.addEventListener('input', datosCita);
    DuenioInput.addEventListener('input', datosCita);
    NumeroTelefonoInput.addEventListener('input', datosCita);
    FechaInput.addEventListener('input', datosCita);
    HoraInput.addEventListener('input', datosCita);
    SintomasInput.addEventListener('input', datosCita);

    Formulario.addEventListener('submit', nuevaCita);
}

// funciones
function datosCita(e){ // agrega datos al objeto principal
    citaObj[e.target.name] = e.target.value;
}
function nuevaCita(e){ // valida y agrega una cita nueva a la clase citas
    e.preventDefault();

    const { mascota, propietario, telefono, fecha, hora, sintomas } = citaObj; // extrae informacion (Destructuring) del objeto cita 

    if(mascota === '' || propietario === '' || telefono === '' || fecha === '' || hora === '' || sintomas === ''){ // validar informacion
        UI.MostrarAlerta('Todos los campos son obligatorios.', 'error');
        return;
    }

    citaObj.id = Date.now(); // dandole un id a la cita
    adminCita.setCita({...citaObj}); // agrega la cita al arreglo de citas
    Formulario.reset(); // reinicia el formulario 
    reiniciarObjeto(); // reinicia el objeto
    UI.mostarCitas(adminCita); // agrega el html de la cita al DOM

}
function reiniciarObjeto(){
    citaObj.mascota = '';
    citaObj.propietario = '';
    citaObj.telefono = '';
    citaObj.fecha = '';
    citaObj.hora = '';
    citaObj.sintomas = '';
}