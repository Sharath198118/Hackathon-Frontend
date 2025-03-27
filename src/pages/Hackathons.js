import React, { useEffect, useState } from "react";

import { HACKATHONS } from "../constants";
// import VerticalBar from "../components/VerticalBar";
import HackathonDetails from "../components/HackathonDetails";
import BaseLayout from "../components/BaseLayout";
import SearchFilter from "../components/SearchFilter";
import {
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    List,
    ListItem,
    Tab,
    Tabs,
    TabsHeader,
    Typography,
} from "@material-tailwind/react";

import { useSearchParams, useNavigate } from "react-router-dom";

import { IconButton, ButtonGroup } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchHackathons,
    selectHackathons,
} from "../features/hackathon/hackathonSlice";

const themes = [
    { name: "Life Sciences", value: "lifesciences" },
    { name: "Banking and Wealth", value: "banking" },
    { name: "Telecom", value: "telecom" },
    { name: "Product Engineering", value: "product" },
];

const TABS = [
    {
        label: "All",
        value: "all",
    },
    {
        label: "LS",
        value: "lifesciences",
    },
    {
        label: "B&WM",
        value: "banking",
    },
    {
        label: "TL",
        value: "telecom",
    },
    {
        label: "PE",
        value: "product",
    },
];

const Hackathons = () => {
    // const dispatch = useDispatch();

    // useEffect(() => {
    //     dispatch(fetchHackathons());
    // }, []);

    const hackathons = useSelector(selectHackathons);
    // HACKATHONS
    // useSelector((state) => state.hackathon.hackathons.data) || [];

    let [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();

    const [searchParamsObject, setSearchParamsObject] = useState(
        Object.fromEntries([...searchParams])
    );

    const [filteredHackathons, setFilteredHackathons] =
        React.useState(hackathons);

    useEffect(() => {
        setSearchParamsObject(Object.fromEntries([...searchParams]));
    }, [searchParams]);

    const [selectedHackathonId, setSelectedHackathonId] = React.useState(null);

    // console.log(hackathons)

    // useEffect(() => {}, [filteredHackathons]);

    useEffect(() => {
        if (searchParamsObject?.theme) {
            setFilteredHackathons(
                hackathons.filter(
                    (hackathon) =>
                        themes.find((theme) => theme.name === hackathon.theme)
                            .value === searchParamsObject.theme
                )
            );
        } else {
            setFilteredHackathons(hackathons);
        }
        if (searchParamsObject?.hackathonId) {
            setSelectedHackathonId(Number(searchParamsObject.hackathonId));
            // setSearchParams({});
            navigate("", { replace: true });
        }
    }, [searchParamsObject, hackathons]);

    useEffect(() => {
        if (filteredHackathons.length > 0) {
            setSelectedHackathonId(filteredHackathons[0]?.hackathonId);
        }
    }, [filteredHackathons]);

    // useEffect(() => {
    //     setFilteredHackathons(hackathons);
    // }, [hackathons]);

    const [activePage, setActivePage] = React.useState(1);

    const getPaginationItemProps = (index) => ({
        className: activePage === index ? "bg-gray-300 text-gray-900" : "",
        onClick: () => setActivePage(index),
    });

    const nextPage = () => {
        if (activePage === 5) return;

        setActivePage(activePage + 1);
    };

    const prevPage = () => {
        if (activePage === 1) return;

        setActivePage(activePage - 1);
    };

    const handleFilterClick = (keyword = "all") => {
        // console.log("hi" + keyword);
        if (keyword === "all") {
            // console.log(hackathons)
            setFilteredHackathons(hackathons);
            return;
        }

        setFilteredHackathons(
            hackathons.filter(
                (hackathon) =>
                    themes.find((theme) => theme.name === hackathon.theme)
                        .value === keyword
            )
        );
    };

    return (
        <BaseLayout>
            <div className="py-4 px-4 md:px-8">
                {/* <SearchFilter /> */}
                {/* {hackathons.length === 0 ? (
                    <Typography
                        variant="h4"
                        className="mb-2 px-2 font-semibold flex text-left justify-start"
                    >
                        No hackathons exist
                    </Typography>
                ) : ( */}
                <div className="grid md:grid-cols-3 gap-x-4 gap-y-2">
                    <div className="col-span-3 md:col-span-1">
                        <Card shadow={false} className="md:h-[86vh]">
                            <CardHeader floated={false} shadow={false}>
                                <Typography
                                    variant="h4"
                                    className="mb-2 px-2 font-semibold flex text-left justify-start"
                                >
                                    Hackathons List
                                </Typography>
                                <Tabs
                                    value={searchParamsObject?.theme || "all"}
                                    className="w-full"
                                >
                                    <TabsHeader className="w-full">
                                        {TABS.map(({ label, value }) => (
                                            <Tab
                                                key={value}
                                                value={value}
                                                onClick={() => {
                                                    handleFilterClick(value);
                                                }}
                                            >
                                                &nbsp;&nbsp;{label}
                                                &nbsp;&nbsp;
                                            </Tab>
                                        ))}
                                    </TabsHeader>
                                </Tabs>
                            </CardHeader>
                            <CardBody className="h-[68%] py-2">
                                <List>
                                    {filteredHackathons.length === 0 ? (
                                        <ListItem disabled={true}>
                                            No hackthons available.
                                        </ListItem>
                                    ) : null}
                                    {filteredHackathons.length > 6
                                        ? filteredHackathons
                                              .slice(0, 5)
                                              .map((hackathon) => {
                                                  //   console.log(
                                                  //       hackathon.name
                                                  //   );
                                                  return (
                                                      <ListItem
                                                          key={
                                                              hackathon.hackathonId
                                                          }
                                                          onClick={() => {
                                                              setSelectedHackathonId(
                                                                  hackathon.hackathonId
                                                              );
                                                          }}
                                                          className="flex justify-between"
                                                      >
                                                          {hackathon.name}
                                                          <>
                                                              {hackathon.isCompleted ? (
                                                                  <svg
                                                                      xmlns="http://www.w3.org/2000/svg"
                                                                      viewBox="0 0 24 24"
                                                                      fill="currentColor"
                                                                      className="w-6 h-6 fill-green-400"
                                                                  >
                                                                      <path
                                                                          fillRule="evenodd"
                                                                          d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                                                                          clipRule="evenodd"
                                                                      />
                                                                  </svg>
                                                              ) : null}
                                                          </>
                                                      </ListItem>
                                                  );
                                              })
                                        : filteredHackathons.map(
                                              (hackathon) => {
                                                  return (
                                                      <ListItem
                                                          selected={
                                                              selectedHackathonId ===
                                                              hackathon.hackathonId
                                                          }
                                                          key={
                                                              hackathon.hackathonId
                                                          }
                                                          onClick={() => {
                                                              setSelectedHackathonId(
                                                                  hackathon.hackathonId
                                                              );
                                                          }}
                                                          className="flex justify-between border border-gray-200"
                                                      >
                                                          {hackathon.name}
                                                          <>
                                                              {hackathon.isCompleted ? (
                                                                  <svg
                                                                      xmlns="http://www.w3.org/2000/svg"
                                                                      viewBox="0 0 24 24"
                                                                      fill="currentColor"
                                                                      className="w-5 h-5 fill-green-400"
                                                                  >
                                                                      <path
                                                                          fillRule="evenodd"
                                                                          d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                                                                          clipRule="evenodd"
                                                                      />
                                                                  </svg>
                                                              ) : null}
                                                          </>
                                                      </ListItem>
                                                  );
                                              }
                                          )}
                                    {/* <ListItem>Hello</ListItem>
                                    <ListItem>Hello</ListItem>
                                    <ListItem>Hello</ListItem>
                                    <ListItem>Hello</ListItem>
                                    <ListItem>Hello</ListItem>
                                    <ListItem>Hello</ListItem>

                                    <ListItem>Hello</ListItem>
                                    <ListItem>Hello</ListItem> */}
                                </List>
                                {/* <VerticalBar /> */}
                            </CardBody>
                            <CardFooter className="flex justify-center pt-2 pb-4">
                                <ButtonGroup variant="outlined" size="sm">
                                    <IconButton onClick={prevPage}>
                                        <ArrowLeftIcon
                                            strokeWidth={2}
                                            className="h-4 w-4"
                                        />
                                    </IconButton>
                                    <IconButton {...getPaginationItemProps(1)}>
                                        1
                                    </IconButton>
                                    <IconButton {...getPaginationItemProps(2)}>
                                        2
                                    </IconButton>
                                    <IconButton {...getPaginationItemProps(3)}>
                                        3
                                    </IconButton>
                                    <IconButton {...getPaginationItemProps(4)}>
                                        4
                                    </IconButton>
                                    <IconButton {...getPaginationItemProps(5)}>
                                        5
                                    </IconButton>
                                    <IconButton onClick={nextPage}>
                                        <ArrowRightIcon
                                            strokeWidth={2}
                                            className="h-4 w-4"
                                        />
                                    </IconButton>
                                </ButtonGroup>
                            </CardFooter>
                        </Card>
                        {/* <VerticalBar /> */}
                    </div>
                    {filteredHackathons.length !== 0 ? (
                        <div className="col-span-3 md:col-span-2">
                            <HackathonDetails
                                hackathons={hackathons}
                                selectedHackathonId={selectedHackathonId}
                            />
                        </div>
                    ) : null}
                </div>
                {/* )} */}
                {/* <VerticalBar /> */}
                {/* <HackathonDetails /> */}
            </div>
            {/* <div className='main flex overflow-y-auto 'style={{ height: '590px'}} > */}
            {/* </div> */}
        </BaseLayout>
    );
};

export default Hackathons;
