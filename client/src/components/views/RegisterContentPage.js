import React, {useState, useRef} from 'react'
import {useDispatch} from "react-redux";
import {fileUpload} from '../../_actions/file_action';

const moment = require('moment')

function RegisterContentPage() {
    const dispatch = useDispatch()
    const [File, setFile] = useState('')
    const [Title, setTitle] = useState('')
    const [Comment, setComment] = useState('')

    const onFileHandler = (event) => {
        setFile(event.currentTarget.files[0])
    }

    const onTitleHandler = (e) => {
        setTitle(e.currentTarget.value)
    }

    const onCommentHandler = (e) => {
        setComment(e.currentTarget.value)
    }

    const onRegisterHandler = () => {
        let formData = new FormData()
        formData.append("file", File)
        formData.append('title', Title)
        formData.append('comment', Comment)
        formData.append('regDate', moment().format('YYYY-MM-DD HH:mm:ss'))

        dispatch(fileUpload(formData))
    }

    return (
        <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            width: '100%', height: '100vh'
        }}>
            <input name='file' type='file' accept='image/*' onChange={onFileHandler}/>
            <input type='text' onChange={onTitleHandler}/>
            <input type='text' onChange={onCommentHandler}/>
            <button className={'registerBtn'} onClick={onRegisterHandler}>등록</button>
        </div>
    )
}

export default RegisterContentPage