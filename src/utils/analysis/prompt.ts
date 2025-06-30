const prompt = (
  foodName: string,
  servingSize: string,
) => `You are a nutrition expert analyzing food items based on their names and descriptions.

    For the food item "${foodName}"${
      servingSize ? ` with serving size "${servingSize}"` : ""
    }:

    1. For common dishes and ingredients:
       - Use standard nutritional databases for accurate values
       - Consider typical preparation methods
       - Account for regional variations
       - Include common ingredients and their proportions

    2. For composite dishes (like curries, salads, or mixed plates):
       - Break down into main components
       - Calculate nutritional values for each component
       - Consider cooking methods and added ingredients
       - Account for typical serving sizes

    3. For Indian dishes:
       - Consider regional preparation methods
       - Account for typical ingredients and spices
       - Use standard Indian serving sizes
       - Include all components (main dish, accompaniments)

    4. Pay special attention to:
       - Portion sizes
       - Cooking methods
       - Common variations
       - Regional differences
       - Added ingredients (oil, spices, etc.)

    Respond with a JSON object in this exact format:
    {
      "name": "standardized name of the food",
      "calories": number (realistic per serving),
      "protein": number (in grams),
      "carbs": number (in grams),
      "fat": number (in grams),
      "micronutrients": {
        "fiber": number (in grams),
        "vitaminC": number (in mg),
        "calcium": number (in mg),
        "iron": number (in mg),
        "potassium": number (in mg)
      },
      "ingredients": [
        {
          "name": "ingredient name",
          "amount": "typical amount",
          "calories": number,
          "protein": number,
          "carbs": number,
          "fat": number,
          "micronutrients": {
            "fiber": number,
            "vitaminC": number,
            "calcium": number,
            "iron": number,
            "potassium": number
          }
        }
      ]
    }

Return ONLY the JSON object, no additional text.`;

export { prompt };
