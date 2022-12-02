import Subject from "../monitor/await-notify.js";

const event = new Subject();

new Typed(".typed", {
  strings: [
    '<span class="sub-tittle"">Thelma Galicia</span>',
    '<span class="sub-tittle"">Rony Quiñones</span>',
  ],

  //stringsElement: '#cadenas-texto', // ID del elemento que contiene cadenas de texto a mostrar.
  typeSpeed: 75, // Velocidad en mlisegundos para poner una letra,
  startDelay: 300, // Tiempo de retraso en iniciar la animacion. Aplica tambien cuando termina y vuelve a iniciar,
  backSpeed: 75, // Velocidad en milisegundos para borrrar una letra,
  smartBackspace: true, // Eliminar solamente las palabras que sean nuevas en una cadena de texto.
  shuffle: false, // Alterar el orden en el que escribe las palabras.
  backDelay: 1500, // Tiempo de espera despues de que termina de escribir una palabra.
  loop: true, // Repetir el array de strings
  loopCount: false, // Cantidad de veces a repetir el array.  false = infinite
  showCursor: true, // Mostrar cursor palpitanto
  cursorChar: "|", // Caracter para el cursor
  contentType: "html", // 'html' o 'null' para texto sin formato
});

let divFilosofo1 = document.querySelector(".filosofo1");
let divFilosofo2 = document.querySelector(".filosofo2");
let divFilosofo3 = document.querySelector(".filosofo3");
let divFilosofo4 = document.querySelector(".filosofo4");
let divFilosofo5 = document.querySelector(".filosofo5");

const tenedor1 = document.querySelector(".tenedor1");
const tenedor2 = document.querySelector(".tenedor2");
const tenedor3 = document.querySelector(".tenedor3");
const tenedor4 = document.querySelector(".tenedor4");
const tenedor5 = document.querySelector(".tenedor5");

let clasesTenedores = [tenedor1, tenedor2, tenedor3, tenedor4, tenedor5];

const filofoso1 = new Worker("../threads/filosofo1.js");
const filofoso2 = new Worker("../threads/filosofo2.js");
const filofoso3 = new Worker("../threads/filosofo3.js");
const filofoso4 = new Worker("../threads/filosofo4.js");
const filofoso5 = new Worker("../threads/filosofo5.js");

let tenedores = [false, false, false, false, false];
let pensando = "pensando";
let comiendo = "comiendo";

let tenedorIzquierda = (i) => i;

let tenedorDerecha = (i) => {
  if (i == 0) {
    return tenedores.length - 1;
  } else {
    return i - 1;
  }
};

const cogerTenedores = async (comensal) => {
  while (
    tenedores[tenedorIzquierda(comensal)] ||
    tenedores[tenedorDerecha(comensal)]
  ) {
    console.log("filosofo", comensal + 1, "esta esperando");
    await event.wait();
  }

  tenedores[tenedorIzquierda(comensal)] = true;
  tenedores[tenedorDerecha(comensal)] = true;
  clasesTenedores[
    tenedorIzquierda(comensal)
  ].className = `cogido${tenedorIzquierda(comensal)}`;
  clasesTenedores[
    tenedorDerecha(comensal)
  ].className = `cogido${tenedorDerecha(comensal)}`;
  console.log(tenedores)
};

const dejarTenedores = (comensal) => {
  tenedores[tenedorIzquierda(comensal)] = false;
  tenedores[tenedorDerecha(comensal)] = false;
  clasesTenedores[
    tenedorIzquierda(comensal)
  ].className = `dejado${tenedorIzquierda(comensal)}`;
  clasesTenedores[
    tenedorDerecha(comensal)
  ].className = `dejado${tenedorDerecha(comensal)}`;
  console.log(tenedores);
  event.notifyAll();
};

function handlerFilosofo1() {
  filofoso1.postMessage(pensando);
  divFilosofo1.className = "pensando";
  filofoso1.onmessage = async (e) => {
    await cogerTenedores(e.data - 1);
    console.log("first");
    if (
      tenedores[tenedorIzquierda(e.data - 1)] &&
      tenedores[tenedorDerecha(e.data - 1)]
    ) {
      filofoso1.postMessage(comiendo);
      divFilosofo1.className = "comiendo";

      filofoso1.onmessage = (e) => {
        dejarTenedores(e.data - 1);
        handlerFilosofo1();
      };
    }
  };
}

function handlerFilosofo2() {
  filofoso2.postMessage(pensando);
  divFilosofo2.className = "pensando";
  filofoso2.onmessage = async (e) => {
    await cogerTenedores(e.data - 1);
    console.log("second");
    if (
      tenedores[tenedorIzquierda(e.data - 1)] &&
      tenedores[tenedorDerecha(e.data - 1)]
    ) {
    
      filofoso2.postMessage(comiendo);
      divFilosofo2.className = "comiendo";
      filofoso2.onmessage = (e) => {
        dejarTenedores(e.data - 1);
        handlerFilosofo2();
      };
    }
  };
}

function handlerFilosofo3() {
  filofoso3.postMessage(pensando);
  divFilosofo3.className = "pensando";
  filofoso3.onmessage = async (e) => {
    await cogerTenedores(e.data - 1);
    console.log("third");
    if (
      tenedores[tenedorIzquierda(e.data - 1)] &&
      tenedores[tenedorDerecha(e.data - 1)]
    ) {
      
      filofoso3.postMessage(comiendo);
      divFilosofo3.className = "comiendo";
      filofoso3.onmessage = (e) => {
        dejarTenedores(e.data - 1);
        handlerFilosofo3();
      };
    }
  };
}

function handlerFilosofo4() {
  filofoso4.postMessage(pensando);
  divFilosofo4.className = "pensando";
  filofoso4.onmessage = async (e) => {
    await cogerTenedores(e.data - 1);
    console.log("for");
    if (
      tenedores[tenedorIzquierda(e.data - 1)] &&
      tenedores[tenedorDerecha(e.data - 1)]
    ) {
     
      filofoso4.postMessage(comiendo);
      divFilosofo4.className = "comiendo";
      filofoso4.onmessage = (e) => {
        dejarTenedores(e.data - 1);

        handlerFilosofo4();
      };
    }
  };
}

function handlerFilosofo5() {
  filofoso5.postMessage(pensando);
  divFilosofo5.className = "pensando";
  filofoso5.onmessage = async (e) => {
    await cogerTenedores(e.data - 1);
    console.log("five");
    if (
      tenedores[tenedorIzquierda(e.data - 1)] &&
      tenedores[tenedorDerecha(e.data - 1)]
    ) {
    
      filofoso5.postMessage(comiendo);
      divFilosofo5.className = "comiendo";
      filofoso5.onmessage = (e) => {
        dejarTenedores(e.data - 1);
        handlerFilosofo5();
      };
    }
  };
}

const iniciar = document.querySelector(".iniciar");

iniciar.addEventListener("click", () => ejecutar());

const reiniciar = document.querySelector(".reiniciar");

reiniciar.addEventListener("click", () => {
  document.location.reload();
});

let iterador = 0

const ejecutar = () => {
  if(iterador != 1){
    
    iniciar.setAttribute("disabled", "true");
    handlerFilosofo1();
    handlerFilosofo2();
    handlerFilosofo3();
    handlerFilosofo4();
    handlerFilosofo5();
    iterador++
  }
};
