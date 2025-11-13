import React, { useState } from "react";
import CreateProject from "../../components/CreateProject";
import MyProjects from "../../components/MyProjects";

export default function StudentDashboard({ user }) {
  const [refresh, setRefresh] = useState(false);

  // Function to toggle refresh
  const handleProjectChange = () => {
    setRefresh((prev) => !prev);
  };

  return (
    <>
      <div>
        <div>
          <MyProjects email={user.email} refresh={refresh} />
        </div>
        <div className="min-h-screen">
          <CreateProject onProjectAdded={handleProjectChange} />
        </div>
      </div>
    </>
  );
}
