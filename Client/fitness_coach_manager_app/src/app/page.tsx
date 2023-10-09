
"use client"

import SignInForm from '@/userinterface/components/SignInForm'
import axios from 'axios'
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import './App.css';
import "./style.css";
import CustomPopup from '@/userinterface/components/CustomPopup';
import { useEffect, useState } from 'react';
import LoadingPage from './LoadingPage/page';
import Cookies from 'js-cookie';

function HomePage() {
    const router = useRouter();
    const [authenticated, setAuthenticated] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const userSession = localStorage.getItem('userSession');
        if (userSession) {
          setAuthenticated(true);
          router.push('Dashboard'); 
        }
      }, [router]);

     

    const handleSignIn = async (username: string, password_hash: string, email:string) => {
        setLoading(true);
        console.log('Tentative de connexion avec username :', username, 'et password :', password_hash);
      
        try {
          const response = await axios.post("http://localhost:8800/api/authenticate", {
            username,
            password_hash,
            email,
          });
          console.log('Statut de la réponse :', response.status);
    
          if (response.status === 200) {
            // console.log('username dans try' + username)
            // alert(JSON.stringify("vous êtes connecté !"))
            //to manage redirection to Dashboard if session ok :
            const { token } = response.data;
            console.log(token)
            localStorage.setItem('userSession', username);

            //to manage storage of JWT token:
            // Cookies.set('usernameCookie', username);
            const storedUsername = Cookies.get('jwtToken');

            alert('Nom de l\'utilisateur'+ username +'stocké dans le cookie : ' + storedUsername);

            router.push('/Dashboard'); 
          } else {
            console.log('Erreur lors de la connexion dans try');
          }
        } catch (err) {
        //   console.log('Erreur lors de la connexion dans catch', err);
        } finally {
            setTimeout(() => {
                setLoading(false);
              }, 2000);
        }
      };

      let display: JSX.Element | null = null;

if (loading) {
  display = <LoadingPage />;
} else if (authenticated) {
  display= null;
} else {
  display = (
    <div className='wrapper'>
      <h1 className="custom-h1">Welcome to SignInPage</h1>
      <SignInForm onSignIn={handleSignIn} /> <br />
      <Link href="./SignUpPage">Inscription</Link>
    </div>
  );
}
    return (
        <div className="App">
           {display}
       
      </div>
    );
  }
  
  export default HomePage;
  