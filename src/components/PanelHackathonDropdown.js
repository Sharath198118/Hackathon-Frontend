import React, { useState } from "react";
import {
    Card,
    Select,
    Option,
    Typography,
    Button,
    TextField,
} from "@material-tailwind/react";

const YourComponent = ({ arr }) => {
    const [selectedItemId, setSelectedItemId] = useState(""); // Store the ID of the selected item
    const [selectedTeam, setSelectedTeam] = useState(null); // Store the selected team

    const handleSelectChange = (value) => {
        setSelectedItemId(value); // Update the selected item ID
        // Reset selected team when changing the hackathon
        setSelectedTeam(null);
    };

    const handleTeamClick = (team) => {
        setSelectedTeam(team); // Update the selected team
    };

    const handleAcceptReject = (action) => {
        if (selectedTeam) {
            // Perform accept/reject action for the selected team
            // console.log(`${action} team:`, selectedTeam);
            // Reset selected team after action
            setSelectedTeam(null);
        }
    };

    return (
        <div className="mt-8">
            {/* Hackathon Selection Section */}
            <Card>
                <Typography variant="body1" color="textSecondary">
                    SELECT HACKATHON
                </Typography>
                <Select
                    label=""
                    value={selectedItemId}
                    onChange={handleSelectChange}
                    className="mt-4"
                >
                    <Option value="">Select a hackathon...</Option>
                    {arr.map((hackathon) => (
                        <Option key={hackathon.id} value={hackathon.id}>
                            {hackathon.name}
                        </Option>
                    ))}
                </Select>
                {/* Selected Hackathon Heading */}
                {selectedItemId && (
                    <Typography className="text-center mt-4" variant="h2">
                        {
                            arr.find(
                                (hackathon) => hackathon.id === selectedItemId
                            ).name
                        }
                    </Typography>
                )}
            </Card>

            {/* Hackathon Details Section */}
            <div className="mt-4">
                {selectedItemId ? (
                    // Check if an item is selected by checking if selectedItemId is truthy
                    // Find the selected hackathon from arr based on selectedItemId
                    arr.map((hackathon) => {
                        if (hackathon.id === selectedItemId) {
                            return (
                                <div key={hackathon.id}>
                                    <div className="w-full border border-black mt-1 rounded-xl">
                                        <Typography
                                            variant="body1"
                                            color="textSecondary"
                                        >
                                            Description: {hackathon.description}
                                        </Typography>
                                        <Typography
                                            variant="body1"
                                            color="textSecondary"
                                        >
                                            Start Date: {hackathon.start}
                                        </Typography>
                                        <Typography
                                            variant="body1"
                                            color="textSecondary"
                                        >
                                            End Date: {hackathon.end}
                                        </Typography>
                                    </div>
                                    <div className="w-full border border-black mt-1 rounded-xl">
                                        <Typography
                                            variant="body1"
                                            color="textSecondary"
                                        >
                                            Shortlist Criteria:
                                        </Typography>
                                        <ul>
                                            {Object.entries(
                                                hackathon.criteriaPoints
                                            ).map(([criterion, points]) => (
                                                <li key={criterion}>
                                                    {criterion}: {points} points
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="w-full border border-black mt-1 rounded-xl">
                                        <Typography
                                            variant="body1"
                                            color="textSecondary"
                                        >
                                            Timeline: {hackathon.timeline}
                                        </Typography>
                                    </div>
                                </div>
                            );
                        }
                        return null;
                    })
                ) : (
                    <Typography variant="body1" color="textSecondary">
                        Please select a hackathon to view details.
                    </Typography>
                )}
            </div>

            {/* Teams Section */}
            <div className="mt-4 flex">
                {/* Selected Teams */}
                <div
                    className="w-1/4 mr-4"
                    style={{ maxHeight: "300px", overflowY: "auto" }}
                >
                    <Card>
                        <Typography
                            className="text-center"
                            variant="body1"
                            color="textSecondary"
                        >
                            SELECT TEAMS
                        </Typography>
                        {/* Render teams associated with the selected hackathon */}
                        {selectedItemId &&
                            arr
                                .find(
                                    (hackathon) =>
                                        hackathon.id === selectedItemId
                                )
                                ?.teams.map((team, index) => (
                                    <div
                                        key={index}
                                        className="border-b border-gray-200 py-2 cursor-pointer"
                                        onClick={() => handleTeamClick(team)}
                                    >
                                        <Typography
                                            variant="body1"
                                            color="textSecondary"
                                        >
                                            Team {index + 1}:
                                        </Typography>
                                        <Typography variant="body1">
                                            Name: {team.name}
                                        </Typography>
                                        <Typography variant="body1">
                                            Idea: {team.idea}
                                        </Typography>
                                    </div>
                                ))}
                    </Card>
                </div>

                {/* Team Description with Accept/Reject Buttons */}
                <div className="w-3/4">
                    {selectedTeam && (
                        <Card>
                            <div className="p-4">
                                <Typography variant="h4" gutterBottom>
                                    {selectedTeam.name}
                                </Typography>
                                <Typography
                                    variant="body1"
                                    color="textSecondary"
                                >
                                    {selectedTeam.idea}
                                </Typography>
                                <Typography
                                    variant="body1"
                                    color="textSecondary"
                                >
                                    Description:
                                </Typography>
                                <Typography variant="body1">
                                    {selectedTeam.description}
                                </Typography>
                                <div className="flex justify-end mt-4">
                                    <Button
                                        color="green"
                                        onClick={() =>
                                            handleAcceptReject("Accept")
                                        }
                                    >
                                        Accept
                                    </Button>
                                    <Button
                                        color="red"
                                        onClick={() =>
                                            handleAcceptReject("Reject")
                                        }
                                        className="ml-2"
                                    >
                                        Reject
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    )}
                </div>
            </div>
        </div>
    );
};

export default YourComponent;
