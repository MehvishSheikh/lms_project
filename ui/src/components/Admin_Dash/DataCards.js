import React from 'react';
import { Link } from 'react-router-dom';


function DataCards() {
  return (
    <div>
      <div className="col-lg-12">
        <div className="row">


          <div className="col-xxl-4 col-md-4">
            <div className="card info-card customers-card">
              <Link to="/IndexCreatePaper">

                <div
                  className="card-body"
                  style={{
                    padding: '20px',
                    position: 'relative',
                    overflow: 'hidden',
                    backgroundImage: 'url("assets/img/datacard1bg.svg")',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    backgroundColor: '#45ff54',
                    color: '#ff771d',
                    boxShadow: '0 5px 26px 0 rgba(68, 88, 144, 0.14)',
                    border: '1px solid #fff',
                    borderRadius: '8px',// Optional: add border-radius if needed
                    height: '180px'

                  }}
                >
                  <div
                    style={{
                      position: 'absolute',
                      top: '12px',
                      left: '10px',
                      right: '20px',
                      padding: '2px',
                      width: '180px',
                      height: '40px',
                      backgroundColor: '#0a0136',
                      borderRadius: '50px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <h5 className="card-title" style={{ fontWeight: 'bold', color: 'white', margin: '0', left: '200px' }}>
                      Create Paper
                    </h5>
                  </div>

                  <div className="d-flex align-items-center mt-3">
                    {/* <div 
      className="card-icon rounded-circle d-flex align-items-center justify-content-center"
      style={{
        width: '50px', 
        height: '50px',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background for better visibility
        color: 'white'
      }}
    >
      <i className="bi bi-people" style={{ fontSize: '24px' }} />
    </div> */}
                    {/* <div className="ps-3">
      <h6 className="mb-0">5</h6>
      <span className="text-muted small" style={{ color: 'white' }}>Question Papers</span>
    </div> */}
                  </div>
                </div>



              </Link>
            </div>
          </div>


          <div className="col-xxl-4 col-md-4">
            <div className="card info-card customers-card">
              <Link to="/index-templates">

                <div
                  className="card-body"
                  style={{
                    padding: '20px',
                    position: 'relative',
                    overflow: 'hidden',
                    backgroundImage: 'url("assets/img/datacard2bg.svg")',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    backgroundColor: '#f5f10a',
                    color: '#ff771d',
                    boxShadow: '0 5px 26px 0 rgba(68, 88, 144, 0.14)',
                    border: '1px solid #fff',
                    borderRadius: '8px',// Optional: add border-radius if needed
                    height: '180px'

                  }}
                >
                  <div
                    style={{
                      position: 'absolute',
                      top: '120px',
                      left: '70px',
                      right: '20px',
                      padding: '2px',
                      width: '180px',
                      height: '40px',
                      backgroundColor: '#0a0136',
                      borderRadius: '50px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <h5 className="card-title" style={{ fontWeight: 'bold', color: 'white', margin: '0', left: '200px' }}>
                      Templates
                    </h5>
                  </div>

                  <div className="d-flex align-items-center mt-3">
                    {/* <div 
      className="card-icon rounded-circle d-flex align-items-center justify-content-center"
      style={{
        width: '50px', 
        height: '50px',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background for better visibility
        color: 'white'
      }}
    >
      <i className="bi bi-people" style={{ fontSize: '24px' }} />
    </div> */}
                    {/* <div className="ps-3">
      <h6 className="mb-0">5</h6>
      <span className="text-muted small" style={{ color: 'white' }}>Question Papers</span>
    </div> */}
                  </div>
                </div>
              </Link>
            </div>
          </div>

          <div className="col-xxl-4 col-md-4">
            <div className="card info-card customers-card">


              <div
                className="card-body"
                style={{
                  padding: '20px',
                  position: 'relative',
                  overflow: 'hidden',
                  backgroundImage: 'url("assets/img/datacard3bg.svg")',
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'center',
                  backgroundSize: 'cover',
                  backgroundColor: '#d61c4a',
                  color: '#ff771d',
                  boxShadow: '0 5px 26px 0 rgba(68, 88, 144, 0.14)',
                  border: '1px solid #fff',
                  borderRadius: '8px',// Optional: add border-radius if needed
                  height: '180px'

                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    top: '12px',
                    left: '10px',
                    right: '20px',
                    padding: '2px',
                    width: '180px',
                    height: '40px',
                    backgroundColor: '#0a0136',
                    borderRadius: '50px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <h5 className="card-title" style={{ fontWeight: 'bold', color: 'white', margin: '0', left: '200px' }}>
                    Themes
                  </h5>
                </div>

                <div className="d-flex align-items-center mt-3">
    
                </div>
              </div>
            </div>
          </div>



        </div>
      </div>



    </div>





  )
}

export default DataCards