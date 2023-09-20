export default function CatalogueEntry({ onClick, catalogueEntry }) {
  console.log(catalogueEntry);

  return (
    <div
      onClick={onClick}
      className="max-w-sm rounded overflow-hidden shadow-lg"
    >
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{catalogueEntry.name}</div>
        <span className="">{catalogueEntry.costs?.[0].value || ''}</span>
      </div>
    </div>
  );
}
