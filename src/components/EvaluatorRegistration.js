import {
    Card,
    Input,
    Checkbox,
    Button,
    Typography,
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
} from "@material-tailwind/react";

import { useDispatch, useSelector } from "react-redux";

import { ChevronDownIcon } from "@heroicons/react/24/outline";

import React, { useEffect, useState } from "react";

import {
    registerEvaluator,
    fetchEvaluators,
} from "../features/evaluator/evaluatorSlice";
import { fetchHackathons } from "../features/hackathon/hackathonSlice";
import { toast } from "react-toastify";
import { selectUserToken } from "../features/user/userSlice";

const EvaluatorRegistration = () => {
    const roles = [
        { name: "Panelist", value: "panelist" },
        { name: "Judge", value: "judge" },
    ];

    const themes = [
        { name: "Life Sciences", short: "LS" },
        { name: "Banking and Wealth Management", short: "B&WM" },
        { name: "Telecom", short: "TL" },
        { name: "Product Engineering", short: "PE" },
    ];

    const [selectedRoleIndex, setSelectedRoleIndex] = React.useState(0);
    const selectedRole = roles[selectedRoleIndex];
    const token = useSelector(selectUserToken);

    const dispatch = useDispatch();
    // const [selectedTheme, setSelectedTheme] = useState({ name: "" });

    const [registerData, setRegisterData] = useState({
        name: "",
        email: "",
        domain: "",
        role: roles[selectedRoleIndex].value,
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setRegisterData((prevstate) => ({ ...prevstate, [name]: value }));
    };

    // useEffect(()=>{
    //     dispatch(fetchEvaluators())
    //     dispatch(fetchHackathons())
    // },[dispatch])
    const validateEmail = (email) => {
        // Regex pattern for email validation
        const pattern =
            /^[_a-z0-9-]+(\.[_a-z0-9-]+)*(\+[a-z0-9-]+)?@[a-z0-9-]+(\.[a-z0-9-]+)*$/i;
        return pattern.test(email);
    };
    const [validationErrors, setValidationErrors] = useState({});
    const handleSubmit = async () => {
        const newErrors = {};
        if (!registerData.name) {
            newErrors.name = "Name is Required!";
        }
        if (!registerData.email) {
            newErrors.email = "Email is Required!";
        }
        if (registerData.email && !validateEmail(registerData.email)) {
            newErrors.email = "Email is Invalid!";
        }
        if (!registerData.domain) {
            newErrors.email = "Email is Required!";
        }
        if (Object.keys(newErrors).length > 0) {
            setValidationErrors(newErrors);
        } else {
            try {
                // await dispatch(registerEvaluator(registerData)).unwrap();
                await toast.promise(
                    dispatch(
                        registerEvaluator({
                            evaluatorData: registerData,
                            token,
                        })
                    ).unwrap(),
                    {
                        pending: "Registering...",
                        success: `${registerData.name} registered successfully!`,
                        error: {
                            render({ data }) {
                                return `Error: ${data?.message}`;
                            },
                            // other options
                            // icon: "🟢",
                        },
                    }
                    // {
                    //     pending: "Registering...",
                    //     success: `${registerData.name} registered successfully!`,
                    //     error: "A problem occured while registering. Please try again",
                    // }
                );
                setRegisterData({
                    name: "",
                    email: "",
                    domain: "",
                    role: roles[selectedRoleIndex].value,
                });
                await dispatch(fetchEvaluators({ token })).unwrap();
            } catch (error) {
                console.log(error);
                // toast.error(`Error: ${error?.message}`);
            }
        }
        setValidationErrors(newErrors);
        // console.log(registerData);
    };

    return (
        <div className="container my-2 mx-auto px-1 flex justify-center">
            <Card
                className="flex-intial w-full px-4 py-2"
                color="white"
                shadow={true}
            >
                <Typography variant="h4" color="blue-gray">
                    Evaluator Registration
                </Typography>
                <Typography color="gray" className="mt-1 font-normal">
                    Welcome! Enter the details to register.
                </Typography>
                <form className="mt-4 mb-2">
                    <div className="mb-1 flex flex-col gap-4">
                        <div>
                            <Typography
                                variant="h6"
                                color="blue-gray"
                                // className="-mb-5"
                            >
                                Name
                            </Typography>
                            <div className="relative flex w-full max-w-[24rem]">
                                <Menu placement="bottom-start">
                                    <MenuHandler>
                                        <Button
                                            ripple={false}
                                            variant="text"
                                            color="blue-gray"
                                            className="relative flex h-10 justify-between gap-2 rounded-r-none border border-r-0 border-blue-gray-200 bg-blue-gray-500/10 pl-3"
                                        >
                                            {selectedRole.name}&nbsp;&nbsp;
                                            <ChevronDownIcon className="absolute w-4 h-4 right-2" />
                                        </Button>
                                    </MenuHandler>
                                    <MenuList className="max-h-[20rem] max-w-[18rem]">
                                        {roles.map((item, index) => {
                                            return (
                                                <MenuItem
                                                    key={index}
                                                    value={item.name}
                                                    className="flex items-center gap-2"
                                                    onClick={() => {
                                                        setSelectedRoleIndex(
                                                            index
                                                        );
                                                        setRegisterData({
                                                            ...registerData,
                                                            role: item.value,
                                                        });
                                                    }}
                                                >
                                                    {item.name}
                                                </MenuItem>
                                            );
                                        })}
                                    </MenuList>
                                </Menu>
                                <Input
                                    placeholder="John Doe"
                                    className="rounded-l-none !border-t-blue-gray-200 focus:!border-t-gray-900"
                                    labelProps={{
                                        className:
                                            "before:content-none after:content-none",
                                    }}
                                    containerProps={
                                        {
                                            // className: "min-w-0",
                                        }
                                    }
                                    value={registerData?.name || ""}
                                    name="name"
                                    onChange={handleChange}
                                />
                                {validationErrors.name && (
                                    <Typography className="text-red-500 text-xs w-fit">
                                        {validationErrors.name}
                                    </Typography>
                                )}
                            </div>
                        </div>
                        <div>
                            <Typography
                                variant="h6"
                                color="blue-gray"
                                // className="-mb-5"
                            >
                                Email
                            </Typography>
                            <Input
                                placeholder="name@mail.com"
                                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                                labelProps={{
                                    className:
                                        "before:content-none after:content-none",
                                }}
                                containerProps={{
                                    className: "min-w-0",
                                }}
                                value={registerData?.email || ""}
                                name="email"
                                onChange={handleChange}
                            />
                            {validationErrors.email && (
                                <Typography className="text-red-500 text-xs w-fit">
                                    {validationErrors.email}
                                </Typography>
                            )}
                        </div>
                        <div>
                            <Typography
                                variant="h6"
                                color="blue-gray"
                                // className="-mb-3"
                            >
                                Domain
                            </Typography>
                            <div className="relative flex w-full max-w-[24rem]">
                                <Menu placement="bottom-start">
                                    <MenuHandler>
                                        <Button
                                            ripple={false}
                                            variant="text"
                                            color="blue-gray"
                                            className="relative flex h-10 w-full justify-between gap-2 border border-blue-gray-200 bg-blue-gray-500/10 pl-3 pr-2"
                                        >
                                            {registerData?.domain}
                                            <ChevronDownIcon className="absolute w-4 h-4 right-2" />
                                        </Button>
                                    </MenuHandler>
                                    <MenuList className="max-h-[20rem] max-w-[18rem]">
                                        {themes.map((theme, index) => {
                                            return (
                                                <MenuItem
                                                    key={index}
                                                    value={theme.name}
                                                    className="flex items-center gap-2"
                                                    onClick={() =>
                                                        // setSelectedTheme(
                                                        //     themes[index]
                                                        // )
                                                        setRegisterData({
                                                            ...registerData,
                                                            domain: themes[index]
                                                                .name,
                                                        })
                                                    }
                                                >
                                                    {theme.name}
                                                </MenuItem>
                                            );
                                        })}
                                    </MenuList>
                                </Menu>
                            </div>
                            {validationErrors.domain && (
                                <Typography className="text-red-500 text-xs w-fit">
                                    {validationErrors.domain}
                                </Typography>
                            )}
                        </div>
                    </div>
                    <Button
                        className="mt-6"
                        fullWidth
                        onClick={handleSubmit}
                        disabled={
                            !registerData?.name ||
                            !registerData?.email ||
                            selectedRole.name === "" || !registerData?.domain
                        }
                    >
                        Create{" " + selectedRole.name}
                    </Button>
                </form>
            </Card>
        </div>
    );
};

export default EvaluatorRegistration;
