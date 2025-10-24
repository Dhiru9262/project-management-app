import React, { useState } from "react";
import CreateProject from "../../components/CreateProject";
import MyProjects from "../../components/MyProjects";

export default function StudentDashboard({ user }) {
  return (
    <>
      <div>
        <div>
          <MyProjects email={user.email} />
        </div>
        <div className="min-h-screen">
          <CreateProject />
        </div>
      </div>
    </>
  );
}
