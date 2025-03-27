import React, { useEffect, useState } from "react";
import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    Avatar,
    Button,
    Alert,
    Rating,
    Chip,
} from "@material-tailwind/react";
import BaseLayout from "../components/BaseLayout";
import { selectTeams } from "../features/team/teamSlice";
import { useSelector } from "react-redux";
import { selectUserDetails } from "../features/user/userSlice";
import { HACKATHONS, REQUESTS, TEAMS, USER } from "../constants";
import { selectHackathons } from "../features/hackathon/hackathonSlice";

const PastTeams = () => {
    const teamsData = useSelector(selectTeams);
    const [pastTeams, setPastTeams] = useState([]);

    const userData = useSelector(selectUserDetails);
    const hackathonsData = useSelector(selectHackathons);

    useEffect(() => {
        // console.log(teamsData);
        const newTeams = teamsData?.filter(
            (team) => team?.teamId !== userData?.assignedHackathon
        );
        if (newTeams.length > 0) {
            setPastTeams(newTeams);
        }
    }, [teamsData]);

    return (
        <BaseLayout>
            <div className="container py-4 mx-auto  px-1">
                <Typography
                    variant="h3"
                    className="mb-3 text-incedo-secondary-600"
                >
                    My Participations
                </Typography>
                <div className="grid grid-cols-1 auto-cols-fr md:grid-cols-2 gap-4">
                    {pastTeams.length > 0 ? (
                        pastTeams.map((team) => (
                            <Card
                                shadow={false}
                                key={team.teamId}
                                className="w-full px-4 py-0"
                            >
                                <CardHeader
                                    color="transparent"
                                    floated={false}
                                    shadow={false}
                                    className="mx-0 flex items-center gap-4 p-1 pb-3"
                                >
                                    <div className="flex w-full flex-col px-1 gap-0.5">
                                        <div className="flex items-center justify-between">
                                            <Typography
                                                variant="h5"
                                                color="blue-gray"
                                            >
                                                {team?.name} [
                                                {hackathonsData?.find(
                                                    (hackathon) =>
                                                        hackathon.hackathonId ===
                                                        team.hackathonId
                                                )?.name || "Unavailable"}
                                                ]
                                            </Typography>
                                            <Typography>4.7/5.0</Typography>
                                        </div>
                                        <div className="flex items-baseline gap-2 justify-start">
                                            <Typography
                                                className=""
                                                color="blue-gray"
                                            >
                                                {team?.ideaTitle}
                                            </Typography>
                                            <Chip size="sm" variant="ghost" className="rounded-xl font-normal" value={team?.status} />
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardBody className="mb-3 py-0 px-2 flex justify-between items-end">
                                    <div>
                                        <Typography variant="h6">
                                            Feedback
                                        </Typography>
                                        <div className="flex flex-col gap-3 ml-2">
                                            {team?.feedBacks?.length > 0 ? (
                                                team.feedBacks.map(
                                                    (feedBack, index) => (
                                                        <Typography className=" text-justify">
                                                            {index + 1}.{" "}
                                                            {feedBack}
                                                        </Typography>
                                                    )
                                                )
                                            ) : (
                                                <Typography className=" text-justify">
                                                    No feedback available.
                                                </Typography>
                                            )}
                                        </div>
                                    </div>
                                    {/* <Button size="sm">Details</Button> */}
                                </CardBody>
                            </Card>
                        ))
                    ) : (
                        <div className="w-fit  col-span-2 mx-auto justify-self-center">
                            <Alert
                                variant="ghost"
                                className="flex justify-center mx-auto text-center items-center"
                            >
                                <Typography className="w-full mx-auto text-center justify-center flex">
                                    No Past Participations
                                </Typography>
                            </Alert>
                        </div>
                    )}
                </div>
            </div>
        </BaseLayout>
    );
};

export default PastTeams;
