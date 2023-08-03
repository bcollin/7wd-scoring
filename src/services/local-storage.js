import { toRaw } from 'vue';

const STORAGE = {
	scores: '7wd-scoring-scores', 
	settings: '7wd-scoring-settings'
};

function phraseWinners(winner, players) {
	if (winner === undefined) { winner = 0; }
	if (players === undefined) { players=['','','']; }
	const windex = Number(winner);
	var winningPlayer = 'player' + String.fromCharCode(160) + winner;
	if (players[windex] !== '') {
		winningPlayer += ', ' + players[windex];
	}

	// The result was a draw. 
	if (windex === 0) {
		var versus = ' versus ';
		// Map the players object to an array.
		var winningPlayer = players[1] + versus + players[2];
		// If both names are missing, don't display the names.
		if (winningPlayer === versus) { winningPlayer = ''; }
	}
	
	return winningPlayer;
};

function write(content, type) {
	if (['scores', 'settings'].includes(type)) {
		const contentString = JSON.stringify(toRaw(content));
		localStorage.setItem(STORAGE[type], contentString);
	}
	else {
		console.log('Unknown setting.');
	}
}

function read(defaults, type) {
	var contents = localStorage.getItem(STORAGE[type]);

	var out = JSON.parse(contents);
	if (out === null) { out = {}; }

	if (typeof defaults === typeof out) {
		out = mergeDefaults(out, defaults);
	}
	
	return out;
}

function mergeDefaults(inSet, defaultSet) {
	var clone = structuredClone(defaultSet);
	var outSet = inSet;
	for (var key in clone) {
		if (outSet[key] === undefined) {
			outSet[key] = clone[key];
		}
	}
	
	return outSet;
}

export default {
	STORAGE: STORAGE,
	phraseWinners: phraseWinners,
	write: write,
	read: read,
	mergeDefaults: mergeDefaults
}

