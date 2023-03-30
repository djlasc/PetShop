export function valida(input) {
    const tipoDeInput = input.dataset.tipo
    if(validadores[tipoDeInput]){
        validadores[tipoDeInput](input)
    }

    //valida un input para poner o quitar una clase
    if(input.validity.valid){
        input.parentElement.classList.remove("input-container--invalid")
        input.parentElement.querySelector(".input-message-error").innerHTML = ""
    }else{
        input.parentElement.classList.add("input-container--invalid")
        input.parentElement.querySelector(".input-message-error").innerHTML = mostarMensajeDeError(tipoDeInput, input)
    }
}

const tiposDeErrores = [ 
    "valueMissing",
    "typeMismatch",
    "patternMismatch",
    "customError",
];

const mensajesDeError = {
    nombre: {
        valueMissing: "Este campo no puede estar vacio",
    },
    email: {
        valueMissing: "Este campo no puede estar vacio",
        typeMismatch: "el correo no es valido",
    },
    password: {
        valueMissing: "Este campo no puede estar vacio",
        patternMismatch: "Al menos 6 caracteres, maximo 12, y debe contener una letra minuscula, una letra mayuscula, un numero y no debe contener caracteres especiales",
    },
    nacimiento: {
        valueMissing: "Este campo no puede estar vacio",
        customError: "Debes tener al menos 18 años de edad",
    },
    numero:{
        valueMissing: "Este campo no puede estar vacio",
        patternMismatch: "El fortamto es de 10 números xxxxxxxxxx",
    },
    direccion:{
        valueMissing: "Este campo no puede estar vacio",
        patternMismatch: "La dirección debe contener entre 10 y 40 caracteres",
    },
    ciudad:{
        valueMissing: "Este campo no puede estar vacio",
        patternMismatch: "La ciudad debe contener entre 10 y 40 caracteres",
    },
    estado:{
        valueMissing: "Este campo no puede estar vacio",
        patternMismatch: "El estado debe contener entre 10 y 40 caracteres",
    }
}

const validadores = {
    nacimiento: input => validarNacimiento(input),
};

function mostarMensajeDeError(tipoDeInput, input) {
    let mensaje = "";
    tiposDeErrores.forEach((error) => {
        if(input.validity[error]) {
            //console.log(tipoDeInput, error);
            //console.log(input.validity[error]);
            //console.log(mensajesDeError[tipoDeInput][error]);
            mensaje = mensajesDeError[tipoDeInput][error];
        }
    });
    return mensaje;
}


function validarNacimiento(input) {
    const fechaCliente = new Date(input.value);
    let mensaje = "";
    if(!mayorDeEdad(fechaCliente)){
        mensaje = " Debes tener al menos 18 años";
    }

    input.setCustomValidity(mensaje);
};

function mayorDeEdad(fecha) {
    const fechaActual = new Date();
    const diferenciaFechas = new Date(
        fecha.getUTCFullYear() + 18,
        fecha.getUTCMonth(),
        fecha.getUTCDate()
        );
        return diferenciaFechas <= fechaActual;
};
