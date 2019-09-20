# Enforce PR label

Enforce choosing label before merging PR. Usefull for generating automatic changelog and release notes with `github-release-notes`

## Example usage
Create `.github/main.workflow` containing:

```
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
```