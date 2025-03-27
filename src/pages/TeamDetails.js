import React, { useEffect, useState } from "react";
import {
    List,
    ListItem,
    ListItemPrefix,
    Avatar,
    Card,
    Typography,
    CardHeader,
    CardBody,
    Input,
    Textarea,
    IconButton,
    Button,
    Alert,
} from "@material-tailwind/react";

import {
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
} from "@material-tailwind/react";

import { ChevronDownIcon } from "@heroicons/react/24/outline";
import BaseLayout from "../components/BaseLayout";
import TeamMembers from "../components/TeamMembers";
import IdeaDetails from "../components/IdeaDetails";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchTeamDetails,
    selectTeamByHackathonId,
} from "../features/team/teamSlice";
import { selectUserDetails, selectUserToken } from "../features/user/userSlice";
import { selectHackathonById } from "../features/hackathon/hackathonSlice";

const TeamDetails = () => {
    const userData = useSelector(selectUserDetails);
    const [user, setUser] = useState(userData);

    const token = useSelector(selectUserToken)

    useEffect(() => {
        if (userData?.role === "participant") {
            dispatch(fetchTeamDetails({ userId: userData?.userId, token }));
            setUser(userData);
        }
    }, [userData]);

    const teamDetails = useSelector((state) =>
        selectTeamByHackathonId(state, userData?.assignedHackathon)
    );

    const hackthonDetails = useSelector((state) =>
        selectHackathonById(state, userData?.assignedHackathon)
    );
    const dispatch = useDispatch();

    return (
        <BaseLayout>
            <div className="container my-2 mx-auto py-4 px-2 flex justify-center">
                {!user || user?.available ? (
                    <div className="w-fit mx-auto justify-self-center">
                        <Alert
                            variant="ghost"
                            className="flex justify-center items-center"
                        >
                            <Typography className="w-full justify-center flex">
                                No Registered Hackathon
                            </Typography>
                        </Alert>
                    </div>
                ) : (
                    <div className="w-full">
                        <Typography
                            variant="h3"
                            className="mb-3 text-incedo-secondary-600"
                        >
                            {teamDetails?.name} [{hackthonDetails?.name}]
                        </Typography>
                        <TeamMembers />
                        <IdeaDetails />
                    </div>
                )}
            </div>
        </BaseLayout>
    );
};

export default TeamDetails;
