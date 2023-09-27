export class MyValidators {
    static eventCode(control) {
        if ( control.value.match(/^\d+$/) ) {
            return null;
        } else {
            return { 'eventCode': true }; // ERROR
        }
    }
}
