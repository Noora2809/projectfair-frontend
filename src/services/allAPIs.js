import { baseUrl } from "./baseUrl";
import { commonAPI } from "./commonAPI";

//1.Register api call
export const registerAPI = async(user)=>{
    return await commonAPI("post",`${baseUrl}/register`,user,"")
}

//2.Login api call
export const loginAPI = async(user)=>{
    return await commonAPI("post",`${baseUrl}/login`,user,"")
}

//3.Add project api call
export const addProjectAPI = async(reqBody,reqHeader)=>{
    return await commonAPI("post",`${baseUrl}/project/add`,reqBody,reqHeader)
}

export const homeProjectAPI = async() =>{
    return await commonAPI("get",`${baseUrl}/project/home-project`,"","")
}

export const allProjectAPI = async(searchKey,reqHeader)=>{
    return await commonAPI("get", `${baseUrl}/project/all-project?search=${searchKey}`,"",reqHeader)
}

export const userProjectAPI = async(reqHeader)=>{
    return await commonAPI("get", `${baseUrl}/project/all-user-projects`,"",reqHeader)
}

export const updateUserProjectAPI = async(projectId,reqBody,reqHeader)=>{
    return await commonAPI("put", `${baseUrl}/project/update-project/${projectId}`,reqBody,reqHeader)
}

//delete project api call
export const deleteUserProjectAPI = async(projectId,reqHeader)=>{
    return await commonAPI("delete", `${baseUrl}/project/delete-project/${projectId}`,{},reqHeader)
}


