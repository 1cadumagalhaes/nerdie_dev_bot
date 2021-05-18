const tmi = require("tmi.js");
const dotenv = require("dotenv").config();


const { NOME_BOT, NOME_CANAL, TOKEN_BOT } = process.env;

const opts = {
  identity: {
    username: NOME_BOT,
    password: TOKEN_BOT
  },
  channels: [NOME_CANAL]
};

const client = new tmi.client(opts);

/**
 * 
 * @param {String} target - Nome do canal onde recebeu a mensagem,
 * @param {String} context - Objeto com informações do usuário que mandou a mensagem.
 * @param {String} msg - Texto da mensagem 
 * @param {String} bot - Se foi mensagem do próprio bot
 */

function mensagemRecebida(target, context, msg, bot) {
  console.log({
    target, context, msg, bot
  });

  if (bot) return;

  if (msg == "!teste") {
    client.say(target, "Testando o bot ao vivo!");
  }

}

function botConectado() {
  console.log("Conectado com sucesso");
  client.say(NOME_CANAL, "O bot chegou");
}


client.on("message", mensagemRecebida);
client.on("connected", botConectado);
client.connect();