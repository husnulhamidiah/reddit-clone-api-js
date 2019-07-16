// refs : https://expressjs.com/en/advanced/best-practice-performance.html#use-promises
const wrap = fn => (...args) => fn(...args).catch(args[2])

export default wrap
