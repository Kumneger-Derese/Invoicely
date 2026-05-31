import {HiXMark} from "react-icons/hi2";

const Modal = ({title, setIsModalOpen, children, size = "large"}) => {
    return (
        <div
            style={{height: size === "small" ? "14rem" : "26rem"}}
            className="flex flex-col gap-4 w-3/6 h-96 m-auto sm:w-3/6 fixed inset-0 bg-neutral-500 p-8 rounded-2xl z-50 border border-neutral-500"
        >
            <div className={'fixed inset-0 bg-neutral-900/70 -z-50'}/>

            {/*Modal body*/}
            <div className={'z-50'}>
                <h1 className="font-semibold text-2xl text-lime-200 mb-4">{title}</h1>
                <button
                    className="text-red-400 hover:text-red-500 absolute top-6 right-6"
                    onClick={() => setIsModalOpen(false)}
                >
                    <HiXMark size={24} strokeWidth={2.5} title="close modal"/>
                </button>

                <div>{children}</div>
            </div>
        </div>
    );
};

export default Modal;
