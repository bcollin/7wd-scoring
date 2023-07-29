<script setup>
	import { ref } from 'vue';
	import settingsObj from '../services/settings.js';
	import singleSetting from './single-setting.vue';
</script>

<template>
	<h2>Settings</h2>
	
	<singleSetting :setting="setting" v-for="setting in settingsObj.settings"></singleSetting>
</template>

<style>
</style>
