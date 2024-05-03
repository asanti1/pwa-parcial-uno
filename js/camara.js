import { cargarImagenADB } from "./api.js";

const containerPhotoPublish = document.getElementById("photoPublishContainer");

//galaxy s10+: 360px*760px
containerPhotoPublish.innerHTML +=
    `<div class="card m-3 border-success" style="width: 360px;"> 
            <input type="file" accept="camera" capture="user" id="inputImagen" style="display: none;" />
            <img src="./assets/placeholder.png" id="botonImagen" class="card-img-top" alt="..." width="360px", height="auto">
            <div class="card-body">
                <input type="text" class="form-control mt-3" placeholder="Ingrese un titulo" id="inputTitulo" />
                <footer class="card-footer mb-1 mt-3" >
                    <button class="btn btn-danger" id="botonCancelar"> Cancelar </button>
                    <button class="btn btn-success" disabled id="botonPublicar"> Publicar </button>
                </footer>
            </div>
        </div>
    </div>`


const inputImagen = document.getElementById("inputImagen");
const botonImagen = document.getElementById("botonImagen");
const botonPublicar = document.getElementById("botonPublicar");
const botonCancelar = document.getElementById("botonCancelar");
const inputTitulo = document.getElementById("inputTitulo");

botonImagen.addEventListener("dblclick", () => {
    inputImagen.click();
})

botonCancelar.addEventListener("click", () => { window.location.href = "/" })


inputImagen.addEventListener("change", () => {
    habilitarPublicar();
    if (inputImagen.value !== "") {
        botonImagen.src = URL.createObjectURL(inputImagen.files[0])
    }
})


inputTitulo.addEventListener("input", () => {
    habilitarPublicar();
})

const habilitarPublicar = () => {

    if (botonImagen.src !== "../assets/placeholder.png "
        && inputTitulo.value !== ""
        && !/^\s*$/.test(inputTitulo.value)) {
        botonPublicar.removeAttribute("disabled");
    }
}

botonPublicar.addEventListener("click", () => {
    botonPublicar.setAttribute("disabled", true);
    const img = new Image();
    img.onload = function() {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);

        const base64WebP = canvas.toDataURL("image/webp", 0.4);
        cargarImagenADB({ img: base64WebP, titulo: inputTitulo.value })
    };
    img.src = URL.createObjectURL(inputImagen.files[0]);
    setTimeout(() => {
        window.location.href = "/";
    }, 2500)
});
