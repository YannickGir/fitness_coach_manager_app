"use client"

import Link from 'next/link';
import { useRouter } from 'next/navigation';


export const Dashboard = () => {
    const router = useRouter();
    const handleLogout = async () => {
        try {
          const response = await fetch('http://localhost:8800/api/logout', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
          });
    
          if (response.status === 200) {
            router.push('/'); 
          } else {
            console.error('Erreur lors de la déconnexion :', response.statusText);
          }
        } catch (error) {
          console.error('Erreur lors de la déconnexion :', error);
        }
      };
  return (
    <div className="App">
        <div className='wrapper'>
            <h1 className="custom-h1">Dashboard </h1><br/>
            <button onClick={handleLogout}>Déconnexion</button>
            <Link href="./SignUpPage">     Retour à l&aposinscription
    </Link>
        </div>
    </div>
  )
}
export default Dashboard;
