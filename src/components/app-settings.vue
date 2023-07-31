<script setup>
	import { ref, watch } from 'vue';
	import settingsObj from '../services/settings.js';
	
	watch(settingsObj.settings, function(oldVal, newVal){ settingsObj.saveSettings(); });
</script>

<template>
	<h2>Settings</h2>
	
	<div class="settings" v-for="(value, key) in settingsObj.settings">
		<div class="setting">
			<label><input type="checkbox" v-model="settingsObj.settings[key].value">  {{value.label}}</label>
		</div>
	</div> <!-- /.settings -->
</template>

<style>
</style>
