import RosterEntryGroup from './rosterEntryGroup';
import Keywords from './keywords';
import Profiles from './profiles';

export default function RosterEntry({ onClick, rosterEntry }) {
  console.log(rosterEntry);

  return (
    <div
      onClick={onClick}
      className="max-w-32 rounded overflow-hidden shadow-lg"
    >
      <div className="px-6 py-4">
        <details>
          <summary>
            {rosterEntry.name} -- {rosterEntry.costs?.[0].value}
          </summary>
          <Keywords keywords={rosterEntry.categoryLinks}></Keywords>
          <Profiles profiles={rosterEntry.profiles}></Profiles>
          {rosterEntry.selectionEntryGroups?.map((selectionEntryGroup) => (
            <RosterEntryGroup
              key={selectionEntryGroup.id}
              onClick={onClick}
              rosterEntryGroup={selectionEntryGroup}
            />
          ))}
        </details>
      </div>
    </div>
  );
}
