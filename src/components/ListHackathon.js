import React, { useEffect, useState } from "react";

import { Card, Typography, Chip, Button } from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchHackathons,
    hackathonEnd,
    selectHackathons,
} from "../features/hackathon/hackathonSlice";
import { HACKATHONS } from "../constants";
import { toast } from "react-toastify";
import { selectUserToken } from "../features/user/userSlice";
import { Link } from "react-router-dom";

const TABLE_HEAD = [
    "Hackathon",
    "Theme",
    // "Panelists",
    // "Judges",
    // "Status",
    "Actions",
];

const ListHackathon = () => {
    // const data = HACKATHONS;
    // useSelector((state) => state.hackathon.hackathons.data);
    const hackathonsData = useSelector(selectHackathons);
    const [hackathons, setHackathons] = useState(hackathonsData);
    const token = useSelector(selectUserToken);

    useEffect(() => {
        setHackathons(hackathonsData);
        console.log(hackathonsData);
    }, [hackathonsData]);
    // data ? data : [];
    const dispatch = useDispatch();
    const handleHackathonEnd = async (id) => {
        try {
            console.log({ hackathonId: id, token });
            await dispatch(hackathonEnd({ hackathonId: id, token })).unwrap();
            toast.success(
                `${
                    hackathons.find((hackathon) => hackathon.hackathonId === id)
                        .name
                } ended succesfully!`
            );
            // try {
            await dispatch(fetchHackathons()).unwrap();
            // } catch (error) {
            //     toast.error(`Error: ${error?.message}`);
            // }
        } catch (error) {
            toast.error(`Error: ${error?.message}`);
        }
    };

    return (
        <div className="container my-2 mx-auto px-1 flex justify-center">
            <Card className="h-full w-full mx-2">
                <table className="w-full min-w-max table-auto text-left">
                    <thead>
                        <tr>
                            {TABLE_HEAD.map((head) => (
                                <th
                                    key={head}
                                    className={
                                        head === "Theme" ||
                                        head === "Panelists" ||
                                        head === "Judges" ||
                                        head === "Actions"
                                            ? "border-b border-blue-gray-100 bg-blue-gray-50 p-4 hidden lg:table-cell"
                                            : "border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                                    }
                                >
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="font-normal leading-none opacity-70"
                                    >
                                        {head}
                                    </Typography>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {hackathons.map((hackathon, index) => {
                            const isLast = index === hackathons.length - 1;
                            const classes = isLast
                                ? "p-4"
                                : "p-4 border-b border-blue-gray-50";

                            const status = "";

                            return (
                                <tr key={hackathon.name}>
                                    <td className="p-4">
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal"
                                        >
                                            {hackathon.name}
                                        </Typography>
                                    </td>
                                    <td className="p-4 hidden lg:table-cell">
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal"
                                        >
                                            {hackathon.theme}
                                        </Typography>
                                    </td>
                                    {/* <td className="p-4 hidden lg:table-cell">
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal"
                                        >
                                        </Typography>
                                    </td>
                                    <td className="p-4 hidden lg:table-cell">
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal"
                                        >
                                        </Typography>
                                    </td> */}
                                    {/* <td className="p-4">
                                        <Chip
                                            variant="ghost"
                                            color="green"
                                            size="sm"
                                            value={status}
                                            className="ml-0 mr-auto block w-24 text-center rounded-full"
                                        />
                                    </td> */}
                                    <td className="p-4 hidden lg:table-cell">
                                        {hackathon.isCompleted ? (
                                            <Link
                                                to={`/results/${hackathon.hackathonId}`}
                                            >
                                                <Button
                                                    size="sm"
                                                    className="h-8"
                                                    color="green"
                                                >
                                                    Result
                                                </Button>
                                            </Link>
                                        ) : (
                                            <Button
                                                className="flex items-center gap-3"
                                                size="sm"
                                                disabled={
                                                    hackathon?.isCompleted
                                                }
                                                onClick={() => {
                                                    handleHackathonEnd(
                                                        hackathon.hackathonId
                                                    );
                                                }}
                                            >
                                                {/* <PencilIcon className="h-4 w-4" /> */}
                                                End
                                            </Button>
                                        )}
                                        {/* <Button
                                            className="flex items-center gap-3"
                                            size="sm"
                                            onClick={handleHackathonEnd(
                                                hackathon.hackathonId
                                            )}
                                        >
                                            Results
                                        </Button> */}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </Card>
        </div>
    );
};

export default ListHackathon;
