function shuffle(array) {
  let currentIndex = array.length;
  let randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];

    return array;
  }
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const pool = [];
const total = 10000;
const remaining = total - 1;
const baseOdds = 1;

const odds = baseOdds * 100;

for (let i = 0; i < odds; i++) {
  pool.push(true);
}

for (let i = 0; i < remaining; i++) {
  pool.push(false);
}

let masterCount = 0;
const tests = 1000;

for (let i = 0; i < tests; i++) {
  let result = false;
  let count = 0;
  let pity = 0;

  while (!result && pity < 100) {
    const index = getRandomInt(0, 9999);

    const res = shuffle(pool)[index];

    if (res) {
      console.log('Pity: ', pity);
      console.log('Clicks: ', count);
      console.log('=======');
      result = true;
      pity = 0;
    }

    pity = pity + 0.46;
    count++;
  }

  masterCount = masterCount + count;
}

console.log(masterCount / tests);
