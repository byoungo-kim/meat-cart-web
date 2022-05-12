// Require the framework and instantiate it
const fastify = require('fastify')({ logger: true })
const fs = require('fs')

const recordOrder = (orderFileName, userId, buttonId, value) => {
  // convert the button value into id
  if (value === 'pushed') {
    fs.appendFile(orderFileName, `${userId}\t${buttonId}\t${value}\n`, function (err) {
      if (err) throw err;
      console.log('Saved!');
    });
  }
};

// Declare a route
fastify.post('/button/push', {},  (request, reply) => {
  const date = new Date();
  console.log(`user_id: ${request.body.user_id}`);
  console.log(`button_id: ${request.body.button_id}`);
  console.log(`value: ${request.body.value}`);
  const orderFileName = `order_data_${date.getFullYear()}_${date.getMonth()+1}_${date.getDate()}.csv`;
  console.log(`orderFileName: ${orderFileName}`);
  fs.stat(orderFileName, (err, stats) => {
    if (err) {
      fs.writeFile(orderFileName, `User ID\tMeat Type\tValue\n`, function (err) {
        if (err) throw err;
        recordOrder(orderFileName, request.body.user_id, request.body.button_id, request.body.value);
      });
    } else {
      recordOrder(orderFileName, request.body.user_id, request.body.button_id, request.body.value);
    }
  });
  
  return { hello: 'world' }
});

// Run the server!
const start = async () => {
  try {
    await fastify.listen(3000)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()
