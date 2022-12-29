import React, { useState, useEffect } from "react";
import { getUserById, updateUser } from "../../ApiCall/userApiCall";
import { useNavigate } from "react-router-dom";
import "./css/loginsignup.css";
const Profile = () => {
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  const isLogin = async () => {
    const user1 = JSON.parse(sessionStorage.getItem("userDetails"));
    if (!user1) {
      navigate("/login");
    }

    const getUser = await getUserById(user1._id);
    setUser(getUser.data);
  };
  useEffect(() => {
    isLogin();
  }, []);
  const [isMessage, setIsMessage] = useState(false);
  const [message, setMessage] = useState();

  const Logout = async (e) => {
    e.preventDefault();
    const user2 = JSON.parse(sessionStorage.getItem("userDetails"));
    console.log(user2);
    if (user2) {
      sessionStorage.removeItem("userDetails");
      navigate("/login");
    }
  };

  const [userData, setUserData] = useState({
    fullName: user.fullName,
    password: user.password,
  });
  let name, value;
  const handleInputs = (e) => {
    name = e.target.name;
    value = e.target.value;
    setUserData({ ...userData, [name]: value });
  };
  const Update = async (e) => {
    e.preventDefault();
    const res = await updateUser(userData);
    console.log(res);
    if (res.status === 200) {
      setIsMessage(true);
      setMessage(res.message);
    }
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <a className="navbar-brand ml-4" href="/">
          {user.fullName}
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mr">
            <li className="nav-item ">
              <a className="nav-link" href="/">
                Home<span className="sr-only">(current)</span>
              </a>
            </li>
            <li className="nav-item ">
              <a className="nav-link" href="/logout" onClick={Logout}>
                Logout<span className="sr-only">(current)</span>
              </a>
            </li>
          </ul>
        </div>
      </nav>

      <div className="container">
        <div className="loginsignup">
          <div className="row">
            <div className="col-md-5">
              <div className="signup">
                <div className="login-head">Edit Profile</div>
                <form className="from" method="POST">
                  <div className="form-group">
                    <input
                      type="text"
                      placeholder="Full Name"
                      className="form-control"
                      value={userData.fullName || user.fullName}
                      onChange={handleInputs}
                      name="fullName"
                    ></input>
                  </div>
                  <div className="form-group">
                    <input
                      type="password"
                      placeholder="Password"
                      className="form-control"
                      value={userData.password || user.fullName}
                      onChange={handleInputs}
                      name="password"
                    ></input>
                  </div>
                  {isMessage ? (
                    <div className="form-group">
                      <p className="error-msg">{message}</p>
                    </div>
                  ) : (
                    ""
                  )}
                  <div className="form-group signupbtn">
                    <input
                      type="submit"
                      className="btn btn-primary form-control"
                      value="Update"
                      onClick={Update}
                    ></input>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Profile;
