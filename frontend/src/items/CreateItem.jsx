import Modal from "../components/Modal";
import {useState} from "react";
import {useGetProducts} from "../hooks/useProductApi";
import {HiOutlinePlusCircle} from "react-icons/hi2";
import {useCreateInvoiceItem} from "../hooks/useInvoiceItemApi";

const CreateItem = ({invoiceId}) => {
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");

    const [productQuantity, setProductQuantity] = useState(0);
    const [quantity, setQuantity] = useState(0);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProductId, setSelectedProductId] = useState(null);

    const {data: products} = useGetProducts();
    const createItemMutation = useCreateInvoiceItem();

    const handleSelectProduct = (id) => {
        setSelectedProductId(id);
    };

    // func to create items from product list
    const handleCreateItemFromProduct = () => {
        const intQuantity = parseInt(productQuantity);

        createItemMutation.mutate({
            invoiceId,
            body: {quantity: intQuantity, productId: selectedProductId},
        });

        setProductQuantity("");
        setSelectedProductId(null);
        setIsModalOpen(false);
    };

    // func to create items from scratch
    const handleSubmit = (e) => {
        e.preventDefault();
        const floatPrice = parseFloat(price);
        const intQuantity = parseInt(quantity);

        createItemMutation.mutate({
            invoiceId,
            body: {title, description, price: floatPrice, quantity: intQuantity},
        });

        setTitle("");
        setPrice("");
        setQuantity(0);
        setDescription("");
    };

    return (
        <div className="mt-8">
            {/* nav title */}
            <div className="flex justify-between items-center mb-4">
                <h1 className="font-semibold text  mb-4 text-xl text-lime-200">
                    Create Items
                </h1>

                <button
                    title="select items"
                    className="text-lime-200 flex items-center justify-center border rounded-2xl px-2 py-1 gap-x-2 cursor-pointer"
                    onClick={() => setIsModalOpen(true)}
                >
                    <HiOutlinePlusCircle strokeWidth={2} size={28}/>
                    Add from Product
                </button>
            </div>

            <form
                onSubmit={handleSubmit}
                className="grid grid-cols-1 md:grid-cols-2 gap-6 border border-neutral-600 p-6 rounded-md"
            >
                {/* Title field */}
                <div className="flex flex-col gap-1">
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Item title here..."
                        className="border outline-none focus:border-lime-300 w-full border-neutral-600 rounded-md p-2"
                    />
                </div>

                {/* Price field */}
                <div className="flex flex-col gap-1">
                    <label htmlFor="price">Price</label>
                    <input
                        type="number"
                        id="price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        placeholder="Item price here..."
                        className="border outline-none focus:border-lime-300 w-full border-neutral-600 rounded-md p-2"
                    />
                </div>

                {/* description field */}
                <div className="flex flex-col gap-1">
                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Item description here..."
                        className="border outline-none focus:border-lime-300 w-full border-neutral-600 rounded-md p-2"
                    />
                </div>

                {/* Quantity field */}
                <div className="flex flex-col gap-1">
                    <label htmlFor="quantity">Quantity</label>
                    <input
                        type="number"
                        id="quantity"
                        value={quantity}
                        onChange={(e) => setQuantity(Number(e.target.value))}
                        placeholder="Item quantity here..."
                        className="border outline-none focus:border-lime-300 w-full border-neutral-600 rounded-md p-2"
                    />
                </div>

                <button
                    type="submit"
                    onClick={handleSubmit}
                    className="rounded-md bg-lime-400 text-neutral-900 p-3 font-semibold
          hover:bg-transparent hover:text-neutral-200 border border-transparent hover:border-lime-400 transition duration-300"
                >
                    Create Item
                </button>
            </form>

            {/* Products list mOdal */}
            {isModalOpen && (
                <Modal
                    title={"Select Items"}
                    key={"modal-of-Product-list"}
                    setIsModalOpen={setIsModalOpen}
                >
                    <div className="flex flex-col gap-y-4">
                        {products?.map((product) => (
                            <div
                                key={product.id}
                                onClick={() => handleSelectProduct(product?.id)}
                                className="text-neutral-200 grid grid-cols-5 gap-x-2 items-center justify-between rounded-lg cursor-pointer"
                            >
                                <span className="font-bold col-span-2">{product.title}</span>

                                {/*Conditional section*/}

                                        <div className="flex col-span-2 gap-x-2 items-center">
                                            <span>Quantity</span>
                                            <input
                                                type="number"
                                                value={productQuantity}
                                                onChange={(e) => setProductQuantity(Number(e.target.value))}
                                                className="p-1 rounded-md border w-32 border-neutral-300"
                                                onFocus={() => setSelectedProductId(product?.id)}
                                            />
                                        </div>
                                <button
                                    onClick={handleCreateItemFromProduct}
                                    className="border col-span-1 self-end max-w-fit hover:bg-lime-300 hover:border-transparent hover:text-neutral-900 transition duration-200 border-lime-300 rounded-md px-6 py-1.5"
                                >
                                    Add
                                </button>
                            </div>
                        ))}
                    </div>
                </Modal>
            )}
        </div>
    );
};

export default CreateItem;
