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
		
		<p v-if="maxItems < gamesLogItems.length" @click="upMaxItems"><button>Show more</button></p>
	</div>
</template>

<style>
</style>
