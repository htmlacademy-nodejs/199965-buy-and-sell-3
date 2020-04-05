'use strict';
const fs = require(`fs`);

const {getRandomInt, shuffle} = require(`../../utils`);

const DEFAULT_COUNT = 1;
const FILE_NAME = `mocks.json`;

const { titles, sentences, categories } = require(`./constants/generateData.json`);

const OfferType = {
  offer: `offer`,
  sale: `sale`,
};

const SumRestrict = {
  min: 1000,
  max: 100000,
};

const PictureRestrict = {
  min: 1,
  max: 16,
};

const getPictureFileName = (number) => (number > 10 ? `item${number}.jpg` : `item0${number}.jpg`);

const generateOffers = (count) =>
  Array(count)
    .fill({})
    .map(() => ({
      category: shuffle(categories)
        .slice(0, getRandomInt(1, categories.length-1)),
      description: shuffle(sentences)
        .slice(1, 5)
        .join(` `),
      picture: getPictureFileName(getRandomInt(PictureRestrict.min, PictureRestrict.max)),
      title: titles[getRandomInt(0, titles.length - 1)],
      type: Object.keys(OfferType)[Math.floor(Math.random() * Object.keys(OfferType).length)],
      sum: getRandomInt(SumRestrict.min, SumRestrict.max),
    }));

module.exports = {
  name: `--generate`,
  run(args) {
    const [count] = args;
    const countOffer = Number.parseInt(count, 10) || DEFAULT_COUNT;
    const content = JSON.stringify(generateOffers(countOffer));

    fs.writeFile(FILE_NAME, content, (err) => {
      if (err) {
        return console.log(`Can't write data to file...`);
      }

      return console.log(`Operation is successful. File is created.`);
    });
  },
};
