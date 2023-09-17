import UnitBox from '../unitBox/unitBox'

export default function SelectionPanel({ addUnit, categories }) {
  return (
    <>
      {categories.map((unit, index) => (
        <UnitBox onClick={() => addUnit(unit)} unit={unit} key={index} />
      ))}
    </>
  )
}
