import React, { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ProjectCard from "./ProjectCard";
import { allProjectAPI } from "../services/allAPIs";

function Project() {
  const [searchKey, setSearchKey] = useState('');
  console.log(searchKey);


  const [allProject, setAllProject] = useState([]);

  //api call fn
  const getAllProjects = async () => {
    //get token
    const token = sessionStorage.getItem("token");
    console.log(token);
    if (token) {
      const reqHeader = {
        "Content-Type": "multipart/form-data",
        "Authorization": `Bearer ${token}`
      }

      try {
        const result = await allProjectAPI(searchKey,reqHeader);
        console.log(result);
        if(result.status === 200) {
          setAllProject(result.data);
          console.log(allProject);
        } else {
          alert("Failed to get project");
        }
      } catch (error) {
        alert("Error getting project" + error.message);
      }
    }
  };

  useEffect(() => {
    getAllProjects();
  }, [searchKey]);

  return (
    <div>
      <div className="container">
        <h2 className="text-center m-4">All Projects</h2>
        <div className="d-flex justify-content-center w-100">
          <div className="d-flex border rounded w-50 mb-5 p-2 bg-white">
            <input
              type="text"
              onChange={e=>setSearchKey(e.target.value)}
              className="border border-0 form-control"
              placeholder="Search by technology"
            />
            <i class="fs-4 fa-solid fa-magnifying-glass bg-white"></i>
            {/* <i style={{marginLeft:'-30px'}} class=" fs-3 mt-1 me-5 fs-4 fa-solid fa-magnifying-glass bg-white"></i>    by miss*/}
          </div>
        </div>
        <Row>
          {
          allProject.length>0?allProject.map((item, index) => (
              <Col key={index}>
                <ProjectCard project={item}/>
              </Col>
            )):<div>No project found</div>
           }
        </Row>
      </div>
    </div>
  );
}

export default Project;
