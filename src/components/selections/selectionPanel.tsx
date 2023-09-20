import CatalogueEntry from './catalogueEntry';

export default function SelectionPanel({ addUnit, categories }) {
  return (
    <>
      {categories.map((catalogueEntry, index) => (
        <CatalogueEntry
          key={index}
          onClick={() => addUnit(catalogueEntry)}
          catalogueEntry={catalogueEntry}
        />
      ))}
    </>
  );
}
