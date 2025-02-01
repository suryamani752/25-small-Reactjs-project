import React from "react";
import { ProjectData } from "./data";
import Card from "../card";

const Home = () => {
  // console.log(ProjectData);
  return (
    <div className="flex flex-col justify-center items-center gap-2">
      <h1 className="mt-5 text-3xl font-extrabold">25 SMALL REACTJS PROJECTS</h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4 m-4 p-5">
        {ProjectData && ProjectData.length > 0
          ? ProjectData.map((singleProjectData) => (
              <Card
                name={singleProjectData.name}
                path={singleProjectData.path}
                key={singleProjectData.id}
              />
            ))
          : null}
      </div>
    </div>
  );
};

export default Home;
