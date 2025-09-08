function TeacherDashboard({ user }) {
  return (
    <div className="bg-white shadow-md rounded-2xl p-6">
      <h2 className="text-xl font-semibold mb-4">👨‍🏫 Teacher Dashboard</h2>
      <p>Email: {user.email}</p>
      <p>
        Here you can manage classes, review student submissions, and assign
        tasks.
      </p>
    </div>
  );
}
export default TeacherDashboard;
