// import { Button } from '@material-tailwind/react';
import React, { useEffect } from "react";
import AdminEvaluators from "./pages/AdminEvaluators";
import AdminHackathons from "./pages/AdminHackathons";
// import AdminDashboard from './components/AdminDashboard';
import Results from "./pages/Results";
import Home from "./pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Hackathons from "./pages/Hackathons";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchHackathons,
    fetchRequests,
    selectHackathons,
    selectRequests,
} from "./features/hackathon/hackathonSlice";
import {
    reattemptLogin,
    selectUserDetails,
    selectUserId,
    selectUserToken,
    updateToken,
} from "./features/user/userSlice";
import BaseLayout from "./components/BaseLayout";
import TeamDetails from "./pages/TeamDetails";
import PanelistShortlist from "./pages/PanelistShortlist";
import JudgeReview from "./pages/JudgeReview";
import {
    fetchJudgeTeamsByHackathonId,
    fetchPanelistTeamsByHackathonId,
    fetchTeamDetails,
} from "./features/team/teamSlice";
import { HACKATHONS, USER } from "./constants";
import { Slide, ToastContainer, toast } from "react-toastify";
import { fetchEvaluators } from "./features/evaluator/evaluatorSlice";
import Cookies from "js-cookie";
import HackathonRequests from "./pages/HackathonRequests";
import PastTeams from "./pages/PastTeams";
import { gapi } from "gapi-script";

import { CLIENT_ID } from "./constants";
// import Cookies from "js-cookie";
function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        function start() {
            gapi.client.init({
                clientId: CLIENT_ID,
                scope: "https://www.googleapis.com/auth/userinfo.profile",
            });
        }

        gapi.load("client:auth2", start);
    });

    //change to this for redux integration
    const hackathons = useSelector(selectHackathons);

    const token = useSelector(selectUserToken);
    // HACKATHONS;
    // useSelector((state) => state.hackathon.hackathons.data);
    const userData = useSelector(selectUserDetails);

    // const requests = useSelector(selectRequests);

    // useEffect(() => {
    //     console.log(requests);
    // }, [requests]);

    // const token = Cookies.get("token");
    useEffect(() => {
        dispatch(fetchHackathons());
        //just a work around until we have a proper userdetails fetch api

        //

        if (userData?.role === "admin") {
            dispatch(fetchEvaluators({ token }));
            dispatch(fetchRequests({ token }));
        }
        if (userData?.role === "participant") {
            dispatch(fetchTeamDetails({ userId, token }));
        }
        if (userData?.role === "judge") {
            dispatch(
                fetchJudgeTeamsByHackathonId({
                    hackathonId: userData?.assignedHackathon,
                    token,
                })
            );
        }
        if (userData?.role === "panelist") {
            dispatch(
                fetchPanelistTeamsByHackathonId({
                    hackathonId: userData?.assignedHackathon,
                    panelistid: userId,
                    token,
                })
            );
        }
    }, [userData, token]);

    useEffect(() => {
        const relogin = async () => {
            const userId = Cookies.get("userId");
            const token = Cookies.get("token");
            if (userId && token) {
                try {
                    await dispatch(reattemptLogin({ userId, token })).unwrap();
                    dispatch(updateToken(token));
                } catch (error) {
                    Cookies.remove("userId");
                    Cookies.remove("token");
                }
            }
        };
        relogin();
    }, []);

    const userId = useSelector(selectUserId);

    return (
        <div className="App">
            <ToastContainer
                position="top-left"
                autoClose={3800}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss={false}
                draggable
                pauseOnHover
                theme="light"
                transition={Slide}
                // className="z-999"
            />
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />

                    <Route path="hackathons" element={<Hackathons />} />
                    <Route
                        path="admin/hackathons"
                        element={<AdminHackathons />}
                    />
                    <Route
                        path="admin/evaluators"
                        element={<AdminEvaluators />}
                    />
                    <Route path="results/:hackathonId" element={<Results />} />
                    <Route path="teamdetails" element={<TeamDetails />} />
                    <Route
                        path="panelist/shortlist"
                        element={<PanelistShortlist />}
                    />
                    <Route path="judge/review" element={<JudgeReview />} />

                    <Route
                        path="admin/requests"
                        element={<HackathonRequests />}
                    />
                    <Route path="participations" element={<PastTeams />} />

                    {/* <Route path="trial" element={<PastTeams />} /> */}
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
