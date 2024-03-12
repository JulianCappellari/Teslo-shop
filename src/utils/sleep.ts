


export const sleep = (segundos: number = 1) =>{
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(true)
        }, segundos * 1000);
    })
}