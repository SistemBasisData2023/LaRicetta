import React from 'react';
import { FaStar, FaRegCircle } from 'react-icons/fa';
import img from './assets/nasigoreng.jpg';
import Navbar from './sub/Navbar';

export default function RecipePage() {
  // Sample data for demonstration
  const ratings = [4, 5, 3, 4.5, 5];
  const reviews = [
    { user: 'John', comment: 'Delicious!', rating: 4 },
    { user: 'Sarah', comment: 'Absolutely loved it!', rating: 5 },
    { user: 'Mike', comment: 'Could be better.', rating: 3 },
    { user: 'Lisa', comment: 'Amazing recipe!', rating: 4.5 },
    { user: 'Alex', comment: 'The best nasi goreng ever!', rating: 5 },
  ];

  const totalRatings = ratings.reduce((sum, rating) => sum + rating, 0);
  const averageRating = totalRatings / ratings.length;
  const numberOfReviews = reviews.length;

  const recipe = {
    title: 'Nasi Goreng',
    madeBy: 'John Doe',
    description: 'Delicious Indonesian fried rice',
    ingredients: [
      '2 cups cooked rice',
      '3 tablespoons soy sauce',
      '1 tablespoon vegetable oil',
      '1 onion, chopped',
      // Add more ingredients as needed
    ],
    steps: [
      'Heat the vegetable oil in a large frying pan or wok.',
      'Add the chopped onion and cook until translucent.',
      'Add the cooked rice and soy sauce to the pan.',
      'Stir-fry for a few minutes until the rice is heated through.',
      // Add more steps as needed
    ],
    comments: reviews,
  };

  return (
    <div>
    <Navbar />
    <div className="grid grid-cols-1 sm:grid-cols-2 h-screen w-full">
      <div className="hidden sm:block">
        <img className="w-full h-full object-cover" src={img} alt="" />
      </div>

      <div className="mt-10 bg-white flex flex-col justify-start p-8">
        <h1 className="text-4xl font-bold text-black">{recipe.title}</h1>
        <div className="flex items-center text-9D0208 mt-2">
          {Array.from({ length: 5 }, (_, index) => (
            <FaStar
              key={index}
              size={20}
              color={index < averageRating ? '#9D0208' : '#e4e5e9'}
            />
          ))}
          <span className="ml-2 text-black">{averageRating.toFixed(1)}</span>
          <span className="ml-1 text-gray-400">({numberOfReviews} reviews)</span>
        </div>
        <p className="text-black mt-4">{recipe.description}</p>

        <h2 className="text-2xl font-bold text-black mt-8">Ingredients</h2>
        <ul className="text-black">
          {recipe.ingredients.map((ingredient, index) => (
            <li key={index} className="flex items-start">
              <FaRegCircle className="mt-1 mr-2" size={10} />
              <span>{ingredient}</span>
            </li>
          ))}
        </ul>

        <h2 className="text-2xl font-bold text-black mt-8">Steps</h2>
        <ol className="text-black">
          {recipe.steps.map((step, index) => (
            <li key={index} className="flex items-start">
            <FaRegCircle className="mt-1 mr-2" size={10} />
            <span>{step}</span>
          </li>
        ))}
      </ol>

      <h2 className="text-2xl font-bold text-white mt-8">Comments</h2>
        <div className="mt-4 h-48 overflow-y-auto">
          {recipe.comments.map((comment, index) => (
            <div key={index} className="bg-gray-200 rounded-lg p-4 mb-4">
              <p className="font-bold">{comment.user}</p>
              <p>{comment.comment}</p>
              <div className="flex items-center text-9D0208 mt-2">
                {Array.from({ length: 5 }, (_, i) => (
                  <FaStar
                    key={i}
                    size={16}
                    color={i < comment.rating ? '#9D0208' : '#e4e5e9'}
                  />
                ))}
                <span className="ml-2">{comment.rating}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
  </div>
);
}
