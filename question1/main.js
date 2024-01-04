export function isValidWalk(walk) {
    /*
    parameters: string array (walk)
    return: Boolean (isValidWalk)

    walk valid values: ['n', 's', 'w', 'e']
    return True if the walk is valid, False otherwise.

    A valid walk should meet two conditions:
        1) The string array is exactly 10 in length (exactly a 10 minutes walk)
        2) The finish point should be exactly where it started.
            - If we consider a cartesian plane: 
                - each 'n' adds 1, and each 's' substract 1 on the y axis.
                - each 'e' adds 1, and each 'w' substract 1 on the x axis.
            so, to finish in the same point:
                - number of 'n's and 's's should be equal, 
                - and number of 'e's and 'w's should be equal
                count('n') === count('s') && count('e') === count('w')
    */

    if (walk.length != 10) {
        return false
    } else {
        // count number of ocurrences of all elements in the array ('n', 's', 'e', 'w')
        const counter = {}
        walk.forEach(item  => {
            if (counter[item]) {
                counter[item] += 1;
            } else {
                counter[item] = 1;
            }
        })
        return (counter['n'] === counter['s'] && counter['e'] === counter['w'])
    }
}