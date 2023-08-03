import { reactive, toRaw } from 'vue';
import localStorageSvc from './local-storage.js';

var defaultSettings = {'showExplanations': {label: 'Show explanations', value: false }};

var settingsNew = localStorageSvc.read(defaultSettings, 'settings');

var settings = reactive(settingsNew);

export default {
	settings: settings,
}
