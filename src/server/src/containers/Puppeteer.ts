/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable consistent-return */
import puppeteer from 'puppeteer';
import dotenv from 'dotenv';

export const OpenPage = async () => {
  let pckoubouNames: unknown = [];
  let pckoubouPrices: unknown = [];
  let pckoubouId: unknown = [];
  dotenv.config();
  const browser = await puppeteer.launch({
    headless: true,
  });
  const page = await browser.newPage();
  await page.goto(process.env.PC_KOUBOU_URL || '', {
    // ページを読み込むまで待機
    waitUntil: 'networkidle2',
    timeout: 0,
  });
  pckoubouNames = await page.$$eval('.name', (item) =>
    item.map((names) => names.textContent),
  );
  pckoubouPrices = await page.$$eval('.price--num', (item) =>
    item.map((prices) => prices.textContent),
  );
  pckoubouId = await page.$$eval('.item-code > dd', (item) =>
    item.map((id) => id.textContent),
  );

  await browser.close();
  // unknown型ガードl
  if (
    typeof pckoubouNames === 'object' &&
    pckoubouNames != null &&
    typeof pckoubouPrices === 'object' &&
    pckoubouPrices != null &&
    typeof pckoubouId === 'object' &&
    pckoubouId != null
  ) {
    return Promise.resolve([pckoubouNames, pckoubouPrices, pckoubouId]);
  }
};

export default OpenPage;
