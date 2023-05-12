// Importer la bibliothèque axios pour effectuer des requêtes HTTP
const axios = require('axios');
const { Discord, Client, MessageEmbed } = require('discord.js');

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



function sendMessageWithEmbed(embeds) {
  // Stringify the embeds using JSON.stringify()
  const data = JSON.stringify({ embeds });

  // Create a config object for axios, you can also use axios.post("url", data) instead
  const config = {
    method: "POST",
    url: webhookUrl, // Remplacez webhook par l'URL de votre webhook Discord
    headers: { "Content-Type": "application/json" },
    data: data,
  };

  // Send the request
  axios(config)
    .then((response) => {
      console.log("Webhook delivered successfully");
      return response;
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
}



module.exports = {
    sendMessage,
    sendMessageWithEmbed
};
