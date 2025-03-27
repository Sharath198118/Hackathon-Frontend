import React, { useEffect, useState } from "react";
import { Input, Button, Spinner } from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import {
    changePassword,
    forgotPassword,
    otpVerification,
    selectErrorUser,
    selectLoadingUser,
    selectUserDetails,
    userLogin,
    userRegistration,
} from "../features/user/userSlice";
import {
    Typography,
    CardHeader,
    Card,
    Dialog,
    CardBody,
} from "@material-tailwind/react";
import { Slide, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router";

const ChangePassword = ({ showModal, handleToggleForgotPassword }) => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        otp: "",
    });
    const [confirmPassword, setConfirmPassword] = useState("");
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevstate) => ({ ...prevstate, [name]: value }));
    };

    const [passwordInputType, setPasswordInputType] = useState([
        "password",
        "password",
    ]);

    const handleTogglePassword = (index, type = "none") => {
        if (type === "none") {
            if (passwordInputType[index] === "password") {
                let newArray = [...passwordInputType];
                newArray[index] = "text";
                setPasswordInputType(newArray);
            }
            if (passwordInputType[index] === "text") {
                let newArray = [...passwordInputType];
                newArray[index] = "password";
                setPasswordInputType(newArray);
            }
        }
        if (type === "password") {
            let newArray = [...passwordInputType];
            newArray[index] = type;
            setPasswordInputType(newArray);
        }
        if (type === "text") {
            let newArray = [...passwordInputType];
            newArray[index] = type;
            setPasswordInputType(newArray);
        }
    };

    const error = useSelector(selectErrorUser);
    const [showError, setShowError] = useState(false);
    const loading = useSelector(selectLoadingUser);

    const dispatch = useDispatch();
    const Email = { email: formData.email };
    // console.log(Email);
    const [emailVerification, setEmailVerification] = useState(false);
    useEffect(() => {
        setShowError(false);
    }, [showModal]);
    const [validationErrors, setValidationErrors] = useState({});
    const handleEmailVerification = async () => {
        const newErrors = {};
        if (!formData.email) {
            newErrors.email = "Email is Required!";
        }
        if (formData.email && !validateEmail(formData.email)) {
            newErrors.email = "Email is Invalid!";
        }

        if (Object.keys(newErrors).length > 0) {
            setValidationErrors(newErrors);
        } else {
            try {
                await dispatch(forgotPassword(Email)).unwrap();
                setEmailVerification(true);
                setShowError(false);
            } catch (error) {
                setShowError(true);
            }
        }
        setValidationErrors(newErrors);
    };
    const otpDetails = {
        email: formData.email,
        password: formData.password,
        otp: formData.otp,
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = {};
        if (!formData.password) {
            newErrors.password = "Password is Required!";
        }
        if (formData.password !== confirmPassword) {
            newErrors.confirmPassword = "Password Does not Match!";
        }
        if (Object.keys(newErrors).length > 0) {
            setValidationErrors(newErrors);
        } else {
            try {
                e.preventDefault();
                await dispatch(changePassword(otpDetails)).unwrap();
                // await dispatch(userLogin(loginData)).unwrap();
                handler();
                toast.success("Password Changed Successfully!");
                // setShowSignUpModal(false);
                setShowError(false);
            } catch (error) {
                setShowError(true);
            }
        }
        setValidationErrors(newErrors);
    };
    const validateEmail = (email) => {
        // Regex pattern for email validation
        const pattern =
            /^[_a-z0-9-]+(\.[_a-z0-9-]+)*(\+[a-z0-9-]+)?@[a-z0-9-]+(\.[a-z0-9-]+)*$/i;
        return pattern.test(email);
    };
    const handler = () => {
        // toggleModal();
        handleToggleForgotPassword(false);
        setFormData({ email: "", password: "", otp: "" });
        setEmailVerification(false);
        setConfirmPassword("");
        setValidationErrors({});

        handleTogglePassword("password", 0);

        handleTogglePassword("password", 1);
    };

    return (
        <Dialog
            // className="h-96"
            open={showModal}
            handler={handler}
            size={"xs"}
        >
            {/* <span className="close" onClick={toggleModal} style={{ cursor: 'pointer' }}>&times;</span> */}
            <div className="container">
                <Card className="mx-auto max-h-[95vh] md:max-h-[89vh] w-full px-1 py-2 md:px-16 md:py-4">
                    <CardHeader
                        variant="gradient"
                        color="gray"
                        className="mb-4 grid h-28 place-items-center"
                    >
                        <Typography
                            variant="h5"
                            color="white"
                            className="text-center"
                        >
                            Reset Your Password
                        </Typography>
                    </CardHeader>
                    <CardBody className="pb-2 md:max-h-[89vh] overflow-y-auto">
                        {loading ? (
                            <div className="w-full h-96">
                                <Spinner className="mx-auto mt-44 h-16 w-16" />
                            </div>
                        ) : (
                            <form
                                className="account-form w-full mx-auto pt-2 md:mt-2 md:p-2 max-h-96 overflow-y-auto "
                                onSubmit={handleSubmit}
                            >
                                <div
                                    className={
                                        "account-form-fields sign-in flex flex-col gap-y-4 sign-up w-full mx-auto"
                                    }
                                >
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        label="E-mail"
                                        placeholder="Email"
                                        disabled={emailVerification}
                                        value={formData.email}
                                        onChange={handleChange}
                                        required={!emailVerification}
                                    />
                                    {validationErrors.email && (
                                        <Typography className="text-red-500 text-xs w-fit">
                                            {validationErrors.email}
                                        </Typography>
                                    )}

                                    {!emailVerification && (
                                        <Button
                                            size="sm"
                                            className="w-fit cursor-pointer"
                                            type="button"
                                            onClick={handleEmailVerification}
                                            // style={{ cursor: "pointer" }}
                                        >
                                            Verify Email
                                        </Button>
                                    )}

                                    {emailVerification && (
                                        <>
                                            <Input
                                                id="password"
                                                name="password"
                                                // type="password"
                                                type={passwordInputType[0]}
                                                label="Password"
                                                placeholder="Password"
                                                // disabled={emailVerification}
                                                value={formData.password}
                                                onChange={handleChange}
                                                required={!emailVerification}
                                                icon={
                                                    passwordInputType[0] ===
                                                    "password" ? (
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            viewBox="0 0 20 20"
                                                            fill="currentColor"
                                                            className="w-5 h-5"
                                                            onClick={() =>
                                                                handleTogglePassword(
                                                                    0
                                                                )
                                                            }
                                                        >
                                                            <path
                                                                fillRule="evenodd"
                                                                d="M3.28 2.22a.75.75 0 0 0-1.06 1.06l14.5 14.5a.75.75 0 1 0 1.06-1.06l-1.745-1.745a10.029 10.029 0 0 0 3.3-4.38 1.651 1.651 0 0 0 0-1.185A10.004 10.004 0 0 0 9.999 3a9.956 9.956 0 0 0-4.744 1.194L3.28 2.22ZM7.752 6.69l1.092 1.092a2.5 2.5 0 0 1 3.374 3.373l1.091 1.092a4 4 0 0 0-5.557-5.557Z"
                                                                clipRule="evenodd"
                                                            />
                                                            <path d="m10.748 13.93 2.523 2.523a9.987 9.987 0 0 1-3.27.547c-4.258 0-7.894-2.66-9.337-6.41a1.651 1.651 0 0 1 0-1.186A10.007 10.007 0 0 1 2.839 6.02L6.07 9.252a4 4 0 0 0 4.678 4.678Z" />
                                                        </svg>
                                                    ) : passwordInputType[0] ===
                                                      "text" ? (
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            viewBox="0 0 20 20"
                                                            fill="currentColor"
                                                            className="w-5 h-5"
                                                            onClick={() =>
                                                                handleTogglePassword(
                                                                    0
                                                                )
                                                            }
                                                        >
                                                            <path d="M10 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
                                                            <path
                                                                fillRule="evenodd"
                                                                d="M.664 10.59a1.651 1.651 0 0 1 0-1.186A10.004 10.004 0 0 1 10 3c4.257 0 7.893 2.66 9.336 6.41.147.381.146.804 0 1.186A10.004 10.004 0 0 1 10 17c-4.257 0-7.893-2.66-9.336-6.41ZM14 10a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z"
                                                                clipRule="evenodd"
                                                            />
                                                        </svg>
                                                    ) : null
                                                }
                                            />
                                            {validationErrors.password && (
                                                <Typography className="text-red-500 text-xs w-fit">
                                                    {validationErrors.password}
                                                </Typography>
                                            )}
                                            <Input
                                                id="repeat-password"
                                                name="confirmPassword"
                                                // type="password"
                                                type={passwordInputType[1]}
                                                label="Confirm password"
                                                placeholder="Label Password"
                                                // disabled={emailVerification}
                                                onChange={(e) =>
                                                    setConfirmPassword(
                                                        e.target.value
                                                    )
                                                }
                                                value={confirmPassword}
                                                required={!emailVerification}
                                                icon={
                                                    passwordInputType[1] ===
                                                    "password" ? (
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            viewBox="0 0 20 20"
                                                            fill="currentColor"
                                                            className="w-5 h-5"
                                                            onClick={() =>
                                                                handleTogglePassword(
                                                                    1
                                                                )
                                                            }
                                                        >
                                                            <path
                                                                fillRule="evenodd"
                                                                d="M3.28 2.22a.75.75 0 0 0-1.06 1.06l14.5 14.5a.75.75 0 1 0 1.06-1.06l-1.745-1.745a10.029 10.029 0 0 0 3.3-4.38 1.651 1.651 0 0 0 0-1.185A10.004 10.004 0 0 0 9.999 3a9.956 9.956 0 0 0-4.744 1.194L3.28 2.22ZM7.752 6.69l1.092 1.092a2.5 2.5 0 0 1 3.374 3.373l1.091 1.092a4 4 0 0 0-5.557-5.557Z"
                                                                clipRule="evenodd"
                                                            />
                                                            <path d="m10.748 13.93 2.523 2.523a9.987 9.987 0 0 1-3.27.547c-4.258 0-7.894-2.66-9.337-6.41a1.651 1.651 0 0 1 0-1.186A10.007 10.007 0 0 1 2.839 6.02L6.07 9.252a4 4 0 0 0 4.678 4.678Z" />
                                                        </svg>
                                                    ) : passwordInputType[1] ===
                                                      "text" ? (
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            viewBox="0 0 20 20"
                                                            fill="currentColor"
                                                            className="w-5 h-5"
                                                            onClick={() =>
                                                                handleTogglePassword(
                                                                    1
                                                                )
                                                            }
                                                        >
                                                            <path d="M10 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
                                                            <path
                                                                fillRule="evenodd"
                                                                d="M.664 10.59a1.651 1.651 0 0 1 0-1.186A10.004 10.004 0 0 1 10 3c4.257 0 7.893 2.66 9.336 6.41.147.381.146.804 0 1.186A10.004 10.004 0 0 1 10 17c-4.257 0-7.893-2.66-9.336-6.41ZM14 10a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z"
                                                                clipRule="evenodd"
                                                            />
                                                        </svg>
                                                    ) : null
                                                }
                                            />
                                            {validationErrors.confirmPassword && (
                                                <Typography className="text-red-500 text-xs w-fit">
                                                    {
                                                        validationErrors.confirmPassword
                                                    }
                                                </Typography>
                                            )}
                                            <Input
                                                id="otp"
                                                name="otp"
                                                type="text"
                                                label="Enter OTP"
                                                value={formData.otp}
                                                onChange={handleChange}
                                                required={emailVerification}
                                            />
                                        </>
                                    )}
                                    {showError && error && (
                                        <Typography className="text-red-500 text-xs w-fit">
                                            {error?.message || "empty error"}
                                        </Typography>
                                    )}
                                </div>
                                <br />
                                <div className="w-fit -mt-3 mx-auto flex justify-center flex-col">
                                    <Button
                                        className="btn-submit-form cursor-pointer mx-auto"
                                        type="submit"
                                        size="sm"
                                    >
                                        Change Password
                                    </Button>
                                </div>
                            </form>
                        )}
                    </CardBody>
                    <Typography
                        variant="small"
                        color="gray"
                        className="flex items-center justify-center gap-2 font-medium opacity-60"
                    >
                        Credentials are secured
                    </Typography>
                </Card>
            </div>
        </Dialog>
    );
};

export default ChangePassword;
