import axios from 'axios';

export function fileUpload(dataToSubmit) {
    for(let pair of dataToSubmit.entries()) {
        console.log(pair);     // [key, value]
    }
    const request = axios.post('/api/upload', dataToSubmit)
    return {
        type: 'boo_image',
        payload: request
    }
}

export function getFileList() {
    const request = axios.get('/api/getFileList')

    return {
        type: 'boo_images_list',
        payload: request
    }
}
