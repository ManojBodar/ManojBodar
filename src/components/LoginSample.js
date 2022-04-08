import { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { ApiPost } from "../../helpers/API/ApiData";
import * as authUtil from "../../utils/auth.util";
import * as userUtil from "../../utils/user.util";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../Auth/Login.scss";
import { useHistory } from "react-router";
export default function Login() {
    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
        });
    }, []);
    const history = useHistory();
    const [loginData, setLoginData] = useState({});
    const [errors, setErrors] = useState({});
    const [loader, setLoader] = useState(false);
    const regexEmail =
        /^(([^<>()[\],;:\s@]+([^<>()[\],;:\s@]+)*)|(.+))@(([^<>()[\],;:\s@]+)+[^<>()[\],;:\s@]{2,})$/i;
    const handleChange = (e) => {
        setLoginData({ ...loginData, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: "" });
    };
    const handleSubmit = async (e) => {
        setLoader(true);
        e.preventDefault();
        if (!loginData.email && !loginData.password) {
            setErrors({
                email: "Email address must be required*",
                password: "Password must be required*",
            });
        } else if (loginData.email === "" && loginData.password === "") {
            setErrors({ ...errors, email: "Email address must be required*" });
        } else if (!loginData.email || loginData.email === "") {
            setErrors({ ...errors, email: "Email address must be required*" });
        } else if (!loginData.email || regexEmail.test(loginData.email) === false) {
            setErrors({ ...errors, email: "Email is not valid*" });
        } else if (!loginData.password || loginData.password === "") {
            setErrors({ ...errors, password: "Password must be required*" });
        } else {
            loginData.email = loginData.email.toLowerCase();
            await ApiPost("login", loginData)
                .then((res) => {
                    console.log("login res", res?.message);
                    if (res?.data?.message === "Successfully logged in.") {
                        authUtil.setToken(res?.data?.data?.token);
                        userUtil.setUserInfo(res?.data?.data);
                        history.push("/");
                        window.location.reload();
                        setTimeout(function () {
                            toast.success("Login successful");
                        }, 300);
                    } else if (res.data.msg === "User does not exist.") {
                        setErrors({ user: "User does not exist." });
                    } else if (
                        res?.data?.msg === "IP Address is changed. Please login with otp."
                    ) {
                        history.push("/verifyotp");
                        loginData.email = loginData.email.toLowerCase();
                        loginData.isForgot = true;
                        ApiPost("verifyEmail", loginData)
                            .then((res) => {
                                if (res.status === 200) {
                                    setErrors({});
                                    toast.info("Enter OTP which is sent on your Email.");
                                    localStorage.setItem("forpassEmail", res.data.req.email);
                                }
                            })
                            .catch((err) => {
                                console.log(err.response);
                                setErrors({ user: "Please Enter Registed Email" });
                            });
                    }
                    //  else if(){
                    // }
                    else {
                        setErrors({
                            user: "Please check login credentials.",
                        });
                    }
                })
                .catch((err) => {
                    console.log("err--------->", err);
                });
        }
        setLoader(false);
    };
    function useKey(key, cb) {
        const callback = useRef(cb);
        useEffect(() => {
            callback.current = cb;
        });
        useEffect(() => {
            function handle(event) {
                if (event.code === key) {
                    callback.current(event);
                }
            }
            document.addEventListener("keypress", handle);
            return () => document.removeEventListener("keypress", handle);
        }, [key]);
    }
    useKey("Enter", handleSubmit);
    return (
        <div>
            <ToastContainer />
            <div className="login-form-section-align">
                <div className="login-banner">
                    <div className="container">
                        <div className="login-grid">
                            <div className="login-grid-items">
                                <div className="page-title">
                                    <h1>Log in</h1>
                                </div>
                                <div className="error-msg">{errors["user"]}</div>
                                <div className="form-control form-bottom-align">
                                    <label>Email</label>
                                    <input
                                        autoComplete="off"
                                        type="email"
                                        placeholder="Enter email"
                                        name="email"
                                        value={
                                            loginData.email?.toLowerCase() &&
                                            loginData.email?.toLowerCase()
                                        }
                                        onChange={(e) => {
                                            handleChange(e);
                                        }}
                                    />
                                    <span className="spanError">{errors.email}</span>
                                </div>
                                <div className="form-control form-bottom-align">
                                    <label>Password</label>
                                    <input
                                        type="password"
                                        placeholder="*******"
                                        name="password"
                                        value={loginData.password && loginData.password}
                                        onChange={(e) => handleChange(e)}
                                    />
                                    <span className="spanError">{errors.password}</span>
                                    <div className="forgot-password">
                                        <NavLink to="/forgot-password">
                                            <span>Forgot password?</span>
                                        </NavLink>
                                    </div>
                                </div>
                                <div className="login-in-button">
                                    <button onClick={handleSubmit}>
                                        <div className="signup-loader">
                                            <div> Log In</div>
                                            <div className="loader-styles">
                                                {loader && <div className="simpleloader"></div>}
                                            </div>
                                        </div>
                                        <svg
                                            width="16"
                                            height="9"
                                            viewBox="0 0 16 9"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M10.8588 0L14.6495 3.76963L15.0838 4.24084L14.6495 4.71204L10.8588 8.48167L9.95057 7.53926L12.6751 4.8691H0V3.61256H12.6751L9.95057 0.942402L10.8588 0Z"
                                                fill="white"
                                            ></path>
                                        </svg>
                                    </button>
                                </div>
                                <div className="dont-have-account">
                                    <p>
                                        Don’t have an account?
                                        <NavLink to="/signup-verification">
                                            <b>Register for free</b>
                                        </NavLink>
                                    </p>
                                </div>
                                <div className="list-style">
                                    <ul>
                                        <li>We Make Doctors</li>
                                        <li>4,700+ Positive Medical Residency Match Outcomes</li>
                                    </ul>
                                </div>
                            </div>
                            <div className="login-grid-items">
                                <div className="login-child-image"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}