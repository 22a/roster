import Category from '../category/category'

export default function CategoryList({ currentRoster, categories }) {
  return (
    <ul>
      <li>
        <Category category={categories}></Category>
      </li>
    </ul>
  )
}
