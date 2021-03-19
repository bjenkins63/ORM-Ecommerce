// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Products belongsTo Category
// Categories have many Products
// Products belongToMany Tags (through ProductTag)
// Tags belongToMany Products (through ProductTag)

Product.belongsTo(Category, {
  foreignKey: 'product_id',
  onDelete: 'CASCADE',
});

Category.hasMany((Product, Tag), {
  foreignKey: 'cagegory_id',
});

Product.hasMany((Tag, Category), {
  foreignKey: 'product_id',
});

Tag.hasMany((Product, Category), {
  foreignKey: 'tag_id',
});

ProductTag.belongsTo(Tag, {
  foreignKey: 'productTag_id',
});

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
