export const signUpUser = async (data) => {
    try {
        // const apiURL = "http://localhost:8000/register"
        const apiURL = "/register"

        const response = await fetch(apiURL, {
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(data)
        })

        return response

    }
    catch (error) {
        console.log("Got error: ", error);
    }
}

export const logUserIn = async (data) => {
    try {
        // const apiURL = "http://localhost:8000/login"
        const apiURL = "/login"

        const response = await fetch(apiURL, {
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(data)
        })

        return response
    }
    catch (error) {
        console.log("Got error: ", error);
    }
}

export const logoutUser = async () => {
    try {
        // const apiURL = "http://localhost:8000/logout"
        const apiURL = "/logout"

        const response = await fetch(apiURL, {
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'GET',
        })

        return response
    }
    catch (error) {
        console.log("Got error: ", error);
    }
}

export const retrievePhotosApi = async (user) => {
    console.log("retrievePhotosApi for user state: ", user);

    try {
        // const apiURL = `http://localhost:8000/retrieveimages`
        const apiURL = `retrieveimages`

        const response = await fetch(apiURL, {
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({ username: user.username })
        })

        const result = await response.json();

        console.log("Receieved images: ", result);

        return result
    }
    catch (error) {
        console.log("Got error: ", error);
    }
}

export const deletePhotosApi = async (user, imageid) => {
    try {
        // const apiURL = "http://localhost:8000/deleteimages"
        const apiURL = "/deleteimages"

        const response = await fetch(apiURL, {
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({ userid: user._id, username: user.username, imageid: imageid })
        })

        const result = await response.json();

        return result
    }
    catch (error) {
        console.log("Got error: ", error);
    }
}

export const uploadPhotosApi = async (data, user) => {
    console.log("uploadPhotosApi: ", user);
    const encodedImages = await readImageFiles(data)

    try {
        // const apiURL = "http://localhost:8000/uploadimages"
        const apiURL = "/uploadimages"

        const response = await fetch(apiURL, {
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({ imgFiles: encodedImages, userid: user._id, username: user.username })
        })

        const result = await response.json();
        const newImgIdArray = []

        result.map(imgid => newImgIdArray.push(imgid))

        return newImgIdArray
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


export const retrieveAllPhotosApi = async () => {
    console.log("executing retrieveAllPhotosApi");

    try {
        // const apiURL = `http://localhost:8000/retrieveallimages`
        const apiURL = `/retrieveallimages`

        const response = await fetch(apiURL, {
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'GET'
        })

        const result = await response.json();

        console.log("Receieved images: ", result);

        return result
    }
    catch (error) {
        console.log("Got error: ", error);
    }
}
