import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {useDispatch} from "react-redux";
import {getFileList} from '../../_actions/file_action';

function MainPage() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const registerContentPage = () => {
        navigate("/registerContent")
    }

    dispatch(getFileList)

    return (
        <div>
            <div className={'top'} style={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '10vh' }}>
                <span style={{fontSize: '25px', fontWeight: '700'}}>.</span>
                <button style={{position: 'absolute', right: '700px'}} onClick={registerContentPage}>do register</button>
            </div>

            <div className={'bestContent'}>
                <img referrerPolicy="no-referrer" src='https://kr.object.ncloudstorage.com/boo/image.jpg'/>
            </div>
            <div className={'content'}>

            </div>

        </div>
    )
}

export default MainPage