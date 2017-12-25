const bind = new Together(document.body, "bind");

const one = document.getElementById("random-one");
for (let i = 0; i < 100; i++) {
	const el = document.createElement("div");
	one.appendChild(el);
	bind.upgrade(el, "random-one");
}

const two = document.getElementById("random-two")
for (let i = 0; i < 100; i++) {
	const el = document.createElement("div");
	two.appendChild(el);
	bind.upgrade(el, "random-two");
}

const three = document.getElementById("random-three")
for (let i = 0; i < 100; i++) {
	const el = document.createElement("div");
	three.appendChild(el);
	bind.upgrade(el, "random-three");
}

const christmas = ["Reindeer", "Santa", "Pudding", "Snowman", "Elf", "Christmas Tree", "Snowball", "Turkey"]
setInterval(() => {
	bind.set("random-one", christmas[Math.floor(Math.random()*christmas.length)]);
}, 1000);

setInterval(() => {
	bind.set("random-two", christmas[Math.floor(Math.random()*christmas.length)]);
}, 1500);

setInterval(() => {
	bind.set("random-three", christmas[Math.floor(Math.random()*christmas.length)]);
}, 2000);
