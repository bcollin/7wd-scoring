const STORAGE = '7wd-scoring-scores';

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


export default {
	STORAGE: STORAGE,
	phraseWinners: phraseWinners
}

