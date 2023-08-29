import WebsocketProvider from '../../../src';
import { getDevWsServer } from '../e2e_utils';
import { createJsonRpcRequest } from './websocket_provider.test';
import { SubscriptionEvent } from '../../../lib/types';

describe('WebsocketClient', () => {
    const blockTime = 500;

    it('can listen to events', (done) => {
        const client = new WebsocketProvider(getDevWsServer());

        const query = "tm.event='NewBlockHeader'";
        const req = createJsonRpcRequest('subscribe', { query: query });
        const headers = client.listen(req);

        const events: SubscriptionEvent[] = [];

        const subscription = headers.subscribe({
            error: done.fail,
            complete: () => done.fail('subscription should not complete'),
            next: (event: SubscriptionEvent) => {
                events.push(event);
                expect(event.query).toEqual(query);

                console.log('event', event);

                if (events.length === 2) {
                    // make sure they are consecutive heights

                    subscription.unsubscribe();

                    // wait 1.5 * blockTime and check we did not get more events
                    setTimeout(() => {
                        expect(events.length).toEqual(2);

                        client.disconnect();
                        done();
                    }, 1.5 * blockTime);
                }
            },
        });
    });
});
