import { useState } from 'react';
import AddButton from '../button/addButton';
import CategoryList from '../roster/categoryList';
import SelectionPanel from '../selections/selectionPanel';

export default function EditorScreen({ data }) {
  const [currentRoster, setCurrentRoster] = useState([] as any);
  console.log(data.sharedSelectionEntries);

  function addUnit(unit) {
    setCurrentRoster([...currentRoster, unit]);
  }

  return (
    <>
      <AddButton
        currentRoster={currentRoster}
        categories={data.sharedSelectionEntries}
      />
      <div style={{ display: 'flex' }}>
        <div>
          <SelectionPanel
            addUnit={addUnit}
            categories={data.sharedSelectionEntries}
          />
        </div>
        <div>
          <CategoryList
            currentRoster={currentRoster}
            categories={currentRoster}
          />
        </div>
      </div>
    </>
  );
}
