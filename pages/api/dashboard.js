import { QuickSightClient, GetDashboardEmbedUrlCommand } from "@aws-sdk/client-quicksight"; // ES Modules import

const client = new QuickSightClient();
const config = {
  // quicksightIdentityType: "IAM", // if you want to login as the user running this service
  quicksightIdentityType: "QUICKSIGHT", // if you want to support using arbitrary quicksigt users
  // quicksightIdentityType: "ANONYMOUS", // only available with "session capacity pricing" ($250+/month)

  adminUsername: process.env.ADMIN_USERNAME,
  anonUsername: process.env.ANON_USERNAME,
  awsAccountId: process.env.AWS_ACCOUNT_ID,
  dashboardId: process.env.DASHBOARD_ID
}

export default function handler(req, res) {
  client
    .send(
      new GetDashboardEmbedUrlCommand({
        AwsAccountId: config.awsAccountId,
        DashboardId: config.dashboardId,
        SessionLifetimeInMinutes: 600,
        ...getIdentityDetails(config, req.query.admin),
      })
    )
    .then(response => res.status(200).json(response))
    .catch(err => res.status(500).json(err))
}


function getIdentityDetails(config, admin) {
  const identityDetails = { "IdentityType": config.quicksightIdentityType }

  if (config.quicksightIdentityType === "ANONYMOUS") {
    identityDetails["Namespace"] = "default"
  }
  else if (config.quicksightIdentityType === "QUICKSIGHT") {
    const user = admin ? config.adminUsername : config.anonUsername
    const arn = `arn:aws:quicksight:${'us-east-1'}:${config.awsAccountId}:user/default/${user}`
    identityDetails["UserArn"] = arn
  }

  return identityDetails
}