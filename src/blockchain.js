const SHA256 = require("crypto-js/sha256"); // Importa la función de hash SHA256
const Block = require("./block"); // Importa la clase Block desde otro archivo

class Blockchain {
  constructor() {
    // Constructor de la clase Blockchain
    this.chain = []; // Almacena la cadena de bloques
    this.height = -1; // Altura inicial de la cadena
    this.initializeChain(); // Inicializa la cadena si está vacía
  }

  async initializeChain() {
    // Método para inicializar la cadena con un bloque génesis si está vacía
    if (this.height === -1) {
      const block = new Block({ data: "Bloque 0" }); // Crea un bloque génesis
      await this.addBlock(block); // Añade el bloque a la cadena
    }
  }

  addBlock(block) {
    // Método para añadir un bloque a la cadena
    let self = this; // Almacena una referencia al objeto Blockchain actual
    return new Promise(async (resolve, reject) => {
      block.height = self.chain.length; // Establece la altura del bloque
      block.time = new Date().getTime().toString(); // Establece el tiempo del bloque como la hora actual en milisegundos

      if (self.chain.length > 0) {
        block.previousBlockHash = self.chain[self.chain.length - 1].hash; // Establece el hash del bloque anterior si no es el primer bloque
      }

      let errors = await self.validateChain(); // Valida la cadena antes de agregar el nuevo bloque
      if (errors.length > 0) {
        reject(new Error("The chain is not valid: ", errors)); // Rechaza la promesa si la cadena no es válida
      }

      block.hash = SHA256(JSON.stringify(block)).toString(); // Calcula el hash del bloque
      self.chain.push(block); // Añade el bloque a la cadena
      resolve(block); // Resuelve la promesa con el bloque añadido
    });
  }

  validateChain() {
    // Método para validar la cadena de bloques
    let self = this; // Almacena una referencia al objeto Blockchain actual
    const errors = []; // Almacena los errores de validación

    return new Promise(async (resolve, reject) => {
      self.chain.map(async (block) => {
        // Itera sobre cada bloque en la cadena
        try {
          let isValid = await block.validate(); // Valida el bloque actual
          if (!isValid) {
            errors.push(new Error(`The block ${block.height} is not valid`)); // Agrega un error si el bloque no es válido
          }
        } catch (err) {
          errors.push(err); // Captura cualquier error y lo agrega a la lista de errores
        }
      });

      resolve(errors); // Resuelve la promesa con los errores de validación
    });
  }

  print() {
    // Método para imprimir la cadena de bloques
    let self = this; // Almacena una referencia al objeto Blockchain actual
    for (let block of self.chain) {
      console.log(block.toString()); // Imprime la representación de cadena de cada bloque en la consola
    }
  }
}

module.exports = Blockchain; // Exporta la clase Blockchain para ser utilizada en otros archivos
