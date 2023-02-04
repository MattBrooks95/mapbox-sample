export {
	fib
}

/**
* @param nthFibNumber calculate the value of the nth fibonacci number.
* If this parameter is negative, undefined will be returned.
**/
function fib(nthFibNumber: number): number | undefined {
	//this function only handles positive indices
	if (nthFibNumber < 0) return undefined;
	if (nthFibNumber === 0) return 0;
	if (nthFibNumber === 1) return 1;
	return fibGo(0, 1, 2, nthFibNumber);
}

function fibGo(prevPrev: number, prev: number, index: number, nthFibNumber: number): number | undefined {
	if (index === nthFibNumber) return prevPrev + prev;
	return fibGo(prev, prevPrev + prev, index + 1, nthFibNumber);
}
