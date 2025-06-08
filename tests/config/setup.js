const mongoose = require("mongoose")

/// setup.js will be sensed by jest because its path is specified in 
// package.json under key called as jest

// before All will work before starying the test
/// before starting the test, MONGO should be connected
beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI)
  console.log(process.env.MONGO_URI)
  console.log("Connected To DB In Jest Config")
});


// Once testing is finished, clean the DB & close the connection 

afterAll(async () => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    await collections[key].deleteMany({});
  }
  await mongoose.connection.close();
  console.log("Collections cleared and connection closed");
});