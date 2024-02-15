import React, { useContext, useEffect } from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import img from '../assets/img2'
import { addProjectAPI } from "../services/allAPIs";
import { addProjectContextResponse } from "../ContextAPI/ContextShare";

function AddProject() {

  const { addProjectRes,setAddProjectRes } = useContext(addProjectContextResponse)
  //to hold token form sessionstorage
  const [token,setToken] = useState("")

  useEffect(()=>{
    if(sessionStorage.getItem("token")){
      setToken(sessionStorage.getItem("token"))
    }
  },[])


  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
//for holding project details
  const [projectDetails, setProjectDetails] = useState({
    title:'', language:'',github:'',link:'',overview:'',projectImage:''
  })

  //to hold image file data converted into url
  const [preview, setPreview] = useState("");

  useEffect(()=>{
    if(projectDetails.projectImage){
      setPreview(URL.createObjectURL(projectDetails.projectImage))
    }
  },[projectDetails.projectImage])

  console.log(preview);

  console.log(projectDetails);

  const projectAdd = async()=>{
    const{title,language,github,link,overview,projectImage} = projectDetails

    if(!title || !language || !github || !link || !overview || !projectImage){
      alert("Please fill the form")
    }
    else{
      const reqBody = new FormData()
      reqBody.append("title",title)
      reqBody.append("language",language)
      reqBody.append("github",github)
      reqBody.append("link",link)
      reqBody.append("overview",overview)
      reqBody.append("projectImage",projectImage)

        const reqHeader = {
          "Content-Type": "multipart/form-data", //req contains image file
          "Authorization":`Bearer ${token}`
        }    
      
    
    //api call
    const result = await addProjectAPI(reqBody,reqHeader)
    console.log(result);

    if(result.status === 200){
      alert("Project added successfully...")
      setAddProjectRes(result.data)//contextAPI state value assigned
      console.log(result.data);
      handleClose()
      setProjectDetails({
        title:'', language:'',github:'',link:'',overview:'',projectImage:''
      })
      setPreview("") //make empty
    }
    else{
      console.log(result.response.data);
    }
  }
  }

  return (
    <div>
      <button onClick={handleShow} className="btn btn-warning">
        Add project
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
                <input onChange={e=>setProjectDetails({...projectDetails,projectImage:e.target.files[0]})} type="file"  style={{display:'none'}}/>
                <img width={'200px'} height={'200px'} src={preview?preview:img} alt="" />
            </label>
            <div className="ms-5">
                <input type="text" value={projectDetails.title} onChange={e=>setProjectDetails({...projectDetails,title:e.target.value})} placeholder="Project Title" className="form-control mb-2"/>
                <input type="text" value={projectDetails.language} onChange={e=>setProjectDetails({...projectDetails,language:e.target.value})} placeholder="Language Used" className="form-control mb-2"/>
                <input type="text" value={projectDetails.github} onChange={e=>setProjectDetails({...projectDetails,github:e.target.value})} placeholder="Github" className="form-control mb-2"/>
                <input type="text" value={projectDetails.link} onChange={e=>setProjectDetails({...projectDetails,link:e.target.value})} placeholder="Website Link" className="form-control mb-2"/>
                <input type="text" value={projectDetails.overview} onChange={e=>setProjectDetails({...projectDetails,overview:e.target.value})} placeholder="Project Overview" className="form-control mb-2"/>


            </div>
            </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={projectAdd}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default AddProject;
