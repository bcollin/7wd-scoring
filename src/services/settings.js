import { reactive, toRaw } from 'vue';

var defaultSettings = {'showExplanations': {label: 'Show explanations', value: false }};

const storageId = '7wd-scoring-settings';

const settingsString = localStorage.getItem(storageId);

var settings = reactive({});
// Object.assign(settings, defaultSettings);
var settingsNew = {};


if (settingsString !== null && settingsString !== '') { 
	try { settingsNew = JSON.parse(settingsString); } catch {}
}

for (var key in defaultSettings) {
	if (settingsNew[key] === undefined) {
		settings[key] = defaultSettings[key];
	}
	else {
		settings[key] = settingsNew[key];
	}
}

function saveSettings() {
	var flatObject = toRaw(this.settings);
	var test = localStorage.setItem(storageId, JSON.stringify(flatObject));
}

export default {
	settings: settings,
	saveSettings: saveSettings
}
