import axios from 'axios';

export function fileUpload(dataToSubmit) {
    const request = axios.post('/api/upload', dataToSubmit, {
        headers: { 'content-type': 'multipart/form-data' },
        transformRequest: (data, headers) => {
            return data;
        }
    })
    console.log("file_action : ", dataToSubmit)
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
