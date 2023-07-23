<script setup>
import { ref } from 'vue'
import twoScoresRow from './components/two-scores-row.vue'

const now = new Date();
const dateS = now.toISOString().substr(0,10) 
const timeS = now.toISOString().substr(11,5);

var player = [];
player[1] = {'name': ''};
player[2] = {'name': ''};
const form = [
	{
		categories: ['science', 'track', 'slimfield'],
		label: "Was this a <em>science victory</em>?",
		info: "(You win the science track if your science cards contain 6 or more different symbols.)",
		type: "checkbox"
	},
	{
		categories: ['military', 'track', 'slimfield'],
		label: "Was this a <em>military victory</em>?",
		info: "(You win the military track if you have moved the pawn more than 10 positions past the center line towards the enemy.)",
		type: "checkbox"
	},
	{
		categories: ['card', 'culture', 'slimfield'],
		label: "How many <em>culture</em> points?",
		info: "(Count the green points on your blue cards.)",
		type: "number"
	},
	{
		categories: ['card', 'science', 'slimfield'],
		label: "How many <em>science</em> points?",
		info: "(Count the green points on your green cards.)",
		type: "number"
	},
	{
		categories: ['card', 'commerce', 'slimfield'],
		label: "How many <em>commerce</em> points?",
		info: "(Count the green points on your yellow cards.)",
		type: "number"
	},
	{
		categories: ['card', 'guild', 'slimfield'],
		label: "How many <em>guild</em> points?",
		info: "(Count the green points on your purple cards.)",
		type: "number"
	},
	{
		categories: ['wonder', 'slimfield'],
		label: "How many <em>Wonder</em> points?",
		info: "(Count the green points on the cards of the Wonders you built.)",
		type: "number"
	},
	{
		categories: ['coin', 'science', 'slimfield'],
		label: "How many <em>science coin</em> points?",
		info: "(Count the green points on the green coins.)",
		type: "number"
	},
	{
		categories: ['cash', 'slimfield'],
		label: "<em>How much money</em> do you have left?",
		info: "(Count de Monet, pardon, count your money.)",
		type: "number"
	},
	{
		categories: ['coin', 'money', 'slimfield'],
		label: "How many <em>money points</em>?",
		info: "(Count your money, divide by three; round down to the nearest integer. Or fill out the money you have in the row above and the app will calculate the points for you.)",
		type: "number"
	},
	{
		categories: ['board', 'military', 'slimfield'],
		label: "How many <em>military points</em>?",
		info: "(Look at the pawn; is it in your opponent's territory? Then you get the green points shown below your pawn.)",
		type: "number"
	},
	{
		categories: [],
		label: "Total",
		info: "",
		type: "markup",
		title: "for player"
	},
	{
		categories: [''],
		label: "Optional notes",
		info: "",
		type: "notes"
	}
];

</script>

<template>
	<h1>7 Wonders Duel Score Card</h1>
	
	<p>{{dateS}} - {{timeS}}</p>
	
	<table>
		<tr>
			<th>Score type</th>
			<th>Player 1</th>
			<th>Player 2</th>
		</tr>				
		<tr>
			<th>Player names </th> 
			<td><input type="text" v-model="player[1]['name']" aria-label="Name player 1"> {{player[1]['name']}}</td>
			<td><input type="text" v-model="player[2]['name']" aria-label="Name player 2"> {{player[2]['name']}}</td>
		</tr>
		<twoScoresRow v-for="fields in form" :item="fields"></twoScoresRow>
	</table>
</template>