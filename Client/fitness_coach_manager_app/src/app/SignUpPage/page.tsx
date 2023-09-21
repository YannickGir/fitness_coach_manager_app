"use client"

import SignUpForm from '@/userinterface/components/SignUpForm'
import axios from 'axios'
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export const SignUpPage : React.FC = () => {

    const router = useRouter();  //to send to a different page after clicking
      
    
    const handleSignUp = async (username: string, password_hash: string, email:string) => {
      console.log('Tentative de connexion avec username :', username, 'et password :', password_hash);
    
      try {
        const response = await axios.post("http://localhost:8800/sign_up", {
          username,
          password_hash,
          email,
        });
  
        if (response.status === 200) {
          // L'utilisateur est inscrit avec succès.
          router.push('Dashboard'); // Exemple de redirection vers la page de tableau de bord.
        } else {
          // Gérer les erreurs d'inscription ici.
          console.error('Erreur d\'inscription :', response.data);
        }
      } catch (err) {
        console.error('Erreur lors de l\'inscription :', err);
      }
    
    };
  
    return (
      <div className="App">
        <div className='wrapper'>    <h1 className="custom-h1">Welcome to the SignUpPage</h1>
        <SignUpForm onSignUp={handleSignUp} /></div> <br/>
        <Link href="./">    Déjà inscris, se connecter
    </Link>
      </div>
    );
  };
  
  export default SignUpPage;
