import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom'

function MainPage() {
    const navigate = useNavigate()

    const registerContentPage = () => {
        navigate("/registerContent")
    }

    return (
        <div>
            <div className={'top'} style={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '10vh' }}>
                <span style={{fontSize: '25px', fontWeight: '700'}}>Best Fucking Moment</span>
                <button style={{position: 'absolute', right: '700px'}} onClick={registerContentPage}>등록하기</button>
            </div>

            <div className={'bestContent'}>

            </div>
            <div className={'content'}>

            </div>

        </div>
    )
}

export default MainPage