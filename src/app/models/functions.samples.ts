import mcu from './mcu.json';
export default {
    "array": {
        "sortByBudget": [mcu],
        "sortByTitle": [mcu],
        "filterByBluray": [mcu],
        "transformArray": [mcu],
        "sumBudget": [mcu]
    },
    "promise": {
        "badPromise": [
            'This is the first failure',
            'This is the second failure',
            'This is the third failure',
        ],
        "goodPromise": [
            'This is the first success',
            'This is the second success',
            'This is the third success',
        ],
        "mathPromise": [3, 5, 12]
    }
}