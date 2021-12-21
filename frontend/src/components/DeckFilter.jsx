import Select from "./Select";

const DeckFilter = ({filter, setFilter}) => {
    return (
        <div>
            <input
                value={filter.query}
                onChange={e => setFilter({...filter, query: e.target.value})}
                placeholder="Search..."
            />
            <Select
                defaultValue="Sort by"
                options={[
                    {value: "title", name: "title"},
                    {value: "cards", name: "number of cards"},
                    {value: "creation", name: "creation date"},
                    {value: "modification", name: "last modification date"}
                ]}
                value={filter.sort}
                onChange={(selectedSort) => setFilter({...filter, sort: selectedSort})}
            />
        </div>
    );
};

export default DeckFilter;