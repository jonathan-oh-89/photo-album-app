export const signUpUser = async (data) => {
    console.log("Received sign in data: ", data);

    try {
        const apiURL = "http://localhost:8000/register"

        const response = await fetch(apiURL, {
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(data)
        })

        console.log("Sign up response: ", response);
        console.log("Sign up response header: ", JSON.stringify(response.headers));
        const result = await response.json();
        console.log("Sign up result: ", result);

    }
    catch (error) {
        console.log("Got error: ", error);
    }
}


export const logUserIn = async (data) => {
    try {
        const apiURL = "http://localhost:8000/login"

        const response = await fetch(apiURL, {
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(data)
        })

        console.log("backend response: ", response);

        return response
        // const result = await response.json();
        // console.log("Log in result: ", result);
    }
    catch (error) {
        console.log("Got error: ", error);
    }
}

export const logoutUser = async () => {
    try {
        const apiURL = "http://localhost:8000/logout"

        const response = await fetch(apiURL, {
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'GET',
        })

        const result = await response.json();
        console.log("api got response: ", result);

        return response
    }
    catch (error) {
        console.log("Got error: ", error);
    }
}

export const uploadPhotosApi = async (data) => {
    console.log("Photo initial data: ", data[0]);
    const encodedImages = await readImageFiles(data)

    try {
        const apiURL = "http://localhost:8000/uploadimages"

        console.log("Sending post request: ", encodedImages);


        const response = await fetch(apiURL, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({ photos: encodedImages })
        })

        const result = response.json();
    }
    catch (error) {
        console.log("Got error: ", error);
    }
}


const readImageFiles = async (files) => {
    const encodedImages = [];

    let promises = []
    files.forEach(file => {
        promises.push(readImage(file))
    })

    await Promise.all(promises)
        .then(results => {
            results.forEach(imageData => {
                encodedImages.push(imageData)
            })
        })

    return encodedImages
}

const readImage = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.readAsDataURL(file);

        reader.onload = () => {
            resolve(reader.result);
        };
    });
}

