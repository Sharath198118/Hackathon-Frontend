import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import "./Results.css";
import { useSelector } from "react-redux";
import { Alert, Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import BaseLayout from "../components/BaseLayout";
import { HACKATHONS, TEAMS } from "../constants";
import { selectHackathonById } from "../features/hackathon/hackathonSlice";
import { selectTeamByHackathonId } from "../features/team/teamSlice";

const Results = () => {
    let { hackathonId } = useParams();

    // const data = useSelector((state) => state.hackathon.hackathons.data) || [];
    // const [hackathons, setHackathons] = useState(
    //     HACKATHONS
    //     // data
    //     );

    // useEffect(() => {
    //     setHackathons(data);
    // }, []);

    const hackathon = useSelector((state) =>
        selectHackathonById(state, hackathonId)
    );
    // hackathons?.find((hack) => hack.hackathonId === Number(hackathonId)) ||
    // null;

    // const data2 = TEAMS[0].teamUserDetailsDTOs;
    // useSelector((state) => state.team.teamdetails.data) || [];
    // const teamdetails=data.length>0?data[0].teamUserDetailsDTOs:[]
    // const [teams, setTeams] = useState(data2);

    // useEffect(() => {
    //     if (data2.length > 0) {
    //         setTeams(data2);
    //     }
    // }, [data2]);

    // const [teamDetails, setTeamDetails] = useState(
    //     teams.find((team) => team.hackathonId === Number(hackathonId))
    // );
    const teamDetails = useSelector((state) =>
        selectTeamByHackathonId(state, hackathonId)
    );
    console.log(hackathon);
    // useEffect(() => {
    //     if (teams.length > 0) {
    //         setTeamDetails(
    //             teams.find((team) => team.hackathonId === Number(hackathonId))
    //         );
    //     }
    // }, [teams]);

    return (
        <BaseLayout>
            <div className="py-6">
                {!hackathon || !hackathon.isCompleted ? (
                    <div className="w-fit mx-auto justify-self-center">
                        <Alert
                            variant="ghost"
                            className="flex justify-center items-center"
                        >
                            <Typography className="w-full justify-center flex">
                                Hackathon is not finished or doesn't exist.
                            </Typography>
                        </Alert>
                    </div>
                ) : (
                    <div
                        className="container results grid grid-cols-1 md:grid-cols-2 m-0 justify-between rounded-3xl
      md:shadow-2xl md:w-3/5 md:flex-row md:mx-auto"
                    >
                        <div
                            className="flex flex-col p-7 items-center space-y-9 bg-gradient-to-b from-incedo-primary-600/75 to-incedo-primary-600/85 rounded-b-3xl py-9 md:py-12 md:space-y-12 
     md:rounded-3xl"
                        >
                            <h4 className="text-2xl text-darkGrayBlue font-bold">
                                {hackathon?.name} Top Scorers
                            </h4>
                            <div className="container flex flex-col px-2 space-y-5 md:space-y-5">
                                <div className="result-element bg-white/20 p-3 rounded-md ">
                                    <div className="flex flex-row justify-between">
                                        <div className="flex flex-row space-x-2">
                                            {/* <img src="" alt="reaction-icon" /> */}
                                            <p className="font-bold text-incedo-secondary-600">
                                                1.{" "}
                                                {hackathon?.firstTeamName ||
                                                    "NA"}
                                                {/* Team 1 */}
                                            </p>
                                        </div>
                                        {/* <div className="flex flex-row space-x-1">
                                    <p className="font-bold text-darkGrayBlue">
                                        4.9
                                    </p>
                                    <p className="text-gray-500 font-semibold">
                                        /
                                    </p>
                                    <p className="text-gray-500 font-semibold">
                                        5
                                    </p>
                                </div> */}
                                    </div>
                                </div>
                                <div className="result-element bg-white/20 p-3 rounded-md ">
                                    <div className="flex flex-row justify-between">
                                        <div className="flex flex-row space-x-2">
                                            {/* <img src="" alt="reaction-icon" /> */}
                                            <p className="font-bold text-incedo-secondary-600">
                                                2.{" "}
                                                {hackathon?.secondTeamName ||
                                                    "NA"}
                                                {/* Team 1 */}
                                            </p>
                                        </div>
                                        {/* <div className="flex flex-row space-x-1">
                                            <p className="font-bold text-darkGrayBlue">
                                                4.9
                                            </p>
                                            <p className="text-gray-500 font-semibold">
                                                /
                                            </p>
                                            <p className="text-gray-500 font-semibold">
                                                5
                                            </p>
                                        </div> */}
                                    </div>
                                </div>
                                <div className="result-element bg-white/20 p-3 rounded-md ">
                                    <div className="flex flex-row justify-between">
                                        <div className="flex flex-row space-x-2">
                                            {/* <img src="" alt="reaction-icon" /> */}
                                            <p className="font-bold text-incedo-secondary-600">
                                                3.{" "}
                                                {hackathon?.thirdTeamName ||
                                                    "NA"}
                                                {/* Team 1 */}
                                            </p>
                                        </div>
                                        {/* <div className="flex flex-row space-x-1">
                                    <p className="font-bold text-darkGrayBlue">
                                        4.9
                                    </p>
                                    <p className="text-gray-500 font-semibold">
                                        /
                                    </p>
                                    <p className="text-gray-500 font-semibold">
                                        5
                                    </p>
                                </div> */}
                                    </div>
                                </div>
                                {/* <div className="result-element bg-cobaltBlue p-3 rounded-md bg-opacity-20">
                            <div className="flex flex-row justify-between">
                                <div className="flex flex-row space-x-2">
                                    {/* <img src="" alt="reaction-icon" /> */}
                                {/* <p className="text-cobaltBlue"></p>
                                </div>
                                <div className="flex flex-row space-x-1">
                                    <p className="font-bold text-darkGrayBlue"></p>
                                    <p className="text-gray-500 font-semibold">/</p>
                                    <p className="text-gray-500 font-semibold">
                                        100
                                    </p>
                                </div>
                            </div>
                        </div> */}
                            </div>
                            {/* <Link
                                to="/"
                                className="container p-4
       bg-darkGrayBlue rounded-full text-lg font-bold text-white
       hover:bg-gradient-to-b from-lightSlateBlue to-lightRoyalBlue"
                            >
                                <button
                                    className="w-full"
                                    //                         className="container p-4
                                    //    bg-darkGrayBlue rounded-full text-lg font-bold text-white
                                    //    hover:bg-gradient-to-b from-lightSlateBlue to-lightRoyalBlue"
                                >
                                    Close
                                </button>
                            </Link> */}
                        </div>
                        <div className="flex flex-col items-start p-7 space-y-7">
                            <h4 className="text-xl text-darkGrayBlue font-bold">
                                Prizes
                            </h4>
                            <div className="container flex flex-col h-[60%] space-y-5 md:space-y-5">
                                {hackathon?.prizes}
                            </div>
                            <Link
                                to="/"
                                className="container pla p-4
       bg-darkGrayBlue rounded-full text-lg font-bold text-white
       hover:bg-gradient-to-b from-lightSlateBlue to-lightRoyalBlue"
                            >
                                <button
                                    className="w-full"
                                    //                         className="container p-4
                                    //    bg-darkGrayBlue rounded-full text-lg font-bold text-white
                                    //    hover:bg-gradient-to-b from-lightSlateBlue to-lightRoyalBlue"
                                >
                                    Close
                                </button>
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </BaseLayout>
    );
};

export default Results;
