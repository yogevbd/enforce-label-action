# Enforce PR labels

Enforce assigning labels before merging PR's. Usefull for generating automatic changelog and release notes with `github-release-notes`

## Example usage
Create `.github/workflows/enforce-labels.yml` containing:

```yml
name: Enforce PR labels

on:
  pull_request:
    types: [labeled, unlabeled, opened, edited, synchronize]
jobs:
  enforce-label:
    runs-on: ubuntu-latest
    steps:
    - uses: yogevbd/enforce-label-action@2.1.0
      with:
        REQUIRED_LABELS_ANY: "bug,enhancement,skip-changelog"
        REQUIRED_LABELS_ANY_DESCRIPTION: "Select at least one label ['bug','enhancement','skip-changelog']"
        BANNED_LABELS: "banned"


```
**`REQUIRED_LABELS_ANY`**: Force PR's to have at least one label, accepts multiple labels seperated by a comma.  
**`REQUIRED_LABELS_ALL`**: Force PR's to have all labels, accepts multiple labels seperated by a comma.  
**`BANNED_LABELS`**: Prevent PR's with those labels to be merged, accepts multiple labels seperated by a comma.  

### Descriptions
**`REQUIRED_LABELS_ANY_DESCRIPTION`**: Controls the required any labels failure description. Default is `Please select one of the required labels for this PR: ${requiredLabelsAny}`.  
**`REQUIRED_LABELS_ALL_DESCRIPTION`**: Controls the required all labels failure description. Default is `All labels are required for this PR: ${requiredLabelsAll}`.  
**`BANNED_LABELS_DESCRIPTION`**: Controls the banned failure description. Default is `${bannedLabel.name} label is banned`.  
