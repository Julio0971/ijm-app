export interface User {
    id: number
    name: string
    username: string
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
    question: Question
    answers: Answer[]
}

export interface Answer {
    id: number
    answer: string
    seconds: number
    in_time: 1 | 0
    question: Question
    subject: Subject
    created_at: string
}

export interface Header {
    title: string
    key: string
    sortable: boolean
    align: 'start' | 'end' | 'center'
}