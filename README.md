# Enforce PR label

Enforce choosing label before merging PR. Usefull for generating automatic changelog and release notes with `github-release-notes`

## Example usage
Create `.github/main.workflow` containing:

```
workflow "Verify labels" {
  on = "pull_request"
  resolves = "Verify Labels"
}

action "Verify Labels" {
  uses = "yogevbd/enforce-label-action@1.0.1"
  secrets = ["GITHUB_TOKEN"]
  env = {
    VALID_LABELS = "bug,enhancement,feature"
  }
}
```

Edit `VALID_LABELS` array to contain your desired valid labels.

