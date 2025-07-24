import React from 'react'
import DataCards from './DataCards'

import PapersList from '../ListTable/PapersList'
import { useGlobalState } from '../Constants/GlobalStateProvider';

function Admin_Dash() {
  const { getGlobal, setGlobal } = useGlobalState();
  const globalState = getGlobal();
  
  return (
    <>
       <main id="main" className="main" style={{ minHeight: '100vh', padding: '20px' }}>
        
        <div className="pagetitle">
          <h1>Educator</h1>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="/AdminDash">Home</a>
              </li>
              <li className="breadcrumb-item active">Dashboard</li>
            </ol>
          </nav>
        </div>

        <section className="section dashboard">
          <div className="row">
          
            <DataCards />
            
            {/* <UserTable /> */}
            <PapersList userId={globalState}/>
          

          </div>


        </section>
      </main>

    </>

  )
}

export default Admin_Dash