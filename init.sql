-- psql -qd moonpay -a -f init.sql >/dev/null 2>&1

-- CREATE DATABASE ip2location WITH ENCODING 'UTF8';
-- \c ip2location

CREATE TABLE ip2location(
	ip_from decimal(39,0) NOT NULL,
	ip_to decimal(39,0) NOT NULL,
	country_code character(2) NOT NULL,
	country_name character varying(64) NOT NULL,
	CONSTRAINT ip2location_pkey PRIMARY KEY (ip_from, ip_to)
);

-- IPv4
COPY ip2location FROM '/Users/$USER/moonpay/IP2LOCATION-LITE-DB1.CSV' WITH CSV QUOTE AS '"';
-- IPv6
COPY ip2location FROM '/Users/$USER/moonpay/IP2LOCATION-LITE-DB1.IPV6.CSV' WITH CSV QUOTE AS '"';
