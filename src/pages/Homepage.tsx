// import Card from '../components/card';
import { useFetchRecipes } from '../hooks/useFetchRecipes';
import Card from '../components/Card';
import { Recipe } from '../types/Recipe';

const HomePage: React.FC = () => {
  const { recipes, loading, error } = useFetchRecipes();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      {/* Title Section */}
      <div className="mt-3 mb-4 ">
        <h1 className="text-center">All Recipes</h1>
      </div>

      {/* Cards Section */}
      <div className="container  ">
        <div className="row ">
          {recipes.map((recipe: Recipe) => (
            <div key={recipe._id} className="col-12 col-sm-6 col-md-3">
              <Card recipe={recipe} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
