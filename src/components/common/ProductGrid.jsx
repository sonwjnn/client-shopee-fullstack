import ProductItem from './ProductItem'

const ProductGrid = ({ products }) => {
  return (
    <div className=" min-h-[800px]">
      <div className="grid grid-cols-15 gap-3 relative">
        {/* <!-- Product item --> */}
        {products.map(product => (
          <ProductItem
            className={
              'col-span-15 sm:col-span-5 md:col-span-5 product_md:col-span-3'
            }
            product={product}
            key={product._id}
          />
        ))}
      </div>
    </div>
  )
}

export default ProductGrid
