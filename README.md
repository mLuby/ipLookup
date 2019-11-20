# Multi-region IP address location API

## Requirements
- The endpoint needs to return the IP address of the client and the alpha-3 country code of the IP address country.
- Using [this latency testing tool](https://latency.apex.sh), the latency should be nearly the same in Ireland and Virginia. (< 200ms for both if possible).
- You cannot use an external API to check for an IP address country. You can take a look at these two free databases: [Maxmind GeoLite 2](https://dev.maxmind.com/geoip/geoip2/geolite2/) and [IP2Location Lite](https://lite.ip2location.com/database/ip-country).
- I give you carte blanche for the choice of the tech stack.

## Bonus task
- Build a simple frontend that uses the API.

## Deliverable
- GitHub repository with source code
- endpoint URL and
- brief explanation of the the multi-region infrastructure you've built.
- If you've looked (and/or tested) multiple hosting vendors, feel free to write about it.
