import Link from "next/link";

interface BranchCardProps {
  coffeeShop: {
    id: string;
    name: string;
    address: string;
    imgUrl: string;
    rating: number;
    branches: { id: string; name: string }[];
  };
  hasBranches: boolean;
  id: string[];
}

const BranchCard: React.FC<BranchCardProps> = ({
  coffeeShop,
  hasBranches,
  id,
}) => {
  const branchShop =
    coffeeShop?.branches.find((branch) => branch.id === id[1]) || null;
  return (
    <div>
      <div className="mt-6">
        <h3 className="text-lg font-semibold text-gray-800">
          Number of branches
        </h3>
        <p className="text-gray-600">{coffeeShop?.branches?.length || 0}</p>
      </div>
      {hasBranches && coffeeShop?.branches && (
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {coffeeShop.branches.map((branch, index) => (
            <Link
              key={branch.id}
              href={`/coffee-shops/${coffeeShop.id}/${branch.id}`}
              className={`text-gray-700 hover:underline py-2 px-5 bg-blue-100 border rounded-lg shadow-md hover:shadow-lg transition duration-300 text-center ${
                id[1] === branch.id ? "bg-blue-200" : ""
              }`}
            >
              Branch {index + 1}
            </Link>
          ))}
        </div>
      )}
      {branchShop && (
        <div className="mt-6 bg-gray-50 p-4 rounded-lg shadow-inner">
          <h3 className="text-lg font-semibold text-gray-800">Branch Name</h3>
          <p className="text-gray-600">{branchShop.name}</p>
          <p className="text-gray-600">
            You are now on {branchShop.name} page.
          </p>
        </div>
      )}
    </div>
  );
};

export default BranchCard;
