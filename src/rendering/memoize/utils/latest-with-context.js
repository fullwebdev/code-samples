function isEqual(newInputs, lastInputs) {
  if (newInputs.length !== lastInputs.length) {
    return false;
  }

  for (let i = 0; i < newInputs.length; i += 1) {
    if (newInputs[i] !== lastInputs[i]) {
      return false;
    }
  }
  return true;
}

//#region memoization
export function memLatest(fn) {
  let lastThis;
  let lastArgs;
  let lastResult;
  let calledOnce;

  function memoized(...newArgs) {
    if (
      calledOnce &&
      lastThis === this &&
      isEqual(newArgs, lastArgs)
    ) {
      return lastResult;
    }

    lastResult = fn.apply(this, newArgs);
    calledOnce = true;
    lastThis = this;
    lastArgs = newArgs;
    return lastResult;
  }

  return memoized;
}
//#endregion memoization
