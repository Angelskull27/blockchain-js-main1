const SHA256 = require("crypto-js/sha256"); // Importa la función de hash SHA256
const hex2ascii = require("hex2ascii"); // Importa una función para convertir hexadecimal a ASCII

class Block {
  constructor(data) {
    // Constructor de la clase Block
    this.hash = null; // Hash del bloque
    this.height = 0; // Altura del bloque en la cadena
    this.body = Buffer.from(JSON.stringify(data).toString("hex")); // Datos del bloque en formato hexadecimal
    this.time = 0; // Tiempo de creación del bloque
    this.previousBlockHash = null; // Hash del bloque anterior en la cadena
  }

  validate() {
    // Método para validar la integridad del bloque
    const self = this; // Almacena una referencia al objeto Block actual
    return new Promise((resolve, reject) => {
      let currentHash = self.hash; // Almacena el hash actual del bloque

      // Calcula el hash del bloque actual excluyendo el hash
      self.hash = SHA256(JSON.stringify({ ...self, hash: null })).toString();

      // Compara el hash calculado con el hash actual
      if (currentHash !== self.hash) {
        return resolve(false); // Retorna falso si los hashes no coinciden
      }

      resolve(true); // Retorna verdadero si los hashes coinciden, lo que significa que el bloque es válido
    });
  }

  getBlockData() {
    // Método para obtener los datos del bloque
    const self = this; // Almacena una referencia al objeto Block actual
    return new Promise((resolve, reject) => {
      let encodedData = self.body; // Datos del bloque codificados en hexadecimal
      let decodedData = hex2ascii(encodedData); // Convierte los datos codificados a ASCII
      let dataObject = JSON.parse(decodedData); // Parsea los datos de JSON a objeto JavaScript

      if (dataObject === "Bloque 0") {
        reject(new Error("This is the Bloque 0")); // Rechaza la promesa si es el bloque génesis
      }

      resolve(dataObject); // Resuelve la promesa con los datos del bloque si no es el bloque génesis
    });
  }

  toString() {
    // Método para representar el bloque como una cadena de texto
    const { hash, height, body, time, previousBlockHash } = this;
    return `Block -
        hash: ${hash}
        height: ${height}
        body: ${body}
        time: ${time}
        previousBlockHash: ${previousBlockHash}
        -------------------------------------`;
  }
}

module.exports = Block; // Exporta la clase Block para ser utilizada en otros archivos
