<script setup>
	import { ref, toRaw } from 'vue'
	import URLs from '../local-storage.js'

	const props = defineProps({
		gamesLogItems: Array
	})

	var emptyLog = {...props.gamesLogItems};
	
	var loadedLog = (function(storage) {
			var games = localStorage.getItem(storage);
			var pastGames = JSON.parse(games);
			// if (pastGames === null) { pastGames = []; }
			return pastGames;
		} (URLs.STORAGE));
	
	if (loadedLog !== null) {
		for (var key in loadedLog) {
			props.gamesLogItems.push(loadedLog[key]);
		}
	}
</script>

<template>
	<div v-if="gamesLogItems.length > 0">
		<h2>Games log</h2>

		<!-- double slice: the first one to get a shallow copy. -->
		<ul v-for="item in gamesLogItems.slice().reverse().slice(0,3)">
			<li>{{item}}</li>
		</ul>
	</div>
</template>

<style>
</style>
