const sendMessage = require('./webhook');
const {Skolengo} = require('scolengo-api')
const {config} = require('./vars.js');

function startProgram() {
  console.log('Programme démarré !');
  sendMessage('Programme démarré !');
}

// Appeler la fonction startProgram pour démarrer le programme
startProgram();


Skolengo.fromConfigObject(config).then(async user => {
  const infoUser = await user.getUserInfo()
  console.log(`Correctement authentifié sous l'identifiant ${infoUser.id}`)
})
