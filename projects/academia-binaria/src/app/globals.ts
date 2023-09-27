let subscriptions = [];
export function cleanSubscriptions() {
    console.log(subscriptions);
    if (subscriptions.length) {
        subscriptions.forEach(s => s.unsubscribe());
        subscriptions = [];
    }
}
export function addSubscription(...subscription) {
    subscriptions.push(...subscription);
}
