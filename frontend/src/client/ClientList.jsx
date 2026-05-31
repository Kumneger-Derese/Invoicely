import { Link } from "react-router-dom";
import { useDeleteClient, useGetClients } from "../hooks/useClientApi";
import {
  HiGlobeAlt,
  HiMiniGlobeAlt,
  HiMiniGlobeEuropeAfrica,
  HiOutlinePlusCircle,
} from "react-icons/hi2";
import { LuGlobe, LuGlobeLock, LuMail, LuMap, LuPhone } from "react-icons/lu";

import Loading from "../components/Loading";
import Navbar from "../components/Navbar";
import Modal from "../components/Modal.jsx";
import { useState } from "react";
import EmptySection from "../components/EmptySection.jsx";
import SearchAnyThing from "../components/SearchAnyThing.jsx";

const ClientList = () => {
  const [selectedId, setSelectedId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isClientDeleteModalOpen, setIsClientDeleteModalOpen] = useState(false);

  const { data: clientData, isLoading } = useGetClients();
  const deleteClientMutation = useDeleteClient();

  const handleClientDelete = (id) => {
    deleteClientMutation.mutate(id, {
      onSuccess: () => {
        setIsClientDeleteModalOpen(false);
      },
    });
  };

  const handleOpenClientDeleteModal = (id) => {
    setSelectedId(id);
    setIsClientDeleteModalOpen(true);
  };

  const handleSearch = () => {
    setSearchTerm("");
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="p-8">
      {/* navbar */}
      <Navbar />
      <div className="flex justify-between px-2 mb-6">
        <h1 className="text-lime-100 font-medium text-lg flex gap-x-1 items-center">
          <span className="size-2 rounded-full animate-pulse bg-lime-400"></span>
          ({clientData?.length}) Clients
        </h1>

        {/* Search functionality */}
        <SearchAnyThing
          label={"client"}
          searchTerm={searchTerm}
          handleSearch={handleSearch}
          setSearchTerm={setSearchTerm}
        />

        <Link
          to={"/create-client"}
          className="text-neutral-300"
          title="Create Client"
        >
          <HiOutlinePlusCircle
            size={32}
            className="text-lime-400 hover:scale-105 transition-transform duration-200"
          />
        </Link>
      </div>{" "}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {clientData?.length === 0 ? (
          <EmptySection
            title={"No Clients Found."}
            description={"Hey, create clients to get started."}
          />
        ) : (
          clientData?.map((client) => (
            <div
              key={client.id}
              className="p-4 box border border-neutral-600 bg-neutral-700 rounded-md flex flex-col gap-y-1"
            >
              <h1 className="font-bold text-xl mb-4 capitalize">
                {client.name}
              </h1>

              <div className="flex gap-x-2 items-center text-neutral-300">
                <LuMail size={20} className="text-lime-200" />
                <span>{client.email}</span>
              </div>

              <div className="flex gap-x-2 items-center text-neutral-300">
                <LuPhone size={20} className="text-lime-200" />
                <span>{client.phone}</span>
              </div>

              {/* Address */}
              <div className="flex gap-x-2 items-center text-neutral-300">
                <LuGlobe size={20} className="text-lime-200" />
                <span>{client.address.country},</span>
                <span className="-ml-1">{client.address.city},</span>
                <span className="-ml-1">{client.address.street}</span>
              </div>

              {/* Action Button */}
              <div className="flex gap-x-4 mt-4 items-center">
                <Link
                  to={`/edit-client/${client?.id}`}
                  className="px-6 py-1 rounded-md bg-neutral-50 text-center font-semibold text-neutral-900 hover:scale-105 transition-transform duration-300 hover:font-semibold"
                >
                  Edit
                </Link>

                <button
                  onClick={() => handleOpenClientDeleteModal(client.id)}
                  className="px-6 py-1 rounded-md bg-red-400 text-center font-medium text-red-50 hover:scale-105 transition-transform duration-300 hover:font-semibold"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
      {/*Modal for deleting client action*/}
      {isClientDeleteModalOpen && (
        <Modal
          setIsModalOpen={setIsClientDeleteModalOpen}
          title={"Are you sure to delete client?"}
          size={"small"}
        >
          <div className={"flex gap-x-6"}>
            <button
              onClick={() => setIsClientDeleteModalOpen(false)}
              className="px-6 py-2 mt-4 rounded-md bg-neutral-900 text-center hover:bg-neutral-800 text-neutral-100"
            >
              Cancel
            </button>

            <button
              onClick={() => handleClientDelete(selectedId)}
              className="px-6 py-2 mt-4 rounded-md bg-red-600 text-center hover:bg-red-800 text-neutral-100"
            >
              {deleteClientMutation.isPending ? "Deleting.." : "Delete"}
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default ClientList;
