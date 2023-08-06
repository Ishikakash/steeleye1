import { useState } from "react";

// Data
import mockData from "../assets/data.json";
import timestamps from "../assets/timeStamps.json";

// Components
import Dropdown from "../component/dropdown/Dropdown";
import HeaderTitle from "../component/header-title/HeaderTitle";
import Search from "../component/search/Search";
import List from "../component/list/List";

// Styles
import styles from "./Dashboard.module.css";
import Card from "../component/card/Card";

const Dashboard = () => {
  const [currency, setCurrency] = useState("EUR");
  const [searchText, setSearchText] = useState("");
  const [selectedOrderDetails, setSelectedOrderDetails] = useState({});
  const [selectedOrderTimeStamps, setSelectedOrderTimeStamps] = useState({});

  const handleSelect = (orderId) =>{
    const selectOrder = mockData.results.find((order)=>order["&id"]===orderId);
    setSelectedOrderDetails(selectOrder);
    const selectTimestamps = timestamps.results.find((order)=>order["&id"]===orderId);
    setSelectedOrderTimeStamps(selectTimestamps.timestamps);
  }
  const ordersTimestamps = mockData.results.map(order => {
    const orderId = order["&id"];
    const ordertimestamps = timestamps.results.find((item)=>item["&id"]===orderId);
    return {
      ...order,
      "Order Submitted Date": ordertimestamps ? ordertimestamps.timestamps.orderSubmitted : "N/A",
    }
  })
  const filterOrders = ordersTimestamps.filter(order=> order["&id"].toLowerCase().includes(searchText.toLowerCase()))

  return (
    <div>
      <div className={styles.header}>
        <HeaderTitle primaryTitle="Orders" secondaryTitle="6 orders" />
        <div className={styles.actionBox}>
          <Search
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <Dropdown
            options={["GBP", "USD", "JPY", "EUR"]}
            onChange={(e) => setCurrency(e.target.value)}
            selectedItem={currency}
          />
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.section}>
          <Card
            cardData={selectedOrderDetails}
            title="Selected Order Details"
          />
          <Card
            cardData={selectedOrderTimeStamps}
            title="Selected Order Timestamps"
          />
        </div>
        <List rows={filterOrders} onRowClick={(orderId)=>handleSelect(orderId)}/>
      </div>
    </div>
  );
};

export default Dashboard;
