workflow "Verify labels" {
  on = "pull_request"
  resolves = "Verify"
}

action "Verify" {
  uses = "yogevbd/enforce-label-action@test"
  secrets = ["GITHUB_TOKEN"]
}