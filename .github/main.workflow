workflow "Verify labels" {
  on = "pull_request"
  resolves = "VerifyLabels"
}

action "VerifyLabels" {
  uses = "yogevbd/enforce-label-action@master"
  secrets = ["GITHUB_TOKEN"]
  env = {
    VALID_LABELS = "bug,enhancement,feature"
  }
}