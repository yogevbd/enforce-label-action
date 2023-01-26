import * as core from '@actions/core';
import * as github from '@actions/github';

async function run() {
  try {
    const labels = github.context!.payload!.pull_request!.labels;

    enforceAnyLabels(labels);
    enforceAllLabels(labels);
    enforceBannedLabels(labels);

  } catch (error) {
    core.setFailed(error.message);
  }
}

function enforceAnyLabels(labels) {
  const requiredLabelsAny: string[] = getInputArray('REQUIRED_LABELS_ANY');
  if (requiredLabelsAny.length > 0 && !requiredLabelsAny.some(requiredLabel => labels.find((l) => l.name === requiredLabel))) {
    const requiredLabelsAnyDescription = getInputString('REQUIRED_LABELS_ANY_DESCRIPTION', `Please select one of the required labels for this PR: ${requiredLabelsAny}`);
    core.setFailed(requiredLabelsAnyDescription);
  }
}

function enforceAllLabels(labels) {
  const requiredLabelsAll = getInputArray('REQUIRED_LABELS_ALL');
  if (!requiredLabelsAll.every(requiredLabel => labels.find(l => l.name === requiredLabel))) {
    const requiredLabelsAllDescription = getInputString('REQUIRED_LABELS_ALL_DESCRIPTION', `All labels are required for this PR: ${requiredLabelsAll}`);
    core.setFailed(requiredLabelsAllDescription);
  }
}

function enforceBannedLabels(labels) {
  const bannedLabels = getInputArray('BANNED_LABELS');
  let bannedLabel;
    if (bannedLabels && (bannedLabel = labels.find(l => bannedLabels.includes(l.name)))) {
      const bannedLabelsDescription = getInputString('BANNED_LABELS_DESCRIPTION', `${bannedLabel.name} label is banned, if this check is required merging will be blocked until it is removed`);
      core.setFailed(bannedLabelsDescription);
    }
}

function getInputArray(name): string[] {
  const rawInput = core.getInput(name, {required: false});
  return rawInput !== '' ? rawInput.split(',') : [];
}

function getInputString(name, defaultValue): string {
  const rawInput = core.getInput(name, {required: false});
  return rawInput !== '' ? rawInput : defaultValue;
}

run();
