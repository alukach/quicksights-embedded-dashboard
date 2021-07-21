import { useEffect, useRef } from 'react'
import useSWR from 'swr'
import { embedDashboard } from 'amazon-quicksight-embedding-sdk';

const fetcher = (url) => fetch(url).then((res) => res.json())

const EmbeddedDashboard = ({ url }) => {
  const ref = useRef(null)

  useEffect(() => {
    embedDashboard({
      // https://github.com/awslabs/amazon-quicksight-embedding-sdk#step-2-configure-embedding
      url,
      container: ref.current,
      scrolling: "no",
      height: "AutoFit",
      // use this option in combination with height: AutoFit, to allow iframe height to resize dynamically, 
      // based on sheet height, on changing sheets.
      iframeResizeOnSheetChange: true, 
      footerPaddingEnabled: true,
    });
  }, [url])
  return <div ref={ref} />
}

const Dashboard = ({ isAdmin }) => {
  const { data, error } = useSWR(
    `/api/dashboard?${isAdmin ? 'admin=1' : ''}`,
    fetcher,
    // Prevent unnecessary duplicate fetches (causes multiple dashboard to be mounted)
    { revalidateOnFocus: false, revalidateOnReconnect: false } 
  )

  if (error) return <div>Failed to load</div>
  if (!data) return <div className="spinner-border m-2" role="status" />

  return <EmbeddedDashboard url={data.EmbedUrl} />
}

export default Dashboard