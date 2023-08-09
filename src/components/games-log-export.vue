<script setup>
	import gamesLogSvc from '../services/games-log.js';

	const props = defineProps({
		gamesLogItems: Array
	})

	// Overwrites the current games log in local storage.
	function exportGamesLog(format) {
		console.log('exporting ...');
		if (format === undefined) {
			format = 'txt'; // For now the only format, future JSON?
		}

		var logString = '';

		if (format === 'txt') {
			const max = props.gamesLogItems.length;
			for (var i = 0; i < max; i++) {
				logString += gamesLogSvc.parseDisplayLogItem(props.gamesLogItems[i]) + String.fromCharCode(10);
			}
		}

		const now = new Date();
		const dateString = now.getFullYear() + '-' + String(1+now.getMonth()).padStart(2, '0') + '-' + String(now.getDate()).padStart(2, '0');

		saveData(logString, '7wonder-duel-results-' + dateString + '.txt');
	}
	
	// Presents a way to download data as a text file by adding, 
	// then clicking an invisible 'a' element.
	function saveData(data, fileName) {
		const a = document.createElement('a');
		const blob = new Blob([data], {type: "octet/stream"});
		const url = window.URL.createObjectURL(blob);
		a.href = url;
		a.download = fileName;
		a.click();
		window.URL.revokeObjectURL(url);
		a.remove();
	}
</script>

<template>
		<p 
			v-if="gamesLogItems.length > 1" 
			class="center"
			>
			
			<button class="games-log-export-button" @click="exportGamesLog()">Export games log</button>
		
		</p>
</template>

<style scoped>
	.games-log-export-button {
		padding: 1em;
		border-radius: 1em;
	}
</style>
