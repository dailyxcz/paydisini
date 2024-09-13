🚀 fast and easy request to [PayDisini](https://paydisini.co.id/)
# Installation
```
npm install paydisini
```
# Usage
```js
const { PayDisini } = require("paydisini");
const generateUniqueId = require("generate-unique-id");

(async () => {
	const payDisini = new PayDisini({ key: "YOUR_API_KEY" });

    // show all available payment channel
	const paymentChannelRes = await payDisini.paymentChannel();
	console.log(paymentChannelRes);

    // show payment guide for given payment id
	const paymentGuide = await payDisini.paymentGuide(1);
	console.log(paymentGuide.data[0].content);

    // show paydisini profile
	const profile = await payDisini.profile();
	console.log(profile);

	const unique_code = "ANY_UNIQUE_CODE";

    // create a new transaction
	const new_transaction = await payDisini.new_transaction({
		unique_code,
		amount: "1000",
		service: "23",
		valid_time: "1800",
		note: "Testing",
		type_fee: "1",
	});
	console.log(new_transaction);

    // show the status transaction for given unique code
	const status_transaction = await payDisini.status_transaction(unique_code);
	console.log(status_transaction);

    // cancel the transaction for given unique code
	const cancel_transaction = await payDisini.cancel_transaction(unique_code);
	console.log(cancel_transaction);
})();
```