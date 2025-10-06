import { useEffect, useState } from "react";
import axios from "axios";
import CompanyTable from "./components/CompanyTable";

function App() {
  const [companies, setCompanies] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("All");
  const [industry, setIndustry] = useState("All");
  const [sort, setSort] = useState("");

  // Fetching JSON data once
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/companies.json");
        setCompanies(res.data);
        setFiltered(res.data);
      } catch (err) {
        console.error("Error loading data:", err);
      }
    };
    fetchData();
  }, []);

  // Applied filters and sorting
  useEffect(() => {
    let data = [...companies];

    if (search) {
      data = data.filter((c) =>
        c?.name?.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (location !== "All") {
      data = data.filter((c) => c.location === location);
    }

    if (industry !== "All") {
      data = data.filter((c) => c.industry === industry);
    }

    if (sort === "name") {
      data.sort((a, b) => a.name.localeCompare(b.name));
    }

    setFiltered(data);
  }, [search, location, industry, sort, companies]);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">
        Companies Directory
      </h1>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded w-full sm:w-1/3"
        />

        <select
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="border p-2 rounded"
        >
          <option>All</option>
          <option>USA</option>
          <option>India</option>
        </select>

        <select
          value={industry}
          onChange={(e) => setIndustry(e.target.value)}
          className="border p-2 rounded"
        >
          <option>All</option>
          <option>Tech</option>
          <option>IT Services</option>
          <option>Automobile</option>
          {/* <option></option> */}
          <option>E-commerce</option>
        </select>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">Sort</option>
          <option value="name">By Name</option>
        </select>
      </div>
      <CompanyTable companies={filtered} />
    </div>
  );
}

export default App;
