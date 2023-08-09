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
		
		<div class="settings" >

			<div 
				v-for="(value, key) in settingsObj" 
				class="setting"
			>
				<label><input type="checkbox" v-model="settingsObj[key].value"><span class="button"></span> <span class="text">{{value.label}}</span></label>
			</div>

		</div> <!-- /.settings -->
	</div> <!-- /#settings -->
</template>

<style scoped>
	.setting label { 
		cursor: pointer; 
	}
	
	.setting label > * { 
		vertical-align: middle;
	}
	
	.setting input[type="checkbox"] { display: none; }

	.setting .button { 
		display: inline-block;
		border: 1px solid #999;
		position: relative;
		width: 2.5em; 
		height: 1.25em; 
		border-radius: 1em; 
		background: #ccc; 
	}
	
	.setting .button::after {
		content: '';
		position: absolute;
		top: .1em;
		left: .1em;
		width: 1em;
		height: 1em;
		background: #fff;
		border-radius: 2em;
		transition: 0.15s;
	}

	input:checked + .button { background: #3c3; }

	.setting input:checked + .button::after {
		left: calc(100% - 1.15em);
	}
</style>
