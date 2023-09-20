import CatalogueEntry from './catalogueEntry';

export default function CatalogueEntryGroup({ onClick, catalogueEntryGroup }) {
  console.log('hello');
  return (
    <div className="px-6 py-4">
      <div className="font-bold text-xl mb-2">{catalogueEntryGroup.name}</div>
      {catalogueEntryGroup.selectionEntries?.map((selectionEntry) => (
        <CatalogueEntry
          key={selectionEntry.id}
          onClick={onClick}
          catalogueEntry={selectionEntry}
        />
      ))}
    </div>
  );
}
