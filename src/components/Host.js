import React, { useState } from "react";
import {
    Card,
    CardBody,
    Input,
    Typography,
    Button,
    Textarea,
} from "@material-tailwind/react";
import { newRequest } from "../features/hackathon/hackathonSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const Host = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        details: "",
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevstate) => ({ ...prevstate, [name]: value }));
    };

    const dispatch = useDispatch();

    const validateEmail = (email) => {
        // Regex pattern for email validation
        const pattern =
            /^[_a-z0-9-]+(\.[_a-z0-9-]+)*(\+[a-z0-9-]+)?@[a-z0-9-]+(\.[a-z0-9-]+)*$/i;
        return pattern.test(email);
    };

    const [validationErrors, setValidationErrors] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = {};
        if (!formData.name) {
            newErrors.name = "Name is Required!";
        }
        if (formData.name && formData.name.length > 255) {
            newErrors.name = "Name should not contain more than 255 characters";
        }
        if (!formData.email) {
            newErrors.email = "Email is required!";
        }
        if (formData.email && !validateEmail(formData.email)) {
            newErrors.email = "Email is Invalid!";
        }
        if (!formData.details) {
            newErrors.details = "Request detail is required!";
        }
        if (formData.details && formData.details.length > 3000) {
            newErrors.details =
                "Request detail should not contain more than 3000 characters";
        }
        if (Object.keys(newErrors).length > 0) {
            setValidationErrors(newErrors);
        } else {
            try {
                await dispatch(newRequest(formData)).unwrap();
                setFormData({
                    name: "",
                    email: "",
                    details: "",
                });
                toast.success("Request Sent!");
            } catch (error) {
                toast.error(`Error: ${error?.message}`);
            }
        }
        setValidationErrors(newErrors);
    };

    return (
        <div className="w-full bg-gradient-to-t md:bg-gradient-to-r from-incedo-secondary-100/50 to-incedo-primary-100/50">
            <Card color="transparent" shadow={false} className="mx-0 md:mx-4">
                <CardBody className="flex py-4 px-1 md:p-4">
                    <div className="hidden w-1/2 p-4 md:flex justify-start items-center flex-wrap gap-y-1">
                        <div>
                            <Typography
                                variant="h1"
                                // color="i"
                                className="mb-2 font-semibold flex text-incedo-secondary-600"
                            >
                                Host Your Own
                                <br />
                                Hackathon
                            </Typography>
                            <Typography
                                // variant="h1"
                                // color="i"
                                className="mb-2 font-semibold flex text-incedo-tertiary-900/575"
                            >
                                Explore the benefits of hosting your own
                                hackathon, a platform for collaboration,
                                innovation, and problem-solving.
                            </Typography>
                        </div>
                    </div>

                    {/* Right half with larger form */}
                    <div className="w-full md:w-1/2 p-4 ">
                        <Card shadow={false} className="pt-8">
                            <Typography
                                variant="h2"
                                // color="i"
                                className="mb-2 font-semibold flex justify-center text-incedo-secondary-600"
                            >
                                Contact Us
                            </Typography>
                            <CardBody>
                                <form
                                    className="flex flex-col justify-center gap-y-4 md:px-8"
                                    onSubmit={handleSubmit}
                                >
                                    <div>
                                        <Input
                                            type="text"
                                            label="Name"
                                            name="name"
                                            value={formData?.name || ""}
                                            placeholder="Enter you name"
                                            className="mb-1 w-full p-2 rounded border border-gray-300"
                                            onChange={handleChange}
                                        />
                                        {validationErrors.name && (
                                            <Typography className="text-red-500 mt-1 text-xs w-fit">
                                                {validationErrors.name}
                                            </Typography>
                                        )}
                                    </div>
                                    <div>
                                        <Input
                                            type="email"
                                            label="E-Mail"
                                            name="email"
                                            value={formData?.email || ""}
                                            placeholder="Enter your E-mail"
                                            className="mb-2 w-full p-2 rounded border border-gray-300"
                                            onChange={handleChange}
                                        />
                                        {validationErrors.email && (
                                            <Typography className="text-red-500 mt-1 text-xs w-fit">
                                                {validationErrors.email}
                                            </Typography>
                                        )}
                                    </div>
                                    <div>
                                        <Textarea
                                            // type="text"
                                            label="Details"
                                            name="details"
                                            value={formData?.details || ""}
                                            className=" w-full px-2 rounded border border-gray-300"
                                            onChange={handleChange}
                                        />
                                        {validationErrors.details && (
                                            <Typography className="text-red-500 text-xs w-fit">
                                                {validationErrors.details}
                                            </Typography>
                                        )}
                                    </div>
                                    <Button
                                        className="btn-submit-form w-fit cursor-pointer self-center bg-incedo-secondary-900"
                                        type="submit"
                                    >
                                        Submit
                                    </Button>
                                </form>
                            </CardBody>
                        </Card>
                    </div>
                </CardBody>
            </Card>
        </div>
    );
};

export default Host;
