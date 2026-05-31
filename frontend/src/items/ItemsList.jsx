import {useEffect, useState} from "react";
import Loading from "../components/Loading.jsx";
import {
    useDeleteInvoiceItem,
    useGetInvoiceItem,
    useGetInvoiceItems,
    useUpdateInvoiceItem,
} from "../hooks/useInvoiceItemApi.js";
import {LuDollarSign, LuPencil, LuSquareStack, LuTrash2,} from "react-icons/lu";
import Modal from "../components/Modal.jsx";
import EmptySection from "../components/EmptySection.jsx";


// Todo: separate modals

const ItemsList = ({ invoiceId }) => {
    const [itemData, setItemData] = useState({
        title: '',
        description: '',
        price: 0,
        quantity: 0
    })

    const [selectedItem, setSelectedItem] = useState(null);
    const [deleteItemModalOpen, setDeleteItemModalOpen] = useState(false);
    const [updateItemModalOpen, setUpdateItemModalOpen] = useState(false);

    const deleteItemMutation = useDeleteInvoiceItem();
    const updateItemMutation = useUpdateInvoiceItem()

    const { data: item } = useGetInvoiceItem(invoiceId, selectedItem)
    const { data: invoiceItems, isLoading } = useGetInvoiceItems(invoiceId);

    useEffect(() => {
        if (item) {
            setItemData({
                title: item?.title,
                description: item?.description,
                price: item?.price,
                quantity: item?.quantity
            })
        }
    },
        [item, setItemData])

    const handleChange = (e) => {
        const { name, value } = e.target

        setItemData((prev) => ({
            ...prev, [name]: value
        }))
    }

    const openModal = (itemId, modalName) => {
        setSelectedItem(itemId);

        if (modalName === "delete") {
            setDeleteItemModalOpen(true);
        } else if (modalName === "update") {
            setUpdateItemModalOpen(true);
        }
    };

    const closeModal = (modalName) => {
        if (modalName === "delete") {
            setDeleteItemModalOpen(false);
        } else if (modalName === "update") {
            setUpdateItemModalOpen(false);
        }
    };

    const handleDeleteItem = () => {
        deleteItemMutation.mutate({ invoiceId, itemId: selectedItem })
        closeModal("delete")
    };

    const handleUpdateItem = () => {
        // setSelectedItem(itemId);
        updateItemMutation.mutate({ invoiceId, itemId: selectedItem, body: itemData })
        closeModal("update");
    };

    if (isLoading) {
        return <Loading />;
    }

    return (
        <div className="flex flex-col gap-4 mt-8">
            {invoiceItems?.length === 0 ? (
                <EmptySection
                    title={'No Items Found.'}
                    description={'Hey, create invoice items to get started.'}
                />
            ) : (
                invoiceItems?.map((item) => (
                    <div
                        key={item?.id}
                        className="flex box rounded-md gap-4 justify-between bg-neutral-700 p-4 border border-neutral-600"
                    >
                        <section>
                            <h1 className="font-bold text-lg">{item.title}</h1>
                            <h3 className="mb-4">{item.description}</h3>

                            <div className="flex gap-4">
                                <p className="flex gap-2 items-center">
                                    <LuDollarSign className={"text-lime-400"} />
                                    {item.price}
                                </p>

                                <p className="flex gap-2 items-center">
                                    <LuSquareStack className={"text-lime-400"} />
                                    {item.quantity}
                                </p>
                            </div>
                        </section>

                        {/* Action buttons */}
                        <section className="flex flex-col gap-y-2 items-center">
                            {/* Delete Button */}
                            <button className="hover:bg-red-50/20 p-2 rounded-md transition duration-300">
                                <LuTrash2
                                    onClick={() => openModal(item?.id, "delete")}
                                    size={24}
                                    className={"text-red-400"}
                                />
                            </button>

                            {/* Update button */}
                            <button className="hover:bg-red-50/20 p-2 rounded-md transition duration-300">
                                <LuPencil
                                    onClick={() => openModal(item?.id, "update")}
                                    size={20}
                                    className={"text-teal-500"}
                                />
                            </button>
                        </section>
                    </div>
                ))
            )}

            {/* Action Modals */}
            <div>
                {/* Delete Item Modal */}
                {deleteItemModalOpen && (
                    <Modal
                        setIsModalOpen={setDeleteItemModalOpen}
                        title={"Delete Item"}
                        key={"delete-item-modal"}
                        size="small"
                    >
                        <h1 className="mb-3">
                            Are you sure, you want to delete this item?
                        </h1>

                        <div className="flex gap-x-8 items-center">
                            <button
                                className="px-6 py-1 rounded-md bg-neutral-800 transform  transition-transform hover:scale-110 duration-200"
                                onClick={() => setDeleteItemModalOpen(false)}
                            >
                                No
                            </button>
                            <button
                                className="bg-red-400 px-6 py-1 rounded-md transform  transition-transform hover:scale-110 duration-200"
                                onClick={handleDeleteItem}
                            >
                                {deleteItemMutation.isPending ? 'Deleting...' : 'Yes'}
                            </button>
                        </div>
                    </Modal>
                )}

                {/* Update Item Modal */}
                {updateItemModalOpen && (
                    <Modal
                        setIsModalOpen={setUpdateItemModalOpen}
                        title={"Update Item"}
                        key={"update-item-modal"}
                    >
                        <form onSubmit={handleUpdateItem} className="flex flex-col gap-2">
                            {/* Title */}
                            <div className="flex flex-col gap-1">
                                <label htmlFor="title">Title</label>
                                <input
                                    type="text"
                                    value={itemData.title}
                                    id={'title'}
                                    onChange={handleChange}
                                    name={'title'}
                                    className="p-2 rounded-md border border-neutral-500"
                                />
                            </div>

                            <section className="flex gap-4 items-center justify-between">
                                {/* Price */}
                                <div className="flex flex-col gap-1  w-full ">
                                    <label htmlFor="price">Price</label>
                                    <input
                                        type="number"
                                        value={itemData.price}
                                        id={'price'}
                                        onChange={handleChange}
                                        name={'price'}
                                        className="p-2 rounded-md border border-neutral-500"
                                    />
                                </div>

                                {/* Quantity */}
                                <div className="flex flex-col gap-1  w-full ">
                                    <label htmlFor="quantity">Quantity</label>
                                    <input
                                        type="number"
                                        value={itemData.quantity}
                                        id={'quantity'}
                                        onChange={handleChange}
                                        name={'quantity'}
                                        className="p-2 rounded-md border border-neutral-500"
                                    />
                                </div>
                            </section>

                            {/* Description */}
                            <div className="flex flex-col gap-1">
                                <label htmlFor="description">Description</label>
                                <textarea
                                    value={itemData.description}
                                    id={'description'}
                                    onChange={handleChange}
                                    name={'description'}
                                    className="p-2 rounded-md border border-neutral-500" />
                            </div>

                            <button
                                type="submit"
                                className="mt-2 border-none p-2 bg-lime-500 text-neutral-900 rounded-md text-lg font-medium">
                                Update
                            </button>
                        </form>
                    </Modal>
                )}
            </div>
        </div>
    );
};

export default ItemsList;
