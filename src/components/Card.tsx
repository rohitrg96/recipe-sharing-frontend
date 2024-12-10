import React from 'react';

interface CardProps {
  recipe: {
    title: string;
    image: string;
  };
}

const Card: React.FC<CardProps> = ({ recipe }) => {
  return (
    <div className="card mb-4">
      <img src={recipe.image} className="card-img-top" alt={recipe.title} />
      <div className="card-body">
        <h5
          className="card-title"
          style={{
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {recipe.title}
        </h5>
      </div>
    </div>
  );
};

export default Card;
