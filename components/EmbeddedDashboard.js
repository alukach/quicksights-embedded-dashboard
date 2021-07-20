import useSWR from 'swr'

const fetcher = (url) => fetch(url).then((res) => res.json())

const Dashboard = ({ isAdmin }) => {
  const { data, error } = useSWR(`/api/dashboard?admin=${isAdmin}`, fetcher)

  if (error) return <div>Failed to load</div>
  if (!data) return <div className="spinner-border m-2" role="status" />

  return (
    <iframe
      src={data.EmbedUrl}
      title="dashboard"
      sandbox="allow-same-origin allow-scripts"
      height="1000px"
      width="100%"
      style={{ border: "1px solid #eee" }}
    />
  )
}

export default Dashboard