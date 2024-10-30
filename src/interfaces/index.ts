export interface User {
    id: number
    name: string
    username: string
    step: 'home' | 'notice' | 'subject' | 'instructions' | 'dilemma' | 'thank-you' | null
    role: 'admin' | 'participant'
    subject: Subject
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

export interface Question {
    id: number
    name: string
    question: string
    video: string | null
    description: string | null
}

export interface Subject {
    id: number
    gender: 'Hombre' | 'Mujer' | 'Prefiero no contestar'
    age: number
    speciality: string
    grade: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8
    participated_before: 1 | 0
}