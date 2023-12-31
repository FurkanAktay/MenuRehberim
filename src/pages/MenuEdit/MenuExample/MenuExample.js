import React from "react";
import ListItem from "../../../components/ListItem/ListItem";
import "./MenuExample.css";
import image1 from "../../../assets/burger.jpg";
import image2 from "../../../assets/cheese.jpg";
import image5 from "../../../assets/pizza.jpeg";
import image6 from "../../../assets/coffee.jpg";

const menuDataLeft = [
  {
    title: "Örnek ürün adı",
    description: "Örnek ürün açıklaması.",
    price: 24,
    img: image1,
  },
  {
    title: "Örnek ürün adı",
    description: "Örnek ürün açıklaması.",
    price: 33.0,
    img: image2,
  },
];

const menuDataRight = [
  {
    title: "Örnek ürün adı.",
    description: "Örnek ürün açıklaması.",
    price: 3.0,
    img: image6,
  },
  {
    title: "Örnek ürün adı.",
    description: "Örnek ürün açıklaması.",
    price: 38.0,
    img: image5,
  },
];

const MenuExample = () => {
  return (
    <div className="container add-to-cart">
      <h1 className="heading-secondary">
        <span className="heading-secondary-span">Ornek Menu Kategorisi</span> 
      </h1>

      <div className="grid-container">
        <div>
          {menuDataLeft.map((data, i) => (
            <ListItem
              title={data.title}
              description={data.description}
              price={data.price}
              itemImage={data.img}
            />
          ))}
        </div>

        <div>
          {menuDataRight.map((data, i) => (
            <ListItem
              title={data.title}
              description={data.description}
              price={data.price}
              itemImage={data.img}
            />
          ))}
        </div>
      </div>


    </div>
  );
};

export default MenuExample;
