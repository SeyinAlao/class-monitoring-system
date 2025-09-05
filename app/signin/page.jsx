"use client";

import styles from './signin.module.css';
import Image from 'next/image'; 
import { useState } from 'react';


export default function Signin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        try{
            const res = await fetch("/api/auth/signin", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ 
                    email: email,
                    password: password}),
             });

            if (res.ok) {
              const data = await res.json();
              console.log('✅ Sign-in successful:', data);
        
              window.location.href = '/Monitoring'; 
            }else{
                const errorData = await res.json();
                console.error('⚠️ Sign-in failed:', errorData);
            }
            setEmail('');
            setPassword('');

            }
        catch (error){
            console.error('⚠️ Error during sign-in:', error);
            // Handle error (e.g., show a message to the user)
        }
    };

return (
    <div style={{ minHeight: "100vh", overflowY: "auto", display: "flex", justifyContent: "center" }}>
        <div className={styles.container}>
                <div className={styles.ringWrapper}>
                 <div className={styles.Outterring}></div>
                 <div className={styles.Innerring}></div>
                    <div className={styles.circle}>
                     <Image 
                     src="/image/logo.svg" 
                     alt="Logo" 
                     width={49.49}    
                     height={58.55}   
                     />
                    </div>
                </div>

                 <h1 className={styles.title}> Academic Planning</h1>
                 <p className={styles.subtitle}>Class Monitoring System</p>

                    <div className={styles.formContainer}>
                      <h1 className={styles.Lotile}> Login to your Account</h1>
                       <form className={styles.form} onSubmit={handleSubmit}>
                            <div className={styles.inputGroup}>
                               <label htmlFor='email'>Email</label>
                               <input 
                                type='email' 
                                id='email' 
                                name='email' 
                                placeholder='Enter your email' 
                                className={styles.Input}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                />
                               <label htmlFor='password'>Password</label>
                               <input
                                type='password' 
                                id='password' 
                                name='password' 
                                placeholder='Enter your password' 
                                className={styles.Input}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                 />
                               <button type='submit' className={styles.button}>Login</button>
                            </div>
                        </form>
                   </div>
                    <footer className={styles.footer}>
                     <p>2025 Office of DAP</p>
                    </footer>
        </div> 

    </div>
    );
}

