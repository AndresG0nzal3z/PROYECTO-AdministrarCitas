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

}
function reiniciarObjeto(){
    citaObj.mascota = '';
    citaObj.propietario = '';
    citaObj.telefono = '';
    citaObj.fecha = '';
    citaObj.hora = '';
    citaObj.sintomas = '';
}