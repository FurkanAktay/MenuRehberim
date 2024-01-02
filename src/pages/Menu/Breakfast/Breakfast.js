import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import "./Breakfast.css";
import ListItem from "../../../components/ListItem/ListItem";

const Breakfast = ({ id }) => {
  const [menuData, setMenuData] = useState([]);
  const { id: routeId } = useParams(); // useParams ile id'yi al


  useEffect(() => {
    fetch(`http://localhost:8080/api/getMenuItemsById/${routeId}`)
      .then(response => response.json())
      .then(data => {
        const sortedMenuData = data.sort((a, b) => a.id - b.id);
        setMenuData(sortedMenuData);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, [id]);

  return (
    <div className="container breakfast">
      <div className="grid-container">
        <div>
          {menuData.map((data, i) => (
            <ListItem
              key={i}
              Itemid={data.id}
              title={data.itemName}
              description={data.itemDefinition}
              price={data.itemPrice}
              itemImage={data.itemPicName}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Breakfast;
