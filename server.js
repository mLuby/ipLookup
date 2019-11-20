const express = require("express")
const ipParser = require("ip")
const pg = require("pg")
const parseUrl = require("url").parse
const server = express()
const PORT = process.env.PORT || 3000
let pool = null

server.get("/", ipLookup)

async function ipLookup (req, res) {
  const visit = req.body
  const ip = req.ip
  const ips = req.ips
  const alpha3CountryCode = (await ipToA3CC(ip)) || "Not Found"
  console.log({ip, ips, alpha3CountryCode})
  return res.status(200).json({ip, alpha3CountryCode})
}

const dbParams = parseUrl(process.env.DATABASE_URL || "postgres://$USER:@localhost:5432/moonpay")
const dbAuth = dbParams.auth.split(":")
const dbConfig = {
  database: dbParams.pathname.split("/")[1],
  host: dbParams.hostname,
  password: dbAuth[1],
  port: dbParams.port,
  ssl: Boolean(dbAuth[1]),
  user: dbAuth[0],
}
pool = new pg.Pool(dbConfig)
pool.on("error", err => console.error("Pool error, idle client", err.message, err.stack))

async function ipToA3CC (ip) {
  const long = ipParser.toLong(ip)
  console.log({ip, long})
  const sql = `SELECT country_code FROM ip2location WHERE ip_from <= ${long} AND ip_to >= ${long} LIMIT 1;`
  return new Promise((resolve, reject) => {
    pool.connect((connectError, client, done) => {
      if (connectError) return reject(connectError)
      client.query(sql, (queryError, result) => {
        if (queryError) return reject(queryError)
        try { resolve(result.rows[0].country_code) }
        catch (resultError) { reject(resultError) }
      })
    })
  })
}

// Side Effects (export or listen on port)

if (require.main === module) { // this file is being called directly
  server.listen(PORT, () => console.log("Listening on :"+PORT))
} else { // another file is "require"ing this file
  module.exports = {server} // for testing
}
