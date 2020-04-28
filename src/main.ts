import * as core from '@actions/core';
import * as github from '@actions/github';

async function run() {
  try {
    const requiredLabelsInput = core.getInput('REQUIRED_LABELS_ANY', {required: false});
    const requiredLabels = requiredLabelsInput !== '' && requiredLabelsInput.split(',');

    const requiredLabelsAllInput = core.getInput('REQUIRED_LABELS_ALL', {required: false});
    const requiredLabelsAll = requiredLabelsAllInput !== '' ? requiredLabelsAllInput.split(',') : [];
    
    const bannedLabelsInput = core.getInput('BANNED_LABELS', {required: false});
    const bannedLabels = bannedLabelsInput !== '' ? bannedLabelsInput.split(',') : [];

    core.debug(`Verified PR match valid labels: ${requiredLabels}`);

    const labels = github.context!.payload!.pull_request!.labels;
    console.log(`PR labels: ${JSON.stringify(github.context)}`);

    if (!requiredLabelsAll.every(requiredLabel => labels.find(l => l.name === requiredLabel))) {
      core.setFailed(`All labels are required for this PR: ${requiredLabelsAll}`);
    }

    if (requiredLabels && !labels.some(l => requiredLabels.includes(l.name))) {
      core.setFailed(`Please select one of the required labels for this PR: ${requiredLabels}`);
    }

    let bannedLabel;
    if (bannedLabel = labels.find(l => bannedLabels.includes(l.name))) {
      core.setFailed(`${bannedLabel.name} label is banned`);
    }

  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
