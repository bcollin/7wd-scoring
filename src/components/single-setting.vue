<script setup>
	const props = defineProps({
		setting: Object
	})
	
</script>

<template>
	<div><label><input type="checkbox"> {{setting.label}}</label></div>
</template>

<style>
</style>