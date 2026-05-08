import React, { useState, useEffect } from 'react';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const codespaceName = process.env.REACT_APP_CODESPACE_NAME;
  const apiUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api/activities/`
    : 'http://localhost:8000/api/activities/';

  useEffect(() => {
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return response.json();
      })
      .then((data) => {
        setActivities(Array.isArray(data) ? data : data.results || []);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [apiUrl]);

  if (error) return <div className="alert alert-danger m-3">Error loading activities: {error}</div>;

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
            <h2 className="h4 mb-0 fw-bold">🏃 Activities</h2>
            <span className="badge bg-secondary rounded-pill">{activities.length} records</span>
          </div>
          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table table-striped table-bordered table-hover mb-0">
                <thead className="table-dark">
                  <tr>
                    <th scope="col" style={{ width: '60px' }}>#</th>
                    <th scope="col">User</th>
                    <th scope="col">Activity Type</th>
                    <th scope="col">Duration (min)</th>
                    <th scope="col">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {activities.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="text-center text-muted py-4">No activities found.</td>
                    </tr>
                  ) : (
                    activities.map((activity, index) => (
                      <tr key={activity._id || index}>
                        <td className="text-muted">{index + 1}</td>
                        <td className="fw-semibold">{activity.user}</td>
                        <td>
                          <span className="badge bg-info text-dark">{activity.activity_type}</span>
                        </td>
                        <td>{activity.duration}</td>
                        <td>{activity.date}</td>
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

export default Activities;
