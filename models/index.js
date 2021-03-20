// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Products belongsTo Category
// Categories have many Products
// Products belongToMany Tags (through ProductTag)
// Tags belongToMany Products (through ProductTag)

Product.belongsTo(Category);

Category.hasMany(Product, {onDelete: 'CASCADE'});

Product.belongsToMany(Tag, { through: 'Product_tag' }),

Tag.belongsToMany(Product, { through: 'Product_tag' }),


module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
