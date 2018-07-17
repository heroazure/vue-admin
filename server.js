/**
 * Created by xuwei on 2018/2/1.
 * 一个最简单的代理服务器
 */
let express = require('express')
let request = require('request')
let path = require('path')
/* let httpProxy = require('http-proxy')
 var proxy = httpProxy.createProxyServer({
 target: 'http://erptest.hunliji.com/',   //接口地址
 // 下面的设置用于https
 // ssl: {
 //     key: fs.readFileSync('server_decrypt.key', 'utf8'),
 //     cert: fs.readFileSync('server.crt', 'utf8')
 // },
 // secure: false
 }) */
let app = express()
app.use('/', express.static('dist'))

app.use(/^\/index\.php\/(api|admin)\/.*/, function (req, res) {
  let url = 'http://www.tlang.top:9090' + req.originalUrl
  req.pipe(request(url)).pipe(res)
})

app.use('/', function (req, res) {
  res.sendFile(path.resolve(__dirname, './dist/index.html'))
})
let args = process.argv.slice(2)
let port = args[0] || 3300
// let port = (process.argv[2]).split('=')[1] || 3300
// supervisor
app.listen(port, function (error) {
  // console.log(`Starting directory: ${process.cwd()}`)
  // console.log('NODE_ENV:',process.env.NODE_ENV)
  // process.argv.forEach(function (val, index) {
  //     console.log(`${index}: ${val}`)
  // })
  error ? console.log(error) : console.log(`Listening on port:${port}`)
})
