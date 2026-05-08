import React, { useState, useEffect } from 'react';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const codespaceName = process.env.REACT_APP_CODESPACE_NAME;
  const apiUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api/workouts/`
    : 'http://localhost:8000/api/workouts/';

  useEffect(() => {
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return response.json();
      })
      .then((data) => {
        setWorkouts(Array.isArray(data) ? data : data.results || []);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [apiUrl]);

  if (error) return <div className="alert alert-danger m-3">Error loading workouts: {error}</div>;

  if (loading) return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '200px' }}>
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );

  return (
    <div className="row justify-content-center">
      <div className="col-12 col-xl-10">
        <div className="card shadow-sm">
          <div className="card-header bg-dark text-white d-flex align-items-center justify-content-between">
            <h2 className="h4 mb-0 fw-bold">💪 Workouts</h2>
            <span className="badge bg-secondary rounded-pill">{workouts.length} records</span>
          </div>
          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table table-striped table-bordered table-hover mb-0">
                <thead className="table-dark">
                  <tr>
                    <th scope="col" style={{ width: '60px' }}>#</th>
                    <th scope="col">Workout Name</th>
                    <th scope="col">Description</th>
                  </tr>
                </thead>
                <tbody>
                  {workouts.length === 0 ? (
                    <tr>
                      <td colSpan="3" className="text-center text-muted py-4">No workouts found.</td>
                    </tr>
                  ) : (
                    workouts.map((workout, index) => (
                      <tr key={workout._id || index}>
                        <td className="text-muted">{index + 1}</td>
                        <td className="fw-semibold">{workout.name}</td>
                        <td>{workout.description}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Workouts;
