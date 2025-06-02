// timers -> pending callback -> idle, prepare -> poll -> check => close callback

const fs = require('fs');
const crypto = require('crypto');

console.log('1. script start');

setTimeout(() => {
  console.log('2. set timout 0s call back (macro task)');
},0)

setTimeout(() => {
  console.log('3. set timout 0s call back (macro task)');
},0)

setImmediate(()=>{
  console.log('4. set timout 0s call back (macro task)');
},0)

Promise.resolve().then(() => {
  console.log('5. promise resolved (micro task)');
})

process.nextTick(() => {
  console.log('6. promise.nextTick callback (micro task)');
})

fs.readFile(__filename, () => {
    console.log('7. file read operation (I/O call back)');
})

crypto.pbkdf2('secret', 'salt', 10000, 64, 'sha512', (err, key) =>{
  if(err) throw err
  console.log('8. pbkdf2 operation completed (CPU intensive task)');
})

console.log('9. scripts ends');
