import React, { useEffect, useState } from "react";
import {
    Drawer,
    Typography,
    IconButton,
    Button,
    Input,
} from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectUserDetails } from "../features/user/userSlice";
import { useNavigate } from "react-router";
import { clearEvaluators } from "../features/evaluator/evaluatorSlice";
import { clearTeams } from "../features/team/teamSlice";
import Cookies from "js-cookie";

const ProfileDrawer = ({ opens, onClose }) => {
    const [editMode, setEditMode] = useState(false);
    const navigate = useNavigate();

    const handleEdit = () => {
        setEditMode(true);
    };
    const handleSave = () => {
        setEditMode(false);
    };

    const userData = useSelector(selectUserDetails);

    const [user, setUser] = useState(null);

    useEffect(() => {
        console.log(userData)
        setUser(userData);
    }, [userData]);

    // const [selectedHackathon, setSelectedHackathon] = useState("");

    // const handleSelectChange = (e) => {
    //   setSelectedHackathon(e.taget.value);
    // };
    const dispatch = useDispatch();
    const logoutHandler = () => {
        dispatch(logout());
        Cookies.remove("userId");
        Cookies.remove("token");
        dispatch(clearEvaluators());
        dispatch(clearTeams());
        onClose();
        navigate("/");
    };

    // console.log(user)
    return (
        <Drawer
            placement="right"
            open={opens}
            onClose={onClose}
            className="p-4"
        >
            <div className="mb-6">
                <IconButton variant="text" color="blue-gray" onClick={onClose}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="h-5 w-5"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </IconButton>
                <Typography
                    variant="h5"
                    color="blue-gray"
                    className="text-center"
                >
                    User Profile
                </Typography>
            </div>
            {editMode ? (
                <form>
                    <div className="mb-4">
                        <Input label="Name" name="name" value={user.name} />
                    </div>
                    <div className="mt-6">
                        <Button size="sm" onClick={handleSave}>
                            Save
                        </Button>
                    </div>
                </form>
            ) : (
                <div>
                    <div className="mb-4">
                        <Typography>Name: {user?.name}</Typography>
                        {/* <Typography variant="body1">{user.firstName}</Typography> */}
                    </div>

                    <div className="mb-4">
                        <Typography>Email: {user?.email}</Typography>
                        {/* <Typography variant="body1">{user.email}</Typography> */}
                    </div>
                    <Button onClick={logoutHandler}>Log Out</Button>
                    {/* <div className="mt-6">
                        <Button size="sm" onClick={handleEdit}>
                            Edit
                        </Button>
                    </div> */}
                </div>
            )}
        </Drawer>
    );
};

export default ProfileDrawer;
