import { makeCard } from "./card.js";


const container = document.querySelector('.row-cols-3');


const BASE_URL = "https://663174cdc51e14d69561c155.mockapi.io";

let posts = [];

// esto hubiese hecho yo, pero testeando en el telefono no lo aplica, asumo que la implementacion de js es distinta
// posts.sort((a, b) => a.timestamp <= b.timestamp).forEach(p => container.innerHTML += makeCard(p));
export const traerDataDeDB = async () => {
    posts = await fetch(`${BASE_URL}/publicaciones`)
        .then((res) => { return res.json() })
        .catch((err) => { throw new Error(`Algo salio mal: ${err}`) })
    if (posts.length == 0) {
        container.innerHTML += makeCard();
    } else {
        posts.sort(
            (a, b) => {
            if (a.timestamp < b.timestamp) return 1;
            if (a.timestamp > b.timestamp) return -1;
            return 0;
        }).forEach(p => container.innerHTML += makeCard(p));
    }
}

//testear con imagenes chiquitas por que a mockapi le da ansiedad
export const cargarImagenADB = async (publicacion) => {
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: posts.length,
            img: publicacion.img,
            titulo: publicacion.titulo,
            timestamp: Date.now()
        })
    };

    await fetch(`${BASE_URL}/publicaciones`, options);
}

