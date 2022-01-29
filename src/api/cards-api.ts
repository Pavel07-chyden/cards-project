import {instance} from './axios-instance'
import {AxiosResponse} from 'axios'

export type Card = {  // post   put  delete   createCard, updateCard, deleteCard
    answer: string
    question: string
    cardsPack_id: string
    grade: number
    rating: number
    shots: number
    type: string
    user_id: string
    created: string
    updated: string
    __v: number
    _id: string
}

export type CardsResponse = { // --- get  getCards'
    cards: Card[]
    cardsTotalCount: number
    maxGrade: number
    minGrade: number
    page: number
    pageCount: number
    packUserId: string
}

export type GetCardsQueryParams = { // getCards   <--->
    cardsPack_id?: string
    cardAnswer?: string
    cardQuestion?: string
    min?: number
    max?: number
    sortCards?: string
    page?: number
    pageCount?: number
}

export type NewCardData = {  //  post          createCard
    card: {
        cardsPack_id: string
        question?: string
        answer?: string
        grade?: number
        shots?: number
        rating?: number
        answerImg?: string
        questionImg?: string
        questionVideo?: string
        answerVideo?: string
        type?: string
    }
}

export type UpdateCardData = {  //updateCard
    card: {
        _id: string
        question?: string
        answer?: string
    }
}

export type DeleteCardData = {  //deleteCard
    id: string
}

export type GradeData = {  //    grade
    card_id: string
    grade: number
}

export type GradeResponse = { // put GradeData
    _id: string
    cardsPack_id: string
    card_id: string
    user_id: string
    grade: number
    shots: number
}

export const cardsAPI = {
    // с server 
    getCards: (payload?: GetCardsQueryParams) => instance
        .get<CardsResponse>('/cards/card', {params: payload}),

    createCard: (payload?: NewCardData) => instance
        .post<NewCardData, AxiosResponse<Card>>('/cards/card', payload),

    deleteCard: (payload: DeleteCardData) => instance
        .delete<Card>(`/cards/card`, {params: payload}),

    updateCard: (payload: UpdateCardData) => instance
        .put<UpdateCardData, AxiosResponse<Card>>('/cards/card', payload),
    /// запрос карточки данной колоды по id 
    grade: (payload: GradeData) => instance
        .put<GradeData, AxiosResponse<GradeResponse>>('/cards/grade', payload)
}