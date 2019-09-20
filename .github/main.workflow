workflow "Verify labels" {
  on = "push"
  resolves = "Verify"
}

action "Verify" {
  uses = "yogevbd/enforce-label-action@master"
  secrets = ["GITHUB_TOKEN"]
}