import React from 'react'
import './LandingPageCss.css'
import { Link } from 'react-router-dom'
import Signup from './Signup'
import { useState } from 'react'
import StudentLogin from '../../students/Register/StudentLogin'
import StudentRegister from '../../students/Register/StudentRegister'

const LandingPage = () => {
  // const Register = () => {
    const [activeTab, setActiveTab] = useState(null);
  
    const handleTabClick = (role) => {
      setActiveTab(role);
    };
  
  return (
    <>
    <>
  {/* ======= Header ======= */}
  <header
    id="header"
    className="fixed-top d-flex align-items-center  header-transparent "
  >
    <div className="container d-flex align-items-center justify-content-between">
      <div className="logo">
        <h1>
          <a href="index.html">LMS WebApp</a>
        </h1>
        {/* Uncomment below if you prefer to use an image logo */}
        {/* <a href="index.html"><img src="assets/img/logo.png" alt="" class="img-fluid"></a>*/}
      </div>
      <nav id="navbar" className="navbar">
        <ul>
          <li>
            <Link className="nav-link scrollto active" href="#hero">
              Home
            </Link>
          </li>
          <li>
            <Link className="nav-link scrollto" href="#about">
              About
            </Link>
          </li>
          <li>
            <Link className="nav-link scrollto" href="#services">
              Services
            </Link>
          </li>
          {/* <li>
            <a className="nav-link scrollto " href="/Signup">
              Register
            </a>
          </li> */}
          <li>
            <Link className="nav-link scrollto" to="/EducatorLogin">
              Educator Login
            </Link>
          </li>
          <li>
            <Link className="nav-link scrollto" to="/StudentLogin">
              Student Login
            </Link>
          </li>
          {/* <li className="dropdown">
            <a href="#">
              <span>Drop Down</span> <i className="bi bi-chevron-down" />
            </a>
            <ul>
              <li>
                <a href="#">Drop Down 1</a>
              </li>
              <li className="dropdown">
                <a href="#">
                  <span>Deep Drop Down</span>{" "}
                  <i className="bi bi-chevron-right" />
                </a>
                <ul>
                  <li>
                    <a href="#">Deep Drop Down 1</a>
                  </li>
                  <li>
                    <a href="#">Deep Drop Down 2</a>
                  </li>
                  <li>
                    <a href="#">Deep Drop Down 3</a>
                  </li>
                  <li>
                    <a href="#">Deep Drop Down 4</a>
                  </li>
                  <li>
                    <a href="#">Deep Drop Down 5</a>
                  </li>
                </ul>
              </li>
              <li>
                <a href="#">Drop Down 2</a>
              </li>
              <li>
                <a href="#">Drop Down 3</a>
              </li>
              <li>
                <a href="#">Drop Down 4</a>
              </li>
            </ul>
          </li> */}
          <li>
            <Link className="nav-link scrollto" href="#contact">
              Contact
            </Link>
          </li>
        </ul>
        <i className="bi bi-list mobile-nav-toggle" />
      </nav>
      {/* .navbar */}
    </div>
  </header>
  {/* End Header */}
  {/* ======= Hero Section ======= */}
  <section
    id="hero"
    className="d-flex flex-column justify-content-end align-items-center"
  >
    <div
      id="heroCarousel"
      data-bs-interval={5000}
      className="container carousel carousel-fade"
      data-bs-ride="carousel"
    >
      {/* Slide 1 */}
      <div className="carousel-item active">
        <div className="carousel-container">
          <h2 className="animate__animated animate__fadeInDown">
            Welcome to <span>Paper Designer</span>
          </h2>
          <p className="animate__animated fanimate__adeInUp">
          Our web-based Learning Management System (LMS) is designed to empower educators in creating
          comprehensive Multiple Choice Question (MCQ) papers with ease. With an intuitive interface,
          you can seamlessly design, organize, and customize.
          </p>
          
          <Link
            href="#features"
            className="btn-get-started animate__animated animate__fadeInUp scrollto"
          >
            Register Now
          </Link>
        </div>
      </div>
      {/* Slide 2 */}
      <div className="carousel-item">
        <div className="carousel-container">
          <h2 className="animate__animated animate__fadeInDown">
            Streamline MCQ Paper Generation
          </h2>
          <p className="animate__animated animate__fadeInUp">
          Say goodbye to the hassle of manually preparing MCQ papers. Our LMS provides a streamlined 
          process that allows you to focus on what matters most: teaching. Create, edit, and download 
          your MCQ papers in various formats.
          </p>
          <Link
            href="#features"
            className="btn-get-started animate__animated animate__fadeInUp scrollto"
          >
            Register Now
          </Link>
        </div>
      </div>
      {/* Slide 3 */}
      <div className="carousel-item">
        <div className="carousel-container">
          <h2 className="animate__animated animate__fadeInDown">
            Great tool for Educators
          </h2>
          <p className="animate__animated animate__fadeInUp">
          Experience the future of educational assessments with the MCQ Paper Designer LMS WebApp. 
          Our platform not only simplifies the creation of MCQ papers but also ensures a professional 
          and polished output. 
          </p>
          <Link
            href="#features"
            className="btn-get-started animate__animated animate__fadeInUp scrollto"
          >
            Register Now
          </Link>
        </div>
      </div>
      <Link
        className="carousel-control-prev"
        href="#heroCarousel"
        role="button"
        data-bs-slide="prev"
      >
        <span
          className="carousel-control-prev-icon bx bx-chevron-left"
          aria-hidden="true"
        />
      </Link>
      <Link
        className="carousel-control-next"
        href="#heroCarousel"
        role="button"
        data-bs-slide="next"
      >
        <span
          className="carousel-control-next-icon bx bx-chevron-right"
          aria-hidden="true"
        />
      </Link>
    </div>
    <svg
      className="hero-waves"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 24 150 28 "
      preserveAspectRatio="none"
    >
      <defs>
        <path
          id="wave-path"
          d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
        ></path>
      </defs>
      <g className="wave1">
        <use
          xlinkHref="#wave-path"
          x={50}
          y={3}
          fill="rgba(255,255,255, .1)"
        ></use>
      </g>
      <g className="wave2">
        <use
          xlinkHref="#wave-path"
          x={50}
          y={0}
          fill="rgba(255,255,255, .2)"
        ></use>
      </g>
      <g className="wave3">
        <use xlinkHref="#wave-path" x={50} y={9} fill="#fff"></use>
      </g>
    </svg>
  </section>
  {/* End Hero */}
  <main id="main">
    {/* ======= About Section ======= */}
    {/* <section id="about" className="about">
      <div className="container">
        <div className="section-title" data-aos="zoom-out">
          <h2>Register</h2>
          <p>You can Register as Educator or Student</p>
        </div>
        <div className="row content" data-aos="fade-up">
          <div className="col-lg-6">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <ul>
              <li>
                <i className="ri-check-double-line" /> Ullamco laboris nisi ut
                aliquip ex ea commodo consequat
              </li>
              <li>
                <i className="ri-check-double-line" /> Duis aute irure dolor in
                reprehenderit in voluptate velit
              </li>
              <li>
                <i className="ri-check-double-line" /> Ullamco laboris nisi ut
                aliquip ex ea commodo consequat
              </li>
            </ul>
          </div>
          <div className="col-lg-6 pt-4 pt-lg-0">
            <p>
              Ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
              irure dolor in reprehenderit in voluptate velit esse cillum dolore
              eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
              proident, sunt in culpa qui officia deserunt mollit anim id est
              laborum.
            </p>
            <a href="#" className="btn-learn-more">
              Learn More
            </a>
          </div>
        </div>
      </div>
    </section> */}
    {/* End About Section */}
    {/* ======= Features Section ======= */}
    <section id="features" className="features">
      <div className="container">
      <div className="section-title" data-aos="zoom-out">
          <h2>Register</h2>
          <p style={{ fontSize: '25px' }}>You can Register as Educator or Student</p>
        </div>
        <ul className="nav nav-tabs row d-flex">
        <li className="nav-item col-6 nav-item-space" data-aos="zoom-in">
          <Link
            className={`nav-link ${activeTab === 'Educator' ? 'active show' : ''}`}
            onClick={() => handleTabClick('Educator')}
          >
            <i className="ri-gps-line"></i>
            <h4 className="d-none d-lg-block">Educator</h4>
          </Link>
        </li>
        <li
          className="nav-item col-6 nav-item-space"
          data-aos="zoom-in"
          data-aos-delay="100"
        >
          <Link
            className={`nav-link ${activeTab === 'Student' ? 'active show' : ''}`}
            onClick={() => handleTabClick('Student')}
          >
            <i className="ri-body-scan-line"></i>
            <h4 className="d-none d-lg-block">Student</h4>
          </Link>
        </li>
      </ul>
      <br/>
      <br/>
      {activeTab === 'Educator' && <Signup/>}
      {activeTab === 'Student' && <StudentRegister/>}
      <br/>
      <br/>
      <br/>
      <br/>

        <div className="tab-content" data-aos="fade-up">
          <div className="tab-pane active show" id="tab-1">
            <div className="row">
              <div className="col-lg-6 order-2 order-lg-1 mt-3 mt-lg-0">
                <h3>
                Key Features of the MCQ Paper Designer LMS WebApp
                </h3>
                

                <ul>
                  <li>
                    <i className="ri-check-double-line" />User-Friendly Interface: Easy-to-use for creating and managing MCQ papers.
                  </li>
                  <li>
                    <i className="ri-check-double-line" /> Customizable Templates: Pre-designed templates for quick selection and customization.
                  </li>
                  <li>
                    <i className="ri-check-double-line" /> 
                    Question Type Variety: Supports single answer, multiple answer, and true/false questions.
                  </li>
                  <li>
                    <i className="ri-check-double-line" /> 
                    Real-Time Preview: Live preview of the MCQ paper during creation.
                  </li>
                  <li>
                    <i className="ri-check-double-line" /> 
                   
                        Download Options: Download MCQ papers and answer keys as PDFs.
                  </li>
                  <li>
                    <i className="ri-check-double-line" /> 
                    
                     Edit and Delete Questions: Easily edit or delete questions.
                  </li>
                  <li>
                    <i className="ri-check-double-line" /> 
Answer Key Generation: Automatic generation of answer keys.
                  </li>
                </ul>
               
              </div>
              <div className="col-lg-6 order-1 order-lg-2 text-center">
                <img
                  src="assets/img/features-1.png"
                  alt=""
                  className="img-fluid"
                />
              </div>
            </div>
          </div>
          <div className="tab-pane" id="tab-2">
            <div className="row">
              <div className="col-lg-6 order-2 order-lg-1 mt-3 mt-lg-0">
                <h3>
                  Neque exercitationem debitis soluta quos debitis quo mollitia
                  officia est
                </h3>
                <p>
                  Ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis
                  aute irure dolor in reprehenderit in voluptate velit esse
                  cillum dolore eu fugiat nulla pariatur. Excepteur sint
                  occaecat cupidatat non proident, sunt in culpa qui officia
                  deserunt mollit anim id est laborum
                </p>
                <p className="fst-italic">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
                <ul>
                  <li>
                    <i className="ri-check-double-line" /> Ullamco laboris nisi
                    ut aliquip ex ea commodo consequat.
                  </li>
                  <li>
                    <i className="ri-check-double-line" /> Duis aute irure dolor
                    in reprehenderit in voluptate velit.
                  </li>
                  <li>
                    <i className="ri-check-double-line" /> Provident mollitia
                    neque rerum asperiores dolores quos qui a. Ipsum neque dolor
                    voluptate nisi sed.
                  </li>
                  <li>
                    <i className="ri-check-double-line" /> Ullamco laboris nisi
                    ut aliquip ex ea commodo consequat. Duis aute irure dolor in
                    reprehenderit in voluptate trideta storacalaperda mastiro
                    dolore eu fugiat nulla pariatur.
                  </li>
                </ul>
              </div>
              <div className="col-lg-6 order-1 order-lg-2 text-center">
                <img
                  src="assets/img/features-2.png"
                  alt=""
                  className="img-fluid"
                />
              </div>
            </div>
          </div>
          <div className="tab-pane" id="tab-3">
            <div className="row">
              <div className="col-lg-6 order-2 order-lg-1 mt-3 mt-lg-0">
                <h3>
                  Voluptatibus commodi ut accusamus ea repudiandae ut autem
                  dolor ut assumenda
                </h3>
                <p>
                  Ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis
                  aute irure dolor in reprehenderit in voluptate velit esse
                  cillum dolore eu fugiat nulla pariatur. Excepteur sint
                  occaecat cupidatat non proident, sunt in culpa qui officia
                  deserunt mollit anim id est laborum
                </p>
                <ul>
                  <li>
                    <i className="ri-check-double-line" /> Ullamco laboris nisi
                    ut aliquip ex ea commodo consequat.
                  </li>
                  <li>
                    <i className="ri-check-double-line" /> Duis aute irure dolor
                    in reprehenderit in voluptate velit.
                  </li>
                  <li>
                    <i className="ri-check-double-line" /> Provident mollitia
                    neque rerum asperiores dolores quos qui a. Ipsum neque dolor
                    voluptate nisi sed.
                  </li>
                </ul>
                <p className="fst-italic">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </div>
              <div className="col-lg-6 order-1 order-lg-2 text-center">
                <img
                  src="assets/img/features-3.png"
                  alt=""
                  className="img-fluid"
                />
              </div>
            </div>
          </div>
          <div className="tab-pane" id="tab-4">
            <div className="row">
              <div className="col-lg-6 order-2 order-lg-1 mt-3 mt-lg-0">
                <h3>
                  Omnis fugiat ea explicabo sunt dolorum asperiores sequi
                  inventore rerum
                </h3>
                <p>
                  Ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis
                  aute irure dolor in reprehenderit in voluptate velit esse
                  cillum dolore eu fugiat nulla pariatur. Excepteur sint
                  occaecat cupidatat non proident, sunt in culpa qui officia
                  deserunt mollit anim id est laborum
                </p>
                <p className="fst-italic">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
                <ul>
                  <li>
                    <i className="ri-check-double-line" /> Ullamco laboris nisi
                    ut aliquip ex ea commodo consequat.
                  </li>
                  <li>
                    <i className="ri-check-double-line" /> Duis aute irure dolor
                    in reprehenderit in voluptate velit.
                  </li>
                  <li>
                    <i className="ri-check-double-line" /> Ullamco laboris nisi
                    ut aliquip ex ea commodo consequat. Duis aute irure dolor in
                    reprehenderit in voluptate trideta storacalaperda mastiro
                    dolore eu fugiat nulla pariatur.
                  </li>
                </ul>
              </div>
              <div className="col-lg-6 order-1 order-lg-2 text-center">
                <img
                  src="assets/img/features-4.png"
                  alt=""
                  className="img-fluid"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    {/* End Features Section */}
    {/* ======= Cta Section ======= */}
    <section id="cta" className="cta">
      <div className="container">
        <div className="row" data-aos="zoom-out">
          <div className="col-lg-9 text-center text-lg-start">
            <h3>Call To Action</h3>
            <p>
              {" "}
              Duis aute irure dolor in reprehenderit in voluptate velit esse
              cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
              cupidatat non proident, sunt in culpa qui officia deserunt mollit
              anim id est laborum.
            </p>
          </div>
          <div className="col-lg-3 cta-btn-container text-center">
            <a className="cta-btn align-middle" href="#">
              Call To Action
            </a>
          </div>
        </div>
      </div>
    </section>
    {/* End Cta Section */}
    {/* ======= Services Section ======= */}
    <section id="services" className="services">
      <div className="container">
        <div className="section-title" data-aos="zoom-out">
          <h2>Services</h2>
          <p>What we do offer</p>
        </div>
        <div className="row">
          <div className="col-lg-4 col-md-6">
            <div className="icon-box" data-aos="zoom-in-left">
              <div className="icon">
                <i className="bi bi-briefcase" style={{ color: "#ff689b" }} />
              </div>
              <h4 className="title">
                <a href="">Lorem Ipsum</a>
              </h4>
              <p className="description">
                Voluptatum deleniti atque corrupti quos dolores et quas
                molestias excepturi sint occaecati cupiditate non provident
              </p>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 mt-5 mt-md-0">
            <div
              className="icon-box"
              data-aos="zoom-in-left"
              data-aos-delay={100}
            >
              <div className="icon">
                <i className="bi bi-book" style={{ color: "#e9bf06" }} />
              </div>
              <h4 className="title">
                <a href="">Dolor Sitema</a>
              </h4>
              <p className="description">
                Minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                aliquip ex ea commodo consequat tarad limino ata
              </p>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 mt-5 mt-lg-0 ">
            <div
              className="icon-box"
              data-aos="zoom-in-left"
              data-aos-delay={200}
            >
              <div className="icon">
                <i
                  className="bi bi-card-checklist"
                  style={{ color: "#3fcdc7" }}
                />
              </div>
              <h4 className="title">
                <a href="">Sed ut perspiciatis</a>
              </h4>
              <p className="description">
                Duis aute irure dolor in reprehenderit in voluptate velit esse
                cillum dolore eu fugiat nulla pariatur
              </p>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 mt-5">
            <div
              className="icon-box"
              data-aos="zoom-in-left"
              data-aos-delay={300}
            >
              <div className="icon">
                <i className="bi bi-binoculars" style={{ color: "#41cf2e" }} />
              </div>
              <h4 className="title">
                <a href="">Magni Dolores</a>
              </h4>
              <p className="description">
                Excepteur sint occaecat cupidatat non proident, sunt in culpa
                qui officia deserunt mollit anim id est laborum
              </p>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 mt-5">
            <div
              className="icon-box"
              data-aos="zoom-in-left"
              data-aos-delay={400}
            >
              <div className="icon">
                <i className="bi bi-globe" style={{ color: "#d6ff22" }} />
              </div>
              <h4 className="title">
                <a href="">Nemo Enim</a>
              </h4>
              <p className="description">
                At vero eos et accusamus et iusto odio dignissimos ducimus qui
                blanditiis praesentium voluptatum deleniti atque
              </p>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 mt-5">
            <div
              className="icon-box"
              data-aos="zoom-in-left"
              data-aos-delay={500}
            >
              <div className="icon">
                <i className="bi bi-clock" style={{ color: "#4680ff" }} />
              </div>
              <h4 className="title">
                <a href="">Eiusmod Tempor</a>
              </h4>
              <p className="description">
                Et harum quidem rerum facilis est et expedita distinctio. Nam
                libero tempore, cum soluta nobis est eligendi
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
    {/* End Services Section */}
    {/* ======= Portfolio Section ======= */}
    <section id="portfolio" className="portfolio">
      <div className="container">
        <div className="section-title" data-aos="zoom-out">
          <h2>Portfolio</h2>
          <p>What we've done</p>
        </div>
        <ul
          id="portfolio-flters"
          className="d-flex justify-content-end"
          data-aos="fade-up"
        >
          <li data-filter="*" className="filter-active">
            All
          </li>
          <li data-filter=".filter-app">App</li>
          <li data-filter=".filter-card">Card</li>
          <li data-filter=".filter-web">Web</li>
        </ul>
        <div className="row portfolio-container" data-aos="fade-up">
          <div className="col-lg-4 col-md-6 portfolio-item filter-app">
            <div className="portfolio-img">
              <img
                src="assets/img/portfolio/portfolio-1.jpg"
                className="img-fluid"
                alt=""
              />
            </div>
            <div className="portfolio-info">
              <h4>App 1</h4>
              <p>App</p>
              <a
                href="assets/img/portfolio/portfolio-1.jpg"
                data-gallery="portfolioGallery"
                className="portfolio-lightbox preview-link"
                title="App 1"
              >
                <i className="bx bx-plus" />
              </a>
              <a
                href="portfolio-details.html"
                className="details-link"
                title="More Details"
              >
                <i className="bx bx-link" />
              </a>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 portfolio-item filter-web">
            <div className="portfolio-img">
              <img
                src="assets/img/portfolio/portfolio-2.jpg"
                className="img-fluid"
                alt=""
              />
            </div>
            <div className="portfolio-info">
              <h4>Web 3</h4>
              <p>Web</p>
              <a
                href="assets/img/portfolio/portfolio-2.jpg"
                data-gallery="portfolioGallery"
                className="portfolio-lightbox preview-link"
                title="Web 3"
              >
                <i className="bx bx-plus" />
              </a>
              <a
                href="portfolio-details.html"
                className="details-link"
                title="More Details"
              >
                <i className="bx bx-link" />
              </a>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 portfolio-item filter-app">
            <div className="portfolio-img">
              <img
                src="assets/img/portfolio/portfolio-3.jpg"
                className="img-fluid"
                alt=""
              />
            </div>
            <div className="portfolio-info">
              <h4>App 2</h4>
              <p>App</p>
              <a
                href="assets/img/portfolio/portfolio-3.jpg"
                data-gallery="portfolioGallery"
                className="portfolio-lightbox preview-link"
                title="App 2"
              >
                <i className="bx bx-plus" />
              </a>
              <a
                href="portfolio-details.html"
                className="details-link"
                title="More Details"
              >
                <i className="bx bx-link" />
              </a>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 portfolio-item filter-card">
            <div className="portfolio-img">
              <img
                src="assets/img/portfolio/portfolio-4.jpg"
                className="img-fluid"
                alt=""
              />
            </div>
            <div className="portfolio-info">
              <h4>Card 2</h4>
              <p>Card</p>
              <a
                href="assets/img/portfolio/portfolio-4.jpg"
                data-gallery="portfolioGallery"
                className="portfolio-lightbox preview-link"
                title="Card 2"
              >
                <i className="bx bx-plus" />
              </a>
              <a
                href="portfolio-details.html"
                className="details-link"
                title="More Details"
              >
                <i className="bx bx-link" />
              </a>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 portfolio-item filter-web">
            <div className="portfolio-img">
              <img
                src="assets/img/portfolio/portfolio-5.jpg"
                className="img-fluid"
                alt=""
              />
            </div>
            <div className="portfolio-info">
              <h4>Web 2</h4>
              <p>Web</p>
              <a
                href="assets/img/portfolio/portfolio-5.jpg"
                data-gallery="portfolioGallery"
                className="portfolio-lightbox preview-link"
                title="Web 2"
              >
                <i className="bx bx-plus" />
              </a>
              <a
                href="portfolio-details.html"
                className="details-link"
                title="More Details"
              >
                <i className="bx bx-link" />
              </a>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 portfolio-item filter-app">
            <div className="portfolio-img">
              <img
                src="assets/img/portfolio/portfolio-6.jpg"
                className="img-fluid"
                alt=""
              />
            </div>
            <div className="portfolio-info">
              <h4>App 3</h4>
              <p>App</p>
              <a
                href="assets/img/portfolio/portfolio-6.jpg"
                data-gallery="portfolioGallery"
                className="portfolio-lightbox preview-link"
                title="App 3"
              >
                <i className="bx bx-plus" />
              </a>
              <a
                href="portfolio-details.html"
                className="details-link"
                title="More Details"
              >
                <i className="bx bx-link" />
              </a>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 portfolio-item filter-card">
            <div className="portfolio-img">
              <img
                src="assets/img/portfolio/portfolio-7.jpg"
                className="img-fluid"
                alt=""
              />
            </div>
            <div className="portfolio-info">
              <h4>Card 1</h4>
              <p>Card</p>
              <a
                href="assets/img/portfolio/portfolio-7.jpg"
                data-gallery="portfolioGallery"
                className="portfolio-lightbox preview-link"
                title="Card 1"
              >
                <i className="bx bx-plus" />
              </a>
              <a
                href="portfolio-details.html"
                className="details-link"
                title="More Details"
              >
                <i className="bx bx-link" />
              </a>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 portfolio-item filter-card">
            <div className="portfolio-img">
              <img
                src="assets/img/portfolio/portfolio-8.jpg"
                className="img-fluid"
                alt=""
              />
            </div>
            <div className="portfolio-info">
              <h4>Card 3</h4>
              <p>Card</p>
              <a
                href="assets/img/portfolio/portfolio-8.jpg"
                data-gallery="portfolioGallery"
                className="portfolio-lightbox preview-link"
                title="Card 3"
              >
                <i className="bx bx-plus" />
              </a>
              <a
                href="portfolio-details.html"
                className="details-link"
                title="More Details"
              >
                <i className="bx bx-link" />
              </a>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 portfolio-item filter-web">
            <div className="portfolio-img">
              <img
                src="assets/img/portfolio/portfolio-9.jpg"
                className="img-fluid"
                alt=""
              />
            </div>
            <div className="portfolio-info">
              <h4>Web 3</h4>
              <p>Web</p>
              <a
                href="assets/img/portfolio/portfolio-9.jpg"
                data-gallery="portfolioGallery"
                className="portfolio-lightbox preview-link"
                title="Web 3"
              >
                <i className="bx bx-plus" />
              </a>
              <a
                href="portfolio-details.html"
                className="details-link"
                title="More Details"
              >
                <i className="bx bx-link" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
    {/* End Portfolio Section */}
    {/* ======= Testimonials Section ======= */}
    <section id="testimonials" className="testimonials">
      <div className="container">
        <div className="section-title" data-aos="zoom-out">
          <h2>Testimonials</h2>
          <p>What they are saying about us</p>
        </div>
        <div
          className="testimonials-slider swiper"
          data-aos="fade-up"
          data-aos-delay={100}
        >
          <div className="swiper-wrapper">
            <div className="swiper-slide">
              <div className="testimonial-item">
                <p>
                  <i className="bx bxs-quote-alt-left quote-icon-left" />
                  Proin iaculis purus consequat sem cure digni ssim donec
                  porttitora entum suscipit rhoncus. Accusantium quam, ultricies
                  eget id, aliquam eget nibh et. Maecen aliquam, risus at
                  semper.
                  <i className="bx bxs-quote-alt-right quote-icon-right" />
                </p>
                <img
                  src="assets/img/testimonials/testimonials-1.jpg"
                  className="testimonial-img"
                  alt=""
                />
                <h3>Saul Goodman</h3>
                <h4>Ceo &amp; Founder</h4>
              </div>
            </div>
            {/* End testimonial item */}
            <div className="swiper-slide">
              <div className="testimonial-item">
                <p>
                  <i className="bx bxs-quote-alt-left quote-icon-left" />
                  Export tempor illum tamen malis malis eram quae irure esse
                  labore quem cillum quid cillum eram malis quorum velit fore
                  eram velit sunt aliqua noster fugiat irure amet legam anim
                  culpa.
                  <i className="bx bxs-quote-alt-right quote-icon-right" />
                </p>
                <img
                  src="assets/img/testimonials/testimonials-2.jpg"
                  className="testimonial-img"
                  alt=""
                />
                <h3>Sara Wilsson</h3>
                <h4>Designer</h4>
              </div>
            </div>
            {/* End testimonial item */}
            <div className="swiper-slide">
              <div className="testimonial-item">
                <p>
                  <i className="bx bxs-quote-alt-left quote-icon-left" />
                  Enim nisi quem export duis labore cillum quae magna enim sint
                  quorum nulla quem veniam duis minim tempor labore quem eram
                  duis noster aute amet eram fore quis sint minim.
                  <i className="bx bxs-quote-alt-right quote-icon-right" />
                </p>
                <img
                  src="assets/img/testimonials/testimonials-3.jpg"
                  className="testimonial-img"
                  alt=""
                />
                <h3>Jena Karlis</h3>
                <h4>Store Owner</h4>
              </div>
            </div>
            {/* End testimonial item */}
            <div className="swiper-slide">
              <div className="testimonial-item">
                <p>
                  <i className="bx bxs-quote-alt-left quote-icon-left" />
                  Fugiat enim eram quae cillum dolore dolor amet nulla culpa
                  multos export minim fugiat minim velit minim dolor enim duis
                  veniam ipsum anim magna sunt elit fore quem dolore labore
                  illum veniam.
                  <i className="bx bxs-quote-alt-right quote-icon-right" />
                </p>
                <img
                  src="assets/img/testimonials/testimonials-4.jpg"
                  className="testimonial-img"
                  alt=""
                />
                <h3>Matt Brandon</h3>
                <h4>Freelancer</h4>
              </div>
            </div>
            {/* End testimonial item */}
            <div className="swiper-slide">
              <div className="testimonial-item">
                <p>
                  <i className="bx bxs-quote-alt-left quote-icon-left" />
                  Quis quorum aliqua sint quem legam fore sunt eram irure aliqua
                  veniam tempor noster veniam enim culpa labore duis sunt culpa
                  nulla illum cillum fugiat legam esse veniam culpa fore nisi
                  cillum quid.
                  <i className="bx bxs-quote-alt-right quote-icon-right" />
                </p>
                <img
                  src="assets/img/testimonials/testimonials-5.jpg"
                  className="testimonial-img"
                  alt=""
                />
                <h3>John Larson</h3>
                <h4>Entrepreneur</h4>
              </div>
            </div>
            {/* End testimonial item */}
          </div>
          <div className="swiper-pagination" />
        </div>
      </div>
    </section>
    {/* End Testimonials Section */}
    {/* ======= Pricing Section ======= */}
    <section id="pricing" className="pricing">
      <div className="container">
        <div className="section-title" data-aos="zoom-out">
          <h2>Pricing</h2>
          <p>Our Competing Prices</p>
        </div>
        <div className="row">
          <div className="col-lg-3 col-md-6">
            <div className="box" data-aos="zoom-in">
              <h3>Free</h3>
              <h4>
                <sup>$</sup>0<span> / month</span>
              </h4>
              <ul>
                <li>Aida dere</li>
                <li>Nec feugiat nisl</li>
                <li>Nulla at volutpat dola</li>
                <li className="na">Pharetra massa</li>
                <li className="na">Massa ultricies mi</li>
              </ul>
              <div className="btn-wrap">
                <a href="#" className="btn-buy">
                  Buy Now
                </a>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 mt-4 mt-md-0">
            <div
              className="box featured"
              data-aos="zoom-in"
              data-aos-delay={100}
            >
              <h3>Business</h3>
              <h4>
                <sup>$</sup>19<span> / month</span>
              </h4>
              <ul>
                <li>Aida dere</li>
                <li>Nec feugiat nisl</li>
                <li>Nulla at volutpat dola</li>
                <li>Pharetra massa</li>
                <li className="na">Massa ultricies mi</li>
              </ul>
              <div className="btn-wrap">
                <a href="#" className="btn-buy">
                  Buy Now
                </a>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 mt-4 mt-lg-0">
            <div className="box" data-aos="zoom-in" data-aos-delay={200}>
              <h3>Developer</h3>
              <h4>
                <sup>$</sup>29<span> / month</span>
              </h4>
              <ul>
                <li>Aida dere</li>
                <li>Nec feugiat nisl</li>
                <li>Nulla at volutpat dola</li>
                <li>Pharetra massa</li>
                <li>Massa ultricies mi</li>
              </ul>
              <div className="btn-wrap">
                <a href="#" className="btn-buy">
                  Buy Now
                </a>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 mt-4 mt-lg-0">
            <div className="box" data-aos="zoom-in" data-aos-delay={300}>
              <span className="advanced">Advanced</span>
              <h3>Ultimate</h3>
              <h4>
                <sup>$</sup>49<span> / month</span>
              </h4>
              <ul>
                <li>Aida dere</li>
                <li>Nec feugiat nisl</li>
                <li>Nulla at volutpat dola</li>
                <li>Pharetra massa</li>
                <li>Massa ultricies mi</li>
              </ul>
              <div className="btn-wrap">
                <a href="#" className="btn-buy">
                  Buy Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    {/* End Pricing Section */}
    {/* ======= F.A.Q Section ======= */}
    <section id="faq" className="faq">
      <div className="container">
        <div className="section-title" data-aos="zoom-out">
          <h2>F.A.Q</h2>
          <p>Frequently Asked Questions</p>
        </div>
        <ul className="faq-list">
          <li>
            <div
              data-bs-toggle="collapse"
              className="collapsed question"
              href="#faq1"
            >
              Non consectetur a erat nam at lectus urna duis?{" "}
              <i className="bi bi-chevron-down icon-show" />
              <i className="bi bi-chevron-up icon-close" />
            </div>
            <div id="faq1" className="collapse" data-bs-parent=".faq-list">
              <p>
                Feugiat pretium nibh ipsum consequat. Tempus iaculis urna id
                volutpat lacus laoreet non curabitur gravida. Venenatis lectus
                magna fringilla urna porttitor rhoncus dolor purus non.
              </p>
            </div>
          </li>
          <li>
            <div
              data-bs-toggle="collapse"
              href="#faq2"
              className="collapsed question"
            >
              Feugiat scelerisque varius morbi enim nunc faucibus a
              pellentesque? <i className="bi bi-chevron-down icon-show" />
              <i className="bi bi-chevron-up icon-close" />
            </div>
            <div id="faq2" className="collapse" data-bs-parent=".faq-list">
              <p>
                Dolor sit amet consectetur adipiscing elit pellentesque habitant
                morbi. Id interdum velit laoreet id donec ultrices. Fringilla
                phasellus faucibus scelerisque eleifend donec pretium. Est
                pellentesque elit ullamcorper dignissim. Mauris ultrices eros in
                cursus turpis massa tincidunt dui.
              </p>
            </div>
          </li>
          <li>
            <div
              data-bs-toggle="collapse"
              href="#faq3"
              className="collapsed question"
            >
              Dolor sit amet consectetur adipiscing elit pellentesque habitant
              morbi? <i className="bi bi-chevron-down icon-show" />
              <i className="bi bi-chevron-up icon-close" />
            </div>
            <div id="faq3" className="collapse" data-bs-parent=".faq-list">
              <p>
                Eleifend mi in nulla posuere sollicitudin aliquam ultrices
                sagittis orci. Faucibus pulvinar elementum integer enim. Sem
                nulla pharetra diam sit amet nisl suscipit. Rutrum tellus
                pellentesque eu tincidunt. Lectus urna duis convallis convallis
                tellus. Urna molestie at elementum eu facilisis sed odio morbi
                quis
              </p>
            </div>
          </li>
          <li>
            <div
              data-bs-toggle="collapse"
              href="#faq4"
              className="collapsed question"
            >
              Ac odio tempor orci dapibus. Aliquam eleifend mi in nulla?{" "}
              <i className="bi bi-chevron-down icon-show" />
              <i className="bi bi-chevron-up icon-close" />
            </div>
            <div id="faq4" className="collapse" data-bs-parent=".faq-list">
              <p>
                Dolor sit amet consectetur adipiscing elit pellentesque habitant
                morbi. Id interdum velit laoreet id donec ultrices. Fringilla
                phasellus faucibus scelerisque eleifend donec pretium. Est
                pellentesque elit ullamcorper dignissim. Mauris ultrices eros in
                cursus turpis massa tincidunt dui.
              </p>
            </div>
          </li>
          <li>
            <div
              data-bs-toggle="collapse"
              href="#faq5"
              className="collapsed question"
            >
              Tempus quam pellentesque nec nam aliquam sem et tortor consequat?{" "}
              <i className="bi bi-chevron-down icon-show" />
              <i className="bi bi-chevron-up icon-close" />
            </div>
            <div id="faq5" className="collapse" data-bs-parent=".faq-list">
              <p>
                Molestie a iaculis at erat pellentesque adipiscing commodo.
                Dignissim suspendisse in est ante in. Nunc vel risus commodo
                viverra maecenas accumsan. Sit amet nisl suscipit adipiscing
                bibendum est. Purus gravida quis blandit turpis cursus in
              </p>
            </div>
          </li>
          <li>
            <div
              data-bs-toggle="collapse"
              href="#faq6"
              className="collapsed question"
            >
              Tortor vitae purus faucibus ornare. Varius vel pharetra vel turpis
              nunc eget lorem dolor?{" "}
              <i className="bi bi-chevron-down icon-show" />
              <i className="bi bi-chevron-up icon-close" />
            </div>
            <div id="faq6" className="collapse" data-bs-parent=".faq-list">
              <p>
                Laoreet sit amet cursus sit amet dictum sit amet justo. Mauris
                vitae ultricies leo integer malesuada nunc vel. Tincidunt eget
                nullam non nisi est sit amet. Turpis nunc eget lorem dolor sed.
                Ut venenatis tellus in metus vulputate eu scelerisque.
                Pellentesque diam volutpat commodo sed egestas egestas fringilla
                phasellus faucibus. Nibh tellus molestie nunc non blandit massa
                enim nec.
              </p>
            </div>
          </li>
        </ul>
      </div>
    </section>
    {/* End F.A.Q Section */}
    {/* ======= Team Section ======= */}
    <section id="team" className="team">
      <div className="container">
        <div className="section-title" data-aos="zoom-out">
          <h2>Team</h2>
          <p>Our Hardworking Team</p>
        </div>
        <div className="row">
          <div className="col-lg-3 col-md-6 d-flex align-items-stretch">
            <div className="member" data-aos="fade-up">
              <div className="member-img">
                <img
                  src="assets/img/team/team-1.jpg"
                  className="img-fluid"
                  alt=""
                />
                <div className="social">
                  <a href="">
                    <i className="bi bi-twitter" />
                  </a>
                  <a href="">
                    <i className="bi bi-facebook" />
                  </a>
                  <a href="">
                    <i className="bi bi-instagram" />
                  </a>
                  <a href="">
                    <i className="bi bi-linkedin" />
                  </a>
                </div>
              </div>
              <div className="member-info">
                <h4>Walter White</h4>
                <span>Chief Executive Officer</span>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 d-flex align-items-stretch">
            <div className="member" data-aos="fade-up" data-aos-delay={100}>
              <div className="member-img">
                <img
                  src="assets/img/team/team-2.jpg"
                  className="img-fluid"
                  alt=""
                />
                <div className="social">
                  <a href="">
                    <i className="bi bi-twitter" />
                  </a>
                  <a href="">
                    <i className="bi bi-facebook" />
                  </a>
                  <a href="">
                    <i className="bi bi-instagram" />
                  </a>
                  <a href="">
                    <i className="bi bi-linkedin" />
                  </a>
                </div>
              </div>
              <div className="member-info">
                <h4>Sarah Jhonson</h4>
                <span>Product Manager</span>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 d-flex align-items-stretch">
            <div className="member" data-aos="fade-up" data-aos-delay={200}>
              <div className="member-img">
                <img
                  src="assets/img/team/team-3.jpg"
                  className="img-fluid"
                  alt=""
                />
                <div className="social">
                  <a href="">
                    <i className="bi bi-twitter" />
                  </a>
                  <a href="">
                    <i className="bi bi-facebook" />
                  </a>
                  <a href="">
                    <i className="bi bi-instagram" />
                  </a>
                  <a href="">
                    <i className="bi bi-linkedin" />
                  </a>
                </div>
              </div>
              <div className="member-info">
                <h4>William Anderson</h4>
                <span>CTO</span>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 d-flex align-items-stretch">
            <div className="member" data-aos="fade-up" data-aos-delay={300}>
              <div className="member-img">
                <img
                  src="assets/img/team/team-4.jpg"
                  className="img-fluid"
                  alt=""
                />
                <div className="social">
                  <a href="">
                    <i className="bi bi-twitter" />
                  </a>
                  <a href="">
                    <i className="bi bi-facebook" />
                  </a>
                  <a href="">
                    <i className="bi bi-instagram" />
                  </a>
                  <a href="">
                    <i className="bi bi-linkedin" />
                  </a>
                </div>
              </div>
              <div className="member-info">
                <h4>Amanda Jepson</h4>
                <span>Accountant</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    {/* End Team Section */}
    {/* ======= Contact Section ======= */}
    <section id="contact" className="contact">
      <div className="container">
        <div className="section-title" data-aos="zoom-out">
          <h2>Contact</h2>
          <p>Contact Us</p>
        </div>
        <div className="row mt-5">
          <div className="col-lg-4" data-aos="fade-right">
            <div className="info">
              <div className="address">
                <i className="bi bi-geo-alt" />
                <h4>Location:</h4>
                <p>A108 Adam Street, New York, NY 535022</p>
              </div>
              <div className="email">
                <i className="bi bi-envelope" />
                <h4>Email:</h4>
                <p>info@example.com</p>
              </div>
              <div className="phone">
                <i className="bi bi-phone" />
                <h4>Call:</h4>
                <p>+1 5589 55488 55s</p>
              </div>
            </div>
          </div>
          <div className="col-lg-8 mt-5 mt-lg-0" data-aos="fade-left">
            <form
              action="forms/contact.php"
              method="post"
              role="form"
              className="php-email-form"
            >
              <div className="row">
                <div className="col-md-6 form-group">
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    id="name"
                    placeholder="Your Name"
                    required=""
                  />
                </div>
                <div className="col-md-6 form-group mt-3 mt-md-0">
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    id="email"
                    placeholder="Your Email"
                    required=""
                  />
                </div>
              </div>
              <div className="form-group mt-3">
                <input
                  type="text"
                  className="form-control"
                  name="subject"
                  id="subject"
                  placeholder="Subject"
                  required=""
                />
              </div>
              <div className="form-group mt-3">
                <textarea
                  className="form-control"
                  name="message"
                  rows={5}
                  placeholder="Message"
                  required=""
                  defaultValue={""}
                />
              </div>
              <div className="my-3">
                <div className="loading">Loading</div>
                <div className="error-message" />
                <div className="sent-message">
                  Your message has been sent. Thank you!
                </div>
              </div>
              <div className="text-center">
                <button type="submit">Send Message</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
    {/* End Contact Section */}
  </main>
  {/* End #main */}
  {/* ======= Footer ======= */}
  <footer id="footer">
    <div className="container">
      <h3>Selecao</h3>
      <p>
        Et aut eum quis fuga eos sunt ipsa nihil. Labore corporis magni eligendi
        fuga maxime saepe commodi placeat.
      </p>
      <div className="social-links">
        <a href="#" className="twitter">
          <i className="bx bxl-twitter" />
        </a>
        <a href="#" className="facebook">
          <i className="bx bxl-facebook" />
        </a>
        <a href="#" className="instagram">
          <i className="bx bxl-instagram" />
        </a>
        <a href="#" className="google-plus">
          <i className="bx bxl-skype" />
        </a>
        <a href="#" className="linkedin">
          <i className="bx bxl-linkedin" />
        </a>
      </div>
      <div className="copyright">
        © Copyright{" "}
        <strong>
          <span>Selecao</span>
        </strong>
        . All Rights Reserved
      </div>
      <div className="credits">
        {/* All the links in the footer should remain intact. */}
        {/* You can delete the links only if you purchased the pro version. */}
        {/* Licensing information: https://bootstrapmade.com/license/ */}
        {/* Purchase the pro version with working PHP/AJAX contact form: https://bootstrapmade.com/selecao-bootstrap-template/ */}
        Designed by <a href="https://bootstrapmade.com/">BootstrapMade</a>
      </div>
    </div>
  </footer>
  {/* End Footer */}
  <a
    href="#"
    className="back-to-top d-flex align-items-center justify-content-center"
  >
    <i className="bi bi-arrow-up-short" />
  </a>
  {/* Vendor JS Files */}
  {/* Template Main JS File */}
</>

    </>
  )
};

export default LandingPage;