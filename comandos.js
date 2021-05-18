const { request } = require('./utils/request');

const dotenv = require("dotenv").config();
const { API_URL } = process.env;

async function getSocial(comando = "!social") {
  let redes = await request(`${API_URL}?path=social`);
  let comandos = {}
  redes.forEach(({ Comando, Url }) => comandos[Comando] = Url);
  comandos["!social"] = redes.map(({ Comando, Url }) => `${Comando} -> ${Url}`).join("\n | ");
  return comandos[comando];

}

async function getUsersPoints({ user, ranking = 3 } = {}) {
  let usuarios = await request(`${API_URL}?path=users`), usuario, posicao, message;

  usuarios = usuarios.sort((a, b) => b.points - a.points);

  if (user) {
    [usuario] = usuarios.filter(({ name }) => name == user);
    if (!usuario) return "Usuario não encontrado";
    posicao = usuarios.findIndex(i => i === usuario);
  }
  usuarios = usuarios.slice(0, ranking);
  message = `🏆️ Ranking 🏆️ \n`;
  message += usuarios.map(({ name, points }, index) => {
    return `${index + 1}º: ${name} com ${points} pontos`;
  }).join("\n | ");
  if (posicao > 2) message += `\n | ${user} está em ${posicao + 1}º com ${usuario.points} pontos`;
  return message;
}

module.exports = {
  getSocial, getUsersPoints
}