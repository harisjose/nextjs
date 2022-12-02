import ProductItem from "./ProductItem"
export default function ProductList ({items}) {

    return (
        <section className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {items.allProducts.map((product) => (
            <ProductItem product={product} key={product.name}></ProductItem>
          ))}
        </section>
    )
}