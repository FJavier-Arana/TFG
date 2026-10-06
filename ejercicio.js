const params =
    new URLSearchParams(window.location.search);


const exerciseId =
    params.get("id");


const container =
    document.getElementById(
        "exercise-detail"
    );



async function cargarEjercicio() {

    try {

        const response =
            await apiFetch(
                `/exercises/${encodeURIComponent(exerciseId)}`
            );


        const exercise =
            response.data;


        mostrarDetalle(exercise);


    } catch (error) {

        console.error(error);


        container.innerHTML = `

            <div class="error-box">

                <h2>
                    No se pudo cargar el ejercicio
                </h2>

                <p>
                    ${error.message}
                </p>

            </div>

        `;

    }

}



function mostrarDetalle(exercise) {

    const targets =
        exercise.targetMuscles?.join(", ")
        || "No especificado";


    const bodyparts =
        exercise.bodyParts?.join(", ")
        || "No especificado";


    const equipment =
        exercise.equipments?.join(", ")
        || "Sin equipamiento";


    container.innerHTML = `

        <div class="detail-media">

            <img
                src="${exercise.imageUrl}"
                alt="${exercise.name}"
            >

        </div>


        <div class="detail-content">

            <span class="section-tag">
                ${exercise.exerciseType || "STRENGTH"}
            </span>


            <h1>
                ${exercise.name}
            </h1>


            <div class="detail-tags">

                <span>
                    ${formatName(bodyparts)}
                </span>

                <span>
                    ${formatName(targets)}
                </span>

                <span>
                    ${formatName(equipment)}
                </span>

            </div>


            <section>

                <h2>
                    Músculos objetivo
                </h2>

                <p>
                    ${formatName(targets)}
                </p>

            </section>


            <section>

                <h2>
                    Equipamiento
                </h2>

                <p>
                    ${formatName(equipment)}
                </p>

            </section>


            ${
                exercise.instructions
                ? `

                <section>

                    <h2>
                        Cómo realizarlo
                    </h2>

                    <ol class="instructions">

                        ${exercise.instructions
                            .map(
                                instruction =>
                                `<li>${instruction}</li>`
                            )
                            .join("")
                        }

                    </ol>

                </section>

                `
                : ""
            }


            ${
                exercise.videoUrl
                ? `

                <section>

                    <h2>
                        Vídeo
                    </h2>

                    <video
                        class="exercise-video"
                        controls
                        preload="metadata"
                    >

                        <source
                            src="${exercise.videoUrl}"
                            type="video/mp4"
                        >

                    </video>

                </section>

                `
                : ""
            }

        </div>

    `;

}



function formatName(name) {

    if (!name) return "";

    return name
        .toLowerCase()
        .replace(/\b\w/g, letter =>
            letter.toUpperCase()
        );

}



cargarEjercicio();