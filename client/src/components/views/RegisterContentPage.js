import React, {useState, useRef} from 'react'
import {useDispatch} from "react-redux";
import {fileUpload} from '../../_actions/file_action';

function RegisterContentPage() {
    const dispatch = useDispatch()
    const [File, setFile] = useState('')

    const onFileHandler = (event) => {
        setFile(event.currentTarget.files[0])
    }

    const onRegisterHandler = () => {
        console.log(File)
        let formData = new FormData()
        formData.append("file", File)
        formData.append("name", File.name)
        let blob = new Blob([File], {type: 'image/*'})
        let body = {
            file : File,
            name : File.name,
        }
        fileUpload(formData)
    }

    return (
        <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            width: '100%', height: '100vh'
        }}>
            <form id='imgForm' name='imgForm' ref={imgForm}>
            <input name='file' type='file' accept='image/*' onChange={onFileHandler}/>
            </form>
            <button className={'registerBtn'} onClick={onRegisterHandler}>등록</button>
        </div>
    )
}

export default RegisterContentPage