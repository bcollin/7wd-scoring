<script setup>
	import gamesLogSvc from '../services/games-log.js';

	const props = defineProps({
		gamesLogItems: Array
	})

	function exportGamesLog(format) {
		console.log('exporting ...');
		if (format === undefined) {
			format = 'txt'; // For now the only format, future JSON?
		}

		var logString = '';

		if (format === 'txt') {
			var max = props.gamesLogItems.length;
			for (var i = 0; i < max; i++) {
				logString += gamesLogSvc.parseDisplayLogItem(props.gamesLogItems[i]) + String.fromCharCode(10);
			}
		}

		var now = new Date();
		var dateString = now.getFullYear() + '-' + String(1+now.getMonth()).padStart(2, '0') + '-' + String(now.getDate()).padStart(2, '0');

		saveData(logString, '7wonder-duel-results-' + dateString + '.txt');
	}
	
	function saveData(data, fileName) {
		var a = document.createElement('a');
		var blob = new Blob([data], {type: "octet/stream"});
		var url = window.URL.createObjectURL(blob);
		a.href = url;
		a.download = fileName;
		a.click();
		window.URL.revokeObjectURL(url);
		a.remove();
	}
</script>

<template>
		<p v-if="gamesLogItems.length > 1"><button @click="exportGamesLog()">Export games log</button></p>
</template>

<style>
</style>
