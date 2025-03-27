import React from "react";

import HorizontalScrollBar from "../components/HorizontalScrollBar";
import NavBar from "../components/NavBar";
import { useState } from "react";
// import SignUpDialog from "../components/ESignupDailog";
import Faq from "../components/Faq";
// import DrawerDefault from "../components/Profile";
import Host from "../components/Host";
import Footer from "../components/Footer";
import BaseLayout from "../components/BaseLayout";
import Categories from "../components/Categories";
import { useSelector } from "react-redux";

function Home() {
    
    return (
        <BaseLayout>
            <div className="bg-white">
                <Categories />
                <HorizontalScrollBar />
                <Host />
                <Faq />
            </div>
        </BaseLayout>
    );
}

export default Home;
