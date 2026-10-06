var api ="704ed1c2f1mshcdc36339d47e61fp15c375jsnbd0b3855ff45"

const options = {
    method: 'GET',
    headers: {
        'x-rapidapi-key': api,
        'x-rapidapi-host': 'edb-with-videos-and-images-by-ascendapi.p.rapidapi.com'
    }
};

const API = 'https://edb-with-videos-and-images-by-ascendapi.p.rapidapi.com/api/v1';

const contenedor = document.getElementById("bodyparts");


fetch(`${API}/bodyparts`, options)

    .then(response => {

        if (!response.ok) {
            throw new Error("Error HTTP: " + response.status);
        }

        return response.json();

    })

    .then(data => {

        contenedor.innerHTML = "";

        data.data.forEach(parte => {

            const tarjeta = document.createElement("div");

            tarjeta.classList.add("card");

            tarjeta.innerHTML = `
                
                <img src="${parte.imageUrl}" 
                     alt="${parte.name}">

                <div class="card-content">

                    <h2>${formatearNombre(parte.name)}</h2>

                    <button onclick="verEjercicios('${parte.name}')">
                        VER EJERCICIOS
                    </button>

                </div>
            `;

            contenedor.appendChild(tarjeta);

        });

    })

    .catch(error => {

        console.error(error);

        contenedor.innerHTML = `
            <p class="error">
                No se pudieron cargar los grupos musculares.
            </p>
        `;

    });


function formatearNombre(nombre) {

    return nombre
        .toLowerCase()
        .split(" ")
        .map(palabra =>
            palabra.charAt(0).toUpperCase() + palabra.slice(1)
        )
        .join(" ");

}


function verEjercicios(grupo) {

    window.location.href =
        `ejercicios.html?bodypart=${encodeURIComponent(grupo)}`;

}
