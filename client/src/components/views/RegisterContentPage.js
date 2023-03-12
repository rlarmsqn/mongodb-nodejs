import React, {useState} from 'react'
import {useDispatch} from "react-redux";
import {fileUpload} from '../../_actions/file_action';

function RegisterContentPage() {
    const dispatch = useDispatch()
    const [File, setFile] = useState(null)

    const onFileHandler = (event) => {
        setFile(event.currentTarget.files)
    }

    const onRegisterHandler = () => {

        let formData = new FormData()
        formData.append('file', new Blob([File[0]],{type: 'image/*'}))

        let blob = new Blob([File[0]],{type: 'image/*'})
        let body = {
            file : blob,
            name : File[0].name
        }
        dispatch(fileUpload(body))
            .then(response => {
                console.log(response)
            })
    }

    return (
        <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            width: '100%', height: '100vh'
        }}>
            <input name='file' type='file' accept='image/*' onChange={onFileHandler}/>
            <button className={'registerBtn'} onClick={onRegisterHandler}>등록</button>
        </div>
    )
}

export default RegisterContentPage