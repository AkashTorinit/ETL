import React from "react"

type Props = {
  search: string;
  searchValueList: string[];
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  setSearchValueList: React.Dispatch<React.SetStateAction<string[]>>;
};

const searchBar = ({
    setSearch,
    setSearchValueList,
    search,
    searchValueList,
}: Props) => {
    const handleSearch = (e: any) => {
        e.preventDefault()
        if (e != "") {
            setSearch(e.target.value)
        }
    }
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            handleSubmit()
        } else if (
            e.key === "Backspace" &&
      searchValueList[0] !== "" &&
      search === ""
        ) {
            setSearch("")
            setSearchValueList(() => [search])
        }
    }
    const handleSubmit = () => {
        setSearchValueList(() => [search])
        console.log(search)
    }
    return (
        <div>
            <input
                className="search_input"
                type="text"
                placeholder="Search"
                onChange={handleSearch}
                style={{ padding: "15px", width: "200px", margin: "10px" }}
                value={search}
                onKeyDown={handleKeyDown}
            />
            <button onClick={handleSubmit}>Search</button>
        </div>
    )
}

export default searchBar
