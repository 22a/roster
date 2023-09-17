import RosterEntry from './rosterEntry';

export default function RosterEntryGroup({ onClick, rosterEntryGroup }) {
  console.log('hello');
  return (
    <div className="px-6 py-4">
      <div className="font-bold text-xl mb-2">{rosterEntryGroup.name}</div>
      {rosterEntryGroup.selectionEntries?.map((selectionEntry) => (
        <RosterEntry
          key={selectionEntry.id}
          onClick={onClick}
          rosterEntry={selectionEntry}
        />
      ))}
    </div>
  );
}
