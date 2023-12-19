
import "./HomeRestaurants.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import PillsExample from "../FoodCategories/FoodCategories";
import { BsFillStarFill } from "react-icons/bs";
import { useEffect, useState } from "react";

const AmazingMeal = () => {
  const [places, setPlaces] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('Hepsi');

  useEffect(() => {
    fetch('http://localhost:8081/api/getPlace')
      .then(response => response.json())
      .then(data => {
        const sortedPlaces = data.sort((a, b) => a.id - b.id);
        setPlaces(sortedPlaces);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const filteredPlaces = places.filter(place => {
    if (selectedCategory === 'Hepsi') {
      return true; 
    } else {
      return place.category.toLowerCase() === selectedCategory.toLowerCase();
    }
  });

  return (
    <div className="section">
      <div className="container">
        {/* Diğer bileşenler */}
        <PillsExample onSelectCategory={handleCategorySelect} />
        
        <div className="amazing-card-container">
          {filteredPlaces.map((place, index) => (
            <div className={`amazing-card amazing-card-${index % 2 === 0 ? 'left' : 'right'}`} key={place.id}>
              {/* Restoran içeriği */}
              <div className="amazing-card-content">
                <div className="amazing-card-title">
                  <BsFillStarFill color="#c3512f" />
                  <h3 className="heading-tertiary">
                    <span>{place.restourantName}</span>
                  </h3>
                </div>
                <p>{place.placeDefinition}</p>
                <p>{place.placeAdress}</p>
                <p>{place.category}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AmazingMeal;