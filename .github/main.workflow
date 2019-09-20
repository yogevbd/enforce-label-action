workflow "Verify labels" {
  on = "pull-request"
  resolves = "Verify"
}

action "Verify" {
  uses = "yogevbd/enforce-label-action@test"
  secrets = ["GITHUB_TOKEN"]
}