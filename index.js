import express from "express";
import ejs from "ejs";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());


const products = [
    {
        productName: "PAIGE Anessa High-Rise Wide-Leg Crop Jeans",
        productDescription: "High-Rise Wide-Leg Crop Jean",
        productPrice: 249.00,
        productBrand: "PAIGE",
        productImg: "paige",
    },
    {

        productName: "The Somerset Maxi Dress",
        productDescription: "The dress that launched a thousand glowing reviews. Our iconic Somerset Dress features a soft A-line silhouette, flattering smocked waist, and everyday-elegant tiers.",
        productPrice: 168.00,
        productBrand: "Anthropologie",
        productImg: "Somerset",
    },
    {

        productName: "The Colette Cropped Wide-Leg Pants by Maeve: Corduroy Edition",
        productDescription: "The pant so beloved, it sparked its own collection. Marked by a breezy wide-leg silhouette and form-fitting high-rise, the Colette Pant is tried, trued, and rave-reviewed.",
        productPrice: 138.00,
        productBrand: "Maeve",
        productImg: "Colette",
    },
    {

        productName: "The Alani Cashmere Mock-Neck Sweater by Pilcro",
        productDescription: "The Alani is our bestselling, best-reviewed sweater, ever. With its relaxed, boxy fit, and subtle mock neck, it works with everything.",
        productPrice: 148.00,
        productBrand: "Pilcro",
        productImg: "Cashmere",
    },
    {
    
        productName: "The Tilda Maxi Slip Skirt",
        productDescription: "If you haven't met the Tilda slip skirt, then bonjour! A French-inspired bias-cut design makes it drape and move just so – equally chic for a night out or a day about town.",
        productPrice: 98.00,
        productBrand: "Anthropologie",
        productImg: "Slip",
    },
    {

        productName: "The Tobie Button-Front Pleated Shirt Dress by Exquise: Mini Edition",
        productDescription: "Tailored to perfection, the Tobie Shirt Dress is on top of everyone’s mind – with its classic collar, exaggerated short sleeves, and waist-defining pleats.",
        productPrice: 178.00,
        productBrand: "Exquise",
        productImg: "Tonie",
    },
    {

        productName: "The Thea Twofer Sweater Dress: Sleeveless Edition",
        productDescription: "Two is always better than one. Think Thea, our fan-fave twofer dress that features a tight-knit ribbed bodice and flowy skirt.",
        productPrice: 160.00,
        productBrand: "Anthropologie",
        productImg: "Twofer",
    },
    {

        productName: "The Bettina Tiered Shirt Dress by Maeve",
        productDescription: "With flattering tiers, a deep v, and a softly structured shape, the bestselling, airy Bettina Dress is THE dress you've been looking for. Available in a bevy of prints and colors, it is now available with adaptive features for universal wear.",
        productPrice: 148.00,
        productBrand: "Maeve",
        productImg: "Bettina",
    },
    {

        productName: "The Madi Front-Slit Denim Skirt by Pilcro",
        productDescription: "Finished with a statement slit and pockets galore, the Madi goes wherever you do. Best of all? Our favorite skirt-about-town loves being seen with all of your prized pairs – from sparkling stilettos to casual slip-on sandals.",
        productPrice: 138.00,
        productBrand: "Pilcro",
        productImg: "Skirt",
    }
];

let cartItems = [];


app.get("/", (req, res)=>{
    res.render("index.ejs", {products});
});

app.get("/product", (req, res) => {
    const productName = req.query.name;
    const product = products.find(p => p.productName === productName);
    
    if (product) {
        res.render("product.ejs", { product });
    } else {
        res.status(404).send("Product not found");
    }
});

app.post("/cart", (req, res)=>{
    cartItems = req.body;
    res.json({ success: true });
});

app.get("/cart", (req, res)=>{
    res.render("cart.ejs", {cartItems});
});


app.listen(port, (req, res)=>{
    console.log(`Server is currently running on port ${port}`);
});