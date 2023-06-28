import { useContext, useRef } from 'react';
import Bar from '../../components/Bar/Bar';
import CredentialInput from '../../components/CredentialInput/CredentialInput';
import './UpdateUser.css';
import { Context } from '../../context/Context';
import axios from 'axios';

export default function UpdateUser() {
    const {user, dispatch} = useContext(Context);
    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    async function handleSubmit(e) {
        e.preventDefault();
        dispatch({type: "UPDATE_START"});
        const updatedUser = {
            userId: user._id,
            firstName: firstNameRef.current.value,
            lastName: lastNameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value
        };
        try {
            const res = await axios.put(`${process.env.REACT_APP_SERVER_URL}/users/${user._id}`, updatedUser);
            dispatch({ type : "UPDATE_SUCCESS", payload: res.data});
            // window.location.reload();
            window.location.replace("/");
        } catch(err) {
            console.log(err);
            dispatch({type: "UPDATE_FAILURE"});
        }
    }
    return (
        <div style={{ position: 'relative' }}>
            <Bar />
            <div className={`update-user-wrapper wrapper`}>
                <form className=' update-user-container' onSubmit={handleSubmit}>
                    <div className="credential-inputs">
                        <CredentialInput valueType="text" textLabel="First Name" refToInput={firstNameRef} initialValue={user?.firstName}/>
                        <CredentialInput valueType="text" textLabel="Last Name" refToInput={lastNameRef} initialValue={user?.lastName}/>
                        <CredentialInput valueType="email" textLabel="Email" refToInput={emailRef} initialValue={user.email}/>
                        <CredentialInput valueType="password" textLabel="Password" refToInput={passwordRef}/>
                    </div>
                    <div className="credentials-submit-button">
                        <button type='submit'>Update</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
