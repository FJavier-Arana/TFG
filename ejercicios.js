const params =
    new URLSearchParams(window.location.search);


const bodypart =
    params.get("bodypart");


const title =
    document.getElementById("page-title");


const container =
    document.getElementById("exercises");


const searchInput =
    document.getElementById("search");


const equipmentFilter =
    document.getElementById("equipmentFilter");


const countElement =
    document.getElementById("exercise-count");


let exercises = [];


title.textContent =
    formatName(bodypart);



async function cargarEjercicios() {

    try {

        /*
         * Primera versión:
         * obtenemos ejercicios y después filtramos.
         *
         * Cuando comprobemos los parámetros exactos
         * de tu endpoint V2, podemos hacerlo directamente
         * desde la API.
         */

        const response =
            await apiFetch("/exercises?limit=100");


        exercises =
            response.data.filter(exercise =>

                exercise.bodyParts?.some(

                    part =>
                        part.toUpperCase() ===
                        bodypart.toUpperCase()

                )

            );


        crearFiltroEquipamiento();


        mostrarEjercicios();


    } catch (error) {

        console.error(error);


        container.innerHTML = `

            <div class="error-box">

                <h3>
                    Error cargando ejercicios
                </h3>

                <p>
                    ${error.message}
                </p>

            </div>

        `;

    }

}



function mostrarEjercicios() {

    const search =
        searchInput.value
            .toLowerCase()
            .trim();


    const equipment =
        equipmentFilter.value;


    const filtrados =
        exercises.filter(exercise => {


            const coincideNombre =
                exercise.name
                    .toLowerCase()
                    .includes(search);


            const coincideEquipamiento =
                !equipment ||
                exercise.equipments?.includes(
                    equipment
                );


            return (
                coincideNombre &&
                coincideEquipamiento
            );

        });


    countElement.textContent =
        `${filtrados.length} ejercicios encontrados`;


    container.innerHTML = "";


    if (filtrados.length === 0) {

        container.innerHTML = `

            <div class="empty">

                <h3>
                    No encontramos ejercicios
                </h3>

                <p>
                    Prueba con otro término de búsqueda.
                </p>

            </div>

        `;

        return;

    }


    filtrados.forEach(exercise => {

        const card =
            document.createElement("article");


        card.className =
            "exercise-card";


        card.innerHTML = `

            <div class="exercise-image">

                <img
                    src="${exercise.imageUrl}"
                    alt="${exercise.name}"
                    loading="lazy"
                >

            </div>


            <div class="exercise-info">

                <span class="exercise-type">
                    ${formatName(
                        exercise.exerciseType ||
                        "STRENGTH"
                    )}
                </span>


                <h3>
                    ${exercise.name}
                </h3>


                <div class="exercise-meta">

                    <span>
                        ${exercise.equipments?.join(", ")
                            || "Sin equipamiento"}
                    </span>

                </div>


                <a
                    class="details-button"
                    href="ejercicio.html?id=${encodeURIComponent(exercise.exerciseId)}"
                >
                    VER DETALLES
                    <strong>→</strong>
                </a>

            </div>

        `;


        container.appendChild(card);

    });

}



function crearFiltroEquipamiento() {

    const equipments =
        new Set();


    exercises.forEach(exercise => {

        exercise.equipments?.forEach(
            equipment =>
                equipments.add(equipment)
        );

    });


    [...equipments]
        .sort()
        .forEach(equipment => {

            const option =
                document.createElement("option");


            option.value =
                equipment;


            option.textContent =
                formatName(equipment);


            equipmentFilter.appendChild(option);

        });

}



searchInput.addEventListener(
    "input",
    mostrarEjercicios
);


equipmentFilter.addEventListener(
    "change",
    mostrarEjercicios
);



function formatName(name) {

    if (!name) return "";

    return name
        .toLowerCase()
        .replace(/\b\w/g, letter =>
            letter.toUpperCase()
        );

}



cargarEjercicios();