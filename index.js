const tmi = require("tmi.js");
const dotenv = require("dotenv").config();
const { getSocial, getUsersPoints } = require('./comandos');

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

async function mensagemRecebida(target, context, msg, bot) {

  if (bot || !/^!(.+)/.test(msg)) return;

  let { username, subscriber } = context;
  console.log({
    msg, username
  });

  const regex = /!(\w+)(\s([@\w\d_\-\\]{2,})){0,2}/
  const [, comando, , param1, , param2] = msg.match(regex);
  console.log(comando)
  if (msg == "!teste") {
    client.say(target, "Testando o bot ao vivo!");
  }
  if (/rank/.test(comando)) {
    let message;
    if (param1) message = await getUsersPoints({ user: param1 });
    else message = await getUsersPoints();
    console.log(message);
    client.say(target, message);
  }

  if (/social|instagram|twitter/.test(comando)) {
    let message;
    message = await getSocial(`!${comando}`);
    console.log(message);
    if (message) client.say(target, message);
  }

}

function botConectado() {
  console.log("Conectado com sucesso");
}


client.on("message", mensagemRecebida);
client.on("connected", botConectado);
client.connect();