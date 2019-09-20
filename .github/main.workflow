workflow "Verify labels" {
  on = "pullrequest"
  resolves = "Verify"
}

action "Verify" {
  uses = "yogevbd/enforce-label-action@test"
  secrets = ["GITHUB_TOKEN"]
}