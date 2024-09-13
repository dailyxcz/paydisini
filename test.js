require("dotenv").config();
const { PayDisini } = require("./dist/index");
const generateUniqueId = require("generate-unique-id");

(async () => {
	const payDisini = new PayDisini({ key: process.env.API_KEY });

	const paymentChannelRes = await payDisini.paymentChannel();
	console.log(paymentChannelRes);

	const paymentGuide = await payDisini.paymentGuide(1);
	console.log(paymentGuide.data[0].content);

	const profile = await payDisini.profile();
	console.log(profile);

	const unique_code = generateUniqueId({ length: 10 }).toUpperCase();
	const new_transaction = await payDisini.new_transaction({
		unique_code,
		amount: "1000",
		service: "23",
		valid_time: "1800",
		note: "Testing",
		type_fee: "1",
	});
	console.log(new_transaction);

	const status_transaction = await payDisini.status_transaction(unique_code);
	console.log(status_transaction);

	const cancel_transaction = await payDisini.cancel_transaction(unique_code);
	console.log(cancel_transaction);
})();