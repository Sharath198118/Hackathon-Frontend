import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
    Navbar,
    MobileNav,
    Typography,
    Button,
    IconButton,
    Input,
    Collapse,
    Avatar,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { USER } from "../constants";
import { selectUserDetails } from "../features/user/userSlice";

const NavBar = ({ toggleSignInModal, toggleSignUpModal, openDrawer }) => {
    const userData = useSelector(selectUserDetails);
    const [user, setUser] = useState(userData);

    useEffect(() => {
        setUser(userData);
    }, [userData]);

    const [openNav, setOpenNav] = React.useState(false);

    React.useEffect(() => {
        window.addEventListener(
            "resize",
            () => window.innerWidth >= 960 && setOpenNav(false)
        );
    }, []);

    const navList = (
        <ul className="mt-2 mb-4 text-[#eaeff7] flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-4">
            {user?.role === "panelist" ? (
                <Typography
                    as="li"
                    variant="small"
                    className="flex items-center gap-x-2 p-1 font-semibold"
                >
                    <Link
                        to="/panelist/shortlist"
                        className="flex items-center gap-x-1"
                    >
                        Shortlist
                    </Link>
                </Typography>
            ) : null}
            {user?.role === "judge" ? (
                <Typography
                    as="li"
                    variant="small"
                    className="flex items-center gap-x-2 p-1 font-semibold"
                >
                    <Link
                        to="/judge/review"
                        className="flex items-center gap-x-1"
                    >
                        Review
                    </Link>
                </Typography>
            ) : null}
            <Typography
                as="li"
                variant="small"
                className="flex items-center gap-x-2 p-1 font-semibold"
            >
                <Link to="/hackathons" className="flex items-center gap-x-1">
                    Hackathons
                </Link>
            </Typography>
            {user?.role === "admin" ? (
                <Typography
                    as="li"
                    variant="small"
                    className="flex items-center gap-x-2 p-1 font-semibold "
                >
                    <Link
                        to={
                            "/admin/hackathons"
                        }
                        className="flex items-center gap-x-1"
                    >
                        Create Hackathons
                    </Link>
                </Typography>
            ) : null}

            {user?.role === "admin" ? (
                <Typography
                    as="li"
                    variant="small"
                    className="flex items-center gap-x-2 p-1 font-semibold"
                >
                    <Link
                        to="/admin/evaluators"
                        className="flex items-center gap-x-1"
                    >
                        Evaluators
                    </Link>
                </Typography>
            ) : null}
            {user?.role === "admin" ? (
                <Typography
                    as="li"
                    variant="small"
                    className="flex items-center gap-x-2 p-1 font-semibold"
                >
                    <Link
                        to="/admin/requests"
                        className="flex items-center gap-x-1"
                    >
                        Requests
                    </Link>
                </Typography>
            ) : null}
            {user?.role === "participant" ? (
                <Typography
                    as="li"
                    variant="small"
                    className="flex items-center gap-x-2 p-1 font-semibold"
                >
                    <Link
                        to="/teamdetails"
                        className="flex items-center gap-x-1"
                    >
                        Team Details
                    </Link>
                </Typography>
            ) : null}
            {user?.role === "participant" ? (
                <Typography
                    as="li"
                    variant="small"
                    className="flex items-center gap-x-2 p-1 font-semibold"
                >
                    <Link
                        to="/participations"
                        className="flex items-center gap-x-1"
                    >
                        My Participations
                    </Link>
                </Typography>
            ) : null}
            {false ? (
                <Typography
                    as="li"
                    variant="small"
                    className="flex items-center gap-x-2 p-1 font-semibold"
                >
                    <Link to="/results" className="flex items-center gap-x-1">
                        Results
                    </Link>
                </Typography>
            ) : null}
            {!user ? (
                <Button
                    size="sm"
                    variant="outlined"
                    className=" rounded-md border-2 opacity-85 hover:opacity-100"
                    ripple={true}
                    onClick={toggleSignInModal}
                    color="white"
                >
                    Login
                </Button>
            ) : null}
            {!user ? (
                <Button
                    size="sm"
                    variant="outlined"
                    className="rounded-md border-2 opacity-85 hover:opacity-100"
                    ripple={true}
                    onClick={toggleSignUpModal}
                    color="white"
                >
                    Register
                </Button>
            ) : null}
            {user ? (
                <Link
                    as="li"
                    onClick={openDrawer}
                    className="flex items-center cursor-pointer"
                >
                    <Avatar
                        src={`https://ui-avatars.com/api/?background=random&name=${user?.name[0]}`}
                        alt={""}
                        size="sm"
                        className="w-8 h-8 hidden lg:block"
                    />
                    <Typography
                    as="li"
                    variant="small"
                    className="flex items-center lg:hidden gap-x-2 p-1 font-semibold"
                >
                        Profile
                        </Typography>
                </Link>
            ) : null}
        </ul>
    );

    return (
        <Navbar className="w-full px-4 py-2 lg:px-8 lg:py-2 rounded-none border-0 max-w-none bg-[#050911]">
            <div className="w-full flex flex-wrap items-center justify-between text-incedo-primary-600">
                <Link to="/">
                    <Typography
                        className="mr-4 cursor-pointer py-1.5 font-bold"
                        variant="h5"
                    >
                        HackerHub
                    </Typography>
                </Link>
                <div className="hidden lg:block">{navList}</div>

                <IconButton
                    variant="text"
                    className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
                    ripple={false}
                    onClick={() => setOpenNav(!openNav)}
                >
                    {openNav ? (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            className="h-6 w-6"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    ) : (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        </svg>
                    )}
                </IconButton>
            </div>
            <Collapse open={openNav}>
                <div className="container mx-auto">
                    {navList}
                </div>
            </Collapse>
        </Navbar>
    );
};

export default NavBar;
