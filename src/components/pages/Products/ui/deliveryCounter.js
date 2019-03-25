const a = {
	russia: {
		standart: {
			arr: [
				{ w: 0.5, p: 50 },
				{ w: 1.0, p: 75 },
				{ w: 1.5, p: 100 },
				{ w: 2.0, p: 130 },
				{ w: 2.5, p: 160 },
				{ w: 3.0, p: 190 },
				{ w: 3.5, p: 220 },
				{ w: 4.0, p: 250 },
				{ w: 4.5, p: 280 },
				{ w: 5.0, p: 310 },
				{ w: 5.5, p: 340 },
				{ w: 6.0, p: 360 },
				{ w: 6.5, p: 390 },
				{ w: 7.0, p: 410 },
				{ w: 7.5, p: 440 },
				{ w: 8.0, p: 460 },
				{ w: 8.5, p: 490 },
				{ w: 9.0, p: 510 },
				{ w: 9.5, p: 540 },
				{ w: 10.0, p: 560 },
			],
			over: 10,
			price: 53,
			plus: 560,
			max: 30,
		},
		express: {
			arr: [
				{ w: 0.5, p: 65 },
				{ w: 1.0, p: 95 },
				{ w: 1.5, p: 125 },
				{ w: 2.0, p: 160 },
				{ w: 2.5, p: 200 },
				{ w: 3.0, p: 240 },
				{ w: 3.5, p: 275 },
				{ w: 4.0, p: 310 },
				{ w: 4.5, p: 345 },
				{ w: 5.0, p: 370 },
			],
			over: 5,
			price: 65,
			plus: 370,
			max: 30,
		},
	},
	belarus: {
		standart: {
			arr: [
				{ w: 0.5, p: 50 },
				{ w: 1.0, p: 85 },
				{ w: 1.5, p: 120 },
				{ w: 2.0, p: 150 },
				{ w: 2.5, p: 180 },
				{ w: 3.0, p: 220 },
				{ w: 3.5, p: 250 },
				{ w: 4.0, p: 280 },
				{ w: 4.5, p: 310 },
				{ w: 5.0, p: 330 },
				{ w: 5.5, p: 360 },
				{ w: 6.0, p: 380 },
				{ w: 6.5, p: 410 },
				{ w: 7.0, p: 430 },
				{ w: 7.5, p: 460 },
				{ w: 8.0, p: 480 },
				{ w: 8.5, p: 510 },
				{ w: 9.0, p: 530 },
				{ w: 9.5, p: 560 },
				{ w: 10.0, p: 580 },
			],
			over: 10,
			price: 70,
			plus: 580,
			max: 30,
		},
		express: {
			arr: [
				{ w: 0.5, p: 70 },
				{ w: 1.0, p: 110 },
				{ w: 1.5, p: 150 },
				{ w: 2.0, p: 180 },
				{ w: 2.5, p: 220 },
				{ w: 3.0, p: 260 },
				{ w: 3.5, p: 300 },
				{ w: 4.0, p: 340 },
				{ w: 4.5, p: 380 },
				{ w: 5.0, p: 410 },
			],
			over: 5,
			price: 70,
			plus: 410,
			max: 30,
		},
	},
	kasakhstan: {
		standart: {
			arr: [
				{ w: 0.5, p: 45 },
				{ w: 1.0, p: 70 },
				{ w: 1.5, p: 90 },
				{ w: 2.0, p: 120 },
				{ w: 2.5, p: 150 },
				{ w: 3.0, p: 180 },
				{ w: 3.5, p: 250 },
				{ w: 4.0, p: 210 },
				{ w: 4.5, p: 240 },
				{ w: 5.0, p: 270 },
				{ w: 5.5, p: 300 },
				{ w: 6.0, p: 330 },
				{ w: 6.5, p: 350 },
				{ w: 7.0, p: 380 },
				{ w: 7.5, p: 400 },
				{ w: 8.0, p: 430 },
				{ w: 8.5, p: 450 },
				{ w: 9.0, p: 480 },
				{ w: 9.5, p: 500 },
				{ w: 10.0, p: 550 },
			],
			over: 10,
			price: 50,
			plus: 550,
			max: 30,
		},
	},
}

export default (country, type, weight = 0) => {
	let tarif = a[country][type]

	// prettier-ignore
	return Math.ceil(9.8 * (weight <= tarif.over ? tarif.arr.find(({ w }) => w >= weight).p : weight <= tarif.max ? tarif.price * Math.ceil(weight) + tarif.plus : NaN))
}
