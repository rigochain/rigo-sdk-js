import { RWeb3 } from '../../src';
import RWeb3Rigo from 'rweb3-rigo';

describe('RWeb3 class', () => {

	it('should initialize RWeb3 instance correctly', () => {

		const provider = 'http://localhost:8545';
		const rWeb3Instance = new RWeb3(provider);

		// Check if the instance is correctly initialized
		expect(rWeb3Instance).toBeInstanceOf(RWeb3);

	});

	it('should initialize RWeb3Rigo module correctly', () => {
		const rWeb3Instance = new RWeb3();

		// Check if the rigo module is correctly initialized
		expect(rWeb3Instance.rigo).toBeInstanceOf(RWeb3Rigo);
	});
});