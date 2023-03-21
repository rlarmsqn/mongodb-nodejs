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
        <div className="container">
            <div className="row" style={{display: 'flex', justifyContent: 'center', alignItems: 'center',
                width: '100%', height: '100vh'}}>
                <div className="col-12">
                    <label htmlFor="formFile" className="form-label">Image</label>
                    <input className="form-control" type="file" name="file" accept="image/*" onChange={onFileHandler}/>

                    <label htmlFor="formGroupExampleInput" className="form-label">Title</label>
                    <input type="text" className="form-control" placeholder="title.." maxLength={17} onChange={onTitleHandler}/>

                    <label htmlFor="formGroupExampleInput2" className="form-label">Comment</label>
                    <textarea className="form-control" placeholder="comment.." style={{height:'17vh'}} maxLength={50}/>

                    <button type="button" className="btn btn-dark" onClick={onRegisterHandler} style={{marginTop: '10px', float: 'right'}}>등록</button>
                </div>
            </div>
        </div>
    )
}

export default RegisterContentPage