async function test() {
    console.log('Hello')
    await sleep(10)
    console.log('world!')
  }
  
  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }
module.exports = test;
