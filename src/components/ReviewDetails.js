import React, { useEffect, useState } from "react";
import { USER } from "../constants";
import {
    Button,
    Card,
    CardBody,
    Typography,
    Progress,
    Dialog,
    DialogBody,
    DialogHeader,
    DialogFooter,
    Rating,
    Textarea,
} from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";
import { fetchJudgeTeamsByHackathonId, rateTeam } from "../features/team/teamSlice";
import { selectUserDetails, selectUserToken } from "../features/user/userSlice";
import { toast } from "react-toastify";

const ReviewDetails = ({ hackathons, selectedIdeaId, IDEAS }) => {
    const dispatch = useDispatch();
    const userData = useSelector(selectUserDetails);
    const token = useSelector(selectUserToken);
    const [reviewSubmitted, setReviewSubmitted] = useState(false);

    const [selectedHackathon, setSelectedHackathon] = useState(
        hackathons?.find(
            (hackathon) => hackathon.hackathonId === userData?.assignedHackathon
        )
    );

    const [selectedIdea, setSelectedIdea] = useState(
        IDEAS?.find((idea) => idea.teamId === selectedIdeaId)
    );

    useEffect(() => {
        setSelectedIdea(
            IDEAS?.find((idea) => idea?.teamId === selectedIdeaId) || IDEAS[0]
        );
    }, [selectedIdeaId, IDEAS]);

    useEffect(() => {
        if (selectedIdea) {
            setReviewSubmitted(
                selectedIdea?.userIds?.filter(
                    (user) => user === userData.userId
                ).length > 0
            );
        }
    }, [selectedIdea]);

    const [openRules, setOpenRules] = useState(false);

    const handleOpenRules = () => {
        setOpenRules(!openRules);
    };
    const [reviewData, setReviewData] = useState({ rating: 0 });

    const handleRating = (rate) => {
        setReviewData({
            ...reviewData,
            rating: rate,
            teamId: selectedIdeaId,
            userId: userData?.userId,
        });
    };

    const handleFeedback = (e) => {
        const { name, value } = e.target;
        setReviewData({ ...reviewData, feedback: value });
    };
    const [validationErrors, setValidationErrors] = useState({});
    const handleReviewSubmit = async () => {
        //dispatch judge review here
        const newErrors = {};
        if (reviewData.rating === 0) {
            newErrors.rating = "Rating is required";
        }
        if (!reviewData.feedback) {
            newErrors.rating = "Feedback is required";
        }
        if (reviewData.feedback && reviewData.feedback.length > 255) {
            newErrors.feedback =
                "Feedback Should Not Contain More Than 255 Characters";
        }
        if (Object.keys(newErrors).length > 0) {
            setValidationErrors(newErrors);
        } else {
            try {
                console.log(reviewData);
                await dispatch(rateTeam({ ...reviewData, token })).unwrap();
                await dispatch(
                    fetchJudgeTeamsByHackathonId({
                        hackathonId: userData?.assignedHackathon,
                        token,
                    })
                ).unwrap();
                toast.success("Review submitted succesfully");
            } catch (error) {
                toast.error(`Error ${error?.message}`);
            }
        }
        setValidationErrors(newErrors);
    };

    return (
        <>
            {/* {!loading &&  */}
            <div className="md:px-2 w-full">
                {selectedHackathon ? (
                    <Card shadow={false} className="mb-3">
                        <CardBody>
                            <div className="w-full grid md:grid-cols-6">
                                <Typography
                                    className="md:col-span-5 mb-1 px-2 font-semibold flex text-incedo-secondary-600 text-left justify-start"
                                    variant="h2"
                                    // color="black"
                                >
                                    {selectedHackathon?.name || ""}
                                </Typography>
                                <div className="md:col-span-1 py-1 flex items-center justify-end">
                                    <Button
                                        variant="outlined"
                                        size="sm"
                                        className="m-1"
                                        onClick={handleOpenRules}
                                    >
                                        Details
                                    </Button>
                                </div>
                            </div>
                            <div className="mb-1 w-full rounded-2xl p-2 py-1 text-incedo-tertiary-900">
                                <Typography variant="h4">
                                    Theme: {selectedHackathon?.theme || ""}
                                </Typography>
                            </div>
                            <div className="w-full px-2">
                                <div className="mb-2 flex items-center justify-between gap-4">
                                    <Typography color="blue-gray" variant="h6">
                                        Shortlist Deadline
                                    </Typography>
                                    <Typography color="blue-gray" variant="h6">
                                        50% Elapsed
                                    </Typography>
                                </div>
                                <Progress value={50} />
                            </div>
                        </CardBody>
                    </Card>
                ) : null}

                {IDEAS.length !== 0 && selectedIdeaId ? (
                    <Card
                        shadow={false}
                        className="md:min-h-[52.2vh] md:max-h-[52.2vh] overflow-auto"
                    >
                        <CardBody>
                            <div className="w-full">
                                <div className=" w-full rounded-2xl p-2 py-1 text-incedo-tertiary-900">
                                    <Typography variant="h3">
                                        {selectedIdea?.ideaTitle || ""}
                                    </Typography>
                                    <Typography
                                        variant="h5"
                                        className=" text-gray-600"
                                    >
                                        {selectedIdea?.ideaDomain || ""}
                                    </Typography>
                                </div>
                            </div>

                            <div className="w-full mt-1 rounded-2xl p-2">
                                <Typography className="">
                                    {selectedIdea?.ideaBody || ""}
                                </Typography>
                            </div>
                            <div className="flex flex-row p-2 gap-4">
                                <Link
                                    to={selectedIdea?.ideaRepo || "#"}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <Typography className="underline">
                                        Repo Link
                                    </Typography>
                                </Link>
                                <Link
                                    to={selectedIdea?.ideaFiles || "#"}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <Typography className="underline">
                                        Files Link
                                    </Typography>
                                </Link>
                            </div>
                            {reviewSubmitted ? (
                                <Typography className="p-2 py-1 text-green-400">
                                    Review Submitted &#10004;
                                </Typography>
                            ) : (
                                <div>
                                    <div className="w-full rounded-2xl flex gap-3 p-2 py-1 items-center">
                                        Rating*:
                                        <Rating
                                            unratedColor="amber"
                                            ratedColor="amber"
                                            value={reviewData?.rating || 0}
                                            onChange={(value) =>
                                                handleRating(value)
                                            }
                                            // readonly=
                                        />
                                    </div>
                                    <div className="w-full mt-2 rounded-2xl flex gap-3 p-2 py-1 items-center">
                                        <Textarea
                                            // disabled={
                                            // }
                                            label="Feedback*"
                                            name="feedback"
                                            value={reviewData?.feedback || ""}
                                            onChange={handleFeedback}
                                        />
                                    </div>
                                    <div className="flex gap-2 p-2 justify-center md:justify-start w-full">
                                        <Button
                                            size="sm"
                                            className="rounded-md"
                                            onClick={handleReviewSubmit}
                                        >
                                            Submit Review
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </CardBody>
                    </Card>
                ) : null}
                <Dialog open={openRules} handler={handleOpenRules}>
                    <DialogHeader>
                        <Typography
                            className="mb-1 px-2 font-semibold flex text-incedo-secondary-600 text-left justify-start"
                            variant="h2"
                            // color="black"
                        >
                            {selectedHackathon?.name || ""}
                        </Typography>
                    </DialogHeader>
                    <DialogBody>
                        <div className="overflow-auto  max-h-[60vh]">
                            <div className="w-full mt-1 rounded-2xl p-2">
                                <Typography className="">
                                    {selectedHackathon?.description || ""}
                                </Typography>
                            </div>
                            <div className="w-full mt-1 rounded-2xl p-2">
                                <Typography variant="h4">
                                    Rules and Guidlines
                                </Typography>
                                <Typography>
                                    {selectedHackathon?.description || ""}
                                </Typography>
                            </div>
                            <div className="w-full rounded-2xl p-2">
                                <Typography variant="h4">
                                    Judging Criteria
                                </Typography>
                                <Typography>
                                    {selectedHackathon?.description || ""}
                                </Typography>
                            </div>
                        </div>
                    </DialogBody>
                    <DialogFooter>
                        <Button
                            variant="text"
                            color="red"
                            onClick={handleOpenRules}
                            className="mr-1"
                        >
                            <span>Cancel</span>
                        </Button>
                        <Button
                            variant="gradient"
                            color="green"
                            onClick={handleOpenRules}
                        >
                            <span>Confirm</span>
                        </Button>
                    </DialogFooter>
                </Dialog>
            </div>
            {/* } */}
        </>
    );
};

export default ReviewDetails;
