<script setup>
	import { ref } from 'vue';
	import gamesLogExport from './games-log-export.vue';
	import localStorageSvc from '../services/local-storage.js';
	import gamesLogSvc from '../services/games-log.js';

	const props = defineProps({
		gamesLogItems: Array
	})

	var loadedLog = localStorageSvc.read([], 'scores');
	
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
</script>

<template>
	<div id="gameslog" v-if="gamesLogItems.length > 0">
		<h2>Games log</h2>
		
		<!-- double slice: the first one to get a shallow copy. -->
		<ul v-for="item in gamesLogItems.slice().reverse().slice(0,maxItems)">
			<li>{{gamesLogSvc.parseDisplayLogItem(item)}}</li>
		</ul>
		
		<p v-if="maxItems < gamesLogItems.length"><button @click="upMaxItems">Show more</button></p>
		
		<gamesLogExport :games-log-items="gamesLogItems"></gamesLogExport>
	</div>
</template>

<style>
</style>
