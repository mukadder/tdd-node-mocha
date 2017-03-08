/**
 * Created by mukadder on 3/8/17.
 */
function isPrimeSqrt(number) {
    let divisor = 2

    while (start <= Math.sqrt(number)) {
        if (number % divisor++ < 1) return false
    }
    return number > 1
}

function isPrime(n){
    let divisor = 2;

    while (n > divisor){
        if(n % divisor == 0){
            return false
        } else
            divisor++
    }
    return true
}
