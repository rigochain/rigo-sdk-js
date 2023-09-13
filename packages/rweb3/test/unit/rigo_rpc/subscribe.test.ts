/*
    Copyright 2023 All Rigo Chain Developers

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
*/
import { RWeb3 } from '../../../src';
import { getTestWsServer } from '../e2e_utils';
import { SubscriptionEvent } from '@rigo/rweb3-types';

describe('subscribe check ', () => {
    const blockTime = 500;
    let testWebsocketRWeb3Instance: RWeb3;

    beforeAll(() => {
        testWebsocketRWeb3Instance = new RWeb3(getTestWsServer());
    });

    it('can listen to events', (done) => {
        const query = "tm.event='NewBlockHeader'";
        const headers = testWebsocketRWeb3Instance.rigo.subscribe(query);

        const events: SubscriptionEvent[] = [];

        const subscription = headers.subscribe({
            error: done.fail,
            complete: () => done.fail('subscription should not complete'),
            next: (event: SubscriptionEvent) => {
                events.push(event);
                expect(event.query).toEqual(query);

                console.log('event', event);
                console.log('height', event.data.value);

                if (events.length === 2) {
                    // make sure they are consecutive heights

                    subscription.unsubscribe();

                    // wait 1.5 * blockTime and check we did not get more events
                    setTimeout(() => {
                        expect(events.length).toEqual(2);
                        done();
                    }, 1.5 * blockTime);
                }
            },
        });
    });
});
