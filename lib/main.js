"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core = __importStar(require("@actions/core"));
const github = __importStar(require("@actions/github"));
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const requiredLabels = core.getInput('valid-labels', { required: true }).split(',');
            const requiredLabelsAll = core.getInput('valid-labels-all', { required: true }).split(',');
            const bannedLabels = core.getInput('banned-labels', { required: true }).split(',');
            core.debug(`Verified PR match valid labels: ${requiredLabels}`);
            const labels = github.context.payload.pull_request.labels;
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
        }
        catch (error) {
            core.setFailed(error.message);
        }
    });
}
run();
