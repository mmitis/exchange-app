import { replaceParamsInPath } from '../../utils/url';

describe('Utils: url', () => {

    it('should test replaceParamsInPath', async () => {
        expect(replaceParamsInPath('http://www.pw.pl/::sample' , {
            sample: 'awesome'
        })).toEqual('http://www.pw.pl/awesome');
    });
});
