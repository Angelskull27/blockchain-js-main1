const Blockchain = require("./src/blockchain"); // Importa la clase Blockchain desde otro archivo
const Block = require("./src/block"); // Importa la clase Block desde otro archivo

async function run() {
  // Función principal para ejecutar la simulación de la cadena de bloques
  const blockchain = await new Blockchain(); // Crea una nueva instancia de la cadena de bloques
  const block1 = new Block({ data: "Bloque #1" }); // Crea un nuevo bloque con datos específicos
  await blockchain.addBlock(block1); // Añade el primer bloque a la cadena de bloques
  const block2 = new Block({ data: "Bloque #2" }); // Crea otro bloque con diferentes datos
  await blockchain.addBlock(block2); // Añade el segundo bloque a la cadena de bloques
  const block3 = new Block({ data: "Bloque #3" }); // Crea otro bloque con diferentes datos
  await blockchain.addBlock(block3); // Añade el tercer bloque a la cadena de bloques

  blockchain.print(); // Imprime la cadena de bloques en la consola
}

run(); // Ejecuta la función principal para simular el funcionamiento de la cadena de bloques
