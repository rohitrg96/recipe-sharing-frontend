import React, { useRef, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const AddRecipe: React.FC = () => {
  const [title, setTitle] = useState('');
  const [ingredients, setIngredients] = useState<string[]>(['']);
  const [steps, setSteps] = useState<string[]>(['']);
  const [prepTime, setPrepTime] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleAddIngredient = () => setIngredients([...ingredients, '']);
  const handleIngredientChange = (index: number, value: string) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients[index] = value;
    setIngredients(updatedIngredients);
  };
  const handleRemoveIngredient = (index: number) => {
    const updatedIngredients = ingredients.filter((_, i) => i !== index);
    setIngredients(updatedIngredients);
  };

  const handleAddStep = () => setSteps([...steps, '']);
  const handleStepChange = (index: number, value: string) => {
    const updatedSteps = [...steps];
    updatedSteps[index] = value;
    setSteps(updatedSteps);
  };
  const handleRemoveStep = (index: number) => {
    const updatedSteps = steps.filter((_, i) => i !== index);
    setSteps(updatedSteps);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleRemoveImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = ''; // Reset file input
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic here
    console.log({ title, ingredients, steps, prepTime });
  };

  return (
    <div
      className="d-flex justify-content-center"
      style={{
        backgroundImage: 'url(/images/bgimage.jpg)', // Replace with your desired background image URL
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh', // Ensures the background covers at least the viewport height
        height: 'auto', // Allows it to grow with the content
      }}
    >
      <div className="p-4" style={{ width: '70%' }}>
        <h2 className="mb-4">Add Recipe</h2>
        <form onSubmit={handleSubmit} className="row">
          <div className="col-md-8">
            <div className="mb-3">
              <label htmlFor="title" className="form-label">
                Recipe Title
              </label>
              <input
                type="text"
                id="title"
                className="form-control"
                style={{ borderColor: 'black' }}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Ingredients</label>
              {ingredients.map((ingredient, index) => (
                <div key={index} className="d-flex mb-2">
                  <input
                    type="text"
                    className="form-control me-2"
                    style={{ borderColor: 'black' }}
                    value={ingredient}
                    onChange={(e) => handleIngredientChange(index, e.target.value)}
                    required
                  />
                  {index === ingredients.length - 1 && (
                    <button type="button" className="btn btn-primary" onClick={handleAddIngredient}>
                      Add
                    </button>
                  )}
                  {ingredients.length > 1 && (
                    <button
                      type="button"
                      className="btn-close ms-2"
                      onClick={() => handleRemoveIngredient(index)}
                      aria-label="Remove Ingredient"
                    />
                  )}
                </div>
              ))}
            </div>

            <div className="mb-3">
              <label className="form-label">Steps</label>
              {steps.map((step, index) => (
                <div key={index} className="d-flex mb-2">
                  <input
                    type="text"
                    className="form-control me-2"
                    style={{ borderColor: 'black' }}
                    value={step}
                    onChange={(e) => handleStepChange(index, e.target.value)}
                    required
                  />
                  {index === steps.length - 1 && (
                    <button type="button" className="btn btn-primary" onClick={handleAddStep}>
                      Add
                    </button>
                  )}
                  {steps.length > 1 && (
                    <button
                      type="button"
                      className="btn-close ms-2"
                      onClick={() => handleRemoveStep(index)}
                      aria-label="Remove Step"
                    />
                  )}
                </div>
              ))}
            </div>

            <div className="mb-3">
              <label htmlFor="prepTime" className="form-label">
                Preparation Time (mins)
              </label>
              <input
                type="number"
                id="prepTime"
                className="form-control"
                style={{ borderColor: 'black' }}
                value={prepTime}
                onChange={(e) => setPrepTime(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="col-md-4">
            <div className="mb-3">
              <label htmlFor="image" className="form-label">
                Upload Image
              </label>
              <input
                type="file"
                id="image"
                className="form-control"
                style={{ borderColor: 'black' }}
                accept="image/*"
                onChange={handleImageChange}
                ref={fileInputRef} // Attach ref
              />
              {imagePreview ? (
                <div className="mt-3">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    style={{
                      width: '100%',
                      height: '200px',
                      objectFit: 'cover',
                      border: '1px solid black',
                    }}
                  />
                  <button type="button" className="btn btn-danger mt-2" onClick={handleRemoveImage}>
                    Remove Image
                  </button>
                </div>
              ) : (
                <p className="mt-3 text-muted">No file chosen</p>
              )}
            </div>
          </div>

          <button type="submit" className="btn btn-success mt-3">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddRecipe;
