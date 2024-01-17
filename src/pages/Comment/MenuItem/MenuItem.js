import React, { useEffect, useState } from "react";
import ListItem from "../../../components/ListItem/ListItem";
import { useParams } from "react-router-dom";
import "./MenuItem.css";

const MenuItem = ({ id }) => {
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        if (id) {
          const response = await fetch(`http://localhost:8080/api/ItemPull/${id}`);
          if (response.ok) {
            const data = await response.json();
            setSelectedItem(data);
          } else {
            console.error('Error: Data could not be fetched');
          }
        }
      } catch (error) {
        console.error('Error: Data could not be fetched', error);
      }
    };

    fetchItem();
  }, [id]);

  return (
    <div className="section">
      <div className="container menu-of-the-day">
        <h1 className="heading-secondary">
          Yorum yapmak istediğiniz ürün ;
        </h1>
        {selectedItem && (
          <ListItem
            title={selectedItem.itemName}
            description={selectedItem.itemDefinition}
            price={selectedItem.itemPrice}
            itemImage={selectedItem.itemPicName}
          />
        )}
      </div>
    </div>
  );
};

export default MenuItem;
