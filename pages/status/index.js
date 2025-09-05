import useSWR from "swr";

async function fecthAPI(key) {
  const response = await fetch(key);
  const responseBody = await response.json();
  return responseBody;
}

export default function StatusPage() {
  return (
    <>
      <h1>STATUS</h1>
      <UpdatedAt />
      <DatabaseStatus />
    </>
  );
}

function UpdatedAt() {
  const { isLoading, data } = useSWR("/api/v1/status", fecthAPI, {
    refreshInterval: 2000,
  });

  let updatedAtText = "Loading...";
  if (!isLoading && data) {
    updatedAtText = new Date(data.updated_at).toLocaleString("pt-BR");
  }

  return <div> Last update: {updatedAtText}</div>;
}

function DatabaseStatus() {
  const { isLoading, data } = useSWR("/api/v1/status", fecthAPI, {
    refreshInterval: 2000,
  });

  let databaseStatusText = "Loading...";
  if (!isLoading && data) {
    databaseStatusText = (
      <>
        <div> Version: {data.dependencies.database.version}</div>
        <div>
          Opened Connecions: {data.dependencies.database.opened_connections}
        </div>
        <div>Max Connections: {data.dependencies.database.max_connections}</div>
      </>
    );

    return (
      <>
        <h2>Database Status</h2>
        <div>{databaseStatusText}</div>
      </>
    );
  }
}
