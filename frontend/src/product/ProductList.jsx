import {
  HiMagnifyingGlass,
  HiMagnifyingGlassCircle,
  HiOutlineCurrencyDollar,
  HiOutlinePlusCircle,
} from "react-icons/hi2";
import { Link } from "react-router-dom";
import { useDeleteProduct, useGetProducts } from "../hooks/useProductApi.js";
import Loading from "../components/Loading.jsx";
import Navbar from "../components/Navbar.jsx";
import { useState } from "react";
import Modal from "../components/Modal.jsx";
import EmptySection from "../components/EmptySection.jsx";
import SearchAnyThing from "../components/SearchAnyThing.jsx";

const ProductList = () => {
  const [selectedId, setSelectedId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isProductDeleteModalOpen, setIsProductDeleteModalOpen] =
    useState(false);

  const { data: products, isLoading } = useGetProducts();

  const deleteProductMutation = useDeleteProduct();

  const handleDeleteProduct = (id) => {
    deleteProductMutation.mutate(id, {
      onSuccess: () => {
        setIsProductDeleteModalOpen(false);
      },
    });
  };

  const handleOpenProductDeleteModal = (id) => {
    setSelectedId(id);
    setIsProductDeleteModalOpen(true);
  };

  const handleSearch = () => {
    setSearchTerm("");
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="p-8 flex flex-col">
      <Navbar />
      <div className="flex justify-between item-center mb-6">
        <h1 className={"text-lime-100 text-lg flex gap-x-1 items-center"}>
          <span className="size-2 rounded-full bg-lime-400 animate-pulse"></span>
          <span>({products?.length}) Products</span>
        </h1>

        {/* Search functionality */}
        <SearchAnyThing
          label={"product"}
          searchTerm={searchTerm}
          handleSearch={handleSearch}
          setSearchTerm={setSearchTerm}
        />

        <Link to={"/create-product"} className={"hover:text-lime-400 "}>
          <HiOutlinePlusCircle
            size={32}
            className="text-lime-400 hover:scale-105 transition-transform duration-200"
          />
        </Link>
      </div>

      {/*Product list*/}
      <div className={"grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"}>
        {products?.length === 0 ? (
          <EmptySection
            title={"No Products Found."}
            description={"Hey, create products to get started."}
          />
        ) : (
          products?.map((product) => (
            <div
              key={product.id}
              className={
                "flex box border border-neutral-600 flex-col justify-between gap-2 rounded-md p-4 bg-neutral-700"
              }
            >
              <div>
                <h1 className={"text-xl text-neutral-100 font-semibold"}>
                  {product.title}
                </h1>

                <p className="text-neutral-400">{product.description}</p>
              </div>

              {/* Action Button */}
              <div>
                <hr className="text-neutral-500 pt-2" />
                <div className={"flex gap-x-4 items-center justify-between"}>
                  <p
                    className={
                      "text-xl font-medium text-neutral-300 mt-2 flex items-center gap-x-1"
                    }
                  >
                    <HiOutlineCurrencyDollar
                      size={24}
                      strokeWidth={1.5}
                      className="text-lime-200"
                    />
                    <span>{product.price}</span>
                  </p>

                  <div className="flex items-center gap-x-4">
                    <Link
                      to={`/edit-product/${product.id}`}
                      className={`px-6 py-1.5 font-medium rounded-md bg-neutral-50 text-neutral-900 hover:scale-105 transition-transform duration-300 hover:font-semibold`}
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleOpenProductDeleteModal(product?.id)}
                      className={
                        "px-6 py-1.5 font-medium rounded-md bg-red-500 text-red-100 hover:scale-105 transition-transform duration-300 hover:font-semibold"
                      }
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/*Modal for deleting client action*/}
      {isProductDeleteModalOpen && (
        <Modal
          setIsModalOpen={setIsProductDeleteModalOpen}
          title={"Are you sure to delete product?"}
          size={"small"}
        >
          <div className={"flex gap-x-6"}>
            <button
              onClick={() => setIsProductDeleteModalOpen(false)}
              className="px-6 py-2 mt-4 rounded-md bg-neutral-900 text-center hover:bg-neutral-800 text-neutral-100"
            >
              Cancel
            </button>

            <button
              onClick={() => handleDeleteProduct(selectedId)}
              className="px-6 py-2 mt-4 rounded-md bg-red-600 text-center hover:bg-red-800 text-neutral-100"
            >
              {deleteProductMutation.isPending ? "Deleting..." : "Delete"}
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default ProductList;
