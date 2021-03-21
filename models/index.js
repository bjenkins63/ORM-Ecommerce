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

Product.belongsToMany(Tag, { through: 'ProductTag' }, {
  foreignKey: 'product_id'},
),

Tag.belongsToMany(Product, { through: 'ProductTag' },
  {foreignKey: 'reader_id'},
),


module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
