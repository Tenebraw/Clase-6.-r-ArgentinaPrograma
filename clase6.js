
/*
TAREA:
Crear una interfaz que permita agregar ó quitar (botones agregar y quitar) 
inputs+labels para completar el salario anual de cada integrante de la familia que trabaje.
Al hacer click en "calcular", mostrar en un elemento pre-existente el mayor salario anual, 
menor salario anual, salario anual promedio y salario mensual promedio.

Punto bonus: si hay inputs vacíos, ignorarlos en el cálculo (no contarlos como 0).
*/

function inicioProceso(){

    const botonProceder = document.querySelector('#proceder');
    botonProceder.onclick =function(evento){
        const cantidadDeIntegrantes = parseInt(document.querySelector('#cantidad-integrantes').value);
        const inputCantidadDeIntegrantes = document.querySelector('#cantidad-integrantes');
        botonProceder.setAttribute('disabled','');
        inputCantidadDeIntegrantes.setAttribute('disabled','');
        
        crearElementosInputs(cantidadDeIntegrantes,botonProceder,inputCantidadDeIntegrantes);
        evento.preventDefault();
    }
}

function crearElementosInputs(cantidadDeIntegrantes,botonProceder,inputCantidadDeIntegrantes){

    const nuevosIntegrantes = document.querySelector('#nuevosintegrantes');
    for(let i=0;i<cantidadDeIntegrantes;i++){
        const newUsers = document.createElement('input');
       const newbR = document.createElement('br');
        const newLabel = document.createElement('label');
        newLabel.textContent = ` Integrante nº ${i+1} `;
        newUsers.type='number';
        newUsers.min='01';
        newUsers.placeholder='edad';
        newUsers.className ='edadinput';
        nuevosIntegrantes.appendChild(newLabel);
        nuevosIntegrantes.appendChild(newUsers);

 // Mostrando botones Calcular y Resetear. 
        const botonCalcular = document.querySelector('#calcular');
        const botonResetear = document.querySelector('#resetear');
        botonResetear.removeAttribute('hidden');
        botonCalcular.removeAttribute('hidden');
        
        botonCalcular.onclick=function(evento){
            calculosEdad();
            evento.preventDefault();
        } 
        botonResetear.onclick=function(evento){
            BorrarCampos(nuevosIntegrantes,botonCalcular,botonResetear,botonProceder,inputCantidadDeIntegrantes);
            evento.preventDefault();
        }

        // Implementaciones tarea 2. Salarios. Creacion botones Agregar y Quitar.

        const botonAgregarSalario = document.createElement('button');
        botonAgregarSalario.textContent='Agregar Salario';
        botonAgregarSalario.className='botonsalarioinput';
        nuevosIntegrantes.appendChild(botonAgregarSalario);
        const inputsSalario = document.createElement('input');
        inputsSalario.type='number';
        inputsSalario.min='01';
        inputsSalario.placeholder='salario';
        inputsSalario.className ='salarioinput';
        inputsSalario.setAttribute('hidden','');
        nuevosIntegrantes.appendChild(inputsSalario);

        const botonQuitar = document.createElement('button');
        botonQuitar.textContent='Quitar';
        botonQuitar.className ='botonquitarsalario';
        botonQuitar.setAttribute('hidden','');
        nuevosIntegrantes.appendChild(botonQuitar);

        botonAgregarSalario.onclick=function(evento){
            agregarSalario(inputsSalario);
            agregarBotonQuitar(botonQuitar,inputsSalario);
            evento.preventDefault();
        }           
        nuevosIntegrantes.appendChild(newbR);
    }
}


function calculosEdad(){
    const edadInputs = document.querySelectorAll('.edadinput');
    const nuevoArrayEdad = Array.from(edadInputs);

    function filtroEdad(x){//Filtro para solo considerar los values no vacios.
        return x.value.length!=0;
    }
    const filtroArrayEdad= nuevoArrayEdad.filter(filtroEdad);  
    let x = calcularElMayor(filtroArrayEdad);
    let y= calcularElMenor(filtroArrayEdad);
    let z= calcularElPromedio(filtroArrayEdad);
    mostrarResultadosEdad(x,y,z);
}

//Tarea 2
function calculosSalarios(){
    const salarioInput = document.querySelectorAll('.salarioinput');
    const nuevoArraySalario = Array.from(salarioInput);

    function filtroSalario(y){//Filtro para solo considerar los values no vacios.
        return y.value.length!=0;
    }

    const filtroArraySalario= nuevoArraySalario.filter(filtroSalario);
    let x = calcularElMayor(filtroArraySalario);
    let y =calcularElMenor(filtroArraySalario);
    let z = calcularElPromedio(filtroArraySalario);
    let v = salarioMensualPromedio(filtroArraySalario);
    mostrarResultadosSalarios(x,y,z,v);    
}

function calcularElMayor(datos){
    let mayor =0;
    for(let i=0;i<datos.length;i++){
        if(parseInt(datos[i].value)>=mayor){
            mayor= parseInt(datos[i].value);
        }
    }
    return mayor;
}

function calcularElMenor(datos){
   let menor =parseInt(datos[0].value);
    for(let i=0;i<datos.length;i++){
        if(parseInt(datos[i].value) <=menor){
            menor =parseInt(datos[i].value);
        }
    }
    return menor;
}

function calcularElPromedio(datos){
    let total =0;
    for(let i=0;i<datos.length;i++){
        total = total+parseInt(datos[i].value);
    }
    return (total/datos.length).toFixed(2);
}

//Tarea 2
function salarioMensualPromedio(datos){
    let total =0;
    for(let i=0;i<datos.length;i++){
        total = total+parseInt(datos[i].value);
    }
    return ((total/datos.length)/12).toFixed(2);
}

function mostrarResultadosEdad(x,y,z){

    const resultadosAmostrar = document.querySelector('#resultadosEdad');
    resultadosAmostrar.textContent =
    `
    La mayor edad es ${x}. 
    La edad menor es ${y}. 
    El promedio es de ${z}.
    `;
    return resultadosAmostrar.removeAttribute('hidden');
}

// Tarea 2
function mostrarResultadosSalarios(x,y,z,v){
    const resultadosSalariosAmostrar = document.querySelector('#resultadosSalarios');
    resultadosSalariosAmostrar.textContent =
    `
    El mayor salario anual es ${x}. 
    El menor salario anual es ${y}. 
    Promedio salarios anuales es ${z}.
    Promedio salario mensual es ${v};
    `;
    return resultadosSalariosAmostrar.removeAttribute('hidden');
}

// Al resetear borramos los campos correspondientes.
function BorrarCampos(nuevosIntegrantes,botonResetear,botonCalcular,botonProceder,inputCantidadDeIntegrantes){
    nuevosIntegrantes.innerHTML = "";
    const resultadosAborrar = document.querySelector('#resultadosEdad');
    const resultadosSalariosAborrar = document.querySelector('#resultadosSalarios');
    resultadosAborrar.setAttribute('hidden','');
    resultadosSalariosAborrar.setAttribute('hidden','');
    botonCalcular.setAttribute('hidden','');
    botonResetear.setAttribute('hidden','');
    botonProceder.removeAttribute('disabled');
    inputCantidadDeIntegrantes.removeAttribute('disabled');
    // Tarea 2
    const botonCalcularSalario = document.querySelector('#calcularsalario');
    botonCalcularSalario.setAttribute('hidden',''); 
}

// Tarea 2 Clase 6

function agregarSalario(inputsSalario){
    inputsSalario.removeAttribute('hidden');
    const botonCalcularSalario = document.querySelector('#calcularsalario');
    botonCalcularSalario.removeAttribute('hidden');
    botonCalcularSalario.onclick=function(evento){
        calculosSalarios();
        evento.preventDefault();
    }
}

function agregarBotonQuitar(botonQuitar,inputsSalario){
     botonQuitar.removeAttribute('hidden');
     botonQuitar.onclick=function(evento){
        inputsSalario.setAttribute('hidden','');
        botonQuitar.setAttribute('hidden','');
        evento.preventDefault();
     }    
}

inicioProceso();