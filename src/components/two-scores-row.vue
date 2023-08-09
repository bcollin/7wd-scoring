<script setup>
	import { ref } from 'vue';

	const props = defineProps({
		item: Object,
		key: Number,
		player: Array,
		scores: Object,
		settingsObj: Object
	})
	
	defineEmits(['update: player', 'update: scores']);

    const notesMax = 200;
	var charsLeft = ref(notesMax);
	
	if (props.item.type === 'checkbox') {
		var max = props.item.fieldname.length - 5;
		var winType = props.item.fieldname.substr(0, max);
		props.item.buttonLabel = winType + ' win';
	}
	
	// Automatically limits the number of characters in the 'notes'
	// field to notesMax.
	function limitNotesChars() {
		charsLeft.value = notesMax - notes.value.length;
		if (charsLeft.value < 0) {
			notes.value = notes.value.substr(0, notesMax);
		}
	}
	
	// Makes sure only numbers are entered in number fields. 
	// Triggers a re-calculation of money points if necessary.
	function forceNum(e) {
		var value = e.target.value;
		const pattern = /[^0-9]/g;
		e.target.value = value.replaceAll(pattern, '');

		if (e.target.parentElement.parentElement.classList.contains('cash')) {
			setMoneyPoints(e.target);
		}
	}
	
	// The user has the option to fill out money points 
	// manually or have them calculated by filling out
	// the coins value.
	function setMoneyPoints(field) {
		const pId = field.dataset.player;
		const cash = field.value;
		if (cash !== '') {
			const points = Math.floor(cash/3);
			props.player[pId].cashpoints = points;
		}
	}
	
	// Clicks the actual (hidden) checkboxes for alternate victory 
	// tracks.
	function toggleCheckOverlay(e) {
		e.target.parentElement.parentElement.children[0].click();
	}
	
	// Processes field value changes, including validation.
	function emitValue(e) {
		if (e.target.type === 'textarea') {
			limitNotesChars();
			props.scores.notes = e.target.value;
		}
		else {
			if (e.target.type === 'checkbox') {
				props.player[e.target.dataset.player][props.item.fieldname] = e.target.checked;
			}
			else {
				// Implied: number field. 
				forceNum(e);
				props.player[e.target.dataset.player][props.item.fieldname] = e.target.value;
			}
		}
	}
</script>

<template>
	<tr 
		:class="item.categories" 
		v-if="item.type==='number' && scores.victoryType==='points'" >
		<th><span class="label" v-html="item.label"></span> <span v-html="item.info" v-if="settingsObj['showExplanations'].value" class="info"></span> </th>
		<td title="p1">
			<input 
				type="text" 
				:value="player[1][props.item.fieldname]" 
				:data-fieldname="item.fieldname"
				data-player="1" 
				@input="emitValue"
				> 
		</td>
		<td title="p2">
			<input 
				type="text" 
				:value="player[2][props.item.fieldname]" 
				:data-fieldname="item.fieldname"
				data-player="2" 
				@input="emitValue"
				> 
		</td>
	</tr>
	<tr 
		:class="item.categories" 
		v-if="item.type==='checkbox'" >
		<th><span class="label" v-html="item.label"></span> <span v-html="item.info" v-if="settingsObj['showExplanations'].value" class="info"></span> </th>
		<td title="p1" :class="{'checked': player[1][item.fieldname]}">
			<input 
				type="checkbox" 
				:data-fieldname="item.fieldname"
				data-player="1"
				@input="emitValue"
				>
			<div class="overlay-container">
				<div class="overlay" @click="toggleCheckOverlay">
					{{item.buttonLabel}} player 1
				</div>
			</div>
		</td>
		<td title="p2" :class="{'checked': player[2][item.fieldname] }">
			<input 
				type="checkbox" 
				:data-fieldname="item.fieldname" 
				data-player="2"
				@input="emitValue"
				> 
			<div class="overlay-container">
				<div class="overlay" @click="toggleCheckOverlay">
					{{item.buttonLabel}} player 2
				</div>
			</div>
		</td>
	</tr>
	<tr 
		:class="item.categories" 
		v-if="item.type==='markup' && scores.victoryType==='points'" >
		<th>Total</th>
		<td title="p1">{{player[1].score}} points</td>
		<td title="p2">{{player[2].score}} points</td>
	</tr>
	<tr 
		:class="item.categories" 
		v-if="item.type==='notes'" >
		<td colspan="3" id="notes-container">
			<label for="notes">Optional notes</label><br/>
			<textarea 
				id="notes" 
				maxlength="{{notesMax}}"
				@input="emitValue"
				></textarea>
			<br><span style="color: black">{{charsLeft}} characters left.</span> 
		</td>
	</tr>
</template>

<style scoped>
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
	
	.overlay-container { 
		display: inline-block;
		padding: 2px; 
		border-radius: 7px; 
		background: #090; 
	}
	.military .overlay-container { background: #900; }
	
	.overlay {
		width: 4em;
		height: 4em;
		padding: .5em; 
		background: #050;
		color: #fea;
		border-radius: 5px;
		cursor: pointer;
	}
	
	.military .overlay {
		background: #500;
	}
	
	.checked .overlay {
		box-shadow: inset 3px 3px 2px 2px rgba(0,0,0,.5);
		background: #090;
		color: #fd9;
	}
	.military .checked .overlay {
		background: #900; 
	}
	
	#notes-container label { font-weight: bold; }
	#notes { width: 95%; }

	@media (min-width: 533px) {
		th .label { display: inline; }
		tr.track { border: 3px outset #ff0;}
		tr.track th, tr.track td { border: none; }
		tr.slimfield th:first-child { position: relative; }
	}
</style>

