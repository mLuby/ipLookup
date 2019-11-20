const express = require("express")
const server = express()
const PORT = process.env.PORT || 3000

// Routes & Middleware

server.get("/", ipLookup)

// Controllers

function ipLookup (req, res) {
  const visit = req.body
  const ip = req.ip
  const ips = req.ips
  const alpha3CountryCode = "TODO"
  console.log({ip, ips, alpha3CountryCode})
  return res.status(200).json({ip, alpha3CountryCode})
}

// Side Effects (export or listen on port)

if (require.main === module) { // this file is being called directly
  server.listen(PORT, () => console.log("Listening on :"+PORT))
} else { // another file is "require"ing this file
  module.exports = {server} // for testing
}
