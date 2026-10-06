var api ="704ed1c2f1mshcdc36339d47e61fp15c375jsnbd0b3855ff45"

const API_BASE =
    "https://edb-with-videos-and-images-by-ascendapi.p.rapidapi.com/api/v1";


const API_OPTIONS = {

    method: "GET",

    headers: {

        "x-rapidapi-key": api,

        "x-rapidapi-host":
            "edb-with-videos-and-images-by-ascendapi.p.rapidapi.com"

    }

};


async function apiFetch(endpoint) {

    const response =
        await fetch(API_BASE + endpoint, API_OPTIONS);


    if (!response.ok) {

        throw new Error(
            `Error API: ${response.status}`
        );

    }


    return await response.json();

}