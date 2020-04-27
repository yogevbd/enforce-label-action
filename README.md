# Enforce PR label

Enforce choosing label before merging PR. Usefull for generating automatic changelog and release notes with `github-release-notes`

## Example usage
Create `.github/workflows/enforce-labels.yml` containing:

```
name: Require PR label

on:
  pull_request:
    types: [opened, labeled, unlabeled]

jobs:
  require-label:
    runs-on: ubuntu-latest
    steps:
    - uses: yogevbd/enforce-label-action@master
      with:
        VALID_LABELS: "bug,enhancement,feature"
        GITHUB_TOKEN: "${{ secrets.GITHUB_TOKEN }}"
```

Edit `VALID_LABELS` array to contain your desired valid labels.
