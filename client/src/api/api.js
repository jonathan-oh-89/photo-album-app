let REGISTER_URL = "/register"
let LOGIN_URL = "/login"
let LOGOUT_URL = "/logout"
let RETRIEVE_IMAGE_URL = "/retrieveimages"
let DELETE_IMAGE_URL = "/deleteimages"
let UPLOAD_IMAGE_URL = "/uploadimages"
let RETRIEVE_ALL_IMAGE_URL = "/retrieveallimages"


if (process.env.NODE_ENV !== "production") {
    REGISTER_URL = "http://localhost:8000/register"
    LOGIN_URL = "http://localhost:8000/login"
    LOGOUT_URL = "http://localhost:8000/logout"
    RETRIEVE_IMAGE_URL = "http://localhost:8000/retrieveimages"
    DELETE_IMAGE_URL = "http://localhost:8000/deleteimages"
    UPLOAD_IMAGE_URL = "http://localhost:8000/uploadimages"
    RETRIEVE_ALL_IMAGE_URL = "http://localhost:8000/retrieveallimages"
}




export const signUpUser = async (data) => {
    try {
        const response = await fetch(REGISTER_URL, {
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

        const response = await fetch(LOGIN_URL, {
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
        const response = await fetch(LOGOUT_URL, {
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
    try {
        const response = await fetch(RETRIEVE_IMAGE_URL, {
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
        const response = await fetch(DELETE_IMAGE_URL, {
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
        const response = await fetch(UPLOAD_IMAGE_URL, {
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

        const response = await fetch(RETRIEVE_ALL_IMAGE_URL, {
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
