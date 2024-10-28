export interface User {
    id: number
    name: string
    username: string
}

export interface Link {
    url: string | null
    label: string
    active: boolean
}

export interface Pagination {
    current_page: number
    first_page_url: string
    from: number | null
    last_page: number
    last_page_url: string
    links: Array<Link>
    next_page_url: string | null
    path: string
    per_page: number
    prev_page_url: string | null
    to: number | null
    total: number
}

export interface Theme {
    name: 'light' | 'dark' | 'system'
    icon: 'fa-sun' | 'fa-moon' | 'fa-computer'
    text: 'Claro' | 'Oscuro' | 'Sistema'
}