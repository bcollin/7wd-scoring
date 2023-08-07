<script setup>
	import { ref, toRaw, computed } from 'vue';
	import localStorageSvc from '../services/local-storage.js';
	import gamesLogSvc from '../services/games-log.js';
	import GamesLogExport from './games-log-export.vue';

	const props = defineProps({
		gamesLogItems: Array
	})

	const loadedLog = localStorageSvc.read([], 'scores');
	
	if (loadedLog !== null) {
		for (var key in loadedLog) {
			props.gamesLogItems.push(loadedLog[key]);
		}
	}
	
	var maxItems = ref(6);
	
	const sortedItemList = computed(() => { 
		return props.gamesLogItems.reverse().slice(0, maxItems.value);
	});
	
	function upMaxItems() {
		maxItems.value += 6;
		if (maxItems.value > props.gamesLogItems.length) {
			maxItems.value = props.gamesLogItems.length;
		}
	}
</script>

<template>
	<div 
		id="gameslog" 
		v-if="gamesLogItems.length > 0" >
		
		<h2>Games log</h2>
		
		<!-- double slice: the first one to get a shallow copy. -->
		<ul 
			v-for="item in sortedItemList" >
			<li>{{gamesLogSvc.parseDisplayLogItem(item)}}</li>
		</ul>
		
		<p 
			v-if="maxItems < gamesLogItems.length" >
			<button @click="upMaxItems">Show more</button>
		</p>
		
		<GamesLogExport 
			:games-log-items="gamesLogItems" ></GamesLogExport>
	</div>
</template>
