import path from '../static/server'
import axios from 'axios'
import CasesApi from "./CasesApi"

const SortBy = {
    'newCase': Symbol('new_cases'),
    'area_name': Symbol('area_name')
}

export default class ApiManagement {
    async getCasesData(sortBy = SortBy.newCase, casesPerPage, numberOfPage, order = 0) {
        let parameter = {
            'sortby': sortBy,
            'order': order,
            'numperpage': casesPerPage,
            'pageno': numberOfPage
        }
        const url = path + CasesApi.newCases + convertQueryString(parameter)
        const {data, status, statusText} = await axios.get(url, {timeout: 10000})
        if (status >= 400)
            throw new Error(statusText)
        return data
    }
}

function convertQueryString(parameter) {
    let queryString = '?'
    for (let key in parameter) {
        queryString += `${key}=${parameter[key]}&`
    }
    console.log(queryString)
    return queryString.substr(0, queryString.length - 1)
}