import { API } from "@common/api/api"
import { ValidationFormKandang } from "@features/kandang/constant/schema"

const getDataKandang = async () => await API.get('/cage').then(res=> {
  return res.data.data
}).catch(err => {
  return err.message
})

const postDataKandang = async (params:ValidationFormKandang) => await API.post('/cage', params).then(res=> {
  return res.data
}).catch(err => {
  return err.message
})

const putDataKandang = async (params:ValidationFormKandang, id: number) => await API.put(`/cage/${id}`, params).then(res=> {
  return res.data
}).catch(err => {
  return err.message
})

const deleteDataKandang = async (id: number) => await API.delete(`/cage/${id}`).then(res=> {
  return res.data
}).catch(err => {
  return err.message
})


export {
  getDataKandang, 
  postDataKandang,
  putDataKandang,
  deleteDataKandang
}