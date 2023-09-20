import RosterEntry from '../roster/rosterEntry';

export default function Category({ category }) {
  return (
    <>
      <ul>
        {category.map((sharedSelectionEntry) => (
          <li key={sharedSelectionEntry.id}>
            <RosterEntry
              onClick={() => {}}
              rosterEntry={sharedSelectionEntry}
            />
          </li>
        ))}
      </ul>
    </>
  );
}
