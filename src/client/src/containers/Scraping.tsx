/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-expressions */
/* eslint-disable @typescript-eslint/await-thenable */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable no-plusplus */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import React, { FC, useState, useEffect } from 'react';
import { GetNames, GetPrices, GetId } from './GetData';
import Home from '../components/Home';

const Scraping: FC = () => {
  const [names, setNames] = useState('loading...');
  const [prices, setPrices] = useState('loading...');
  const [id, setId] = useState('');
  const [gpuName, setGpu] = useState('loading...');
  const [gpuPrice, setGpuprice] = useState('loading...');
  const [gpuId, setGpuid] = useState('loading...');
  const [search, setSearch] = useState('1650');
  const [flag, setFlag] = useState(false);

  let nameResponse: any;
  let priceResponse: any;
  let idResponse: any;
  const main = async () => {
    // CreateArrayにてnameの添字からprice, idを決定
    // name→price→idの順番に読み込み
    nameResponse = await GetNames();
    priceResponse = await GetPrices();
    idResponse = await GetId();
  };

  // eslint-disable-next-line @typescript-eslint/no-floating-promises
  main().then(() => {
    nameResponse ? setNames(String(nameResponse.data)) : setNames('');
    priceResponse ? setPrices(String(priceResponse.data)) : setPrices('');
    idResponse ? setId(String(idResponse.data)) : setId('');
  });

  const len = names.length;
  let nameArray: string[] = [];
  let priceArray: string[] = [];
  let idArray: string[] = [];
  const searchGPU = Array(nameArray.length);
  const searchName = search;

  const CreateArray = async () => {
    nameArray = names.substring(2, len - 2).split('","');
    priceArray = prices.substring(2, len - 2).split('","');
    idArray = id.substring(2, len - 2).split('","');
  };
  const GpuSearch = async () => {
    for (let i = 0; i < nameArray.length; i++) {
      if (nameArray[i].includes(searchName)) {
        searchGPU[0] = nameArray[i];
        setGpu(searchGPU[0]);
        setGpuprice(priceArray[i]);
        setGpuid(idArray[i]);
        setFlag(false);
        break;
      } else if (
        i === nameArray.length - 1 &&
        nameArray[i].includes(searchName) === false &&
        nameArray.length > 1
      ) {
        setFlag(true);
      }
    }
  };

  useEffect(() => {
    // eslint-disable-next-line no-shadow
    const main = async () => {
      await CreateArray();
      await GpuSearch();
    };
    main();
  }, [main]);

  // Homeで入力された文字列を受け取る
  const HomeInput = (homeinput: string) => {
    setSearch(homeinput);
  };

  return (
    <Home
      names={gpuName}
      prices={gpuPrice}
      id={gpuId}
      flag={flag}
      HomeInput={HomeInput}
      searchName={searchName}
    />
  );
};

export default Scraping;
