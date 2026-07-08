export function buildWhere(searchParams, category) {
  const where = {}

  // Category filter: completed = status "completed"; ongoing = everything else with a status
  if (category === 'ongoing') {
    where['status.value'] = { not_equals: 'completed' }
  } else if (category === 'completed') {
    where['status.value'] = { equals: 'completed' }
  }

  // Explicit status filter (if provided, AND with category)
  if (searchParams.status) {
    if (where['status.value']) {
      where.and = [
        { 'status.value': where['status.value'] },
        { 'status.value': { equals: searchParams.status } },
      ]
      delete where['status.value']
    } else {
      where['status.value'] = { equals: searchParams.status }
    }
  }

  // Project type
  if (searchParams.type) {
    where['projectType.value'] = { equals: searchParams.type }
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
