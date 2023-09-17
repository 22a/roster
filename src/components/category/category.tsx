import UnitBox from '../unitBox/unitBox'

export default function Category({ category }) {
  return (
    <>
      <ul>
        {category.map((sharedSelectionEntry) => (
          <li>
            <UnitBox onClick={() => {}} unit={sharedSelectionEntry} />
          </li>
        ))}
      </ul>
    </>
  )
}
