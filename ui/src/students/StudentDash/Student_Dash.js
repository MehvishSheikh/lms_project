import React from 'react'
import { useGlobalState } from '../../components/Constants/GlobalStateProvider';
import StudentDataCards from '../DataCards/StudentDataCards';
import EducatorList from '../StudentClassRoom/EducatorList';
import ListOfEducator from '../EducatorsList/ListOfEducator';

function Student_Dash() {
  const { getGlobal, setGlobal } = useGlobalState();
  const globalState = getGlobal();
  
  return (
    <>
       <main id="main" className="main" style={{ minHeight: '100vh', padding: '20px' }}>
        
        <div className="pagetitle">
          <h1>Student</h1>
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
          
            <StudentDataCards/>
            
            
            {/* <UserTable /> */}
            {/* <PapersList userId={globalState}/> */}
           <ListOfEducator/>

          </div>


        </section>
      </main>

    </>

  )
}

export default Student_Dash