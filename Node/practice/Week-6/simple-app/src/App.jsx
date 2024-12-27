/* eslint-disable no-unused-vars */
import { useEffect, useState, memo, useMemo, useCallback, useRef } from "react";
import PropTypes from "prop-types";
import "./App.css";

function App() {
  // const [count, setCount] = useState(0)

  // return (
  //   <>
  //   {/* Complex way of writing but more readable */}
  //   {/* <button onClick={() => setCount((count) => count + 1)}> */}
  //   <button onClick={function() {
  //     setCount(count + 1)
  //   }}>
  //    Counter {count}
  //   </button>
  //   </>
  //)

  const [exchangeData, setExchangeData] = useState({});
  const [exchange2Data, setExchange2Data] = useState({});
  const [bankData, setBankData] = useState({});
  const [incomeTax, setIncomeTax] = useState(20000);
  const divRef = useRef();

  useEffect(() => {
    setTimeout(() => {
      setBankData({
        income: 100,
      });
    }, 5000),
      [];
  });

  useEffect(() => {
    setExchangeData({
      returns: 100,
    });
  }, []);

  useEffect(() => {
    setExchange2Data({
      returns: 100,
    });
  }, []);

  useEffect(() => {
    setTimeout(() => {
      divRef.current.innerHTML=10;
    }, 5000);
  }, []);

  // const cryptoReturns = useMemo(() => {
  //   console.log("Hi from useMemo");
  //   return exchangeData.returns + exchange2Data.returns;
  // }, [exchangeData, exchange2Data]);


  // const incomeTax = (bankData.income + cryptoReturns) * 0.3;

  // return <div>Hi there, Your income tax returns are {incomeTax}</div>;

  const calculateCryptoReturns = useCallback(function() {
    return exchangeData.returns + exchange2Data.returns;
  }, [exchangeData, exchange2Data]);

  return (
    <div>
      <CryptoGainsCalculator calculateCryptoReturns={calculateCryptoReturns}></CryptoGainsCalculator>
      <div>
        Hi there, your income tax returns are <div ref={divRef}>{incomeTax}</div>
      </div>
    </div>
  )
}

const CryptoGainsCalculator = memo(({calculateCryptoReturns}) => {
  console.log("crypto child re-rendered")
  return (
  <div>
    Your crypto gains are {calculateCryptoReturns()}
  </div>
  );
});

CryptoGainsCalculator.displayName = "CryptoGainsCalculator";
CryptoGainsCalculator.propTypes = {
  calculateCryptoReturns: PropTypes.func.isRequired, // Prop should be a function and is required
};

export default App;
