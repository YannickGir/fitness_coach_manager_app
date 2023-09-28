"use client"

import SignInForm from '@/userinterface/components/SignInForm'
import axios from 'axios'
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import './App.css';
import "./style.css";
import CustomPopup from '@/userinterface/components/CustomPopup';


function HomePage() {
    const router = useRouter();

    const handleSignIn = async (username: string, password_hash: string, email:string) => {
        console.log('Tentative de connexion avec username :', username, 'et password :', password_hash);
      
        try {
          const response = await axios.post("http://localhost:8800/api/authenticate", {
            username,
            password_hash,
            email,
          });
          console.log('Statut de la réponse :', response.status);
    
          if (response.status === 200) {
            router.push('Dashboard'); 
          } else {
            // console.error('Erreur d\'authentification :', response.data);
            // router.push(`/CustomPopup?message=${response.data.message}`);
            console.log('Erreur lors de la connexion');
          }
        } catch (err) {
        //   console.error('Erreur lors de la connexion :', err);
        //   router.push(`/CustomPopup?message=Erreur lors de la connexion.`);
          console.log('Erreur lors de la connexion');
        }
      
      };

    return (
        <div className="App">
            <div className='wrapper'>  <h1 className="custom-h1">Welcome to SignInPage</h1> 
        <SignInForm onSignIn={handleSignIn} /> <br/>
        <Link href="./SignUpPage">     Inscription
    </Link></div>
       
      </div>
    );
  }
  
  export default HomePage;
  