// Importer la bibliothèque axios pour effectuer des requêtes HTTP
const axios = require('axios');

// URL du webhook Discord
const webhookUrl = 'https://discord.com/api/webhooks/WEBHOOK_ID/WEBHOOK_TOKEN'; // Remplacez WEBHOOK_ID et WEBHOOK_TOKEN par vos propres valeurs

// Fonction pour envoyer un message via le webhook Discord
async function sendMessage(message) {
  try {
    await axios.post(webhookUrl, { content: message });
  } catch (error) {
    console.error('Une erreur s\'est produite lors de l\'envoi du message au webhook Discord :', error);
  }
}

// Exporter la fonction sendMessage
module.exports = sendMessage;
