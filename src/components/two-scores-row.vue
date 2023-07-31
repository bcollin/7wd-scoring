<script setup>
	import { ref } from 'vue';
	import settingsObj from '../services/settings.js';

	const props = defineProps({
		item: Object,
		player: Array,
		scores: Object
	})
	
	defineEmits(['update: player', 'update: scores']);

    const notesMax = 200;
	var charsLeft = ref(notesMax);
	
	function limitNotesChars() {
		charsLeft.value = notesMax - notes.value.length;
		if (charsLeft.value < 0) {
			notes.value = notes.value.substr(0, notesMax);
		}
	}
	
	function forceNum(e) {
		var value = e.target.value;
		var pattern = /[^0-9]/g;
		e.target.value = value.replaceAll(pattern, '');

		if (e.target.parentElement.parentElement.classList.contains('cash')) {
			setMoneyPoints(e.target);
		}
	}
	
	// The user has the option to fill out money points 
	// manually or have them calculated by filling out
	// the coins value.
	function setMoneyPoints(field) {
		var pId = field.dataset.player;
		var pString = 'p' + pId;
		var cash = field.value;
		if (cash !== '') {
			var points = Math.floor(cash/3);

			props.player[pId].cashpoints = points;
		}
	}
	
	function emitValue(e) {
		let value = e.target.value;
		if (e.target.type === 'textarea') {
			props.scores.notes = value;
		}
		else {
			props.player[e.target.dataset.player][props.item.fieldname] = value;
		}
	}
</script>

<template>
	<tr :class="item.categories" v-if="item.type==='number' && scores.victoryType==='points'">
		<th><span class="label" v-html="item.label"></span> <span v-html="item.info" v-if="settingsObj.settings['showExplanations'].value" class="info"></span> </th>
		<td title="p1">
			<input 
				type="text" 
				@keyup="forceNum" 
				:value="player[1][props.item.fieldname]" 
				@input="emitValue"
				data-player="1"> 
		</td>
		<td title="p2">
			<input 
				type="text" 
				@keyup="forceNum" 
				:value="player[2][props.item.fieldname]" 
				@input="emitValue"
				data-player="2"> 
		</td>
	</tr>
	<tr :class="item.categories" v-if="item.type==='checkbox'">
		<th><span class="label" v-html="item.label"></span> <span v-html="item.info" v-if="settingsObj.settings['showExplanations'].value" class="info"></span> </th>
		<td title="p1">
			<input 
				type="checkbox" 
				:value="player[1][props.item.fieldname]" 
				@input="emitValue"
				data-player="1"
				:data-fieldname="item.fieldname">
		</td>
		<td title="p2">
			<input 
				type="checkbox" 
				:value="player[2][props.item.fieldname]" 
				@input="emitValue"
				data-player="2"
				:data-fieldname="item.fieldname"> 
		</td>
	</tr>
	<tr :class="item.categories" v-if="item.type==='markup' && scores.victoryType==='points'">
		<th>Total</th>
		<td title="p1">{{player[1].score}} points</td>
		<td title="p2">{{player[2].score}} points</td>
	</tr>
	<tr :class="item.categories" v-if="item.type==='notes'">
		<td colspan="3" id="notes-container">
			<p>Optional notes</p>
			<textarea style="width: 100%;" id="notes" maxlength="{{notesMax}}"  @keyup="limitNotesChars()" @input="emitValue"></textarea>
			<br><span style="color: black">{{charsLeft}} characters left.</span> 
		</td>
	</tr>
</template>

<style>
	.info { font-size: .875em; }
	#notes-container:nth-child(2)::before { content: ""; }
	tr.science { background: #efe; }
	tr.military { background: #fee; }
	tr.culture { background: #eef; }
	tr.commerce { background: #ffd; }
	tr.money { background: #ffd; }
	tr.guild { background: #eef; }
	tr.wonder { background: #eee; }
	tr.cash { background: #eee; }
	tr.science th em { color: #080; }
	tr.military th em { color: #800; }
	tr.culture th em { color: #008; }
	tr.commerce th em { color: #660; }
	tr.guild th em { color: #606; }
	tr.track td { text-align: center; }

	input[type="text"] { width: 8em; }

	@media (min-width: 533px) {
		th .label { display: inline; }
		tr.track { border: 3px outset #ff0;}
		tr.track th, tr.track td { border: none; }
		tr.slimfield th:first-child { position: relative; }
		.label em { font-weight: bold; }
		
		input[type="text"] { width: 4em; }
	}
</style>

