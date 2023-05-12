// Importer la fonction sendMessage du fichier webhook.js
const sendMessage = require('./webhook');

// Exemple de fonction qui démarre le programme
function startProgram() {
  console.log('Programme démarré !');
  sendMessage('Programme démarré !');
}

// Appeler la fonction startProgram pour démarrer le programme
startProgram();
