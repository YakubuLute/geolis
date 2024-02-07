import React from "react";
import {Hero} from "../../component/landingPage";
import {Property} from "../../component/landingPage";
import {CallToAction} from "../../component/landingPage";
import {Search} from "../../component/landingPage";


function Home() {

  return (
    <main>
      <div>
        <Hero />
        <Search/>
        <Property />
        <CallToAction />
      </div>
    </main>
  );
}

export default Home;
