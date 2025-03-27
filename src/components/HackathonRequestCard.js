import React from "react";
import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    Avatar,
} from "@material-tailwind/react";

const HackathonRequestCard = ({name, email, details}) => {
    return (
        <div>
            <Card
                // color="transparent"
                shadow={false}
                className="w-full px-4 py-0"
            >
                <CardHeader
                    color="transparent"
                    floated={false}
                    shadow={false}
                    className="mx-0 flex items-center gap-4 pb-3"
                >
                    <div className="flex w-full flex-col gap-0.5">
                        <div className="flex items-center justify-between">
                            <Typography variant="h5" color="blue-gray">
                                {name}
                            </Typography>
                        </div>
                        <Typography color="blue-gray">
                            {email}
                        </Typography>
                    </div>
                </CardHeader>
                <CardBody className="mb-6 p-0">
                    <Typography>
                        Details: &quot;{details}&quot;
                    </Typography>
                </CardBody>
            </Card>
        </div>
    );
};

export default HackathonRequestCard;
