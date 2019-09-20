workflow "Verify labels" {
  on = "push"
  resolves = "Verify"
}

action "Verify" {
  uses = "yogevbd/enforce-label-action@test"
  secrets = ["GITHUB_TOKEN"]
}