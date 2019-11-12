import { initApplication } from './../../actions/initAction';
import { getCurrencyRates, runRefreshInterval } from './../../actions/currencyAction';

jest.mock('./../../actions/currencyAction');

describe('Action: initActions', () => {

    it('should test initApp', async () => {
        getCurrencyRates.mockImplementationOnce(() => () => null);
        runRefreshInterval.mockImplementationOnce(() => () => null);

        await initApplication()(function dispatcher(action) {
            action();
        });

        expect(getCurrencyRates).toHaveBeenCalled();
        expect(runRefreshInterval).toHaveBeenCalled();
    });
});
