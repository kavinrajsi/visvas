export const STATUS_LABELS = {
  upcoming: 'On Sale',
  under_construction: 'Under Construction',
  ready_to_move: 'Ready to Move',
  completed: 'Completed',
}

export const PROJECT_TYPE_LABELS = {
  apartment: 'Apartment',
  villa: 'Villa',
  plotted: 'Plotted Development',
  commercial: 'Commercial',
  mixed_use: 'Mixed Use',
}

export function buildWhere(searchParams, category) {
  const where = {}

  // Category filter (ongoing = upcoming/under_construction/ready_to_move, completed = completed)
  if (category === 'ongoing') {
    where.or = [
      { status: { equals: 'upcoming' } },
      { status: { equals: 'under_construction' } },
      { status: { equals: 'ready_to_move' } },
    ]
  } else if (category === 'completed') {
    where.status = { equals: 'completed' }
  }

  // Explicit status filter (if provided, AND with category)
  if (searchParams.status) {
    if (where.or) {
      where.and = [{ or: where.or }, { status: { equals: searchParams.status } }]
      delete where.or
    } else {
      where.status = { equals: searchParams.status }
    }
  }

  // Project type
  if (searchParams.type) {
    where.projectType = { equals: searchParams.type }
  }

  // Location
  if (searchParams.location) {
    where.location = { like: searchParams.location }
  }

  // Budget range
  const where_budget = {}
  if (searchParams.minBudget) {
    where_budget.greater_than_equal = Number(searchParams.minBudget)
  }
  if (searchParams.maxBudget) {
    where_budget.less_than_equal = Number(searchParams.maxBudget)
  }
  if (Object.keys(where_budget).length > 0) {
    where.priceRangeStartFrom = where_budget
  }

  // Search (project name)
  if (searchParams.search) {
    where.name = { like: searchParams.search }
  }

  return Object.keys(where).length > 0 ? where : {}
}
