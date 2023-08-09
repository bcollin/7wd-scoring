<script setup>
	import { ref, toRaw } from 'vue'
	import localStorageSvc from '../services/local-storage.js'

	const props = defineProps({
		player: Array,
		scores: Object,
		validKeys: Array
	})
	
	const emit = defineEmits(['logobjectcreated', 'sumit']);
	
	var suggestions = ref([]);
	var resultPhrase = ref('');
	
	function isValidScoreValue(a) {
		const pattern = /^[0-9]+$/;
		return pattern.test(String(a));
	}
	
	function stripLtGt(value) {
		const pattern = /[<>]/g;
		return value.replaceAll(pattern, '');
	}
	
	// If the result is a win in either the military or scientific
	// track, return the player number e {1,2}.
	function getTrackWinner() {
		if (props.player[1].sciencetrack === true) {  return [1, 'Science win']; }
		if (props.player[1].militarytrack === true) { return [1, 'Military win']; }
		if (props.player[2].sciencetrack === true) {  return [2, 'Science win']; }
		if (props.player[2].militarytrack === true) { return [2, 'Military win']; }
	}
	
	function parseResultItem(item) {
		if (typeof item !== 'object') { return ''; }
		
		const winningPlayer = localStorageSvc.phraseWinners(item.winner, item.players);
		const out = item.result + ' ' + winningPlayer + ' ';
		
		return out;
	};

	function callIt(e) {
		if (props.scores.victoryType !== 'points') {
			props.scores.validScore = true;
		}

		if (!props.scores.validScore) {
			checkResults();
		}

		if (suggestions.value.length === 0) {
			props.scores.validScore = true;
		}
		
		if (props.scores.validScore) {
			const logObj = {dt: props.scores.datetime};
			logObj.players = {
				1: stripLtGt(props.player[1].name), 
				2: stripLtGt(props.player[2].name)
			};
			
			let winner = 0;
			if (props.scores.victoryType === 'points') {
				if (props.player[1].score === props.player[2].score) {
					props.scores.result = 'Draw';
				}
				else {
					props.scores.result = 'Points win';
					if (props.player[1].score > props.player[2].score) {
						winner = 1;
					}
					else {
						winner = 2;
					}
				}
			}
			else {
				var temp = getTrackWinner();
				winner = temp[0];
				props.scores.result = temp[1];
			}
			
			logObj.result = props.scores.result;
			logObj.winner = winner;
			logObj.notes = stripLtGt(props.scores.notes);
			logObj.player1 = toRaw(props.player[1]);
			logObj.player2 = toRaw(props.player[2]);
			
			emit('logobjectcreated', logObj);

			resultPhrase = ref(parseResultItem(logObj));
		}
	}
	
	function checkResults() {
	
		// One last summing? Is this even necessary?
		emit('sumit');
		
		suggestions.value = [];
		
		// To add a value: 
		// suggestions.value.push({type: 'info', message: 'test'});

		let someFieldsHaveValues = false; 
		const maxTypes = props.validKeys.length;
		for (var p = 1; p<3; p++) {
			for (var i = 0; i < maxTypes; i++) {
				const value = props.player[p][props.validKeys[i]];
				if (isValidScoreValue(value)) {
					someFieldsHaveValues = true;
				}
			}
		}
		
		if (!someFieldsHaveValues) {
			suggestions.value.push({type: 'warning', message: 'You seem to have filled out no points and selected no victory track.'});
		}
		
		const mil1 = (props.player[1].militarypoints === undefined) ? 0 : Number(props.player[1].militarypoints);
		const mil2 = (props.player[2].militarypoints === undefined) ? 0 : Number(props.player[2].militarypoints);
		
		if (mil1 > 0 && mil2 > 0) {
			suggestions.value.push({'type': 'warning', 'message': 'You filled out military board points for both players, but only one player can get such points.'});
		}

		const validMilPoints = [0,2,5,10];
		if (!validMilPoints.includes(mil1) ||!validMilPoints.includes(mil2)) {
			var errorPlayers = [];
			if (!validMilPoints.includes(mil1)) { 
				errorPlayers[0] = 'player 1';
			}
			if (!validMilPoints.includes(mil2)) { 
				errorPlayers[errorPlayers.length] = 'player 2';
			}
				
			suggestions.value.push({'type': 'warning', 'message': 'A player can receive 0, 2, 5 or 10 military board points. The following players have invalid amounts: ' + errorPlayers.toString() + '.'});
		}
	}
</script>

<template>
	<div id="results"> 
		<div> 
			<p 
				class="center" 
				v-if="scores.result === '' && suggestions.length === 0" >

				<button class="cta" @click="callIt">Call it</button>

			</p>
			
			<div 
				id="suggestions" 
				v-if="suggestions.length > 0 && scores.result === ''" >

				<h2>Are you sure?</h2>

				<ul 
					v-for="item in suggestions" >
					
					<li class="{{item.type}}">{{item.message}}</li>
					
				</ul>

				<p>You may have made mistakes in your scoring. Please check the form and then click one of the buttons below.</p>

				<p class="buttons center">
					
					<button @click="suggestions.value = []; scores.validScore = true; callIt();">I am sure, call it</button> 

					<button class="cta" @click="callIt();">Check again</button>
					
				</p>
			</div>

			<div 
				id="result" 
				v-if="scores.result !== ''" >
			
				<em>{{resultPhrase}}</em>
			
			</div>
		</div> <!-- /#results -->
		
		<p 
			class="center" 
			v-if="scores.result !== ''" >
		
			<button class="de-emphasize" @click="$emit('resetform')"><span>Reset form</span></button>
		
		</p>
	</div>
</template>

<style scoped>
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
	#results button.de-emphasize {
		padding: .75em;
		font-size: 1.6em;
	}
	#results button:active {
		box-shadow: inset 2px 2px 2px rgba(0,0,0,.25);
		transition: box-shadow 1s;
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
</style>
