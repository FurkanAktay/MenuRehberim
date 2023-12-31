import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './ListItem.css'

const ListItem = ({ Itemid, title, description, price, itemImage }) => {
  const [showCommentForm, setShowCommentForm] = useState(false);
  const navigate = useNavigate();

  const handleCommentClick = () => {
    setShowCommentForm(true);
    navigate(`/Comment/${Itemid}`); // Yorum yap butonuna tıklandığında ilgili ürünün id'si Comment sayfasına iletiliyor.
  };

  return (
    <div className='list-items'>
      <ul>
        <li>
          {itemImage && <img src={`data:image/jpeg;base64,${itemImage}`} alt="hero" />}
          
          <div>
            <h3>{title}</h3>
            {description && <p>{description}</p>}
          </div>

          <h3>{price} TL</h3>
          <p onClick={handleCommentClick} className="comment-text">Yorum Yap</p>
          {/* Yorum yapma formu */}
          {showCommentForm && (
            <div>
              {/* Yorum formu */}
            </div>
          )}
        </li>
      </ul>
    </div>
  );
};

export default ListItem;