import Link from 'next/link';

export const Dashboard = () => {
  return (
    <div className="App">
        <div className='wrapper'>
            <h1 className="custom-h1">Dashboard </h1><br/>
            <Link href="./SignUpPage">     Retour à l&aposinscription
    </Link>
        </div>
    </div>
  )
}
export default Dashboard;
