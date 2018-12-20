#!/usr/bin/env node

const program = require('commander')
const jsonld = require('jsonld')
const jsig = require('jsonld-signatures')
const clear = require('clear')
const figlet = require('figlet')
const chalk = require('chalk')
const fs = require('fs')

jsig.use('jsonld', jsonld);

//clear()

let publicKeyPem = "-----BEGIN PUBLICKEY-----\r\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAyFrXjLpXVOh5jghxbtJs\r\nTu/LOTqshrb+Py7ULtN7uIdLzIyflQwExlyUO/dX8qOrK6k046m0aRuUPZVDvfoz\r\nako/BWsYyVXQgrv0pwLmULGOYg9aLXnbSq76sVsxOMz9BxXkVCWp74mIJOvmeclL\r\n5bbY1Svks0u1DidaUU7yuavpS8LUXNzcEOEgJBLc9ZhsKKKLK3d0i2V0Vwk2+AYT\r\nzF0Tkwq2/XCrpTevLEsKcyaUbzrEmtw5/221vS5vgLBASA2fvkak7VhHJpK0vBYK\r\ngq8X+bY+xJX9Nkh2k4cIS74XgypcP6fDe8cvXskB3IHCMy3I3BJc7BkGbPJwlzUZ\r\n3QIDAQAB\r\n-----END PUBLIC KEY-----\r\n";
let privateKeyPem = "-----BEGIN RSA PRIVATE KEY-----\r\nMIIEowIBAAKCAQEAyFrXjLpXVOh5jghxbtJsTu/LOTqshrb+Py7ULtN7uIdLzIyf\r\nlQwExlyUO/dX8qOrK6k046m0aRuUPZVDvfozako/BWsYyVXQgrv0pwLmULGOYg9a\r\nLXnbSq76sVsxOMz9BxXkVCWp74mIJOvmeclL5bbY1Svks0u1DidaUU7yuavpS8LU\r\nXNzcEOEgJBLc9ZhsKKKLK3d0i2V0Vwk2+AYTzF0Tkwq2/XCrpTevLEsKcyaUbzrE\r\nmtw5/221vS5vgLBASA2fvkak7VhHJpK0vBYKgq8X+bY+xJX9Nkh2k4cIS74Xgypc\r\nP6fDe8cvXskB3IHCMy3I3BJc7BkGbPJwlzUZ3QIDAQABAoIBAGY30pj9yOiM4tdP\r\n/29m89MiDDDaeoMQgY6CucZaJ1jxzf5CEHjedOEvAoHFo50rW30fCtjMEDs/0tXI\r\nfZNDP1APKS/+f9rYaVUJx7wdgpvQuq/U3VEuRm9H7qblu6sbCky/Ioq73INVS5xq\r\nrl+cD5jXPLElf7zp9ymNckrhWHzZDS2ss7Jfw7OxmEUzKkgoF+oRswG0yFHcn6Rx\r\nO0pVIGSnpHJsgNKuUOq3QtUXucSDAfAAwxdMX173WHtVOABT/PHs8RtSpbpan20H\r\nFaLLx9c5C7XwaOmNnvkxImVaT2rh0P5UwejKw01zTHvoe7eOtCLBYipxYIibGj5F\r\nb8QMZ4ECgYEA6Zt59GYR/RWmSQ2AYq95iRE8goax2GPmrKzlD+qvi5/WKVyy43z3\r\nlP62IZwkv1G9F1damZwbVNpnjOYu4TJ4gY9k97bdK0HG7UGl2JZBPu3KhCr/PV4w\r\nqTWh7RwbK+nl24MO1tz4WFkkuNrcVP0GVfYxw/DdvZDiScCa7RGlkSkCgYEA249g\r\n2CGE96OhZ+VE6CIl3oL5ZXGoxpTKgXZgjGVSh5vpjT9e0ImTTqBRfUxTI2BnNB6v\r\nPCz4xDoijcL0wAegKzajbUGaSNhe1fYl9NkqEUsUBlMb1X+U0xPaHR/bbJ64FBA7\r\n3CLbLo5bFx9Xp1RUxorK61Epc7MU54nj8o8dVZUCgYAJL4znGFBixEQqoTZIKyA7\r\nTIs1krhRivQaHB5Rtue6NMnGDJgYK+TMXgupXKtxPnSSA2RTn/jPKFtkBfUX89Ub\r\nOxk8SFuABPEeiTNNRfNA1zbcZZhtwFNng+1fFnjXDDZ2oDuoJT46sx6niiuZx+1E\r\n2g5w5vrBJn5PahxtcAEzqQKBgEWmaDxn9bxxRiSlUISrQIQj3GXX9oh4bv0+xkYD\r\nZnjqdt59+eABpJ9OsEslSUJxtIuOKFzYj1oAbzG1ZNr+EEtlG9bu9rihGwSY/1V7\r\nBqNRw9p1xuClhlqnc4vFrV/5wb9rnvGohQtx0We2Y6ILWJFbOiAIMTQo3TrOPWeX\r\nCuE5AoGBANYbw1M5D0D3nfrPjsojkFBsb5pFrN3rL5bhVUBG9Rh3vBxX5RZlIOaF\r\nIT8o1j+NTaZIMo3A32vm2kdwTU4sZDGVDgFELhKOgfB5FBledw/MxMYt4QbuewuP\r\nUScpFQzu5a8YmaASN5mOAfW7VXY+99fFCxsP/DG7KKK2Z1xhjqpI\r\n-----END RSA PRIVATE KEY-----\r\n";

// specify the public key object
let publicKey = {
  '@context': 'https://w3id.org/veres-one/v1',
  '@id': 'did:v1:test:nym:nmR9EvCsQ8Jj-OTC7LD9Mb0q5mHqKj_4f75myaR3i5M#authn-key-1',
  'owner': 'did:v1:test:nym:nmR9EvCsQ8Jj-OTC7LD9Mb0q5mHqKj_4f75myaR3i5M',
  'publicKeyPem': publicKeyPem
};

// specify the public key owner object
let publicKeyOwner = {
  "@context": 'https://w3id.org/veres-one/v1',
  '@id': 'did:v1:test:nym:nmR9EvCsQ8Jj-OTC7LD9Mb0q5mHqKj_4f75myaR3i5M',
  'publicKey': [publicKey]
};
program
	.version('1.0.0' , '-v, --version')
	.description('Digitally sign and verify JSON-LD files')
	.option('-s --sign', 'Sign the JSON-LD file', false)
  	.option('-c --verify', 'Verify the signed file', false)
  	.option('-f --file <path>', 'File to be verified or signed')
  	.parse(process.argv);

	
	if(program.sign && typeof program.sign !='undefined' && program.verify && typeof program.verify !='undefined'){
		console.log(
		  	chalk.red(
		  		figlet.textSync('ERROR:', {horizontalLayout : 'fitted' })
		  	)
		);
		console.log(
	  		chalk.yellow(' -s and -c flag can not be passed together')
	  	);
	}else if(program.sign){
		let file = program.file;
		// create the JSON-LD document that should be signed
		if (fs.existsSync(program.file)) {
		    // Do something
		    let contents = fs.readFileSync(program.file, 'utf8');
			let jsonContent = JSON.parse(contents); 
			
			// sign the document and then verify the signed document
			jsig.sign(jsonContent, {
			  privateKeyPem: privateKeyPem,
			  creator: 'did:v1:test:nym:nmR9EvCsQ8Jj-OTC7LD9Mb0q5mHqKj_4f75myaR3i5M',
			  algorithm: 'RsaSignature2018'
			}, function(err, signedDocument) {
			  if(err) {
			    return console.log('Signing error:', err);
			  }
			  console.log(signedDocument);

			  // verify the signed document
			  /*jsig.verify(signedDocument, {
			    publicKey: testPublicKey,
			    publicKeyOwner: testPublicKeyOwner
			  }, function(err, verified) {
			    if(err) {
			      return console.log('Signature verification error:', err);
			    }
			    console.log('Signature is valid:', verified);
			  });*/
			});
		}else {
			console.log('file does not exist at', program.file);
		}
	}else if(program.verify){
		if (fs.existsSync(program.file)) {
		    // Do something
			let signedContent = fs.readFileSync(program.file, 'utf8');
			console.log('signed content', signedContent);
			let signedDocument = JSON.parse(signedContent); 
			// verify the signed document
		  jsig.verify(signedDocument, {
		    publicKey: publicKey,
		    publicKeyOwner: publicKeyOwner
		  }, function(err, verified) {
		    if(err) {
		      return console.log('Signature verification error:', err);
		    }
		    console.log('Signature is valid:', verified);
		  });
		}else {
			console.log('file does not exist at', program.file);
		}
	}


program.on('--help', function(){
  console.log('')
  console.log(
  	chalk.red(
  		figlet.textSync('Examples:', {horizontalLayout : 'fitted' })
  	)
  );
  console.log(
  	chalk.green('  $ cd-tool -s -f creddoc.json > sign-creddoc.json // Sign the creddoc.json file')
  );
  console.log(
  	chalk.green('  $ cd-tool -v -f sign-creddoc.json // Verify the signed doc')
  );
});

