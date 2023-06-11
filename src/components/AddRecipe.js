import React, { useState } from 'react';
import { FaCamera, FaUtensils, FaListUl, FaPencilAlt, FaTrash } from 'react-icons/fa';
import Navbar from './sub/Navbar';
import bg from "./assets/BG3.png"


const AddRecipe = () => {
    const [photo, setPhoto] = useState('');
    const [dishName, setDishName] = useState('');
    const [description, setDescription] = useState('');
    const [ingredients, setIngredients] = useState(['']);
    const [steps, setSteps] = useState(['']);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleFormSubmit = (e) => {
        e.preventDefault();

        // Check if all required fields are filled
        if (!photo || !dishName || !description || ingredients.some((ingredient) => !ingredient) || steps.some((step) => !step)) {
            console.log('Please fill in all required fields');
            return;
        }

        // Proceed with recipe submission
        console.log('Submitting recipe:', {
            photo,
            dishName,
            description,
            ingredients,
            steps,
        });

        // Reset form fields
        setPhoto('');
        setDishName('');
        setDescription('');
        setIngredients(['']);
        setSteps(['']);
        setIsSubmitted(true);

    };


    const handleIngredientChange = (index, value) => {
        const newIngredients = [...ingredients];
        newIngredients[index] = value;
        setIngredients(newIngredients);
    };

    const handleIngredientAdd = () => {
        setIngredients([...ingredients, '']);
    };

    const handleIngredientRemove = (index) => {
        const newIngredients = [...ingredients];
        newIngredients.splice(index, 1);
        setIngredients(newIngredients);
    };

    const handleStepChange = (index, value) => {
        const newSteps = [...steps];
        newSteps[index] = value;
        setSteps(newSteps);
    };

    const handleStepAdd = () => {
        setSteps([...steps, '']);
    };

    const handleStepRemove = (index) => {
        const newSteps = [...steps];
        newSteps.splice(index, 1);
        setSteps(newSteps);
    };

    return (
        <div>
            <Navbar />
            <div
                className="min-h-screen flex justify-center items-center"
                style={{ backgroundImage: `url(${bg})`, backgroundSize: "cover" }}
            >
                <div className=" bg-white rounded-2xl shadow-xl px-20 py-10">

                    <div className="container">
                        <h2 className="text-3xl font-semibold mb-4">Add Recipe</h2>
                        <form onSubmit={handleFormSubmit} className="space-y-4">
                            <div>
                                <label htmlFor="photo-input" className="flex items-center">
                                    <FaCamera className="mr-2" />
                                    Add Photo
                                </label>
                                <input
                                    id="photo-input"
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => setPhoto(e.target.files[0])}
                                />
                            </div>
                            <div>
                                <label htmlFor="dish-name-input" className="flex items-center">
                                    <FaUtensils className="mr-2" />
                                    Dish Name
                                </label>
                                <input
                                    id="dish-name-input"
                                    type="text"
                                    value={dishName}
                                    onChange={(e) => setDishName(e.target.value)}
                                    required
                                    className="w-full border border-gray-300 px-3 py-2 rounded"
                                />
                            </div>
                            <div>
                                <label htmlFor="description-input" className="flex items-center">
                                    <FaPencilAlt className="mr-2" />
                                    Description
                                </label>
                                <textarea
                                    id="description-input"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    required
                                    className="w-full border border-gray-300 px-3 py-2 rounded"
                                />
                            </div>
                            <div>
                                <label htmlFor="ingredients-input" className="flex items-center">
                                    <FaListUl className="mr-2" />
                                    Ingredients
                                </label>
                                {ingredients.map((ingredient, index) => (
                                    <div key={index} className="flex items-center space-x-2">
                                        <input
                                            type="text"
                                            value={ingredient}
                                            onChange={(e) => handleIngredientChange(index, e.target.value)}
                                            required
                                            className="w-full border border-gray-300 px-3 py-2 rounded"
                                        />
                                        {index >= 0 && (
                                            <FaTrash
                                                onClick={() => handleIngredientRemove(index)}
                                                className="text-red-500 cursor-pointer"
                                            />
                                        )}
                                    </div>
                                ))}
                                <a
                                    href="#"
                                    onClick={handleIngredientAdd}
                                    className="text-gray-600 hover:underline"
                                >
                                    + Add Ingredients
                                </a>
                            </div>
                            <div>
                                <label htmlFor="steps-input" className="flex items-center">
                                    <FaListUl className="mr-2" />
                                    Steps
                                </label>
                                {steps.map((step, index) => (
                                    <div key={index} className="flex items-center space-x-2">
                                        <input
                                            type="text"
                                            value={step}
                                            onChange={(e) => handleStepChange(index, e.target.value)}
                                            required
                                            className="w-full border border-gray-300 px-3 py-2 rounded"
                                        />
                                        {index >= 0 && (
                                            <FaTrash
                                                onClick={() => handleStepRemove(index)}
                                                className="text-red-500 cursor-pointer"
                                            />
                                        )}
                                    </div>
                                ))}
                                <a
                                    href="#"
                                    onClick={handleStepAdd}
                                    className="text-gray-600 hover:underline"
                                >
                                    + Add Step
                                </a>
                            </div>
                            <div>
                                <button
                                    type="submit"
                                    className="bg-red-600 text-white px-4 py-2 rounded-full mt-4 hover:bg-red-700"
                                >
                                    Submit
                                </button>
                                {isSubmitted ? (
                                    <div className="text-green-500 mt-5 mb-4">Recipe successfully submitted!</div>
                                ) : null}
                                <form onSubmit={handleFormSubmit} className="space-y-4"></form>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddRecipe;
