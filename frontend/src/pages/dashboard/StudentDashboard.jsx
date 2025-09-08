function StudentDashboard({ user }) {
  return (
    <div className="bg-white shadow-md rounded-2xl p-6">
      <h2 className="text-xl font-semibold mb-4">📚 Student Dashboard</h2>
      <p>Email: {user.email}</p>
      <p>
        Here you can view assignments, submit projects, and track your progress.
      </p>
    </div>
  );
}
export default StudentDashboard;
