import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BiSolidUserCircle } from 'react-icons/bi'
import { userLogin, userRegister } from '../featrues/productSlice'
import { useAlert } from 'react-alert'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    let alerts = useAlert()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [loginEmail, setLoginEmail] = useState("")
    const [loginPassword, setLoginPassword] = useState("")
    const [users, setUsers] = useState({
        name: "",
        email: "",
        password: "",
        avatar: null
    })
    const [content, setContent] = useState(true)

    const data = useSelector((state) => {
        return state.app
    })

    console.log(data)
    console.log(data)

    const handleLogin = (e) => {
        e.preventDefault()
        dispatch(userLogin({ loginEmail, loginPassword }))
    }

    const handleRegister = (e) => {
        e.preventDefault()
        dispatch(userRegister(users))
    }

    const handleUserInput = (e) => {
        if (e.target.name === 'avatar') {
            const reader = new FileReader()
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setUsers((prevState) => ({ ...prevState, [e.target.name]: reader.result }))
                }
            }
            reader.readAsDataURL(e.target.files[0])
        } else {
            setUsers((prevState) => ({ ...prevState, [e.target.name]: e.target.value }))
        }
    }

    useEffect(() => {
        if (data?.isAuthenticate) {
            navigate('/account')
        }

        // if (data?.error?.length !== 0 || data?.error !== null) {
        //     alerts.error(data?.error?.message)
        // }


    }, [dispatch, data?.error, alerts, data?.isAuthenticate, data, navigate])

    return (
        <div className='login-container'>
            {
                content ?
                    <form onSubmit={handleLogin}>
                        <div className='login-box'>

                            <div className='login-top'>
                                <div className='login-header'>
                                    <h1 onClick={(e) => setContent(content)}>LOGIN</h1>
                                    <h1 onClick={(e) => setContent(!content)}>REGISTER</h1>
                                </div>

                                <div >
                                    <button className='switcher'></button>
                                </div>
                            </div>

                            <div className='login-input'>
                                <input type="text" placeholder='email' required onChange={(e) => setLoginEmail(e.target.value)} />
                                <input type="text" placeholder='password' required onChange={(e) => setLoginPassword(e.target.value)} />
                            </div>

                            <div className='login-link'>
                                <h4>
                                    Forget Password?
                                </h4>
                            </div>

                            <div className='login-button'>
                                <button>
                                    Login
                                </button>
                            </div>
                        </div>
                    </form>
                    :
                    <form onSubmit={handleRegister}>
                        <div className='login-box'>

                            <div className='login-top'>
                                <div className='login-header'>
                                    <h1 onClick={(e) => setContent(true)}>LOGIN</h1>
                                    <h1 onClick={(e) => setContent(false)}>REGISTER</h1>
                                </div>

                                <div style={{ alignItems: "flex-end", justifyContent: "flex-end", display: "flex" }}>
                                    <button className='switcher'></button>
                                </div>
                            </div>

                            <div className='register-input-box'>
                                <input type="text" required placeholder='name' id='name' name='name' onChange={handleUserInput} />
                                <input type="text" required placeholder='email' id='email' name='email' onChange={handleUserInput} />
                                <input type="text" required placeholder='password' id='password' name='password' onChange={handleUserInput} />

                            </div>

                            <div className='register-image-upload'>
                                <div>
                                    <BiSolidUserCircle className='avatar-icon' />
                                </div>

                                <div>
                                    <input type="file" id='avatar' name='avatar' required onChange={handleUserInput} />
                                </div>
                            </div>


                            <div className='login-button'>
                                <button>
                                    Register
                                </button>
                            </div>
                        </div>
                    </form>
            }


        </div>
    )
}

export default Login