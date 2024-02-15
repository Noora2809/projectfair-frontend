import React from 'react'
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import MyProject from '../Components/MyProject';
import MyProfile from '../Components/MyProfile';
import { Link } from "react-router-dom";
import Header from '../Components/Header';

function Dashboard() {
  const existingUser = JSON.parse(sessionStorage.getItem("existingUser"))
  console.log(existingUser);
  return (

    <div className=''>
            <Header/>
      <div className='m-5'>
        <Row>
          <h2 className='m-5'>Welcome <span className='text-primary'>{existingUser.username}</span> </h2>
          <Col>
          {/* My Projects */}
          <MyProject/>
          </Col>
          <Col>
          {/* My Profile */}
          <MyProfile/>
          </Col>
        </Row>
        <Link to={"/project"}>
          <div className="text-center">
            <button className="btn btn-primary btn-lg px-5 text-white rounded-pill shadow m-5">
              View projects
            </button>
            </div>
        </Link>
      </div>
    </div>
  )
}

export default Dashboard