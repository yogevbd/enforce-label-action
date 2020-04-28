import * as core from '@actions/core';
import * as github from '@actions/github';

async function run() {
  try {
    const requiredLabels = core.getInput('valid-labels', {required: true}).split(',');
    const requiredLabelsAll = core.getInput('valid-labels-all', {required: true}).split(',');
    const bannedLabels = core.getInput('banned-labels', {required: true}).split(',');

    core.debug(`Verified PR match valid labels: ${requiredLabels}`);

    const labels = github.context!.payload!.pull_request!.labels;
    console.log(`PR labels: ${JSON.stringify(github.context)}`);

    if (!requiredLabelsAll.every(requiredLabel => labels.find(l => l.name === requiredLabel))) {
      core.setFailed(`All labels are required for this PR: ${requiredLabelsAll}`);
    }

    if (!labels.some(l => requiredLabels.includes(l.name))) {
      core.setFailed(`Please select one of the required labels for this PR: ${requiredLabels}`);
    }

    let bannedLabel;
    if (bannedLabel = labels.find(l => bannedLabels.includes(l.name))) {
      core.setFailed(`${bannedLabel} label is banned`);
    }

  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
