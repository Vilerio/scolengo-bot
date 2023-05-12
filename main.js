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
  const startDate = new Date().toISOString().split('T')[0] 
  const endDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1e3).toISOString().split('T')[0] 
  const homework = await user.getHomeworkAssignments(user.tokenSet.claims().sub, startDate, endDate)



})

Skolengo.fromConfigObject(config).then(async (user) => {
  Skolengo.fromConfigObject(config).then(async user => {
    const infoUser = await user.getUserInfo()
  const studentId = infoUser.id;
  const periodId = '1'; 

  const limit = 20; 
  const offset = 0;
  const notes = await user.getEvaluation(studentId, periodId, limit, offset);
  console.log('Voici les notes :', notes);
}).catch((error) => {
  console.error('Une erreur s\'est produite :', error);
});
})
setInterval(() => {
  getHomeworkForNext30Days(config);
}, 10000); // Vérifier toutes les 10 secondes