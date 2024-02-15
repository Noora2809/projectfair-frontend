import React, { useEffect, useState } from "react";
import TitleImage from "../assets/image";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ProjectCard from "./ProjectCard";
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand
} from 'mdb-react-ui-kit';

import { Link } from "react-router-dom";
import { homeProjectAPI } from "../services/allAPIs";
function Home() {
  //api call to get home project details
  const [homeProject, setHomeProject] = useState([]); //to hold home project details

  const getHomeProject=async()=>{
    const result = await homeProjectAPI()
    console.log(result);
    if(result.status===200) {
      setHomeProject(result.data);
      console.log(homeProject);
    } else {
      console.log("Api fetching project details failed");
    }
  }

  useEffect(() => {
    getHomeProject()
  },[])


  return (
    <div>
      <MDBNavbar light bgColor='dark'>
        <MDBContainer fluid>
          <MDBNavbarBrand href='/' className='text-white'>
          <i class="fa-solid fs-3 fa-laptop m-2"></i>
            Project Fair
          </MDBNavbarBrand>
        </MDBContainer>
      </MDBNavbar>
      <div className="container p-2">
        <div className="row">
          <div className="col-6">
            {/* content */}
            <h1 className="text-center m-4">Project Fair</h1>
            <p style={{ textAlign: "justify" }}>
              Project management focuses on planning and organizing a project
              and its resources. This includes identifying and managing the
              lifecycle to be used, applying it to the user-centered design
              process, formulating the project team, and efficiently guiding the
              team through all phases until project completion.
            </p>
            <div className="text-center">
              <Link to={"/login"}>
                <button className="btn btn-primary btn-lg px-5 text-white rounded-pill m-4">
                  Get Started
                </button>
              </Link>
            </div>
          </div>

          <div className="col-6">
            {/* image */}
            <img src={TitleImage} alt="" />
          </div>
        </div>

        <div className="row">
          <div className="col">
            <h1 className="text-center">Explore Projects</h1>
            <marquee>
              <Row>
                {
                homeProject.length>0?homeProject.map(item=>(
                      <Col>
                        <ProjectCard project={item} />
                      </Col>
                    )):"empty array"
                  }
              </Row>
            </marquee>
          </div>
        </div>

        
      </div>
    </div>
  );
}

export default Home;


