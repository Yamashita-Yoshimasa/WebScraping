/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable consistent-return */
import puppeteer from 'puppeteer';
import dotenv from 'dotenv';

export const OpenPage = async (
  nflag: number,
  pflag: number,
  idflag: number,
) => {
  let pckoubouNames: unknown = [];
  let pckoubouPrices: unknown = [];
  let pckoubouLink: unknown = [];
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
  if (nflag === 1) {
    pckoubouNames = await page.$$eval('.name', (item) =>
      item.map((names) => names.textContent),
    );
  } else if (pflag === 1) {
    pckoubouPrices = await page.$$eval('.price--num', (item) =>
      item.map((prices) => prices.textContent),
    );
  } else if (idflag === 1) {
    pckoubouLink = await page.$$eval('.item-code > dd', (item) =>
      item.map((id) => id.textContent),
    );
  }

  await browser.close();
  // unknown型ガードl

  if (nflag === 1 && typeof pckoubouNames === 'object')
    return Promise.resolve(pckoubouNames);
  if (pflag === 1 && typeof pckoubouPrices === 'object')
    return Promise.resolve(pckoubouPrices);
  if (idflag === 1 && typeof pckoubouLink === 'object')
    return Promise.resolve(pckoubouLink);
};

export default OpenPage;
