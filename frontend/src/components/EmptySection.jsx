const EmptySection = ({title, description}) => {
    return (
        <div className={'border-l-2 w-full col-span-3 pl-4 border-l-blue-500 mt-[25%]'}>
            <h2 className={'text-neutral-300 font-bold'}>{title}</h2>
            <div className={'text-2xl text-neutral-400'}>
                {description}
            </div>
        </div>
    );
};

export default EmptySection;