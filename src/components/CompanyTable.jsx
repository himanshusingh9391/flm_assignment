function CompanyTable({ companies }) {
  if (!Array.isArray(companies) || companies.length === 0) {
    return (
      <p className="text-center text-gray-500 mt-6">No companies found.</p>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg shadow-lg border border-gray-200">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-semibold">Name</th>
            <th className="px-6 py-3 text-left text-sm font-semibold">
              Location
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold">
              Industry
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {companies.map((c) => (
            <tr
              key={c.id}
              className="hover:bg-blue-50 transition-colors duration-200 cursor-pointer"
            >
              <td className="px-6 py-3 text-gray-800 font-medium">{c.name}</td>
              <td className="px-6 py-3 text-gray-600">{c.location}</td>
              <td className="px-6 py-3 text-gray-600">{c.industry}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CompanyTable;
