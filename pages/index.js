import { useState } from 'react'
import Head from 'next/head'
import Dashboard from '../components/EmbeddedDashboard'


export default function Index() {
  const [isAdmin, setAdmin] = useState('1')

  return (<>
    <Head>
      <title>Quicksight Demo</title>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous"></link>
    </Head>

    <nav className="navbar navbar-light bg-light">
      <div className="container-fluid">
        <span className="navbar-brand mb-0 h1">QuickSight Demo</span>
        <form className="d-flex">
          <select
            className="form-select" 
            aria-label="Default select example" 
            value={isAdmin} 
            onChange={e => setAdmin(e.target.value)}
          >
            <option value='1'>Admin</option>
            <option value='0'>Regular User</option>
          </select>
        </form>
      </div>
    </nav>

    <Dashboard isAdmin={isAdmin === '1'} />
  </>)
}
