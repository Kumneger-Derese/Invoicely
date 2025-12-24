import {useState} from "react"
import {useNavigate} from "react-router-dom";
import {useCreateProduct} from "../hooks/useProductApi.js"

const CreateProduct = () => {
    const [productData, setProductData] = useState({
        title: '',
        description: '',
        price: 0,
    })

    const navigate = useNavigate();
    const createProductMutation = useCreateProduct()

    const handleSubmit = (e) => {
        e.preventDefault()
        const body = {
            title: productData.title,
            description: productData.description,
            price: productData.price,
        }

        createProductMutation.mutate({body})
        navigate("/products")
    }


    const handleChange = e => {
        const {name, value} = e.target

        setProductData((prev) => ({
            ...prev, [name]: value
        }))
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
                    Add Product
                </button>
            </form>
        </div>
    )
}

export default CreateProduct