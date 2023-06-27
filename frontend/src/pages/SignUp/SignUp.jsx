import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';
import CredentialInput from '../../components/CredentialInput/CredentialInput';
import './SignUp.css';
import { useRef } from 'react';
import axios from 'axios';

export default function SignUp() {
    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const res = await axios.post("/auth/register", {
                firstName: firstNameRef.current.value,
                lastName: lastNameRef.current.value,
                email: emailRef.current.value,
                password: passwordRef.current.value
            });
            res.data && window.location.replace("/login");
        } catch(err) {
            console.log(err);
        }
    }
    return (
        <div className='credentials-wrapper'>
            <div className="credentials-container">
                <div className="credentials-logo">
                    <img src={logo} />
                </div>
                <div className="credentials-headings">
                    <span className="page-heading">Create your account</span>
                    <span className='account-question'>Have an account? <span className='credentials-link'><Link className='link' to='/login'>Log in now</Link></span></span>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="credential-inputs">
                        <CredentialInput valueType="text" textLabel="First Name" refToInput={firstNameRef}/>
                        <CredentialInput valueType="text" textLabel="Last Name" refToInput={lastNameRef} />
                        <CredentialInput valueType="email" textLabel="Email" refToInput={emailRef} />
                        <CredentialInput valueType="password" textLabel="Password" refToInput={passwordRef} />
                    </div>
                    <div className="credentials-submit-button">
                        <button type='submit'>Sign Up</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
