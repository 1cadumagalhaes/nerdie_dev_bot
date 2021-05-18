const axios = require('axios');

async function request(url) {
  try {
    let response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

function main() {
  try {

    let url = "https://script.google.com/macros/s/AKfycbypDW5JH8tiXXIL5WMHqkKT9MkExN5acujWw3963t8L3Nz6y_cB7_-nV0R0QEJJqgWQ/exec"
    let r = request(`${url}?path=social`);
    console.log(r);
  } catch (error) {
    console.log(error)
  }

}


module.exports = {
  request
}
