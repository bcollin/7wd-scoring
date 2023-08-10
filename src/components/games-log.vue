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
	
	// Reverse the order of the list and show maxItems items.
	const sortedItemList = computed(() => { 
		return props.gamesLogItems.toReversed().slice(0, maxItems.value);
	});
	
	// Increase the value of maxItems by 6.
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
		
		<div class="games-log-wrapper">
			<ul class="games-log">
				<li 
					v-for="item in sortedItemList" 
					>{{gamesLogSvc.parseDisplayLogItem(item)}}</li>
			</ul>
			
			<p 
				v-if="maxItems < gamesLogItems.length" 
				class="show-more"
				>
				<button @click="upMaxItems">Show more</button>
			</p>
		</div>
		
		<GamesLogExport 
			:games-log-items="gamesLogItems" ></GamesLogExport>
	</div>
</template>

<style scoped>
	.games-log-wrapper {
		margin-bottom: 1.5em;
	}

	ul.games-log, ul.games-log li { margin: 0px; padding: 0px; }
	
	ul.games-log li {
		padding-bottom: .2em;
		margin-bottom: .2em;
		border-bottom: 2px solid #def;
	}
	
	ul.games-log li:last-child {
		border: none;
	}
	
	.show-more {
		margin-top: 0em;
	}
	
	.show-more button {
		border: none;
		border-radius: 0px;
		padding: .4em;
		background: #666;
		color: #fff;
	}
</style>