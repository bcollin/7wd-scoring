<script setup>
import { ref, toRaw } from 'vue'
// Services.
import localStorageSvc from './services/local-storage.js';
import formSvc from './services/form.js';
// Components.
import twoScoresRow from './components/two-scores-row.vue';
import resultsPane from './components/results-pane.vue';
import gamesLog from './components/games-log.vue';
import appSettings from './components/app-settings.vue';

const now = new Date();
const dateS = now.toISOString().substr(0,10); 
const timeS = now.toISOString().substr(11,5);

// The object 'settings' contains the user-definable settings for 
//       the app.
const defaultSettings = {'showExplanations': {label: 'Show explanations', value: false }};
var settingsNew = localStorageSvc.read(defaultSettings, 'settings');
var settings = ref(settingsNew);

// The object 'scores' will contain the results of 'calling the game'.
const defaultScores = {victoryType: 'points', validScore: false, result: '', datetime: dateS + ' ' + timeS};
var scoresNew = localStorageSvc.mergeDefaults({}, defaultScores);
var scores = ref(scoresNew);

// The array 'player' will contain the names and the points scores 
//       of players 1 and 2 once the game has been called.
var player = ref([]);
player.value[1] = {'name': '', score: 0};
player.value[2] = {'name': '', score: 0};

// The array 'gamesLogItems' contains the results of previous games,
//       assuming they are available in the local store.
var gamesLogItems = ref([]);

// The array 'form' contains information about the form fields that 
//       need to be displayed.
const form = formSvc.defaultForm;

// The array 'validKeys' contains the keys of the form fields that
//       are used to calculate the points score.
const validKeys = [];
for (var key in form) {
	if (form[key].type === 'number') {
		if (form[key].fieldname !== 'cash') {
			validKeys.push(form[key].fieldname);
		}
	}
}

function resetForm() {
	var elemRoot = document.querySelector('#main');
	var elemMsg = document.querySelector('#reload-message');
	elemMsg.className = 'reloading';
	elemRoot.className = 'reloading';
	location.reload();
}

function addLogObject(logItem) {
	gamesLogItems.value.push(logItem);
	localStorageSvc.write(gamesLogItems.value, 'scores');
}

// 1) Sets victoryType. 2) Disables checkboxes other than the one 
//       that was clicked.
//       VictoryType is used in two-scores-row.vue to hide or 
//       display certain fields, e.g. if you click a checkbox,
//       points fields will be hidden.
function handleCheckboxClick(e) {
	var elem = e.target;
	if (elem.type === 'checkbox') {
		var pId = elem.dataset.player;
		var fieldName = elem.dataset.fieldname;
		var max = fieldName.length;

		var trackName = fieldName.substr(0,max-5);

		// Sets victoryType.
		if (elem.checked) {
			scores.value.victoryType = trackName;
		} else {
			scores.value.victoryType = 'points';
		}
		
		// Unchecks checkboxes other than the one that was clicked.
		var allCheckBoxes = document.querySelectorAll('#main table .track input');
		for (var i = 0; i < allCheckBoxes.length; i++) {
			if (allCheckBoxes[i].dataset.player !== pId || allCheckBoxes[i].dataset.fieldname !== fieldName) {
				allCheckBoxes[i].checked = false;
			}
		}
	}
}

// Calculate the totals of a points victory.
function sumIt(e) {
	var execute = true;

	// Do not calculate the totals if we are typing in the 'notes'
	//       or 'name' fields.
	if (e !== undefined) {
		var field = e.target;
		if (['name_p1', 'name_p2', 'notes'].includes(field.id)) {
			execute = false;
		}
	}

	if (execute) {
		// Calculate the totals.
		for (var p=1; p<3; p++) {
			var sum = 0;
			for (var index in validKeys) {
				const value = String(player.value[p][validKeys[index]]);
				const valIsNumber = value.match(/[0-9]+/);
				if (valIsNumber) {
					sum += Number(value);
				}
				else {
					// I could force to 0, but if the user made a typo,
					// it might be more visible if the field is cleared.
					player.value[p][validKeys[index]] = '';
				}
			}
			player.value[p]['score'] = sum;
		}
	}
}
</script>

<template>
	<div id="main">
		<h1>7 Wonders Duel Score&nbsp;Card</h1>
		
		<p class="datetime">{{dateS}} - {{timeS}}</p>
		
		<table @keyup="sumIt" @click="handleCheckboxClick">
			<tr>
				<th>Score type</th>
				<th>Player 1</th>
				<th>Player 2</th>
			</tr>				
			<tr>
				<th>Player names </th> 
				<td><input type="text" id="name_p1" v-model="player[1]['name']" aria-label="Name player 1" data-type="name"></td>
				<td><input type="text" id="name_p2" v-model="player[2]['name']" aria-label="Name player 2" data-type="name"></td>
			</tr>
			<twoScoresRow v-for="fields in form" :item="fields" v-model:player="player" :settings-obj="settings" v-model:scores="scores"></twoScoresRow>
		</table>
		
		<resultsPane 
			v-model:player="player" 
			v-model:scores="scores" 
			v-model:validKeys="validKeys" 
			@resetform='resetForm' 
			@logobjectcreated="addLogObject" 
			@sumit="sumIt"
		></resultsPane>
		<gamesLog 
			v-model:gamesLogItems="gamesLogItems" ></gamesLog>
		<appSettings :settings-obj="settings"></appSettings>
	</div> <!-- /#main -->
	<div id="reload-message">Reloading...</div>
</template>

<style>
	* { font-family: sans-serif; }
	body { background: #fff; color: #000; margin: .5em; font-size: 16px; }
	#main { max-width: 100%; }
	#main.reloading { opacity: 0; transition: opacity 1s; }
	h1 { font-size: 1.6em; text-align: center; }
	.datetime { text-align: center; }
	table { display: block; margin-bottom: 1.5em; }
	tbody { display: block; }
	tr { display: block; margin-bottom: .75em; }
	tr.track { border: 4px solid #ff0;}
	td, th { display: block; margin: 0px; padding: .5em; line-height: 1.2; }
	th { text-align: left; font-weight: bold; }
	tr:first-child th { display: none; }
	td:nth-child(2)::before { content: "player 1: "; }
	td:nth-child(3)::before { content: "player 2: "; }
	tr th:first-child { text-align: left; }
	tr:first-child th:first-child { text-align: left; }
	#reload-message { display: none; position: absolute; top: 0em; left: 0em; max-width: 32em; padding: 5em; background: #fff; font-weight: bold; }
	#reload-message.reloading { display: block; }

	@media (min-width: 321px) {
		table { max-width: 360px; }
	}
	@media (min-width: 533px) {
		#main { max-width: 32em; }
		table { border-collapse: collapse; max-width: none; display: table; }
		table { box-shadow: .5em .5em .5em rgba(0,0,0,.3333); margin-left: 1.2em;  }
		tbody { display: table-row-group; }
		tr { display: table-row; margin: 0em; }
		td, th { display: table-cell; width: 5em;  border: 1px solid #666; vertical-align: top; }
		th { font-weight: normal; text-align: center; }
		th:first-child { width: 18em; }
		tr th:first-child { float: none; width: 18em; }
		tr:first-child th { display: table-cell; }
		tr:first-child th:first-child { float: none; width: 18em; }
		tr th:first-child { text-align: left; }
		tr:first-child th:first-child { text-align: center; }
		td:nth-child(2)::before { content: ""; }
		td:nth-child(3)::before { content: ""; }
	}
</style>