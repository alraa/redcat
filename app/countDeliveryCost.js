const stdTarifs = {
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
    kazakhstan: {
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

const postNlTarifs = [
    { w: 0.1, p: 400 },
    { w: 0.2, p: 470 },
    { w: 0.3, p: 520 },
    { w: 0.4, p: 580 },
    { w: 0.5, p: 640 },
    { w: 0.6, p: 700 },
    { w: 0.7, p: 760 },
    { w: 0.8, p: 820 },
    { w: 0.9, p: 900 },
    { w: 1.0, p: 1000 },
    { w: 1.1, p: 1050 },
    { w: 1.2, p: 1100 },
    { w: 1.3, p: 1150 },
    { w: 1.4, p: 1200 },
    { w: 1.5, p: 1250 },
    { w: 1.6, p: 1300 },
    { w: 1.7, p: 1400 },
    { w: 1.8, p: 1550 },
    { w: 1.9, p: 1600 },
    { w: 2.0, p: 1650 },
]

const emsTarifs = [
    { w: 0.1, p: 1850 },
    { w: 0.2, p: 1850 },
    { w: 0.3, p: 1850 },
    { w: 0.4, p: 1850 },
    { w: 0.5, p: 1850 },
    { w: 0.6, p: 2350 },
    { w: 0.7, p: 2350 },
    { w: 0.8, p: 2350 },
    { w: 0.9, p: 2350 },
    { w: 1.0, p: 2350 },
    { w: 1.1, p: 2850 },
    { w: 1.2, p: 2850 },
    { w: 1.3, p: 2850 },
    { w: 1.4, p: 2850 },
    { w: 1.5, p: 2850 },
    { w: 1.6, p: 3350 },
    { w: 1.7, p: 3350 },
    { w: 1.8, p: 3350 },
    { w: 1.9, p: 3350 },
    { w: 2.0, p: 3350 },
    { w: 2.1, p: 3850 },
    { w: 2.2, p: 3850 },
    { w: 2.3, p: 3850 },
    { w: 2.4, p: 3850 },
    { w: 2.5, p: 3850 },
    { w: 2.6, p: 4350 },
    { w: 2.7, p: 4350 },
    { w: 2.8, p: 4350 },
    { w: 2.9, p: 4350 },
    { w: 3.0, p: 4350 },
    { w: 3.1, p: 4850 },
    { w: 3.2, p: 4850 },
    { w: 3.3, p: 4850 },
    { w: 3.4, p: 4850 },
    { w: 3.5, p: 4850 },
    { w: 3.6, p: 5350 },
    { w: 3.7, p: 5350 },
    { w: 3.8, p: 5350 },
    { w: 3.9, p: 5350 },
    { w: 4.0, p: 5350 },
    { w: 4.1, p: 5850 },
    { w: 4.2, p: 5850 },
    { w: 4.3, p: 5850 },
    { w: 4.4, p: 5850 },
    { w: 4.5, p: 5850 },
    { w: 4.6, p: 6350 },
    { w: 4.7, p: 6350 },
    { w: 4.8, p: 6350 },
    { w: 4.9, p: 6350 },
    { w: 5.0, p: 6350 },
    { w: 5.1, p: 6850 },
    { w: 5.2, p: 6850 },
    { w: 5.3, p: 6850 },
    { w: 5.4, p: 6850 },
    { w: 5.5, p: 6850 },
    { w: 5.6, p: 7350 },
    { w: 5.7, p: 7350 },
    { w: 5.8, p: 7350 },
    { w: 5.9, p: 7350 },
    { w: 6.0, p: 7350 },
    { w: 6.1, p: 7850 },
    { w: 6.2, p: 7850 },
    { w: 6.3, p: 7850 },
    { w: 6.4, p: 7850 },
    { w: 6.5, p: 7850 },
    { w: 6.6, p: 8350 },
    { w: 6.7, p: 8350 },
    { w: 6.8, p: 8350 },
    { w: 6.9, p: 8350 },
    { w: 7.0, p: 8350 },
    { w: 7.1, p: 8850 },
    { w: 7.2, p: 8850 },
    { w: 7.3, p: 8850 },
    { w: 7.4, p: 8850 },
    { w: 7.5, p: 8850 },
    { w: 7.6, p: 9350 },
    { w: 7.7, p: 9350 },
    { w: 7.8, p: 9350 },
    { w: 7.9, p: 9350 },
    { w: 8.0, p: 9350 },
    { w: 8.1, p: 9850 },
    { w: 8.2, p: 9850 },
    { w: 8.3, p: 9850 },
    { w: 8.4, p: 9850 },
    { w: 8.5, p: 9850 },
    { w: 8.6, p: 10350 },
    { w: 8.7, p: 10350 },
    { w: 8.8, p: 10350 },
    { w: 8.9, p: 10350 },
    { w: 9.0, p: 10350 },
    { w: 9.1, p: 10850 },
    { w: 9.2, p: 10850 },
    { w: 9.3, p: 10850 },
    { w: 9.4, p: 10850 },
    { w: 9.5, p: 10850 },
    { w: 9.6, p: 11350 },
    { w: 9.7, p: 11350 },
    { w: 9.8, p: 11350 },
    { w: 9.9, p: 11350 },
    { w: 10.0, p: 11350 },
]

const dhlTarifs = [
    { w: 0.1, p: 2100 },
    { w: 0.2, p: 2100 },
    { w: 0.3, p: 2100 },
    { w: 0.4, p: 2100 },
    { w: 0.5, p: 2100 },
    { w: 0.6, p: 2550 },
    { w: 0.7, p: 2550 },
    { w: 0.8, p: 2550 },
    { w: 0.9, p: 2550 },
    { w: 1.0, p: 2550 },
    { w: 1.1, p: 3000 },
    { w: 1.2, p: 3000 },
    { w: 1.3, p: 3000 },
    { w: 1.4, p: 3000 },
    { w: 1.6, p: 3500 },
    { w: 1.5, p: 3000 },
    { w: 1.7, p: 3500 },
    { w: 1.8, p: 3500 },
    { w: 1.9, p: 3500 },
    { w: 2.0, p: 3500 },
    { w: 2.1, p: 3950 },
    { w: 2.2, p: 3950 },
    { w: 2.3, p: 3950 },
    { w: 2.4, p: 3950 },
    { w: 2.5, p: 3950 },
    { w: 2.6, p: 4400 },
    { w: 2.7, p: 4400 },
    { w: 2.8, p: 4400 },
    { w: 2.9, p: 4400 },
    { w: 3.0, p: 4400 },
    { w: 3.1, p: 4850 },
    { w: 3.2, p: 4850 },
    { w: 3.3, p: 4850 },
    { w: 3.4, p: 4850 },
    { w: 3.5, p: 4850 },
    { w: 3.6, p: 5300 },
    { w: 3.7, p: 5300 },
    { w: 3.8, p: 5300 },
    { w: 3.9, p: 5300 },
    { w: 4.0, p: 5300 },
    { w: 4.1, p: 5750 },
    { w: 4.2, p: 5750 },
    { w: 4.3, p: 5750 },
    { w: 4.4, p: 5750 },
    { w: 4.5, p: 5750 },
    { w: 4.6, p: 6150 },
    { w: 4.7, p: 6150 },
    { w: 4.8, p: 6150 },
    { w: 4.9, p: 6150 },
    { w: 5.0, p: 6150 },
]

const ePacketTarifs = [
    { w: 0.1, p: 300 },
    { w: 0.2, p: 400 },
    { w: 0.3, p: 500 },
    { w: 0.4, p: 600 },
    { w: 0.5, p: 700 },
    { w: 0.6, p: 800 },
    { w: 0.7, p: 900 },
    { w: 0.8, p: 1000 },
    { w: 0.9, p: 1100 },
    { w: 1.0, p: 1200 },
    { w: 1.1, p: 1300 },
    { w: 1.2, p: 1400 },
    { w: 1.3, p: 1500 },
    { w: 1.4, p: 1600 },
    { w: 1.5, p: 1700 },
    { w: 1.6, p: 1800 },
    { w: 1.7, p: 1900 },
    { w: 1.8, p: 2000 },
    { w: 1.9, p: 2100 },
    { w: 2.0, p: 2200 },
]

const std = (country, type, weight = 0) => {
    let tarif = stdTarifs[country][type]
    return Math.ceil(
        9.8 *
            (weight <= tarif.over
                ? tarif.arr.find(({ w }) => w >= weight).p
                : weight <= tarif.max
                ? tarif.price * Math.ceil(weight) + tarif.plus
                : NaN),
    )
}

const postNl = weight => {
    let tarif = postNlTarifs.find(a => a.w >= weight)
    return tarif ? tarif.p : NaN
}

const ems = weight => {
    let tarif = emsTarifs.find(a => a.w >= weight)
    return tarif ? tarif.p : NaN
}

const dhl = weight => {
    let tarif = dhlTarifs.find(a => a.w >= weight)
    return tarif ? tarif.p : NaN
}

const ePacket = weight => {
    let tarif = ePacketTarifs.find(a => a.w >= weight)
    return tarif ? tarif.p : NaN
}

module.exports = { std, postNl, ems, dhl, ePacket }