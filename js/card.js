export const makeCard = (post = {}) => {
    const fecha = new Date(post.timestamp)
    return `<div class="card m-3" style="width: 20rem;" id="publicacion${post.id || "placeholderCard"}">
        <h5 class="card-title"> <strong> ${post.titulo || "Titulo"}  </strong></h5>
        <img src="${post.img || "../assets/placeholder.png"}" class="card-img-top" alt="...">
        <div class="card-body">
            <strong class="card-text"> 
             ${post.timestamp ? ` ${fecha.getDate()}-${fecha.getMonth() + 1}-${fecha.getFullYear()}
                                    ${fecha.getHours()}:${fecha.getMinutes()} 
                                    ${fecha.getHours() >= 12 ? "PM" : "AM"}  ` : "1970-01-01"}
            </strong>

        </div>
    </div>`
}
