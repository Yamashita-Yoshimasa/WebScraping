/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable consistent-return */
import puppeteer from 'puppeteer';
import dotenv from 'dotenv';

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
export const OpenPage = async () => {
  let pckoubouNames: unknown = [];
  let pckoubouPrices: unknown = [];
  let pckoubouId: unknown = [];
  let pckoubouStock: unknown = [];
  let pckoubouSpecial: unknown = [];
  dotenv.config();
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    headless: true,
  });
  const iPhone = puppeteer.devices['iPhone XR'];
  const page = await browser.newPage();
  await page.emulate(iPhone);
  await page.goto(process.env.PC_KOUBOU_URL || '', {
    // ページを読み込むまで待機
    waitUntil: 'networkidle2',
    timeout: 0,
  });
  pckoubouNames = await page.$$eval('.item-names-title', (item) =>
    item.map((names) => names.textContent),
  );
  pckoubouPrices = await page.$$eval(
    '.price--num',
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    (item) => item.map((prices) => ` ${prices.textContent}`),
  );
  pckoubouId = await page.$$eval('.item-code > dd', (item) =>
    item.map((id) => id.textContent),
  );

  pckoubouStock = await page.$$eval('.delivery-date > span', (item) =>
    item.map((stock) => stock.textContent),
  );

  pckoubouSpecial = await page.$$eval(
    '.price__special > dd > .price--num',
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    (item) => item.map((special) => ` ${special.textContent}`),
  );

  await browser.close();

  // 取得したデータを配列に変換
  let NamesArray: string[];
  let PricesArray: string[];
  let IdArray: string[];
  let StockArray: string[];
  let SpecialArray: string[];
  (() => {
    NamesArray = String(pckoubouNames).split(',');
    PricesArray = String(pckoubouPrices).split(', ');
    PricesArray[0] = PricesArray[0].slice(1, PricesArray[0].length);
    IdArray = String(pckoubouId).split(',');
    StockArray = String(pckoubouStock).split(',');
    SpecialArray = String(pckoubouSpecial).split(', ');
    SpecialArray[0] = SpecialArray[0].slice(1, SpecialArray[0].length);
  })();

  // 特別価格を適用
  (() => {
    for (let i = 0; i < SpecialArray.length; i += 1) {
      if ((i + 1) % 2 !== 0) {
        PricesArray.splice(PricesArray.indexOf(SpecialArray[i]), 1);
      }
    }
  })();

  // 売り切れ品を除外
  (() => {
    const soldout = StockArray.indexOf('在庫切れです');
    const len = NamesArray.length;
    NamesArray.splice(soldout, len);
    IdArray.splice(soldout, len);
    PricesArray.splice(soldout, len);
  })();

  return Promise.resolve([NamesArray, PricesArray, IdArray]);
};
