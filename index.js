const express = require("express");
const dotenv = require("dotenv");
const OpenAI = require("openai");

dotenv.config();
const PORT = 4000;
const app = express();
app.use(express.json());

const openaiConf = new OpenAI({
  apiKey: process.env["OPENAI_SECRET_KEY"] || "", // Use process.env to get the API key
});

app.get("/fetch-detail", async (req, res) => {
  try {
    const params = req.query.name;
    if (params?.length) {
      const response = await openaiConf.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            // working    // content: `Name: "${params}"\nTell me about it, if it is a food item or not\nif it\'s not food, then return me response:\n{\n  Food: "false"\n}\nif it\'s food, then give me response in JSON with this structure\n{\n  Food: "true",\n  name: string,\n  category: string (choose from the given list),\n  ingredients: string,\n  volume: string,\n  and Nutrition information like calories etc\n}\n\nList of Categories:\nFood/Pantry/Canned goods/Canned fruit\nFood/Pantry/Rice, grains & dried beans/Beans\nFood/Pantry/Canned goods/Canned beans\nFood/Pantry/Canned goods/Canned tuna & seafood\nFood/Pantry/Canned goods/Canned tomatoes, sauce & puree\nFood/Pantry/Canned goods/Canned vegetables\nFood/Pantry/Canned goods/Canned vegetables/Canned peas\nFood/Dairy & Eggs/Butter & Margarine\nFood/Dairy & Eggs/Cheese\nFood/Dairy & Eggs/Eggs\nFood/Dairy & Eggs/Yogurt\nFood/Dairy & Eggs/Milk\nFood/Dairy & Eggs/Cream & Creamers\nFood/Dairy & Eggs/Sour Cream & Chilled Dips\nFood/Dairy & Eggs/Cheese/Cottage & Ricotta Cheese\nFood/Frozen Foods/Frozen Meat, Seafood, & Vegetarian\nFood/Frozen Foods/Frozen Meat, Seafood, & Vegetarian/Frozen Fish\nFood/Frozen Foods/Frozen Fruits & Vegetables/Frozen Vegetables\nFood/Frozen Foods/Frozen Fruits & Vegetables/Frozen Fruit\nFood/Meat & Seafood\nFood/Meat & Seafood/Sustainable Seafood/Sustainable Seafood\nFood/Meat & Seafood/Organic & Plant-Based\nFood/Snacks, Cookies & Chips/Nuts, Trail Mix & Seeds\nPeanut butter & spreads`,
            content: `Name: "${params}"\nTell me about it, if it is eatable, drinkable, or neither\nif it's neither, then return me response:\n{\n  Eatable: false,\n  Drinkable: false\n}\nif it's eatable, then give me response in JSON with this structure\n{\n  Eatable: true,\n  name: string,\n  category: string (choose from the given list),\n  ingredients: string,\n  volume: string,\n  and Nutrition information like calories etc\n}\nif it's drinkable, then give me response in JSON with this structure\n{\n  Eatable: false,\n  Drinkable: true,\n  name: string,\n  category: string (choose from the given list),\n  volume: string,\n  and Nutrition information like calories etc\n}\n\nList of Categories:\nFood/Pantry/Canned goods/Canned fruit\nFood/Pantry/Rice, grains & dried beans/Beans\nFood/Pantry/Canned goods/Canned beans\nFood/Pantry/Canned goods/Canned tuna & seafood\nFood/Pantry/Canned goods/Canned tomatoes, sauce & puree\nFood/Pantry/Canned goods/Canned vegetables\nFood/Pantry/Canned goods/Canned vegetables/Canned peas\nFood/Dairy & Eggs/Butter & Margarine\nFood/Dairy & Eggs/Cheese\nFood/Dairy & Eggs/Eggs\nFood/Dairy & Eggs/Yogurt\nFood/Dairy & Eggs/Milk\nFood/Dairy & Eggs/Cream & Creamers\nFood/Dairy & Eggs/Sour Cream & Chilled Dips\nFood/Dairy & Eggs/Cheese/Cottage & Ricotta Cheese\nFood/Frozen Foods/Frozen Meat, Seafood, & Vegetarian\nFood/Frozen Foods/Frozen Meat, Seafood, & Vegetarian/Frozen Fish\nFood/Frozen Foods/Frozen Fruits & Vegetables/Frozen Vegetables\nFood/Frozen Foods/Frozen Fruits & Vegetables/Frozen Fruit\nFood/Meat & Seafood\nFood/Meat & Seafood/Sustainable Seafood/Sustainable Seafood\nFood/Meat & Seafood/Organic & Plant-Based\nFood/Snacks, Cookies & Chips/Nuts, Trail Mix & Seeds\nPeanut butter & spreads`,
          },
        ],
        max_tokens: 500,
      });

      console.log(response);
      res.status(200).json(JSON.parse(response.choices[0].message.content));
    } else {
      res.status(500).json({ error: "Please Provide name" });
    }
  } catch (error) {
    console.error("Error fetching detail:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
