var defaultSettings = {'showExplanations': {label: 'Show explanations', value: false }};

const storageId = '7wd-scoring-settings';

const settingsString = localStorage.getItem(storageId);

var settings = {};
Object.assign(settings, defaultSettings);

if (settingsString !== null && settingsString !== '') { 
	settings = JSON.parse(settingsString);
			
	for (var key in defaultSettings) {
		if (settings[key] === undefined) {
			settings[key] = defaultSettings[key];
		}
	}
}
		
export default {
	settings: settings
}
