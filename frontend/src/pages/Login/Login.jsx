import './login.css';
import logo from '../../assets/logo.png';
import CredentialInput from '../../components/CredentialInput/CredentialInput';
import { Link } from 'react-router-dom';
import { useContext, useRef, useState } from 'react';
import { Context } from '../../context/Context';
import axios from "axios";

export default function Login() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const { dispatch } = useContext(Context);
    const [error, setError] = useState(false);
    async function handleSubmit(e) {
        e.preventDefault();
        dispatch({ type: "LOGIN_START" });
        try {
            const res = await axios.post(`${process.env.REACT_APP_SERVER_URL}/auth/login`, {
                email: emailRef.current.value,
                password: passwordRef.current.value,
            });
            dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
            setError(false);
            window.location.replace("/");
        } catch (err) {
            dispatch({ type: "LOGIN_FAILURE" });
            setError(true);
            console.log(err);
        }
    }
    // if (error) return (
    //     <div>
    //         Something went wrong
    //     </div>
    // )
    return (
        <div className='credentials-wrapper'>
            <div className="credentials-container">
                {
                    error && (
                        <div className='login-error-msg'>
                            <p>Invalid Credentials</p>
                        </div>
                    )
                }
                <div className="credentials-logo">
                    <img src={logo} />
                </div>
                <div className="credentials-headings">
                    <span className="page-heading">Log in to your account</span>
                    <span className='account-question'>Don't have an account? <span className='credentials-link'><Link className='link' to='/signup'>Sign Up</Link></span></span>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="credential-inputs">
                        <CredentialInput valueType="email" textLabel="Email" refToInput={emailRef} />
                        <CredentialInput valueType="password" textLabel="Password" refToInput={passwordRef} />
                    </div>
                    <div className="credentials-submit-button">
                        <button type='submit'>Login</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
