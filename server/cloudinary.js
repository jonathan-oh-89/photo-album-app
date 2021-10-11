



const cloudinaryUpload = (imgFiles) => {
    require("dotenv").config()
    const cloudinary = require("cloudinary").v2

    imgFiles.forEach((img, i) => {
        cloudinary.uploader.upload(
            img,
            {
                resource_type: "image",
                public_id: i,
            }).then((result) => {
                console.log("success", JSON.stringifyresult, null, 2);
            }).catch((err) => {
                console.log("error", JSON.stringify(error, null, 2));
            })
    })

    cloudinary.uploader.upload()

    res.send('Hit post')
}



module.exports = cloudinaryUpload