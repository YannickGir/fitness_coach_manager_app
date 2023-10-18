
"use client"

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import LoadinPage from '../../LoadingPage/page';
import './dashboard.css';
import Cookies from 'js-cookie';
import axios from 'axios'
export const Dashboard = () => {
    const router = useRouter();
    const [authenticated, setAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const userSession = localStorage.getItem('userSession');
        const verifyAccessToDashboard = async () => {
      try {
        const response = await axios.get('http://localhost:8800/api/dashboardClient', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials:true,
        });

        if (response.status === 200) {
          setAuthenticated(true);
        } else {
          router.push('/');
        }
      } catch (error) {
        console.error('Erreur lors de la vérification de l\'accès au tableau de bord :', error);
        router.push('/');
      } finally {
        setLoading(false);
      }
    };
        if (userSession) {
        verifyAccessToDashboard();
        } else {
          router.push('/'); 
        }
        setTimeout(() => {
            setLoading(false); 
          }, 2000);
        }, [router]);

    const handleLogout = async () => {
        try {
          const response = await fetch('http://localhost:8800/api/logout', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
          });
    
          if (response.status === 200) {
            alert(JSON.stringify("vous êtes déconnecté !"))
            localStorage.removeItem('userSession');
            router.push('/'); 
          } else {
            console.error('Erreur lors de la déconnexion try dashboard :', response.statusText);
          }
        } catch (error) {
          console.error('Erreur lors de la déconnexion catch dashboard :', error);
        }
      };

      if(loading) {
        return <LoadinPage/>
      }

     
     
  return (
    <div className="App">
        <div className='wrapper'>
            <h1 className="custom-h1">Dashboard Client </h1><br/>
            <button onClick={handleLogout}>Déconnexion</button>
            <Link href="./SignUpPage">     Retour à l&aposinscription
    </Link>
        </div>
    </div>
  )
}
export default Dashboard;