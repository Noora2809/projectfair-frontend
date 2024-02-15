import React, { useContext, useEffect } from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { baseUrl } from "../services/baseUrl";
import { updateUserProjectAPI } from "../services/allAPIs";
import { editUserProjectContextResponse } from "../ContextAPI/ContextShare";

function EditProject({ project }) {

  const { editUserProjectRes, setEditUserProjectRes } = useContext(editUserProjectContextResponse)

  console.log(project);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //for holding project details
  const [projectDetails, setProjectDetails] = useState({
    id: project._id,
    title: project.title,
    language: project.language,
    github: project.github,
    link: project.link,
    overview: project.overview,
    projectImage: "",
  });

  //to hold image file data converted into url
  const [preview, setPreview] = useState("");

  useEffect(() => {
    if (projectDetails.projectImage) {
      setPreview(URL.createObjectURL(projectDetails.projectImage));
    }
  }, [projectDetails.projectImage]);

  console.log(projectDetails);

  const updateProject = async () => {
    const { id, title, language, github, link, overview, projectImage } =
      projectDetails;

    // if(!title || !language || !github || !link || !overview || !projectImage){
    //   alert("Please fill the form")

    // }
    // else{
    const reqBody = new FormData();
    reqBody.append("title", title);
    reqBody.append("language", language);
    reqBody.append("github", github);
    reqBody.append("link", link);
    reqBody.append("overview", overview);
    preview
      ? reqBody.append("projectImage", projectImage)
      : reqBody.append("projectImage", project.projectImage);

    //get token

    const token = sessionStorage.getItem("token");
    console.log(token);

    if (preview) {
      const reqHeader = {
        "Content-Type": "multipart/form-data", //req contains image file
        "Authorization": `Bearer ${token}`
      }
      //api call
      const result = await updateUserProjectAPI(id, reqBody, reqHeader);
      console.log(result);
      if (result.status == 200) {
        console.log(result.data); //success
        setEditUserProjectRes(result.data)
        alert("Pr0ject updated successfully")
        handleClose()

      }
      else{
        console.log(result.response.data); //error
        setEditUserProjectRes(result.response.data)
      }
    // }
    }
    else{
      const reqHeader = {
        "Content-Type": "application/json", //req contains image file
        "Authorization": `Bearer ${token}`
      }
      //api call
      const result = await updateUserProjectAPI(id, reqBody, reqHeader);
      console.log(result);
      if (result.status == 200) {
        console.log(result.data); //success
        setEditUserProjectRes(result.data)
        alert("Project updated successfully")
        handleClose()
      }
      else{
        console.log(result.response.data); //error
        setEditUserProjectRes(result.response.data)
      }
    }
  }

  return (
    <div>
      <button onClick={handleShow} className="btn">
        <i className="fa-solid fa-pen"></i>
      </button>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Project Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex justify-content-evenly ">
            <label>
              <input
                onChange={(e) =>
                  setProjectDetails({
                    ...projectDetails,
                    projectImage: e.target.files[0],
                  })
                }
                type="file"
                style={{ display: "none" }}
              />
              <img
                width={"200px"}
                height={"200px"}
                src={
                  preview
                    ? preview
                    : `${baseUrl}/uploads/${project.projectImage}`
                }
                alt=""
              />
            </label>
            <div className="ms-5">
              <input
                type="text"
                value={projectDetails.title}
                onChange={(e) =>
                  setProjectDetails({
                    ...projectDetails,
                    title: e.target.value,
                  })
                }
                placeholder="Project Title"
                className="form-control mb-2"
              />
              <input
                type="text"
                value={projectDetails.language}
                onChange={(e) =>
                  setProjectDetails({
                    ...projectDetails,
                    language: e.target.value,
                  })
                }
                placeholder="Language Used"
                className="form-control mb-2"
              />
              <input
                type="text"
                value={projectDetails.github}
                onChange={(e) =>
                  setProjectDetails({
                    ...projectDetails,
                    github: e.target.value,
                  })
                }
                placeholder="Github"
                className="form-control mb-2"
              />
              <input
                type="text"
                value={projectDetails.link}
                onChange={(e) =>
                  setProjectDetails({ ...projectDetails, link: e.target.value })
                }
                placeholder="Website Link"
                className="form-control mb-2"
              />
              <input
                type="text"
                value={projectDetails.overview}
                onChange={(e) =>
                  setProjectDetails({
                    ...projectDetails,
                    overview: e.target.value,
                  })
                }
                placeholder="Project Overview"
                className="form-control mb-2"
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={updateProject}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default EditProject;
