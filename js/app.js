const container = document.querySelector(".container");
const formulario = document.querySelector("#formulario");
const resultado = document.querySelector("#resultado");

window.addEventListener('load', () =>{
    formulario.addEventListener('submit', consultar);
});


function consultar(e){
    e.preventDefault();
    const ciudad = document.querySelector("#ciudad").value;
    const pais = document.querySelector("#pais").value;

    if(ciudad === '' || pais === ''){
        
        mensajes("Ambos campos son obligatorios", "error");

        return;
    }


    consultarAPI(ciudad, pais);
}


function consultarAPI(ciudad, pais){
    const apyKey = "dd91a5392f74fd6bf1e8c772fd426702";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${apyKey}`;
    
    spinner();

    fetch(url)
        .then(result =>  result.json())
        .then(data => {
            if(data.cod === "404"){
                mensajes("Ciudad No encontrada", "error");

                limpiarLista();
                return;
            }
            console.log(data);
            mostrarClima(data.main, ciudad);
        });

    
}

function mostrarClima({temp, temp_max, temp_min}, ciudad){

    limpiarLista();

    const centigrados = kelvinCentigrados(temp);
    const max = kelvinCentigrados(temp_max);
    const min = kelvinCentigrados(temp_min);

    const actual = document.createElement('p');
    actual.innerHTML = `<strong class="font-bold">${ciudad}</strong><br>
                        ${centigrados} &#8451;`;
    actual.classList.add('font-bold', 'text-6xl');

    const tempMax = document.createElement('p');
    tempMax.innerHTML = `Max: ${max} &#8451;`;
    tempMax.classList.add('text-xl');
    
    const tempMin = document.createElement('p');
    tempMin.innerHTML = `Min: ${min} &#8451;`;
    tempMin.classList.add('text-xl');

    

    const resultDiv = document.createElement('div');
    resultDiv.classList.add('text-center', 'text-white');

    resultDiv.appendChild(actual);
    resultDiv.appendChild(tempMax);
    resultDiv.appendChild(tempMin);

    


    resultado.appendChild(resultDiv);
    console.log(centigrados);
}

const kelvinCentigrados = grados => parseInt(grados - 273.15);

function mensajes(mensaje, tipo){

    const alerta = document.querySelector(".alerta");
    if(!alerta){
        const divMensaje = document.createElement('div');
        divMensaje.classList.add('bg-red-100',  'border-red-400', 'text-red-700', 'px-4', 'py-3', 'rounded', 'max-w-md', 'mx-auto', 'mt-6', 'text-center', 'alerta')

        if(tipo === 'error'){
            divMensaje.innerHTML=`<strong class="font-bold">Error!</strong>
                                <span class="block sm:inline">${mensaje}</span>`;
        }else{
            
        }

        formulario.appendChild(divMensaje);

        setTimeout(() =>{
            divMensaje.remove();
        },2000);
    }    
}


function limpiarLista(){
    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild);
    }
}

function spinner(){
    limpiarLista();
    const divSpinner = document.createElement('div');
    divSpinner.classList.add('sk-fading-circle');
    divSpinner.innerHTML = `
                        <div class="sk-circle1 sk-circle"></div>
                        <div class="sk-circle2 sk-circle"></div>
                        <div class="sk-circle3 sk-circle"></div>
                        <div class="sk-circle4 sk-circle"></div>
                        <div class="sk-circle5 sk-circle"></div>
                        <div class="sk-circle6 sk-circle"></div>
                        <div class="sk-circle7 sk-circle"></div>
                        <div class="sk-circle8 sk-circle"></div>
                        <div class="sk-circle9 sk-circle"></div>
                        <div class="sk-circle10 sk-circle"></div>
                        <div class="sk-circle11 sk-circle"></div>
                        <div class="sk-circle12 sk-circle"></div>`;

    resultado.appendChild(divSpinner);
}