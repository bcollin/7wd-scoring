<script setup>
	import { ref, watch } from 'vue';
	import localStorageSvc from '../services/local-storage.js';
	
	const props = defineProps({
		settingsObj: Object
	})

	watch(props.settingsObj, function(oldVal, newVal){ 
		localStorageSvc.write(props.settingsObj, 'settings'); 
	});
</script>

<template>
	<div id="settings">
		<h2>Settings</h2>
		
		<div class="settings" v-for="(value, key) in settingsObj">
			<div class="setting">
				<label><input type="checkbox" v-model="settingsObj[key].value">  {{value.label}}</label>
			</div>
		</div> <!-- /.settings -->
	</div> <!-- /#settings -->
</template>

<style>
.setting label { cursor: pointer; }
</style>
