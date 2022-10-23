let id = 2;

let handlerPensando = (data) => {
  self.postMessage(id);
  if (data == "comiendo") {
    console.log("Filosofo ", id, " deja de comer, tenedores libres ");
  }
};

self.onmessage = ({ data }) => {
  if (data == "pensando") {
    console.log("el filosofo 2 esta pensando");
    setTimeout(
      () => handlerPensando(data),
      Math.floor(Math.random() * (5000 - 1000 + 1000) + 1000)
    );
  } else {
    console.log("el filosofo 2 esta comiendo");
    setTimeout(
      () => handlerPensando(data),
      Math.floor(Math.random() * (5000 - 1000 + 1000) + 1000)
    );
  }
};
