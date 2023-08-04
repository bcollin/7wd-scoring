import localStorageSvc from '../services/local-storage.js';

function parseDisplayLogItem(item) {
	if (typeof item !== 'object') { return ''; }
	var out = '';
	
	const winningPlayer = localStorageSvc.phraseWinners(item.winner, item.players);
	out = item.dt + ', ' + item.result + ' ' + winningPlayer + ' ';
	
	return out;
};

export default {
	parseDisplayLogItem: parseDisplayLogItem,
}