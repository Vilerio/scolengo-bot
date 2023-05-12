const { Skolengo } = require('scolengo-api');
const { config } = require('../../vars.js');
const fs = require('fs');
const { sendMessageWithEmbed } = require('../../webhook');
const { sendMessage } = require('../../webhook');

async function getHomeworkForNext30Days(config) {
  try {
    const user = await Skolengo.fromConfigObject(config);

    const startDate = new Date().toISOString().split('T')[0]; // Aujourd'hui
    const endDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1e3).toISOString().split('T')[0]; // Aujourd'hui + 30 jours
    const homework = await user.getHomeworkAssignments(user.tokenSet.claims().sub, startDate, endDate);

    let processedIds = [];
    try {
      const fileData = fs.readFileSync('./features/travail/processed_ids.json');
      processedIds = JSON.parse(fileData);
    } catch (error) {
      console.error("Erreur lors de la lecture du fichier processed_ids.json :", error);
    }

    const embeds = [];

    for (const assignment of homework) {
      if (!processedIds.includes(assignment.id)) {
        const dueDate = new Date(assignment.dueDateTime);
        const formattedDueDate = `${dueDate.getHours()}h${dueDate.getMinutes()} ${dueDate.getDate()}/${dueDate.getMonth() + 1}/${dueDate.getFullYear()}`;
        
        const embed = {
          title: `${assignment.subject.label} - ${formattedDueDate}`,
          color: 0x0099ff,
          description: `${assignment.title}\n${assignment.html.replace(/<[^>]+>/g, '')}`,
        };

        embeds.push(embed);

        processedIds.push(assignment.id);
      }
    }

    try {
      fs.writeFileSync('./features/travail/processed_ids.json', JSON.stringify(processedIds));
    } catch (error) {
      console.error("Erreur lors de l'écriture du fichier processed_ids.json :", error);
    }

    console.log("Voici les travaux à faire pour les 30 prochains jours :\n", embeds);
    sendMessageWithEmbed(embeds);
  } catch (error) {
    console.error("Une erreur s'est produite :", error);
  }
}

module.exports = {
  getHomeworkForNext30Days
};
