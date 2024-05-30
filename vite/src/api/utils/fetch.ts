// export const API_URL = 'http://localhost:39772/api/v1'
export const API_URL = 'http://localhost:3333/api/v1'

const apiFetch = async (endPoint: string, method: string, body?: any) => {
    try {
        const response = await fetch(`${API_URL}/${endPoint}`, {
            method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        })

        const data = await response.json();
        return data
    } catch (error) {
        console.log(error)
    }
}


export const apiRequest = (endPoint: string, method: string = "GET", body?: any): Promise<any> | any => {
    try {
        return apiFetch(endPoint, method, body)
    } catch (error) {
        console.log(error)
    }
}