import React, { useState, useEffect } from "react";
import SendEthComponent from "../../components/send-eth/index";
import web3 from "../../utils/web3";

const SendEthContainer = () => {
  const [etherAmount, setEtherAmount] = React.useState(0);
  const [balance, setBalance] = useState(0);
  const [userAddress, setUserAddress] = React.useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (window.ethereum) {
      getMetamaskData();
      window.ethereum.on("accountsChanged", function () {
        getMetamaskData();
      });
    }
  }, []);

  async function getMetamaskData() {
    try {
      const address = await web3.eth.getAccounts();
      const balance = await web3.eth.getBalance(address[0]);

      setBalance(web3.utils.fromWei(balance, "ether"));
    } catch (error) {
      alert(error);
    }
  }

  async function sendEther() {
    if (isSendValid()) {
      setLoading(true);
      try {
        if (window.ethereum) {
          await window.ethereum.enable();
        }
        const address = await web3.eth.getAccounts();
        await web3.eth.sendTransaction({
          from: address[0],
          to: userAddress,
          value: web3.utils.toWei(formatEtherAmount(etherAmount), "ether"),
        });
        setLoading(false);
        alert("transaction done!");
      } catch (error) {
        setLoading(false);
        alert(error.message);
      }
      getMetamaskData();
    } else {
      alert("Error: Please check user address or ether value");
    }
  }

  function isSendValid() {
    return userAddress !== "" && etherAmount !== "";
  }

  function formatEtherAmount(ether) {
    return ether.replace(",", ".").toLocaleString("en-US");
  }

  return (
    <SendEthComponent
      etherAmount={etherAmount}
      userAddress={userAddress}
      acountBalance={balance}
      changeEtherAmount={setEtherAmount}
      changeUserAddress={setUserAddress}
      onSend={sendEther}
      loading={loading}
    />
  );
};

export default SendEthContainer;
