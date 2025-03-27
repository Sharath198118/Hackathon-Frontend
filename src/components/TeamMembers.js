import React, { useState, useEffect } from "react";
import {
    List,
    ListItem,
    ListItemPrefix,
    Avatar,
    Card,
    Typography,
    CardHeader,
    CardBody,
    Tooltip,
    // Input,
    // Textarea,
    // IconButton,
    // Button,
} from "@material-tailwind/react";

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { fetchTeamDetails, selectTeams } from "../features/team/teamSlice";
import { TEAMS, USER } from "../constants";
import { selectUserDetails, selectUserId } from "../features/user/userSlice";

const TeamMembers = () => {
    const dispatch = useDispatch();
    const teamsData = useSelector(selectTeams);
    const userData = useSelector(selectUserDetails);
    const [teamDetails, setTeamDetails] = useState([]);

    useEffect(() => {
        if (userData && teamsData.length > 0) {
            console.log("I was here");
            setTeamDetails(
                teamsData.find(
                    (team) => team.hackathonId === userData?.assignedHackathon
                )?.teamUserDetailsDTOs
            );
        }
    }, [teamsData, userData]);

    return (
        <Card className="w-full mb-4">
            <CardHeader floated={false} shadow={false}>
                <Typography variant="h4">Team Members</Typography>
            </CardHeader>
            <CardBody className="p-4 py-2">
                {teamDetails.length === 0 ? (
                    <Typography variant="paragraph" color="gray">
                        No team members found.
                    </Typography>
                ) : (
                    <List className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {teamDetails.map((member) => {
                            return (
                                <ListItem key={member.userId}>
                                    <ListItemPrefix>
                                        <Avatar
                                            variant="circular"
                                            alt="candice"
                                            src={`https://ui-avatars.com/api/?background=random&name=${member?.name[0]}`}     
                                        />
                                    </ListItemPrefix>
                                    <div>
                                        <div className="flex flex-row items-baseline gap-1">
                                            <Typography
                                                variant="h6"
                                                color="blue-gray"
                                            >
                                                {member.name}
                                            </Typography>
                                            {member.leader && (
                                                <Tooltip content="Leader">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 16 16"
                                                        fill="blue"
                                                        className="w-3 h-3"
                                                    >
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M8 1.75a.75.75 0 0 1 .692.462l1.41 3.393 3.664.293a.75.75 0 0 1 .428 1.317l-2.791 2.39.853 3.575a.75.75 0 0 1-1.12.814L7.998 12.08l-3.135 1.915a.75.75 0 0 1-1.12-.814l.852-3.574-2.79-2.39a.75.75 0 0 1 .427-1.318l3.663-.293 1.41-3.393A.75.75 0 0 1 8 1.75Z"
                                                            clipRule="evenodd"
                                                        />
                                                    </svg>
                                                </Tooltip>
                                            )}
                                        </div>
                                        <Typography
                                            variant="small"
                                            color="gray"
                                            className="font-normal"
                                        >
                                            {member.email}
                                        </Typography>
                                    </div>
                                </ListItem>
                            );
                        })}
                    </List>
                )}
            </CardBody>
        </Card>
    );
};

export default TeamMembers;
