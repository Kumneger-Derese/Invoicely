import {useEffect, useState} from "react"
import {useNavigate, useParams} from "react-router-dom";
import {useGetProduct, useUpdateProduct} from "../hooks/useProductApi.js"
import Loading from "../components/Loading.jsx";

const EditProduct = () => {
    const {productId} = useParams();
    const [productData, setProductData] = useState({
        title: '',
        description: '',
        price: 0,
    })

    const navigate = useNavigate();
    const {data: product, isLoading} = useGetProduct(productId)
    const updateProductMutation = useUpdateProduct()

    useEffect(() => {
        if (product) {
            setProductData((prev) => ({
                ...prev,
                title: product.title,
                description: product.description,
                price: product.price,
            }))
        }
    }, [product]);

    const handleSubmit = (e) => {
        e.preventDefault()
        const body = {
            title: productData.title,
            description: productData.description,
            price: productData.price,
        }

        updateProductMutation.mutate({productId, body})
        navigate("/products")
    }


    const handleChange = e => {
        const {name, value} = e.target

        setProductData((prev) => ({
            ...prev, [name]: value
        }))
    }

    if (isLoading) {
        return <Loading/>
    }

    return (
        <div className="flex flex-col gap-4">
            <div className="text-center text-lime-400 font-bold text-2xl my-4">
                <h1>Create Product</h1>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-y-4 w-full px-4 md:w-3/6 mx-auto">
                {/* Title Field */}
                <div className="flex flex-col w-full gap-1">
                    <label htmlFor="title" className="text-neutral-300 font-semibold">Product Title</label>
                    <input
                        type="text"
                        name="title"
                        value={productData.title}
                        onChange={handleChange}
                        className="w-full rounded-md border p-2 border-neutral-500 focus:border-lime-600"
                        placeholder="Web Design"
                    />
                </div>

                {/* Description Field */}
                <div className="flex flex-col w-full gap-1">
                    <label htmlFor="description" className="text-neutral-300 font-semibold">Product Description</label>
                    <input
                        type="text"
                        name="description"
                        value={productData.description}
                        onChange={handleChange}
                        className="w-full rounded-md border p-2 border-neutral-500 focus:border-lime-600"
                        placeholder="This item is for web design invoice list."
                    />
                </div>

                {/* Price Field */}
                <div className="flex flex-col w-full gap-1">
                    <label htmlFor="price" className="text-neutral-300 font-semibold">Product Price</label>
                    <input
                        type="number"
                        name="price"
                        value={productData.price}
                        onChange={handleChange}
                        className="w-full rounded-md border p-2 border-neutral-500 focus:border-lime-600"
                        placeholder="ETB 1500"
                    />
                </div>

                <button
                    className="bg-lime-400 text-neutral-900 font-bold rounded-md p-2 hover:bg-lime-600 hover:text-lime-200 transition duration-300">
                    Update Product
                </button>
            </form>
        </div>
    )
}

export default EditProduct