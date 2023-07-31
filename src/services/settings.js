import { reactive } from 'vue';

var defaultSettings = {'showExplanations': {label: 'Show explanations', value: false }};

const storageId = '7wd-scoring-settings';

const settingsString = localStorage.getItem(storageId);

var settings = reactive({});
// Object.assign(settings, defaultSettings);
var settingsNew = {};


if (settingsString !== null && settingsString !== '') { 
	var settingsNew = JSON.parse(settingsString);
}

for (var key in defaultSettings) {
	if (settingsNew[key] === undefined) {
		settings[key] = defaultSettings[key];
		console.log('Default: ', defaultSettings[key]);
	}
	else {
		settings[key] = settingsNew[key];
		console.log('New: ', settingsNew[key]);
	}
}

console.log(settings);

function toggleSetting(key) {
	// console.log(settings.value);
	settings[key].value = !settings[key].value;
}
		
export default {
	settings: settings,
	toggleSetting: toggleSetting
}
