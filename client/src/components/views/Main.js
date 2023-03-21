import React, {useEffect, useState} from 'react'
import {useNavigate, useLocation} from 'react-router-dom'
import axios from 'axios'
import MyVerticallyCenteredModal from './Modal.js'

function MainPage() {
    const location = useLocation()
    const navigate = useNavigate()
    const [List, setList] = useState([])
    const [modalShow, setModalShow] = useState(false)
    const [Url, setUrl] = useState('')
    const [Title, setTitle] = useState('')

    const registerContentPage = () => {
        navigate("/registerContent")
    }

    useEffect(() => {
        axios.get('/api/getFileList').then(res => {
            setList(res.data.list)
        })
    },[location])

    if(List.length !== 0) {
        return (
            <div className="album py-5 bg-light">
                <MyVerticallyCenteredModal show={modalShow} onHide={() => setModalShow(false)} url={Url} title={Title}/>
                <div className="container">
                    <section className="py-5 text-center container">
                        <div className="row py-lg-5">
                            <div className="col-lg-6 col-md-8 mx-auto">
                                <h1 className="fw-light">.</h1>
                                <p className="lead text-muted"></p>
                                <p>
                                    <a className="btn btn-primary my-2" onClick={registerContentPage}>Do Register</a>
                                </p>
                            </div>
                        </div>
                    </section>
                    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                        {List.map((list, index) => (
                        <div className="col" key={index}>
                            <div className="card shadow-sm" onClick={() => {setModalShow(true); setUrl(list.url); setTitle(list.title)}}>
                                <img width="100%" height="100%"
                                     src={list.url}></img>
                                <div className="card-body">
                                    <p className="card-text">{list.comment}</p>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div className="btn-group">
                                            <button type="button" className="btn btn-sm btn-outline-secondary">View
                                            </button>
                                        </div>
                                        <small className="text-muted">{list.regDate}</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                        ))}
                    </div>
                </div>
            </div>
        )
    }
}

export default MainPage