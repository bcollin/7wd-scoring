<script setup>
	import { ref, toRaw } from 'vue'
	import localStorageLib from '../local-storage.js'

	const props = defineProps({
		gamesLogItems: Array
	})

	var emptyLog = {...props.gamesLogItems};
	
	var loadedLog = (function(storage) {
			var games = localStorage.getItem(storage);
			var pastGames = JSON.parse(games);
			// if (pastGames === null) { pastGames = []; }
			return pastGames;
		} (localStorageLib.STORAGE));
	
	if (loadedLog !== null) {
		for (var key in loadedLog) {
			props.gamesLogItems.push(loadedLog[key]);
		}
	}
	
	var maxItems = ref(6);
	
	function upMaxItems() {
		maxItems.value += 6;
		if (maxItems > props.gamesLogItems.length) {
			maxItems.value = props.gamesLogItems.length;
		}
	}
	
	function exportGamesLog(format) {
		console.log('exporting ...');
		if (format === undefined) {
			format = 'txt'; // For now the only format, future JSON?
		}

		var logString = '';

		if (format === 'txt') {
			var max = props.gamesLogItems.length;
			for (var i = 0; i < max; i++) {
				logString += parseDisplayLogItem(props.gamesLogItems[i]) + String.fromCharCode(10);
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

	function parseDisplayLogItem(item) {
		if (typeof item !== 'object') { return ''; }
		var out = '';
		
		const winningPlayer = localStorageLib.phraseWinners(item.winner, item.players);
		out = item.dt + ', ' + item.result + ' ' + winningPlayer + ' ';
		
		return out;
	};
	
</script>

<template>
	<div v-if="gamesLogItems.length > 0">
		<h2>Games log</h2>
		
		<!-- double slice: the first one to get a shallow copy. -->
		<ul v-for="item in gamesLogItems.slice().reverse().slice(0,maxItems)">
			<li>{{parseDisplayLogItem(item)}}</li>
		</ul>
		
		<p v-if="maxItems < gamesLogItems.length"><button @click="upMaxItems">Show more</button></p>
		
		<p v-if="gamesLogItems.length > 1"><button @click="exportGamesLog()">Export games log</button></p>
	</div>
</template>

<style>
</style>
