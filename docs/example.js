const bind = new Together(document.body, "bind");

const prices = {
	"lolcoin" : [100.12, 99.2, 99.4, 101.1, 100.2, 99.88, 99.99, 99.53],
	"roflthereum" : [30.00, 30.19, 30.22, 30.21, 30.4, 30.5, 29.9, 29.8, 29.74],
	"bitecoin" : [22.1, 22.0, 23.0, 21.9, 22.35, 22.34, 22.44, 22.88, 22.73, 22.12]
};

function getPrice(product) {
	return prices[product][Math.floor(Math.random()*prices[product].length)];
}

function setProduct(columnId, product) {


	const col = document.getElementById(columnId);
	const num = 100; 

	for (let i = 0; i < num; i++) {

		const el = document.createElement("div");
		col.appendChild(el);

		const val = Math.floor(Math.random() * prices[product].length) + 1;
		const price = getPrice(product);
		const stateProp = product +  val;

		bind.upgrade(el, stateProp);
		bind.set(stateProp, price);
	}

	setInterval(() => {
		let val = Math.floor(Math.random() * prices[product].length) + 1;
		bind.set(product + val, getPrice(product));
	}, 1000 * (Math.random() + 0.5));

}

setProduct("roflthereum", "roflthereum");
setProduct("lolcoin", "lolcoin");
setProduct("bitecoin", "bitecoin");
