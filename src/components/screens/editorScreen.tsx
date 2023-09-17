import { useState } from 'react'
import AddButton from '../button/addButton'
import CategoryList from '../categoryList/categoryList'
import SelectionPanel from '../panel/selectionPanel'

function buildPossibleCategories(categories) {}

function buildCategoriesList(data) {
  const output: any[] = []
  data.sharedSelectionEntries.map((sharedSelectionEntry) => {
    if (sharedSelectionEntry.categoryLinks !== undefined) {
      sharedSelectionEntry.categoryLinks.map((categoryLink) => {
        if (categoryLink.primary === true) {
          output.push(buildPossibleCategories(categoryLink))
        }
      })
    }
  })
  return output
}

export default function EditorScreen({ data }) {
  const [currentRoster, setCurrentRoster] = useState([] as any)
  buildCategoriesList(data)
  console.log(data.sharedSelectionEntries)

  function addUnit(unit) {
    setCurrentRoster([...currentRoster, unit])
  }

  return (
    <>
      <AddButton currentRoster={currentRoster} categories={data.sharedSelectionEntries} />
      <div style={{ display: 'flex' }}>
        <div>
          <SelectionPanel addUnit={addUnit} categories={data.sharedSelectionEntries} />
        </div>
        <div>
          <CategoryList currentRoster={currentRoster} categories={currentRoster} />
        </div>
      </div>
    </>
  )
}
