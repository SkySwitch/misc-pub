function dnsDomainIsOrUnder(host, other) 
{
	return ((host === other) || dnsDomainIs(host, '.'+other));
}

function FindProxyForURL(url, host) 
{	
	// Your proxy server name and port
	var proxy = "PROXY 18.207.91.110:3128;";
	var resolved_host = dnsResolve(host);

	host_overrides = [
		'webrtc.reachuc.com'
		// "*.cpe.mixnetworks.net"
	];
	
	//Return direct for literal hosts and wildcards
	for(var i=0; i < host_overrides.length; i++) {
		if ( shExpMatch(host, host_overrides[i]) ) { return 'DIRECT'; }
	}

	/* Proxy By Domain */
	domains_to_proxy = [
		'reachuc.com',
		'sendgrid.com',
		'dialtoen.com',
		'dashmanager.com',
		'dashmanager.io',
		'skyswitch.com',
		'ipfax.net',
		'instant-fax.com',
		'iconectiv.com',
		'app.sendgrid.com'
        ];
	
	for (i = 0; i < domains_to_proxy.length; i++) {
		if (dnsDomainIsOrUnder(host, domains_to_proxy[i])) { return proxy; }
  	}


	/* Proxy By IP */
	ips_to_proxy = [ 
		//['70.42.44.0', '255.255.255.0'],	//NYJ Colo
		//['75.98.50.0', '255.255.255.0'],	//DAL Colo
		//['199.21.224.0', '255.255.255.224'],	//MIN Colo
		//['216.24.144.0', '255.255.255.0'],	//LAS Colo
		['50.59.195.170', '255.255.255.255']	//Heathrow Office
	];

	for (i = 0; i < ips_to_proxy.length; i++) {
		if (isInNet(resolved_host, ips_to_proxy[i][0], ips_to_proxy[i][1])) { return proxy; }
		//if ( shExpMatch(resolved_host, ips_to_proxy[i][0]) ) { return proxy; }
	}
	
	return 'DIRECT';
}
