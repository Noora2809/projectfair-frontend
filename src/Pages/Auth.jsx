import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginAPI, registerAPI } from "../services/allAPIs";
import { MDBContainer, MDBNavbar, MDBNavbarBrand } from "mdb-react-ui-kit";

function Auth({ register }) {
  const isRegisterForm = register ? true : false;

  const location = useNavigate();

  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const registerData = async () => {
    //console.log(userData);
    const { username, email, password } = userData;
    if (!username || !email || !password) {
      alert("Please fill the form");
    } else {
      const result = await registerAPI(userData);
      console.log(result);

      if (result.status == 200) {
        alert(result.data);
        location("/login");
      } else {
        alert(result.response.data);
      }
    }
    console.log(userData);
  };

  const loginData = async () => {
    const { email, password } = userData;
    if (!email || !password) {
      alert("Please fill the form");
    } else {
      const result = await loginAPI(userData);
      console.log(result);
      if (result.status == 200) {
        // alert(result.data)
        alert("Login successful");
        sessionStorage.setItem(
          "existingUser",
          JSON.stringify(result.data.user)
        );
        sessionStorage.setItem("token", result.data.token);
        location("/dashboard");
      } else {
        // alert(result.response.data)
        alert("Invalid user data");
      }
    }
  };

  return (
    <div>
      <MDBNavbar light bgColor="dark">
        <MDBContainer fluid>
          <MDBNavbarBrand href="/" className="text-white">
            <i class="fa-solid fs-3 fa-laptop m-2"></i>
            Project Fair
          </MDBNavbarBrand>
        </MDBContainer>
      </MDBNavbar>
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ width: "100%", height: "700px" }}
      >
        <div className="container">
          <div>
            <div className="row">
              <div className="col-6">
                {/* image */}
                <img
                  width={"100%"}
                  height={"500px"}
                  src="https://cdni.iconscout.com/illustration/premium/thumb/login-3305943-2757111.png?f=webp"
                  alt=""
                />
              </div>
              <div className="col-6 border border-2 p-2">
                {/* content */}
                <h2 className="text-center text-white">PROJECT FAIR</h2>
                <h5 className="text-center text-warning">
                  {isRegisterForm ? "Register here" : "Login here"}
                </h5>
                <form className="p-5">
                  {isRegisterForm && (
                    <input
                      type="text"
                      value={userData.username}
                      onChange={(e) =>
                        setUserData({ ...userData, username: e.target.value })
                      }
                      placeholder="Username"
                      className="form-control mb-3"
                    />
                  )}
                  <input
                    type="text"
                    value={userData.email}
                    onChange={(e) =>
                      setUserData({ ...userData, email: e.target.value })
                    }
                    placeholder="Email"
                    className="form-control mb-3"
                  />
                  <input
                    type="text"
                    value={userData.password}
                    onChange={(e) =>
                      setUserData({ ...userData, password: e.target.value })
                    }
                    placeholder="Password"
                    className="form-control mb-3"
                  />
                </form>
                {isRegisterForm ? (
                  <div className="text-center m-3">
                    <button onClick={registerData} className="btn btn-success ">
                      Register
                    </button>
                    <Link
                      className="mt-5"
                      style={{ textDecoration: "none", color: "white" }}
                      to={"/login"}
                    >
                      <p className="mt-4">
                        Already registered?Please login from here....
                      </p>
                    </Link>
                  </div>
                ) : (
                  <div className="text-center m-3">
                    <button onClick={loginData} className="btn btn-danger">
                      Login
                    </button>
                    <Link
                      className="mt-5"
                      style={{ textDecoration: "none", color: "white" }}
                      to={"/register"}
                    >
                      <p className="mt-4">New to here?Please register...</p>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="text-center mt-4 ">
            <Link to={"/"}>
              <button className="btn btn-dark">Go Back</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Auth;
