
import { RWeb3PkgInfo } from '../../src/version';
import packageFile from '../../package.json';

describe('rweb3 package info', () => {
	it('should RWeb3PkgInfo.version returns the same version set at package.json', () => {
		expect(packageFile.version).toEqual(RWeb3PkgInfo.version);
	});
});
