
const url = "https://moviestack.onrender.com/api/petshop";

export let productos = [];

await fetch(url)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    productos = data; })
  .catch((error) => {
    console.error("Error de fetch:", error);
  });