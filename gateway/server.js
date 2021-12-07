const util = require('util');
const exec = util.promisify(require('child_process').exec)
const io = require("socket.io")(3000, {
  cors: {
    origin: '*',
  }
});

const handleExec = ({ error, stdout }) => {
  if(error) {
    console.error(`Error happened : ${error}`) 
    return;
  }

  console.log(stdout)
}

io.on("connection", async (socket) => {
  await exec('adb disconnect')
  handleExec(await exec('adb kill-server'))
  handleExec(await exec('adb start-server'))
  handleExec(await exec(`adb connect 192.168.0.183`))
  handleExec(await exec('adb devices -l'))

  socket.on("command", data => {
    const { type, msg } = data;
    exec(`${type} ${msg}`, (error, stdout, stderr) => {
      if(error) {
        return socket.emit('error', {error})
      }

      return socket.emit('reply', { msg: `Command has been sent: ${msg}` })
    })
  });
});
