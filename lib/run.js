const request = require('./request')

const { GITHUB_SHA, GITHUB_EVENT_PATH, GITHUB_TOKEN } = process.env
const event = require(GITHUB_EVENT_PATH)
const { repository, pull_request } = event
const labels = pull_request.labels.map((l) => l.name);
const validLabels = process.env.VALID_LABELS.split(',');

const {
  owner: { login: owner }
} = repository
const { name: repo } = repository

const checkName = 'Enforce PR label'

const headers = {
  'Content-Type': 'application/json',
  Accept: 'application/vnd.github.antiope-preview+json',
  Authorization: `Bearer ${GITHUB_TOKEN}`,
  'User-Agent': 'enforce-label-action'
}
  
async function createCheck() {
  const body = {
    name: checkName,
    head_sha: GITHUB_SHA,
    status: 'in_progress',
    started_at: new Date()
  }

  const { data } = await request(`https://api.github.com/repos/${owner}/${repo}/check-runs`, {
    method: 'POST',
    headers,
    body
  })
  const { id } = data
  return id
}

function verifyLabel() {
  let success = 0;
  if (labels.some(l => validLabels.includes(l))) {
    success = 1;
  }

  return {
    conclusion: success == 1 ? 'success' : 'failure',
    output: {
      title: `Please add at least one valid label - ${validLabels}`
    }
  }
}

async function updateCheck(id, conclusion, output) {
  const body = {
    name: checkName,
    head_sha: GITHUB_SHA,
    status: 'completed',
    completed_at: new Date(),
    conclusion,
    output
  }

  await request(`https://api.github.com/repos/${owner}/${repo}/check-runs/${id}`, {
    method: 'PATCH',
    headers,
    body
  })
}

function exitWithError(err) {
  console.error('Error', err.stack)
  if (err.data) {
    console.error(err.data)
  }
  process.exit(1)
}

async function run() {
  const id = await createCheck()
  try {
    const { conclusion, output } = verifyLabel()
    await updateCheck(id, conclusion, output)
    if (conclusion === 'failure') {
      console.log(conclusion)
      process.exit(78)
    }
  } catch (err) {
    await updateCheck(id, 'failure')
    exitWithError(err)
  }
}

run().catch(exitWithError)
