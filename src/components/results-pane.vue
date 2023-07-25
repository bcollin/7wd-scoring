<script setup>
	import { ref, toRaw } from 'vue'
	import { getCurrentInstance } from 'vue'

	const props = defineProps({
		player: Array,
		scores: Object,
		validKeys: Array
	})
	
	var suggestions = {};
	var me = getCurrentInstance();
	
	// If the result is a win in either the military or scientific
	// track, return the player number e {1,2}.
	function getTrackWinner() {
		if (props.player[1].sciencetrack) { return [1, 'Science win']; }
		if (props.player[1].militarytrack) {return [1, 'Military win']; }
		if (props.player[2].sciencetrack) { return [2, 'Science win']; }
		if (props.player[2].militarytrack) {return [2, 'Military win']; }
	}
	
	function callIt(e) {
		if (props.scores.victoryType !== 'points' || suggestions.length < 1) {
			props.scores.validScore = true;
		}

		if (!props.scores.validScore) {
			checkResults();
			return false;
		}
		
		var logObj = {dt: props.scores.datetime};
		logObj.players = {1: props.player[1].name, 2: props.player[2].name}
		
		var winner = 0;
		if (props.scores.victoryType === 'points') {
		}
		else {
			var temp = getTrackWinner();
			winner = temp[0];
			props.scores.result = temp[1] + ' player ' + winner;
		}
		
		logObj.result = props.scores.result;
		logObj.winner = winner;
		logObj.notes = props.scores.notes;
		logObj.player1 = toRaw(props.player[1]);
		logObj.player2 = toRaw(props.player[2]);
		
		// @todo Add the logObj to something that stores and displays them.
	}
	
	function checkResults() {
	
		// One last summing? Is this even necessary? And if it is 
		// necessary, surely this is not the way to do it?
		me.parent.devtoolsRawSetupState.sumIt();
		
		suggestions = {};
		
		var maxTypes = props.validKeys.length;
		for (var p = 1; p<3; p++) {
			for (var i = 0; i < maxTypes; i++) {
				// @todo Check for empty fields; this could (and will) 
				//   be used in a number of suggestions, e.g.
				//   if all fields are empty the suggestion that the
				//   user forgot to fill out the form.
			}
		}
	}
</script>

<template>
	<div> <!-- this div is necessary to make sure Vue doesn't complain 
	about the emitter not being tied to some sort of root node. -->
		<div id="results"> 
			<p class="center" v-if="scores.result === ''">
				<button class="cta" @click="callIt">Call it</button>
			</p>
			
			<div id="result" v-if="scores.result !== ''">
				<em>{{scores.result}}</em>
			</div>
		</div> <!-- /#results -->
		<p class="center" v-if="scores.result !== ''">
			<button @click="$emit('resetform')"><span>Reset form</span></button>
		</p>
	</div>
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
	#result { 
		background: #ffc; 
		padding: 1em 0em; 
		text-align: center;
	}
	#result em { 
		font-size: 2.5em; 
		font-weight: bold; 
		font-style: normal; 
	}
	
	.center { text-align: center; }
</style>
