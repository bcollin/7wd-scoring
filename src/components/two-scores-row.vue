<script setup>
	import { ref } from 'vue'

	const props = defineProps({
		item: Object,
		modelValue: Array
	})
	
	defineEmits('update: modelValue');

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
	}
	
	function emitValue(e) {
		let value = e.target.value;
		props.modelValue[e.target.dataset.player][props.item.fieldname] = value;
	}
</script>

<template>
	<tr :class="item.categories">
		<th><span class="label" v-html="item.label"></span> <span v-html="item.info" class="info"></span></th>
		<td v-if="item.type==='number'" title="p1">
			<input 
				type="text" 
				@keyup="forceNum;" 
				:value="modelValue[1][props.item.fieldname]" 
				@input="emitValue"
				data-player="1"> 
		</td>
		<td v-if="item.type==='number'" title="p2">
			<input 
				type="text" 
				@keyup="forceNum" 
				:value="modelValue[2][props.item.fieldname]" 
				@input="emitValue"
				data-player="2"> 
		</td>
		<td v-if="item.type==='checkbox'" title="p1"><input type="checkbox"> </td>
		<td v-if="item.type==='checkbox'" title="p2"><input type="checkbox"> </td>
		<td v-if="item.type==='markup'" title="p1"> points</td>
		<td v-if="item.type==='markup'" title="p2"> points</td>
		<td v-if="item.type==='notes'" colspan="2" id="notes-container">
			<textarea style="width: 100%;" id="notes" maxlength="{{notesMax}}"  @keyup="limitNotesChars();"></textarea>
			<br><span style="color: black">{{charsLeft}} characters left.</span>
		</td>
	</tr>
</template>

<style>
	.info { display: none; }
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
		input[type="text"] { width: 4em; }
	}
</style>

