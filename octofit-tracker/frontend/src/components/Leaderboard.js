import React, { useState, useEffect } from 'react';

function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const codespaceName = process.env.REACT_APP_CODESPACE_NAME;
  const apiUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api/leaderboard/`
    : 'http://localhost:8000/api/leaderboard/';

  useEffect(() => {
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return response.json();
      })
      .then((data) => {
        setEntries(Array.isArray(data) ? data : data.results || []);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [apiUrl]);

  if (error) return <div className="alert alert-danger m-3">Error loading leaderboard: {error}</div>;

  if (loading) return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '200px' }}>
      <div className="spinner-border text-warning" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );

  const getRankBadge = (rank) => {
    if (rank === 1) return <span className="rank-badge rank-1">1</span>;
    if (rank === 2) return <span className="rank-badge rank-2">2</span>;
    if (rank === 3) return <span className="rank-badge rank-3">3</span>;
    return <span className="text-muted">{rank}</span>;
  };

  return (
    <div className="row justify-content-center">
      <div className="col-12 col-xl-10">
        <div className="card shadow-sm">
          <div className="card-header bg-dark text-white d-flex align-items-center justify-content-between">
            <h2 className="h4 mb-0 fw-bold">🏆 Leaderboard</h2>
            <span className="badge bg-secondary rounded-pill">{entries.length} records</span>
          </div>
          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table table-striped table-bordered table-hover mb-0">
                <thead className="table-dark">
                  <tr>
                    <th scope="col" style={{ width: '80px' }}>Rank</th>
                    <th scope="col">User</th>
                    <th scope="col" style={{ width: '120px' }}>Score</th>
                  </tr>
                </thead>
                <tbody>
                  {entries.length === 0 ? (
                    <tr>
                      <td colSpan="3" className="text-center text-muted py-4">No leaderboard entries found.</td>
                    </tr>
                  ) : (
                    entries.map((entry, index) => (
                      <tr key={entry._id || index} className={index === 0 ? 'table-warning' : ''}>
                        <td className="text-center">{getRankBadge(index + 1)}</td>
                        <td className="fw-semibold">{entry.user}</td>
                        <td>
                          <span className="badge bg-success fs-6">{entry.score}</span>
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

export default Leaderboard;
