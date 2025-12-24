import {HiOutlinePlusCircle} from "react-icons/hi2"
import {Link} from "react-router-dom"
import {useDeleteProduct, useGetProducts} from "../hooks/useProductApi.js";
import Loading from "../components/Loading.jsx";

const ProductList = () => {
    const {data: products, isLoading} = useGetProducts()

    const deleteProductMutation = useDeleteProduct()

    const handleDeleteProduct = (id) => {
        deleteProductMutation.mutate(id)
    }

    if (isLoading) {
        return <Loading />
    }

    return (
        <div className="p-8 flex flex-col gap-2">
            <div className="flex justify-between item-center mb-4">
                <h1 className={'text-lime-400 font-bold'}>Products</h1>
                <Link to={'/create-product'} className={'hover:text-lime-400 '}>
                    <HiOutlinePlusCircle size={24}/>
                </Link>
            </div>

            {/*Product list*/}
            <div className={'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'}>
                {
                    products?.map((product) => (
                        <div key={product.id} className={'flex flex-col gap-2 rounded-md p-4 bg-neutral-600'}>
                            <h1 className={'text-2xl font-bold'}>{product.title}</h1>
                            <p>{product.description}</p>
                            <p className={'text-xl font-bold mt-2'}>{product.price}</p>

                            <div className={'flex gap-x-4 items-center'}>
                                <Link to={`/edit-product/${product.id}`} className={`px-6 py-1.5 font-medium rounded-md bg-lime-500 hover:bg-lime-800`}>Edit</Link>
                                <button onClick={() => handleDeleteProduct(product?.id)} className={'px-6 py-1.5 font-medium rounded-md bg-rose-500 hover:bg-rose-800'}>Delete</button>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default ProductList