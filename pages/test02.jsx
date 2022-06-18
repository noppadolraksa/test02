import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Test02 = () => {
  const [dataRaw, setDataRaw] = useState({});
  const [data, setData] = useState({});
  const [inputValue, setInputValue] = useState();
  useEffect(() => {
    const getService = async () => {
      await axios.get('https://api.publicapis.org/categories').then((res) => {
        setDataRaw(res.data);
        setData(res.data);
      });
    };
    getService();
  }, []);

  const handleInput = (e) => {
    let q = {};
    e.preventDefault();
    console.log(dataRaw);
    q.categories = dataRaw.categories.filter((item) => {
      return item.toString().toLowerCase().includes(inputValue.toString().toLowerCase());
    });
    setData({ count: q.categories.length, ...q });
  };

  return (
    <div className="test02-container">
      <form
        onSubmit={(e) => {
          handleInput(e);
        }}
      >
        <input
          type="text"
          name="number"
          placeholder="text here"
          value={inputValue || ''}
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
        />
        <input className="display_none" type="submit" />
      </form>
      <div>
        {Object.keys(data).length > 0 && (
          <>
            <h4>count: {data.count}</h4>
            <div>
              {data?.categories?.length > 0
                ? data.categories.map((item, i) => (
                    <p className="test02-p" key={i}>
                      {item}
                    </p>
                  ))
                : 'ไม่พบข้อมูล'}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Test02;
