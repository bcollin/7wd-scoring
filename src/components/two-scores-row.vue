<script setup>
	import { ref } from 'vue'

	const props = defineProps({
		item: Object
	})

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
</script>

<template>
	<tr :class="item.categories">
		<th><span class="label" v-html="item.label"></span> <span v-html="item.info" class="info"></span></th>
		<td v-if="item.type==='number'" title="p1"><input type="text" @keyup="forceNum"> </td>
		<td v-if="item.type==='number'" title="p2"><input type="text" @keyup="forceNum"> </td>
		<td v-if="item.type==='checkbox'" title="p1"><input type="checkbox"> </td>
		<td v-if="item.type==='checkbox'" title="p2"><input type="checkbox"> </td>
		<td v-if="item.type==='markup'" title="p1"> points</td>
		<td v-if="item.type==='markup'" title="p2"> points</td>
		<td v-if="item.type==='notes'" colspan="2">
			<textarea style="width: 100%;" id="notes" maxlength="{{notesMax}}"  @keyup="limitNotesChars();"></textarea>
			<br><span style="color: black">{{charsLeft}} characters left.</span>
		</td>
	</tr>
</template>

<style>
	.info { display: none; }
</style>

