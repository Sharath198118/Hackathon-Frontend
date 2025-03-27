import {
    Button,
    Card,
    CardBody,
    CardHeader,
    Dialog,
    Input,
    Typography,
} from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    selectErrorTeam,
    selectLoadingTeam,
    teamRegistration,
} from "../features/team/teamSlice";
import {
    reattemptLogin,
    selectUserDetails,
    selectUserId,
    selectUserToken,
    successTeamRegistration,
} from "../features/user/userSlice";
import { USER } from "../constants";
import { toast } from "react-toastify";

const TeamRegistration = ({ open, setOpen, selectedHackathonId }) => {
    // const login = USER
    // useSelector((state) => state.user.login.data);
    const userId = useSelector(selectUserId);
    const userData = useSelector(selectUserDetails);
    // login ? login.userId : null;
    const hackathonId = selectedHackathonId;
    // const data = null;
    // useSelector((state) => state.team.registration.data);
    // const status = data ? data.status : null;
    // const error = useSelector((state) => state.team.registration.error);

    const error = useSelector(selectErrorTeam);
    const loading = useSelector(selectLoadingTeam);

    const [showError, setShowError] = useState(false);

    useEffect(() => {
        setShowError(false);
    }, [open]);

    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        name: "",
        email1: "",
        email2: "",
        email3: "",
    });
    const emailsInput = [formData.email1, formData.email2, formData.email3];
    const emails = emailsInput.filter((email) => email.trim() !== "");
    // console.log(emails);
    const name = formData.name;
    const team = { emails, name };
    // console.log(team);
    const [validationErrors, setValidationErrors] = useState({});
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    // useEffect(() => {
    //     if (status === 201) {
    //         handler();
    //     }
    // }, [status]);
    const token = useSelector(selectUserToken);

    const submitHandler = async (e) => {
        e.preventDefault();
        const newErrors = {};
        if (!formData.name) {
            newErrors.teamname = "Team Name is Required";
        }
        if (formData.email1 && !validateEmail(formData.email1)) {
            newErrors.email1 = "Email is invalid";
        }
        if (formData.email2 && !validateEmail(formData.email2)) {
            newErrors.email2 = "Email is invalid";
        }
        if (formData.email3 && !validateEmail(formData.email3)) {
            newErrors.email3 = "Email is invalid";
        }
        if (Object.keys(newErrors).length > 0) {
            setValidationErrors(newErrors);
        } else {
            try {
                await dispatch(
                    teamRegistration({ hackathonId, userId, team, token })
                ).unwrap();
                await dispatch(reattemptLogin({ userId, token })).unwrap();
                // toast.success(`Team: ${formData.name} registered successfully!`)
                handler();
                toast.success("Team successfully registered!");
                // navigate
                setShowError(false);
            } catch (error) {
                // toast.success
                setShowError(true);
            }
            // dispatch(successTeamRegistration(hackathonId));
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
        setOpen((cur) => !cur);
        setValidationErrors({});
        setFormData({
            name: "",
            email1: "",
            email2: "",
            email3: "",
        });
        setShowError(false);
    };
    return (
        <div>
            <Dialog
                size="xs"
                open={open}
                handler={handler}
                className="bg-transparent shadow-none"
            >
                <Card className="mx-auto max-h-[95vh] md:max-h-[89vh] w-full px-1 py-2 md:px-16 md:py-4">
                    <CardHeader
                        variant="gradient"
                        color="gray"
                        className="mb-4 grid w-3/4 h-16 place-items-center place-self-center"
                    >
                        <Typography variant="h5" color="white">
                            Register Your Team
                        </Typography>
                    </CardHeader>
                    <CardBody className="pb-2 md:max-h-[89vh] overflow-y-auto">
                        <form
                            onSubmit={submitHandler}
                            className="flex flex-col gap-y-4 w-full mx-auto pt-2 md:mt-2 md:p-2"
                        >
                            <Input
                                type="text"
                                label="Team Name*"
                                size="md"
                                name="name"
                                value={formData.teamname}
                                onChange={handleChange}
                            />
                            {validationErrors.teamname && (
                                <Typography className="text-red-500 text-xs w-fit">
                                    {"*" + validationErrors.teamname}
                                </Typography>
                            )}
                            <Input
                                type="email"
                                label="Leader Email"
                                disabled={true}
                                // className=" text-black"
                                size="md"
                                name="leader"
                                value={userData?.email}
                                // labelProps={{
                                //     className: "text-black",
                                // }}
                                // containerProps={{className: "read-only"}}
                                // onClick={(e) => {
                                //     e.preventDefault();
                                // }}
                                // onChange={handleChange}
                            />

                            <Input
                                type="email"
                                label="Member 1 Email (Optional)"
                                size="md"
                                name="email1"
                                value={formData.email1}
                                onChange={handleChange}
                            />
                            {validationErrors.email1 && (
                                <Typography className="text-red-500 text-xs w-fit">
                                    {validationErrors.email1 || ""}
                                </Typography>
                            )}

                            <Input
                                type="email"
                                label="Member 2 Email (Optional)"
                                size="md"
                                name="email2"
                                value={formData.email2}
                                onChange={handleChange}
                            />
                            {validationErrors.email2 && (
                                <Typography className="text-red-500 text-xs w-fit">
                                    {validationErrors.email2 || ""}
                                </Typography>
                            )}

                            <Input
                                type="email"
                                label="Member 3 Email (Optional)"
                                size="md"
                                name="email3"
                                value={formData.email3}
                                onChange={handleChange}
                            />
                            {validationErrors.email3 && (
                                <Typography className="text-red-500 text-xs w-fit">
                                    {validationErrors.email3 || ""}
                                </Typography>
                            )}
                            {showError && error && (
                                <Typography className="text-red-500 text-xs w-fit">
                                    {error?.message || ""}
                                </Typography>
                            )}
                            <div className="w-fit mx-auto">
                                <Button className="mt-2" type="submit">
                                    Submit
                                </Button>
                            </div>
                        </form>
                    </CardBody>
                </Card>
            </Dialog>
        </div>
    );
};

export default TeamRegistration;
