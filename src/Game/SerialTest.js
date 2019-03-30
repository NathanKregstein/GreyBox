  const SerialPortReader = require('./SerialPortReader');

function onSerialMessage(msg) {
  // Put your serial reading code in here. msg will be a string
  console.log(msg);
}
SerialPortReader.addListener(onSerialMessage);