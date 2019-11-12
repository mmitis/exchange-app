import { requestStart, requestSuccess, requestFailure} from '../../utils/redux';

describe('Utils: redux', () => {

    it('should test requestStart', async () => {
        expect(requestStart('SAMPLE_ACTION' , {
            sample: 'awesome'
        })).toEqual({
            type: 'SAMPLE_ACTION',
            payload: {
                sample: 'awesome'
            }
        });
    });

    it('should test requestSuccess', async () => {
        expect(requestSuccess('SAMPLE_ACTION' , {
            sample: 'awesome'
        })).toEqual({
            type: 'SAMPLE_ACTION_SUCCESS',
            payload: {
                sample: 'awesome'
            }
        });
    });

    it('should test requestFailure', async () => {
        expect(requestFailure('SAMPLE_ACTION' , 'error', {
            sample: 'awesome'
        })).toEqual({
            type: 'SAMPLE_ACTION_FAILURE',
            payload: {
                error: 'error',
                sample: 'awesome'
            }
        });
    });
});
