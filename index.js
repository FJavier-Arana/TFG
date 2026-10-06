const bodypartsContainer =
    document.getElementById("bodyparts");


async function cargarBodyparts() {

    try {

        const response =
            await apiFetch("/bodyparts");


        bodypartsContainer.innerHTML = "";


        response.data.forEach(bodypart => {

            const card =
                document.createElement("article");


            card.className = "muscle-card";


            card.innerHTML = `

                <div class="muscle-image">

                    <img
                        src="${bodypart.imageUrl}"
                        alt="${bodypart.name}"
                        loading="lazy"
                    >

                    <div class="image-overlay"></div>

                </div>


                <div class="muscle-info">

                    <span>
                        MUSCLE GROUP
                    </span>

                    <h3>
                        ${formatName(bodypart.name)}
                    </h3>

                    <a
                        href="ejercicios.html?bodypart=${encodeURIComponent(bodypart.name)}"
                        class="card-button"
                    >
                        VER EJERCICIOS
                        <strong>→</strong>
                    </a>

                </div>

            `;


            bodypartsContainer.appendChild(card);

        });


    } catch (error) {

        console.error(error);


        bodypartsContainer.innerHTML = `

            <div class="error-box">

                <h3>
                    No se pudieron cargar los músculos
                </h3>

                <p>
                    Comprueba tu conexión con la API.
                </p>

            </div>

        `;

    }

}


function formatName(name) {

    return name
        .toLowerCase()
        .replace(/\b\w/g, letter =>
            letter.toUpperCase()
        );

}


cargarBodyparts();