import React, { useState, useEffect } from 'react';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const codespaceName = process.env.REACT_APP_CODESPACE_NAME;
  const apiUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api/teams/`
    : 'http://localhost:8000/api/teams/';

  useEffect(() => {
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return response.json();
      })
      .then((data) => {
        setTeams(Array.isArray(data) ? data : data.results || []);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [apiUrl]);

  if (error) return <div className="alert alert-danger m-3">Error loading teams: {error}</div>;

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
            <h2 className="h4 mb-0 fw-bold">👥 Teams</h2>
            <span className="badge bg-secondary rounded-pill">{teams.length} records</span>
          </div>
          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table table-striped table-bordered table-hover mb-0">
                <thead className="table-dark">
                  <tr>
                    <th scope="col" style={{ width: '60px' }}>#</th>
                    <th scope="col">Team Name</th>
                    <th scope="col">Members</th>
                  </tr>
                </thead>
                <tbody>
                  {teams.length === 0 ? (
                    <tr>
                      <td colSpan="3" className="text-center text-muted py-4">No teams found.</td>
                    </tr>
                  ) : (
                    teams.map((team, index) => (
                      <tr key={team._id || index}>
                        <td className="text-muted">{index + 1}</td>
                        <td className="fw-semibold">{team.name}</td>
                        <td>
                          {Array.isArray(team.members)
                            ? team.members.map((m, i) => (
                                <span key={i} className="badge bg-primary me-1">{m}</span>
                              ))
                            : team.members}
                        </td>
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

export default Teams;
