<script setup>
	import { ref } from 'vue'

	const props = defineProps({
		player: Array,
		scores: Object
	})
	
	defineEmits('update: player');

    const notesMax = 200;
	var charsLeft = ref(notesMax);
	
	function checkResults(e) {
		console.log(props.player, props.scores);
	}
</script>

<template>
	<div id="results"> 
		<p class="center">
			<button class="cta" @click="checkResults">Call it</button>
		</p>
	</div> <!-- /#results -->
</template>

<style>
	#results button { 
		width: 95%; 
		max-width: 11em; 
		padding: 1em; 
		margin: .5em 0em; 
		border-radius: 1em; 
		border: none; 
		box-shadow: 2px 2px 2px rgba(0,0,0,.5); 
		background: #990; 
		color: #fff; 
		font-size: 2em; 
	}
	#results button.cta { 
		background: #393; 
	}
	#results .warning { 
		color: #860; 
	}
	
	.center { text-align: center; }
</style>