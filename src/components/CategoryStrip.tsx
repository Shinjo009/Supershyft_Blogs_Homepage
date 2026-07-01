import type { BlogCategory } from '../types/blog'

type Props = {
  categories: BlogCategory[]
  selectedCategoryId: number | null
  onSelect: (id: number | null) => void
}

export function CategoryStrip({ categories, selectedCategoryId, onSelect }: Props) {
  return (
    <div className="hi-category-bar" role="group" aria-label="Filter by category">
      <button
        type="button"
        className={`hi-pill${selectedCategoryId === null ? ' hi-pill--active' : ''}`}
        onClick={() => onSelect(null)}
      >
        All
      </button>
      {categories.map((c) => (
        <button
          key={c.id}
          type="button"
          className={`hi-pill${selectedCategoryId === c.id ? ' hi-pill--active' : ''}`}
          onClick={() => onSelect(c.id)}
        >
          {c.name}
        </button>
      ))}
    </div>
  )
}
