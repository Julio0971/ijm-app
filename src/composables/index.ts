import axios from 'axios'
import moment from 'moment'
import type { AxiosError, AxiosResponse } from 'axios'

moment.updateLocale('es', {
    weekdaysMin: ['D', 'L', 'M', 'M', 'J', 'V', 'S'],
    weekdays: ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sábado'],
    monthsShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
    months: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
})

export const useAxiosRequest = async (method: 'get' | 'post' | 'put' | 'delete', url: string, data: any = {}, id: number = 0) => {
    if (id) {
        url += `/${id}`
    }

    const response: AxiosResponse = await axios({ method, url, data })

    if ((response.data as { message: string }).message) {
        console.log((response.data as { message: string }).message)
    }

    return response.data
}

export const useAxiosErrors = (error: AxiosError) => {
    let errors: any = {}

    if (error.response) {
        if ((error.response.data as { errors: any }).errors) {
            Object.entries((error.response.data as { errors: any }).errors).map((item: any) => {
                errors[item[0]] = item[1][0]
            })
        } else {
            console.log((error.response.data as { message: string }).message)
        }
    } else {
        console.log(error.message || 'Error')
    }

    return errors
}

export const toCurrency = (value: number) => {
    if (!value) {
        return '---'
    }

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2
    })

    return formatter.format(value)
}

export const toDateTime = (value: string) => {
    if (!value) {
        return '---'
    }

    return `${moment(value, 'YYYY/MM/DD HH:mm:ss').format('DD/MM/YYYY HH:mm')} hrs.`
}

export const toMinutesSeconds = (value: number) => {
    const minutes = Math.floor(value / 60).toString()
    const seconds = (value % 60).toString()

    return `${ minutes.padStart(2, '0') }:${ seconds.padStart(2, '0') }`
}

export const toDate = (value: string) => {
    if (!value) {
        return '---'
    }

    return moment(value, 'YYYY/MM/DD').format('DD/MM/YYYY')
}

export const toFloat = (value: string) => {
    if (!value) {
        return 0
    }

    return parseFloat(value.replace(',', '').replace(',', '').replace(',', ''))
}