import React, { useContext, useEffect, useState } from "react";
import AddProject from "./AddProject";
import { deleteUserProjectAPI, userProjectAPI } from "../services/allAPIs";
import Row from "react-bootstrap/esm/Row";
import { addProjectContextResponse } from "../ContextAPI/ContextShare";
import EditProject from "./EditProject";
import { editUserProjectContextResponse } from "../ContextAPI/ContextShare";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function MyProject() {
  const [userProjects, setUserProject] = useState([]);
  const { addProjectRes, setAddProjectRes } = useContext(
    addProjectContextResponse
  );
  const { editUserProjectRes, setEditProjectRes } = useContext(
    editUserProjectContextResponse
  );

  const userProject = async () => {
    //get token
    const token = sessionStorage.getItem("token");
    console.log(token);
    if (token) {
      const reqHeader = {
        "Content-Type": "multipart/form-data",
        "Authorization": `Bearer ${token}`
      };

      try {
        const result = await userProjectAPI(reqHeader);
        console.log(result);
        setUserProject(result.data);
        console.log(userProjects);
      } catch (error) {
        alert("Error getting project" + error.message);
      }
    }
  };

  useEffect(() => {
    userProject();
  }, [addProjectRes, setEditProjectRes]);

  const deleteProject = async (pid) => {
    const token = sessionStorage.getItem("token");
    if (token) {
      const reqHeader = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      };

      const result = await deleteUserProjectAPI(pid, reqHeader);
      console.log(result);
      userProject();
      toast.error("User project deleted successfully");
      // alert("user project deleted successfully")
    }
  };

  return (
    <div className="container">
      <div className="d-flex mt-5">
        <h3 className="">My Projects</h3>
        <div className="ms-auto">
          <AddProject />
          {/* Add project Component */}
        </div>
      </div>

      <div className="d-flex my-5 align-items-center justify-content-between border p-3 ">
        <Row>
          {userProjects.length > 0
            ? userProjects.map((item) => (
                <div className="d-flex justify-content-between align-items-center">
                  <h4>{item.title}</h4>

                  <div>
                    <button className="btn">
                      <EditProject project={item} />
                    </button>
                    <a href={item?.github} target="_blank" className="btn">
                      <i className="fa-brands fa-github"></i>
                    </a>
                    <button
                      onClick={() => deleteProject(item?._id)}
                      className="btn"
                    >
                      <i className="fa-solid  fa-trash"></i>
                    </button>
                  </div>
                </div>
              ))
            : "Cant fetch"}
        </Row>

      </div>
      <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
    </div>
  );
}

export default MyProject;
