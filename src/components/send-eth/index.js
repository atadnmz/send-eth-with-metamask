import "./index.css";

function index({
  etherAmount,
  userAddress,
  acountBalance,
  changeEtherAmount,
  changeUserAddress,
  onSend,
  loading,
}) {
  function toFixedWithoutRounding(num, fixed) {
    const re = new RegExp("^-?\\d+(?:.\\d{0," + (fixed || -1) + "})?");
    return parseFloat(num.toString().match(re)[0]);
  }
  function onEtherChange(value) {
    const re = /^[0-9]*\,?[0-9]*$/;
    if ((value === "" || re.test(value)) && value.length < 7) {
      changeEtherAmount(value);
    }
  }
  return (
    <div className="send-eth-component">
      <header className="send-eth-component_header">
        <span className="send-eth-component_icon">
          <i
            className="fa fa-bars"
            style={{ color: "white", cursor: "pointer" }}
          />
        </span>
      </header>
      <div className="send-eth-component_main-content">
        <div className="send-eth-component_sub-content1">
          <div className="send-eth-component_sub-content1-user-address">
            <label htmlFor="userAddress">User Address:</label>
            <input
              type="text"
              id="userAddress"
              style={{
                border: "0px",
                textOverflow: "ellipsis",
                width: "50%",
                fontFamily: "inherit",
                fontSize: "inherit",
              }}
              value={userAddress}
              onChange={(e) => changeUserAddress(e.target.value)}
            />
          </div>
          <div className="send-eth-component_sub-content1-account-balance">
            <p>Account Balance: </p>
            <p>{toFixedWithoutRounding(acountBalance, 3)}</p>
          </div>
          <a
            className="send-eth-component_sub-content1-link"
            href={`https://rinkeby.etherscan.io/address/${userAddress}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            View account on Etherscan
          </a>
        </div>
        <div className="send-eth-component_sub-content2">
          <div className="send-eth-component_sub-content2-send-to-friend">
            <p>Send to friend</p>
          </div>
          <div className="send-eth-component_sub-content2-ether">
            <input
              type="text"
              id="ether"
              value={etherAmount}
              style={{ width: `${etherAmount.length + 0.1}ch` }}
              onChange={(e) => onEtherChange(e.target.value)}
            ></input>
            <label htmlFor="ether">Ether</label>
          </div>
        </div>
      </div>
      <footer className="send-eth-component_footer" onClick={onSend}>
        {loading ? (
          <div className="fa-1x">
            <i className="fas fa-spinner fa-pulse"></i>
          </div>
        ) : (
          <span>Send</span>
        )}
      </footer>
    </div>
  );
}

export default index;
