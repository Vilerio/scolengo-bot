// Importer la bibliothèque axios pour effectuer des requêtes HTTP
const axios = require('axios');

// Importer l'URL du webhook Discord depuis le fichier vars.js
const { webhookUrl } = require('./vars.js');

// Fonction pour envoyer un message via le webhook Discord
async function sendMessage(message) {
  try {
    await axios.post(webhookUrl, { content: message });
  } catch (error) {
    console.error('Une erreur s\'est produite lors de l\'envoi du message au webhook Discord :', error);
  }
}

async function sendMessageWithEmbed(content) {
    try {
      
      const webhook = new Discord.WebhookClient({ url: webhookUrl });
  
      const embed = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setDescription(content);
  
      await webhook.send({ embeds: [embed] });
      console.log('Message envoyé avec succès.');
    } catch (error) {
      console.error("Une erreur s'est produite lors de l'envoi du message :", error);
    }
  }
// Exporter la fonction sendMessage
module.exports = {
    sendMessage,
    sendMessageWithEmbed
};
