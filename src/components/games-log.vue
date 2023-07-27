<script setup>
	import { ref } from 'vue'

	const props = defineProps({
		gamesLogItems: Array
	})
</script>

<template>
	<div v-if="gamesLogItems.length > 0">
		<h2>Games log</h2>

		<ul v-for="item in gamesLogItems">
			<li>{{item}}</li>
		</ul>
	</div>
</template>

<style>
</style>
