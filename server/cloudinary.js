const { v4: uuidv4 } = require("uuid")
const path = require('path');
const cloudinary = require("cloudinary").v2


if (process.env.NODE_ENV !== "production") {
    require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
}

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
    secure: true
})

module.exports.cloudinaryUpload = async (imgFiles, username) => {
    const photoAlbum = []

    const imageUploadPromises = imgFiles.map((img) => {
        const imageid = uuidv4();

        return cloudinary.uploader.upload(
            img,
            {
                folder: username,
                resource_type: "image",
                public_id: imageid,
            }).then((result) => {
                console.log("*** Success: Cloudinary Upload");
                photoAlbum.push({ imageid: imageid, url: result.secure_url });
            }).catch((err) => {
                console.log("*** Error: Cloudinary Upload");
            })
    })

    await Promise.all(imageUploadPromises);

    return photoAlbum;
}

module.exports.cloudinaryDelete = async (fileToDelete) => {
    const result = await cloudinary.api.delete_resources([fileToDelete], (err, res) => {
        if (err) console.log(`Failed to delete image: ${err}`);
        return console.log(`Successfully deleted image: ${fileToDelete}`);
    })

    const status = result.deleted[fileToDelete]

    if (status === "deleted") {
        return 200
    } else {
        return 400
    }
}

module.exports.cloudinaryRetrieve = async (username) => {
    const photoIdArray = []

    await cloudinary.search.expression(`folder: ${username}`).execute().then(results => {
        results.resources.map(img => {
            console.log(img);
            photoIdArray.push({ imageid: img.filename, url: img.secure_url })
        })
    })
    return photoIdArray;
}



module.exports.cloudinaryRetrieveAll = async () => {
    const photoIdArray = []
    await cloudinary.search.expression().execute().then(results => {
        results.resources.map(img => {
            photoIdArray.push({ username: img.folder, imageid: img.filename, url: img.secure_url })
        })
    }).catch((err) => { console.log("Cloudinary retrieve all error: ", err); }
    )

    return photoIdArray;
}
