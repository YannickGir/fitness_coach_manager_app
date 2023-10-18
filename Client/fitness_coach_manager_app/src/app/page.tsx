
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
        }
      }, [router]);

    const handleSignIn = async (username: string, password_hash: string, email:string) => {
        setLoading(true);
        console.log('Tentative de connexion avec username :', username, 'et password :', password_hash);
      
        try {
          const response = await axios.post("http://localhost:8800/api/authenticate",  {
            username,
            password_hash,
            email,
            withCredentials: true
          } );
          console.log('Statut de la réponse :', response.headers);
    
          if (response.status === 200) {
            // console.log('username dans try' + username)
            // alert(JSON.stringify("vous êtes connecté !"))
            //to manage redirection to Dashboard if session ok :
            
            Cookies.set("jwtToken", response.data.token, { expires: 7 });
            const storedToken = Cookies.get('jwtToken');
            console.log("soterdToken :"  + storedToken)
                if (storedToken) {
                // Le token a été trouvé dans le cookie, vous pouvez le stocker localement ou l'utiliser.
                console.log('Token récupéré depuis le cookie :', storedToken);
                localStorage.setItem('userSession', username);
                // Faites ce que vous avez besoin de faire avec le token.
                alert(JSON.stringify(" vous êtes connecté ! " + username))
                const userData = response.data.userData;
                console.log("userData.role: " + userData.role);
                 if (userData.role === "client")
                    router.push('CustomerArea/DashboardClient'); 
                else if (userData.role === "coach")
                    router.push('CoachArea/Dashboard');
                
                
        
                    // Le token n'a pas été trouvé dans le cookie.
                    
                    // Gérez le cas où le token n'est pas disponible.
                    
                    // const { token } = response.data;
                    // console.log(token)
                    // if (token) { 
                    // const storedUsername = Cookies.set('jwtToken', token);
          
                } else {
                console.error('Token non trouvé dans le cookie, page connexion.');
                }
          } else {
            console.error('Erreur lors de la connexion dans try');
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
      <Link href="SignUpPage">Inscription</Link>
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
  