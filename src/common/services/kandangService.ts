import { API } from "@common/api/api"

const getDataKandang = async () => await API.get('/cage').then(res=> {
  return res.data.data
}).catch(err => {
  return err.message
})

export {getDataKandang}