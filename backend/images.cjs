const fs = require('fs')
const path = require('path')

const pathJSON = path.join(__dirname, './images.json')

const readJSON = () => {
    let template = {
        images:[]
    };
    try {
        const data = fs.readFileSync(pathJSON, 'utf-8')
        if (data.length === 0) {
            return template
        }
        return JSON.parse(data)
    } catch (err) {
        fs.writeFileSync(pathJSON, JSON.stringify(template ,null , 4 ), 'utf-8')
        return template
    }
}

const writeJSON = (data) => {
    const template = {
        images : data,
    }
    try {
        fs.writeFileSync(pathJSON, JSON.stringify (template ,null , 4 ), 'utf-8')
    } catch (err) {
        console.log(err)
    }
}

const {images} = readJSON()

images.push({
    "name" : "image.png",
    "url" : "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"
})

writeJSON(images)