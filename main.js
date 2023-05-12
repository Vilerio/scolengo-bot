const {sendMessage} = require('./webhook');
const {Skolengo} = require('scolengo-api')
const {config} = require('./vars.js');
const { send } = require('process');
const {getHomeworkForNext30Days} = require('./features/travail/travail.js')


function startProgram() {
  console.log('Programme démarré !');
  sendMessage('Programme démarré !');
  Skolengo.fromConfigObject(config).then(async user => {
    const infoUser = await user.getUserInfo()
    console.log(`Correctement authentifié sous l'identifiant ${infoUser.id}`)
    sendMessage(`Correctement authentifié sous l'identifiant ${infoUser.id}`)
  })
}


startProgram();

Skolengo.fromConfigObject(config).then(async user => {
  const startDate = new Date().toISOString().split('T')[0] // Aujourd'hui
  const endDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1e3).toISOString().split('T')[0] // Aujourd'hui + 15 jours
  const homework = await user.getHomeworkAssignments(user.tokenSet.claims().sub, startDate, endDate)

  console.log("Voici les exercices à faire pour les 30 prochains jours : ", homework)

})
getHomeworkForNext30Days(config);