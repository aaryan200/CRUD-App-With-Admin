import { useEffect, useState } from 'react';
import './CredentialInput.css';

export default function CredentialInput({valueType, textLabel, refToInput, initialValue = ""}) {
    const [val, setVal] = useState("");
    useEffect(() => {
        setVal(initialValue);
    }, [initialValue]);
    return (
        <div className='credential-input-container'>
            <span className="credential-input-label">{textLabel}</span>
            <input type={valueType} className="credential-input" required ref={refToInput} value={val} onChange={(e) => setVal(e.target.value)}/>
        </div>
    )
}